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

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Initialize all AI services
    await init_parser()
    await init_matcher()
    await init_coach()
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
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume_router)
app.include_router(matching_router)
app.include_router(career_router)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "combined-ai"}

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )