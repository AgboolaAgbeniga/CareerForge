Based on the configuration, here are the default ports for running the services locally:

## 🚀 Service Ports

### Frontend (Next.js)
- **Port**: `3000`
- **Command**: `cd frontend && npm run dev`
- **URL**: `http://localhost:3000`

### Backend (Node.js/Express)
- **Port**: `5000` 
- **Command**: `cd backend && npm run dev`
- **URL**: `http://localhost:5000`
- **API Docs**: `http://localhost:5000/api-docs`

### AI Services (Python/FastAPI)

#### Resume Parser
- **Port**: `8000`
- **Command**: `cd ai/resume_parser && python app.py`
- **URL**: `http://localhost:8000`

#### Matching Engine  
- **Port**: `8001`
- **Command**: `cd ai/matching_engine && python app.py`
- **URL**: `http://localhost:8001`

#### Career Coach
- **Port**: `8002`
- **Command**: `cd ai/career_coach && python app.py`
- **URL**: `http://localhost:8002`

### Database
- **PostgreSQL**: `5432` (already running)

## 🏃‍♂️ Quick Start Commands

You can run these in separate terminals:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - AI Services (or run individually)
cd ai && docker-compose up -d
# OR run individually:
cd resume_parser && python app.py &
cd matching_engine && python app.py &
cd career_coach && python app.py &

# Terminal 3 - Frontend  
cd frontend && npm run dev
```

## ✅ Prerequisites Check

Make sure you have:
- ✅ PostgreSQL running with `careerforge` database
- ✅ Schema migrated and seeded
- ✅ Node.js dependencies installed (`npm install` in backend/frontend)
- ✅ Python dependencies installed in AI services
- ✅ Environment variables configured (optional for basic testing)

The system is ready for local testing! Let me know if you need help with any specific service startup or encounter issues.