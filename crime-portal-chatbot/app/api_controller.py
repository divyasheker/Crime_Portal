# api_controller.py
from flask import request, jsonify, session, Blueprint
from app.chatbot_logic import ChatbotLogic

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/start_chat', methods=['POST'])
def start_chat():
    """Initializes a new conversation session."""
    session.clear()
    chatbot = ChatbotLogic()
    
    user_id = request.json.get('user_id', 'anon_user')
    user_email = request.json.get('user_email', '')
    user_phone = request.json.get('user_phone', '')
    
    response = chatbot.start_conversation(user_id, user_email, user_phone)
    
    session['chat_state'] = chatbot.get_state()
    session['chat_active'] = True
    
    return jsonify({"response": response, "status": "active", "session_id": user_id})

@chat_bp.route('/chat', methods=['POST'])
def chat_endpoint():
    """Handles a single turn of the conversation."""
    if 'chat_active' not in session or 'chat_state' not in session:
        return jsonify({"response": "Please start a new chat session first by calling /start_chat.", "status": "error"})
    
    chatbot = ChatbotLogic()
    chatbot.set_state(session['chat_state'])
    
    user_message = request.json.get('message', '')
    
    response, is_finished, final_json_data = chatbot.get_response(user_message)
    
    session['chat_state'] = chatbot.get_state()
    
    if is_finished:
        session['chat_active'] = False
        return jsonify({
            "response": response,
            "status": "finished",
            "final_report_json": final_json_data
        })
    else:
        return jsonify({
            "response": response,
            "status": "active"
        })
