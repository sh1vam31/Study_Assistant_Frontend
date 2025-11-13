# 🎓 Smart Study Assistant

An AI-powered web app that helps students learn smarter by generating summaries, quiz questions, and study tips for any topic.

## ✨ Features

- 📚 Fetches real data from Wikipedia
- 🤖 AI-generated summaries and study materials
- ❓ Interactive MCQ quizzes with instant feedback
- 🧮 Math mode with quantitative questions
- 🌙 Dark mode support with smooth transitions
- ⚡ Fast and responsive UI
- 🎨 Beautiful animations and transitions
- 📖 Personal study history (MongoDB)
- 🔐 Secure authentication with JWT
- 💾 Database-backed persistence
- 🎯 Hover effects and micro-interactions
- 🔒 Password encryption with bcrypt
- 👤 Private user accounts

## 🛠️ Tech Stack

**Frontend:** React + Vite + TailwindCSS  
**Backend:** Node.js + Express  
**AI:** Google Gemini API (Free!)  
**Data Source:** Wikipedia REST API

## 📖 Documentation

👉 **[INDEX.md](INDEX.md)** - Complete documentation index

**Quick Links:**
- **[AUTHENTICATION_UPDATE.md](AUTHENTICATION_UPDATE.md)** - 🔐 NEW! Auth & MongoDB setup
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Database setup guide
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Start here! 3-minute setup guide
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Commands and shortcuts
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[DEMO_GUIDE.md](DEMO_GUIDE.md)** - Feature walkthrough
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production

## 🚀 Quick Start

### Backend Setup

**Prerequisites:** MongoDB (local or Atlas)

```bash
# Install MongoDB (macOS)
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Setup backend
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env and add:
# - GEMINI_API_KEY
# - MONGODB_URI
# - JWT_SECRET

npm run dev
```

Backend runs on `http://localhost:3001`

See **[MONGODB_SETUP.md](MONGODB_SETUP.md)** for detailed database setup.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📦 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set `OPENAI_API_KEY` environment variable
4. Deploy from `backend` directory

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set build directory to `frontend`
4. Set `VITE_API_URL` to your backend URL
5. Deploy

## 🔑 Environment Variables

**Backend (.env):**
```
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

### Get Free Gemini API Key:
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste into `.env` file

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001
```

## 📝 API Endpoint

`GET /study?topic=<topic>&mode=<normal|math>`

Returns JSON with summary, quiz questions, study tip, and optional math question.

## 🧪 Testing

```bash
cd backend
npm test
```

## 🎨 New Features

### Animations
- Smooth fade-in and slide-up effects
- Hover animations on all interactive elements
- Loading pulse animations
- Error shake effects

### Topic History
- Automatically saves your study topics
- View history with timestamps
- Quick access to previous topics
- Clear history option

### Authentication
- Login/Signup system
- Session persistence
- User profile display
- Demo mode (works without backend)

See [FEATURES.md](FEATURES.md) for detailed documentation.

## 📄 License

MIT
