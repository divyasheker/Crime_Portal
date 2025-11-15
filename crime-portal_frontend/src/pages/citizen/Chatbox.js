import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import auth context

// Direct Flask URLs (not proxied)
const START_CHAT_URL = 'http://localhost:5000/start_chat';
const CHAT_URL = 'http://localhost:5000/chat';

function Chatbox() {
  const { user } = useAuth(); // Get logged-in user
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatStatus, setChatStatus] = useState('loading');

  // 1. Start Chat Effect
  useEffect(() => {
    const startChat = async () => {
      setChatStatus('loading');
      try {
        const response = await fetch(START_CHAT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Important for session cookies
          body: JSON.stringify({
            user_id: user?.email || 'guest-' + Date.now(),
            user_email: user?.email || '',
            user_phone: user?.phone || ''
          }),
        });
        const data = await response.json();

        if (data.status === 'active') {
          setMessages([{ sender: 'bot', text: data.response }]);
          setChatStatus('active');
        } else {
          setChatStatus('error');
          setMessages([{ sender: 'bot', text: 'Error starting chat.' }]);
        }
      } catch (error) {
        console.error("API error:", error);
        setChatStatus('error');
        setMessages([{ sender: 'bot', text: 'Connection failed. Ensure the Flask API is running on port 5000.' }]);
      }
    };
    startChat();
  }, [user]);

  // 2. Handle User Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || chatStatus !== 'active') return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setChatStatus('loading');

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important for session cookies
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      setChatStatus(data.status);

      if (data.status === 'finished') {
        console.log("Final Report JSON:", data.final_report_json);
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "✅ Report submitted successfully to the portal!" 
        }]);
      }

    } catch (error) {
      console.error("API call failed:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'A network error occurred.' }]);
      setChatStatus('active');
    }
  };

  return (
    <div className="chat-container" style={{ 
      height: '80vh', 
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div className="message-list" style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#f9f9f9'
      }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender}`}
            style={{
              marginBottom: '15px',
              padding: '10px 15px',
              borderRadius: '8px',
              maxWidth: '70%',
              backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
              color: msg.sender === 'user' ? 'white' : 'black',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              textAlign: msg.sender === 'user' ? 'right' : 'left'
            }}
          >
            <p style={{ margin: 0 }}>{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-form" style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            chatStatus === 'active' ? "Type your report details here..." : 
            chatStatus === 'loading' ? "Processing..." : 
            "Chat finished."
          }
          disabled={chatStatus !== 'active'}
          style={{
            flex: 1,
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button 
          type="submit" 
          disabled={chatStatus !== 'active'}
          style={{
            padding: '12px 24px',
            backgroundColor: chatStatus === 'active' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: chatStatus === 'active' ? 'pointer' : 'not-allowed',
            fontSize: '16px'
          }}
        >
          {chatStatus === 'loading' ? '⏳' : 'Send'}
        </button>
      </form>

      {chatStatus === 'finished' && (
        <div className="finished-overlay" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#28a745' }}>Report Complete!</h2>
          <p>The final structured report has been sent to the portal.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Start New Report
          </button>
        </div>
      )}
    </div>
  );
}

export default Chatbox;
