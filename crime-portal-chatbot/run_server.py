# run_server.py
import os
from dotenv import load_dotenv

# Load .env FIRST before any other imports
load_dotenv()

from flask import Flask
from flask_cors import CORS
from app.api_controller import chat_bp

def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get('FLASK_SECRET_KEY', os.urandom(24))
    
    # Enable CORS for React frontend
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
    
    app.register_blueprint(chat_bp)
    return app

if __name__ == '__main__':
    if 'GEMINI_API_KEY' not in os.environ:
        print("🛑 ERROR: GEMINI_API_KEY is not set in the .env file!")
        print(f"Looking in: {os.getcwd()}/.env")
        exit()
    
    print(f"✅ GEMINI_API_KEY loaded: {os.environ['GEMINI_API_KEY'][:20]}...")
    
    app = create_app()
    print("✅ Starting Crime Portal Chatbot API on http://127.0.0.1:5000...")
    app.run(debug=True, port=5000, host='0.0.0.0')
