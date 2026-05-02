# The Voter's Campaign

An AI-powered, gamified interactive assistant to guide users through the complex election and voting process. 

**Powered entirely by Google Gemini AI (1.5 Flash) with Function Calling capabilities.**

## Core Features
1. **Gemini Function Calling Backend**: Gemini dynamically decides when to unlock a skill tree node based on conversation context using python tool integrations.
2. **Skill Tree Progression**: Watch your progress dynamically update from "Novice" to "Democracy Hero".
3. **Voice Enabled**: Integrated browser Speech-to-Text and Text-to-Speech mechanics for an immersive Game Master feel.
4. **Stunning UI**: Custom Glassmorphism layout built with TailwindCSS.

## Running Locally

### Backend (FastAPI + Gemini)
1. `cd backend`
2. `pip install -r requirements.txt`
3. Create `.env` and add: `GEMINI_API_KEY=your_google_api_key_here`
4. Run: `uvicorn main:app --reload`
*Backend starts on http://localhost:8000*

### Frontend (React + Vite)
1. `cd frontend`
2. `npm install`
3. Run: `npm run dev`
*Frontend starts on http://localhost:3000*

Have fun hacking democracy!
