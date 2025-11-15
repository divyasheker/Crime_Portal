# gemini_service.py
import os
import json
import datetime
import requests
from google import genai
from google.genai import types 


# Spring Boot API endpoint
PORTAL_SUBMISSION_URL = "http://localhost:8080/api/reports"


# Initialize Gemini Client
client = None
client_available = False

try:
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise Exception("GEMINI_API_KEY not found in environment variables")
    
    # Initialize Client with API key
    client = genai.Client(api_key=api_key)
    client_available = True
    print("✅ Gemini Client initialized successfully")
except Exception as e:
    print(f"❌ Gemini initialization error: {e}")
    client_available = False


class GeminiService:
    
    @staticmethod
    def analyze_report(description: str) -> dict:
        """Analyzes report using Gemini API and returns structured JSON."""
        global client, client_available
        
        if not client_available:
            print("⚠️ Gemini not available, returning default values")
            return {"predicted_category": "Other", "severity_score": 5.0, "suggestion": "None"}

        system_instruction = (
            "You are a crime report classifier. Classify incidents into one of these categories: "
            "Theft, Vandalism, Assault, Fraud, Cyber Crime, Traffic, Public Safety, Harassment, Lost_Property, or Other. "
            "Provide a severity score (1.0 = minor, 10.0 = critical) and a helpful suggestion for low-severity cases."
        )

        prompt = f"""
Analyze this incident: '{description}'

Examples:
- "bike stolen" → {{"predicted_category": "Theft", "severity_score": 7.0, "suggestion": "None"}}
- "lost my keys" → {{"predicted_category": "Lost_Property", "severity_score": 2.0, "suggestion": "Check nearby areas"}}

Return ONLY a JSON object with:
- predicted_category (from categories above)
- severity_score (1.0-10.0)
- suggestion (advice or "None")
"""
        
        try:
            # Use the client's generate_content method
            response = client.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    temperature=0.3
                )
            )
            
            result = json.loads(response.text)
            print(f"✅ Analysis result: {result}")
            return result

        except json.JSONDecodeError as e:
            print(f"❌ JSON parse error: {e}")
            print(f"Raw response: {response.text[:200]}")
            return {"predicted_category": "Other", "severity_score": 5.0, "suggestion": "None"}
        except Exception as e:
            print(f"❌ Analysis error: {e}")
            return {"predicted_category": "Other", "severity_score": 5.0, "suggestion": "None"}

    
    @staticmethod
    def generate_summary(description: str, category: str) -> str:
        """Generates a concise summary using Gemini."""
        global client, client_available
        
        if not client_available:
            return description[:150] + "..." if len(description) > 150 else description

        try:
            response = client.models.generate_content(
                model='gemini-2.0-flash',
                contents=f"Write a professional 2-sentence summary of this {category} incident: {description}"
            )
            summary = response.text.strip()
            print(f"✅ Summary: {summary[:50]}...")
            return summary
        except Exception as e:
            print(f"❌ Summary error: {e}")
            return description[:150] + "..." if len(description) > 150 else description


    @staticmethod
    def validate_location(user_input: str) -> bool:
        """Validates if input is a location using Gemini."""
        global client, client_available
        
        if not user_input or len(user_input.strip()) < 3:
            return False
            
        if not client_available:
            return True

        try:
            response = client.models.generate_content(
                model='gemini-2.0-flash',
                contents=f"Is '{user_input}' a valid location/address/landmark? Answer ONLY 'YES' or 'NO'."
            )
            result = 'YES' in response.text.upper()
            print(f"Location '{user_input}': {result}")
            return result
        except Exception as e:
            print(f"❌ Location validation error: {e}")
            return True


    @staticmethod
    def submit_to_portal(data: dict, report_id: str) -> str:
        """Submits report to Spring Boot backend."""
        try:
            timestamp = data["timestamp"]
            date_part = timestamp[:10]
            time_part = timestamp[11:19]
            
            payload = {
                "userEmail": data["raw_details"].get("user_email", "chatbot@crimeportal.com"),
                "userPhone": data["raw_details"].get("user_phone", ""),
                "body": data["incident_summary"],
                "category": data["ml_analysis"]["predicted_category"],
                "date": date_part,
                "time": time_part,
                "location": data["raw_details"]["location"],
                "status": "Pending",
                "score": int(float(data["ml_analysis"]["severity_score"]) * 10),
                "handledBy": ""
            }
            
            print(f"📤 Submitting to: {PORTAL_SUBMISSION_URL}")
            print(f"📦 Payload: {json.dumps(payload, indent=2)}")
            
            response = requests.post(
                PORTAL_SUBMISSION_URL,
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=10
            )
            
            response.raise_for_status()
            created_report = response.json()
            portal_id = created_report.get("id", report_id)
            
            print(f"✅ Submission successful. Portal ID: {portal_id}")
            return f"✅ Submission successful. Portal Reference ID: **{portal_id}**"
            
        except requests.exceptions.ConnectionError:
            print(f"❌ Cannot connect to Spring Boot at {PORTAL_SUBMISSION_URL}")
            return "⚠️ Submission FAILED: Backend not reachable."
        except Exception as e:
            print(f"❌ Submission error: {e}")
            return f"⚠️ Submission FAILED: {str(e)}"
