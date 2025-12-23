# CareerForge

**CareerForge** is a comprehensive, AI-powered career management platform designed to empower job seekers with intelligent tools for resume analysis, job matching, and personalized career coaching. By leveraging advanced AI models and a robust full-stack architecture, CareerForge bridges the gap between candidates and their dream careers.

## Key Features

- **📄 AI Resume Parsing**: Automatically extracts and structures data from uploaded resumes using advanced NLP.
- **🎯 Intelligent Job Matching**: Matches candidates to job openings with a scoring engine based on skills and experience.
- **🤖 AI Career Coach**: A persistent, context-aware chat assistant for personalized career advice and interview prep.
- **⚡ Real-time Updates**: Live notifications and status updates powered by Socket.io.
- **🔐 Secure Authentication**: Robust user management with JWT-based authentication and security best practices.

## Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **State/Communication**: Socket.io-client, Axios

### Backend
- **Runtime**: Node.js
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Caching**: Redis
- **Security**: Helmet, Speakeasy (2FA), BCrypt

### AI Services
- **Language**: Python
- **Libraries**: Hugging Face Transformers, PyTorch/TensorFlow (implied)
- **Integration**: REST APIs to communicate with the main backend

## Project Structure

```bash
CareerForge/
├── ai/                 # Python-based AI microservices
│   ├── career_coach/   # AI Career Coach service
│   ├── matching_engine/# Job matching logic
│   ├── resume_parser/  # Resume parsing service
│   └── shared/         # Shared AI utilities
├── backend/            # Express.js API Server
│   ├── src/
│   │   ├── api/        # API Routes and Controllers
│   │   ├── middleware/ # Custom middleware (Auth, Error handling)
│   │   ├── models/     # Database schemas
│   │   └── services/   # Business logic
│   └── package.json
├── frontend/           # Next.js Web Application
│   ├── app/            # App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions
│   └── public/         # Static assets
└── infra/              # Infrastructure configuration (Docker, etc.)
```

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **PostgreSQL**
- **Redis**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/CareerForge.git
    cd CareerForge
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create a .env file based on .env.example
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    # Create a .env.local file
    npm run dev
    ```

4.  **AI Services Setup**
    ```bash
    cd ../ai/resume_parser # (or other service)
    python -m venv venv
    source venv/bin/activate # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    python app.py
    ```

## Environment Variables

Ensure you have the following environment variables configured in your `.env` files:

**Backend (`backend/.env`)**
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `PORT`

**Frontend (`frontend/.env.local`)**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SOCKET_URL`

## License

[MIT](LICENSE)
