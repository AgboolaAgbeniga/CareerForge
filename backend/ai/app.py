"""
Combined AI Services Application
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import routers and init functions
from resume_parser.app import resume_router, init_parser
from matching_engine.app import matching_router, init_matcher
from career_coach.app import career_router, init_coach
from recruiter_intelligence.app import recruiter_router, init_recruiter
from shared.agent_router import agent_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Initialize all AI services
    await init_parser()
    await init_matcher()
    await init_coach()
    await init_recruiter()
    yield

app = FastAPI(
    title="CareerForge AI Services",
    description="Combined AI microservices for resume parsing, job matching, and career coaching",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development
        "https://localhost:3000",  # Development HTTPS
        "https://career-forge-rho.vercel.app"  # Production (no trailing slash)
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume_router)
app.include_router(matching_router)
app.include_router(career_router)
app.include_router(recruiter_router)
app.include_router(agent_router)

# Vector (pgvector) router (optional)
from vector.router import router as vector_router
app.include_router(vector_router)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "combined-ai"}

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=port,
        reload=True if os.environ.get("DEBUG") else False,
        log_level="info"
    )