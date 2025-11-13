# Smart Study Assistant

An AI-powered web application that helps students learn more effectively by generating comprehensive study materials, interactive quizzes, and personalized learning tips for any topic.

**Live Demo:** [https://study-assistant-frontend.vercel.app/](https://study-assistant-frontend.vercel.app/)

---

## Overview

Smart Study Assistant transforms any topic into structured learning materials using artificial intelligence and real-time data from Wikipedia. The platform provides summaries, multiple-choice quizzes, study tips, and even solves math problems with step-by-step explanations.

---

## Key Features

### Learning Tools
- **AI-Generated Summaries**: Concise, structured summaries of any topic
- **Interactive Quizzes**: Multiple-choice questions with instant feedback
- **Study Tips**: Personalized learning recommendations
- **Math Solver**: Step-by-step solutions for mathematical problems
- **Wikipedia Integration**: Real-time data fetching from Wikipedia API

### User Experience
- **Authentication System**: Secure login and signup with JWT
- **Study History**: Automatic tracking of previously studied topics
- **Dark Mode**: Eye-friendly dark theme with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations

### Technical Features
- **Database Persistence**: MongoDB-backed user data storage
- **Password Security**: Bcrypt encryption for user credentials
- **Session Management**: Persistent authentication across sessions
- **API Integration**: RESTful backend communication
- **Error Handling**: Graceful fallbacks and user-friendly error messages

---

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### APIs & Services
- **Google Gemini API** - AI content generation
- **Wikipedia REST API** - Educational content source
- **JWT** - Secure authentication tokens
- **Bcrypt** - Password hashing

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Google Gemini API key (free tier available)

### Backend Setup

1. **Install MongoDB**
   ```bash
   # macOS
   brew install mongodb-community@7.0
   brew services start mongodb-community@7.0
   
   # Or use MongoDB Atlas (cloud)
   # Visit: https://www.mongodb.com/cloud/atlas
   ```

2. **Configure Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=mongodb://localhost:27017/study_assistant
   JWT_SECRET=your_secure_random_string_here
   PORT=3001
   NODE_ENV=development
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```
   
   Backend will run on `http://localhost:3001`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

### Obtaining API Keys

**Google Gemini API Key (Free)**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your backend `.env` file

---

## API Documentation

### Authentication Endpoints

**POST** `/auth/signup`
- Create a new user account
- Body: `{ email, password, name }`
- Returns: `{ user, token }`

**POST** `/auth/login`
- Authenticate existing user
- Body: `{ email, password }`
- Returns: `{ user, token }`

**GET** `/auth/me`
- Get current user information
- Headers: `Authorization: Bearer <token>`
- Returns: `{ user }`

### Study Endpoints

**GET** `/study?topic=<topic>&mode=<normal|math>`
- Generate study material for a topic
- Headers: `Authorization: Bearer <token>`
- Query Parameters:
  - `topic` (required): The subject to study
  - `mode` (optional): `normal` or `math` (default: `normal`)
- Returns:
  ```json
  {
    "topic": "Topic Name",
    "wikipediaUrl": "https://...",
    "summary": ["point 1", "point 2", "point 3"],
    "quiz": [
      {
        "question": "Question text",
        "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
        "correctAnswer": "A"
      }
    ],
    "studyTip": "Study tip text",
    "mathQuestion": {
      "question": "Math problem",
      "answer": "Solution",
      "explanation": "Step-by-step explanation"
    }
  }
  ```

**GET** `/study/history`
- Retrieve user's study history
- Headers: `Authorization: Bearer <token>`
- Returns: `{ history: [...] }`

**DELETE** `/study/history`
- Clear user's study history
- Headers: `Authorization: Bearer <token>`
- Returns: `{ message: "History cleared successfully" }`

---

**Current Deployment:**
- Frontend: [https://study-assistant-frontend.vercel.app/](https://study-assistant-frontend.vercel.app/)
- Backend: [https://study-assistant-backend.onrender.com](https://study-assistant-backend.onrender.com)

---

## Project Structure

```
smart-study-assistant/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── studyController.js   # Study material logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── StudyHistory.js      # History schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── study.js             # Study routes
│   ├── services/
│   │   ├── openaiService.js     # Gemini AI integration
│   │   ├── wikipediaService.js  # Wikipedia API
│   │   └── mathSolverService.js # Math problem solver
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AuthModal.jsx        # Login/Signup modal
    │   │   ├── SearchForm.jsx       # Topic search form
    │   │   ├── StudyContent.jsx     # Study material display
    │   │   ├── DarkModeToggle.jsx   # Theme switcher
    │   │   └── TopicHistory.jsx     # History sidebar
    │   ├── pages/
    │   │   ├── LandingPage.jsx      # Home page
    │   │   └── MainApp.jsx          # Main application
    │   ├── hooks/
    │   │   ├── useAuth.js           # Authentication hook
    │   │   └── useLocalStorage.js   # Storage hook
    │   ├── App.jsx                  # Root component
    │   ├── main.jsx                 # Entry point
    │   └── index.css                # Global styles
    ├── .env                         # Environment variables
    ├── vite.config.js               # Vite configuration
    └── package.json
```

---


**Built with passion for education and learning.**
