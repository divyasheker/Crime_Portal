# Crime_Portal
# Crime Portal - Full Stack Application

A comprehensive crime reporting system with AI-powered chatbot assistance.

## Project Structure

crime-portal-project/
├── crime-portal-backend/ # Spring Boot REST API
├── crime-portal_frontend/ # React.js Web Application
└── crime-portal-chatbot/ # Flask AI Chatbot with Gemini



## Tech Stack

- **Backend**: Spring Boot (Java 17), MySQL, JPA/Hibernate
- **Frontend**: React.js, Framer Motion, Recharts
- **AI Chatbot**: Flask (Python), Google Gemini API
- **Authentication**: JWT tokens, Context API

## Quick Start

### 1. Backend (Spring Boot)
cd crime-portal-backend
./mvnw spring-boot:run



### 2. Frontend (React)
cd crime-portal_frontend
npm install
npm start



### 3. AI Chatbot (Flask)
cd crime-portal-chatbot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 run_server.py



## Environment Setup

Create `.env` files in:
- `crime-portal-chatbot/.env` with `GEMINI_API_KEY` and `FLASK_SECRET_KEY`

## Features

- User authentication (Citizen, Police, Admin roles)
- Crime report submission with AI assistance
- Real-time report tracking
- Analytics dashboard
- Report management and status updates
