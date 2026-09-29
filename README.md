# MemoryMeet AI

**MemoryMeet AI** is an AI-powered Meeting Prep & Relationship Agent that helps teams prepare for recurring client meetings by combining long-term client memory with AI-generated meeting preparation.

## 🚀 Live Application

**Web App:** https://memory-meet-ai.vercel.app/

**Backend API:** https://memorymeet-ai.onrender.com/

**API Documentation:** https://memorymeet-ai.onrender.com/docs

**GitHub:** https://github.com/jeevann9/MemoryMeet-AI

---

## 📌 Problem

In recurring client relationships, useful information is often spread across multiple meetings:

- Previous discussions
- Client interests
- Business concerns
- Stakeholders
- Competitors
- Pricing discussions
- Technical requirements
- Pending actions

Manually reviewing all of this information before every meeting can be time-consuming.

MemoryMeet AI keeps relevant client context in long-term memory and uses that context to generate a structured meeting brief.

---

## 💡 Solution

MemoryMeet AI provides a simple workflow:

1. Enter the current meeting information.
2. Save the meeting through the web dashboard.
3. Store the meeting information in Hindsight memory.
4. Recall relevant information from previous client meetings.
5. Combine previous context with the current meeting.
6. Generate an AI-powered meeting brief.
7. Display the preparation brief in the frontend.

### Core Flow

```text
Meeting Information
        ↓
Next.js Frontend
        ↓
FastAPI Backend
        ↓
Hindsight Memory
   ↙          ↘
Retain       Recall
        ↓
AI Agent / Groq
        ↓
Structured Meeting Brief
        ↓
Frontend Dashboard
```

---

## ✨ Features

### 🧠 Long-Term Client Memory
Stores meeting information in Hindsight so relevant context can be recalled in future meetings.

### 🔎 Client-Specific Recall
Memory retrieval is scoped using the client context, helping the system focus on relevant previous discussions.

### 🤖 AI Meeting Preparation
The AI agent uses recalled memories together with the current meeting context to create a personalized preparation brief.

### 📋 Structured Meeting Brief
The generated brief contains:

- Client Overview
- Previous Interests
- Key Concerns
- Important Stakeholders
- Competitors
- Talking Points
- Questions to Ask
- Suggested Next Steps

### 🌐 Web Dashboard
The frontend provides a simple interface for:

- Selecting a client
- Entering meeting information
- Saving meetings
- Viewing meeting history
- Recalling client memories
- Generating an AI meeting brief

### 🔐 Backend Credential Protection
Hindsight and Groq credentials remain on the backend. The frontend communicates with the FastAPI API instead of directly exposing service credentials.

---

## 🏗️ Architecture

```text
┌───────────────────────────┐
│      Next.js Frontend     │
│                           │
│ Meeting Dashboard         │
│ Meeting History           │
│ AI Meeting Brief          │
└─────────────┬─────────────┘
              │ HTTP / JSON
              ▼
┌───────────────────────────┐
│      FastAPI Backend      │
│                           │
│ API Routes                │
│ Meeting Services          │
│ Preparation Service       │
└───────┬───────────┬───────┘
        │           │
        ▼           ▼
┌────────────┐  ┌──────────────┐
│ Hindsight  │  │ AI Agent /   │
│ Memory     │  │ Groq         │
└────────────┘  └──────────────┘
        │           │
        └─────┬─────┘
              ▼
      Personalized Meeting
             Brief
```

---

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- Pydantic
- Uvicorn
- python-dotenv

### AI & Memory
- Hindsight
- Groq

### Deployment
- Vercel — frontend
- Render — backend

---

## 📂 Project Structure

