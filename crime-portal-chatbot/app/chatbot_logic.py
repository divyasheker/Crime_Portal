


# chatbot_logic.py
import random
import datetime
from app.gemini_service import GeminiService


class ChatbotLogic:
    def __init__(self, session_data=None, step=0):
        self.session_data = session_data if session_data is not None else {}
        self.step = step

    def get_state(self):
        """Returns the current state for session management."""
        return {"data": self.session_data, "step": self.step}

    def set_state(self, state):
        """Sets the state from session data."""
        self.session_data = state.get("data", {})
        self.step = state.get("step", 0)

    def start_conversation(self, user_id: str, user_email='', user_phone='') -> str:
        """Initializes a new session."""
        self.session_data = {
            "id": user_id,
            "user_email": user_email,
            "user_phone": user_phone,
            "report_id": f"CR-TEMP-{random.randint(10000, 99999)}",
            "description": None,
            "location": None,
            "satisfied_status": None,
            "ml_analysis": None
        }
        self.step = 1
        return "Hello! I'm your secure Crime Reporting Bot. Please tell me the **full details** and **nature of the incident** you need to report. We're here to help."

    def get_response(self, user_input: str) -> tuple[str, bool, dict | None]:
        """Processes user input and advances the conversation state."""
        response = ""
        is_finished = False
        final_json_data = None
        current_step = self.step

        # --- Conversation Steps ---
        if current_step == 1:
            self.session_data["description"] = user_input
            ml_result = GeminiService.analyze_report(user_input)
            self.session_data["ml_analysis"] = ml_result
            
            category = ml_result['predicted_category']
            
            # Handle the case where the API failed and returned a custom error category
            if category in ["API_FAIL", "JSON_ERROR"]:
                response = "⚠️ I encountered an error analyzing your report. I'll classify this as **Other** for now. Please proceed with the location."
            else:
                response = f"Thank you. I've classified this as **{category}**."
            
            if ml_result.get('suggestion') and ml_result['suggestion'] != 'None':
                response += f" **Suggestion**: {ml_result['suggestion']}. "
            
            response += " Can you provide the **location** (address or nearest landmark) of the incident?"
            self.step = 2
    

        elif current_step == 2:
            is_valid_location = GeminiService.validate_location(user_input)

            if is_valid_location:
                self.session_data["location"] = user_input
                
                response = (
                    f"I have recorded the location as **{user_input}**. To ensure accuracy, "
                    "are you **satisfied** with the details provided so far? (Yes/No)"
                )
                self.step = 3
            else:
                # If validation fails, stay on step 2 and ask again
                response = (
                    "That doesn't look like an address or landmark. "
                    "Please provide the **location** (address or nearest landmark) of the incident."
                )
        
        elif current_step == 3:
            user_text = user_input.lower().strip()
            
            if "yes" in user_text or "yup" in user_text or user_text == "y":
                self.session_data["satisfied_status"] = True
                response, final_json_data = self.finalize_report()
                is_finished = True
                
            elif "no" in user_text or "nope" in user_text or user_text == "n":
                self.session_data["satisfied_status"] = False
                response = "I apologize. Please provide the **missing or corrected details** now."
                self.step = 1.5
            else:
                response = "Please answer **Yes** or **No** regarding your satisfaction with the report details."

        elif current_step == 1.5:
            # Append correction to description
            self.session_data["description"] += f" (CORRECTION: {user_input})"
            
            # Re-analyze the combined description
            ml_result = GeminiService.analyze_report(self.session_data["description"])
            self.session_data["ml_analysis"] = ml_result
            
            response = "Thank you for the update. Are you satisfied now? (Yes/No)"
            self.step = 3
        # --- End of Conversation Steps ---

        return response, is_finished, final_json_data

    def finalize_report(self) -> tuple[str, dict]:
        """Runs final summary and attempts submission to the portal API."""
        ml_data = self.session_data["ml_analysis"]
        category = ml_data['predicted_category']
        score = ml_data['severity_score']
        
        # 1. Generate Summary
        summary = GeminiService.generate_summary(self.session_data["description"], category)
        
        # 2. Assemble Final JSON with user info
        final_json = {
            "report_id": self.session_data["report_id"],
            "timestamp": datetime.datetime.now().isoformat(),
            "incident_summary": summary,
            "ml_analysis": {
                "predicted_category": category,
                "severity_score": float(score), 
                "severity_notes": "High Priority" if float(score) > 7.5 else "Standard Priority"
            },
            "raw_details": {
                "description": self.session_data["description"],
                "location": self.session_data["location"],
                "user_email": self.session_data.get("user_email", ""),
                "user_phone": self.session_data.get("user_phone", "")
            },
            "chat_process": {
                "suggestions_offered": ml_data['suggestion'] != 'None',
                "user_satisfied_with_report": self.session_data["satisfied_status"]
            }
        }
        
        # 3. Submit to Spring Boot API
        submission_message = GeminiService.submit_to_portal(final_json, self.session_data["report_id"])

        confirmation_message = (
            f"✅ Report Finalized. Filed as **{category}** "
           
        )
        
        return confirmation_message, final_json