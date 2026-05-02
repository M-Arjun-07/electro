# 🚀 The Voter’s Campaign

An interactive, AI-powered civic platform that guides users through the complete voting journey — from registration to casting their vote.

---

## 🌐 Live Demo

* Frontend: https://https://electro-xp.netlify.app/

---

## 🧠 Features

* 🎤 AI Assistant (Gemini) – voice/text interaction
* 🗺️ Polling Booth Finder (location-based)
* 🎓 Knowledge Hub (Myth Busters + learning cards)
* 🎮 Gamification (XP, progress, quizzes)
* 🔐 Authentication (Firebase)
* 📊 Real-time user data (Firestore)

---

## ⚙️ Tech Stack

* Frontend: React.js + Tailwind CSS
* Backend: FastAPI (Python)
* AI: Gemini API
* Database/Auth: Firebase
* Deployment: Netlify + Render

---

# 📁 Project Structure

```
project-root/
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│
└── README.md
```

---

# 🛠️ SETUP GUIDE

---

## 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

# 🔥 FRONTEND SETUP

---

## 📦 Install Dependencies

```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

Create file:

```
frontend/.env
```

Add:

```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

---

## ▶️ Run Frontend

```bash
npm start
```

Runs on:

```
http://localhost:3000
```

---

# 🔥 BACKEND SETUP (FastAPI)

---

## 📦 Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create file:

```
backend/.env
```

Add:

```
GEMINI_API_KEY=your_gemini_key
FIREBASE_CREDENTIALS={"type":"service_account",...}
```

---

## 🔥 Firebase Setup (IMPORTANT)

### 1. Go to Firebase Console

* Enable Authentication (Email/Password)
* Create Firestore Database

---

### 2. Generate Service Account Key

* Project Settings → Service Accounts
* Generate new private key

---

### 3. Convert JSON → Minified String

Example:

```
{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n..."}
```

---

### 4. Add to `.env`

```
FIREBASE_CREDENTIALS=PASTE_MINIFIED_JSON
```

---

## ▶️ Run Backend

```bash
uvicorn main:app --reload
```

Runs on:

```
http://localhost:8000
```

---

## 📄 API Docs

```
http://localhost:8000/docs
```

---

# 🔗 CONNECT FRONTEND & BACKEND

Update frontend `.env`:

```
REACT_APP_API_URL=http://localhost:8000
```

---

# 🚀 DEPLOYMENT

---

## 🌍 Frontend (Netlify)

1. Build project:

```bash
npm run build
```

2. Deploy on Netlify:

* Drag & drop `build/`
  OR
* Connect GitHub repo

---

## ⚙️ Backend (Render)

1. Create Web Service
2. Add:

```
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port 10000
```

3. Add ENV variables:

* GEMINI_API_KEY
* FIREBASE_CREDENTIALS

---

# ⚠️ IMPORTANT NOTES

* Never commit `.env` files
* Never upload Firebase JSON key
* Use environment variables for secrets
* Enable CORS in backend

---

# 🧪 TESTING

* Signup/Login works
* Firestore data updates
* XP increments
* AI responses working

---

# 🚧 FUTURE IMPROVEMENTS

* Real polling booth API integration
* Candidate comparison system
* Multilingual AI voice
* Mobile app version

---

# 🤝 Contributing

Pull requests are welcome!

---

# 📜 License

This project is for educational and hackathon purposes.