```text
MemoryMeet-AI/
│
├── backend/
│   ├── agent/
│   │   ├── __init__.py
│   │   └── meeting_agent.py
│   │
│   ├── models/
│   │   └── meeting.py
│   │
│   ├── services/
│   │   ├── hindsight_service.py
│   │   ├── meeting_service.py
│   │   └── preparation_service.py
│   │
│   ├── main.py
│   ├── .gitignore
│   └── README.md
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🔌 Backend API

The backend is built with FastAPI.

## `GET /health`

Checks whether the backend is running.

### Response

```json
{
  "status": "ok"
}
```

---

## `POST /meetings`

Saves a meeting and sends the meeting information to Hindsight for long-term memory.

### Example Request

```json
{
  "client": "ABC Technologies",
  "meeting_date": "2026-09-28",
  "participants": [
    "Sarah",
    "David"
  ],
  "notes": "Client wants a detailed technical proposal. They are comparing our cloud migration pricing with CloudX and want to understand the implementation timeline."
}
```

---

## `GET /meetings`

Returns meetings stored by the backend.

---

## `POST /meetings/recall`

Recalls relevant information about a client from Hindsight.

### Example Request

```json
{
  "client": "ABC Technologies",
  "query": "security and pricing"
}
```

---

## `POST /meetings/prepare`

Generates an AI-powered meeting preparation brief.

### Example Request

```json
{
  "client": "ABC Technologies",
  "query": "Prepare me for the upcoming client meeting"
}
```

The backend:

1. Recalls relevant Hindsight memories.
2. Combines the memories with the current meeting context.
3. Sends the context to the AI agent.
4. Generates a structured meeting brief.
5. Returns the result to the frontend.

---

# 🧠 Memory Layer

Hindsight is used as the long-term memory layer.

### Retain

When a meeting is saved, the backend stores information such as:

- Client
- Meeting date
- Participants
- Meeting notes

### Recall

Before preparing for a meeting, the backend queries Hindsight using the client and the requested topic.

This allows the system to retrieve information from previous interactions instead of treating every meeting as a completely new conversation.

---

# 🤖 AI Agent

The AI agent receives:

- Current meeting context
- Relevant recalled memories

It then generates structured meeting preparation.

The agent is instructed to use the available meeting information and recalled memory rather than inventing unsupported client facts.

---

# 🖥️ Frontend

The frontend is a Next.js application that communicates with the FastAPI backend using HTTP requests.

The dashboard supports:

- Meeting setup
- Client selection
- Meeting date
- Participants
- Meeting notes
- Saving meetings
- Meeting history
- Client memory recall
- AI meeting preparation

The resulting meeting brief is presented as separate sections so that users can quickly review the most important information before a meeting.

---

# ⚙️ Local Setup

## Prerequisites

Install:

- Python
- Node.js
- npm

You also need credentials for:

- Hindsight
- Groq

---

## 1. Clone the Repository

```bash
git clone https://github.com/jeevann9/MemoryMeet-AI.git
cd MemoryMeet-AI
```

---

## 2. Backend Setup

Open a terminal:

```cmd
cd backend
python -m venv venv
venv\Scripts\activate.bat
```

Install dependencies:

```cmd
pip install fastapi uvicorn hindsight-client python-dotenv groq
```

Create a `.env` file inside `backend`:

```env
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_API_URL=your_hindsight_api_url
HINDSIGHT_BANK_ID=your_hindsight_bank_id
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```cmd
python -m uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

Open another terminal:

```cmd
cd frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

For local development, configure the frontend API URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

For the deployed application:

```env
NEXT_PUBLIC_API_BASE_URL=https://memorymeet-ai.onrender.com
```

---

# 🔐 Environment Variables

Never commit API keys or `.env` files to GitHub.

Example:

```env
HINDSIGHT_API_KEY=your_key
HINDSIGHT_API_URL=your_url
HINDSIGHT_BANK_ID=your_bank_id
GROQ_API_KEY=your_key
```

The repository should keep `.env` ignored through `.gitignore`.

---

# 🧪 Example Workflow

Consider a client called **ABC Technologies**.

### Meeting 1

The client discusses:

- Cloud migration
- Scalability
- Infrastructure costs
- Security concerns

The meeting is saved to Hindsight.

### Meeting 2

The client discusses:

- Migration pricing
- CloudX comparison
- Security requirements

The new meeting is also retained.

### Meeting Preparation

Before another meeting, the system recalls the relevant client history.

The AI agent can then prepare information such as:

- Previous interests
- Key concerns
- Important stakeholders
- Competitors
- Talking points
- Questions to ask
- Suggested next steps

This creates continuity between meetings.

---

# 🛡️ Security Considerations

- API credentials are stored in environment variables.
- `.env` files should not be committed to the repository.
- Hindsight and Groq credentials are kept on the backend.
- The frontend communicates with backend API endpoints instead of directly accessing private service credentials.
- Client memory is queried using client-specific context.

---

# 📈 Current Scope

The current application focuses on:

- Manual meeting information input
- Long-term client memory
- Client-specific memory recall
- AI-powered meeting preparation
- Web-based dashboard
- FastAPI backend
- Deployed frontend and backend

---

# 🔮 Future Improvements

Possible future enhancements include:

- Meeting recording upload
- Audio/video transcription
- Zoom integration
- Google Meet integration
- Persistent application database
- User authentication
- Advanced memory filtering and ranking
- Automated test suite
- More detailed analytics
- Calendar integration
- Meeting reminders

---

# 👥 Team Contributions

The project is organized across multiple areas:

- **AI Agent:** AI workflow, prompts, and meeting brief generation
- **Memory:** Hindsight setup, memory retention, and recall
- **Backend:** Python, FastAPI, API development, Hindsight integration, error handling, and frontend-backend integration
- **Frontend:** Dashboard and user interface
- **Data & Testing:** Test scenarios, validation, and result verification
- **Integration & Documentation:** Project integration, documentation, repository management, and presentation materials

---

# 📄 License

This project is intended for learning, demonstration, and development purposes.
