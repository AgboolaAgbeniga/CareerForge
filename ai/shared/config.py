"""
Shared configuration for AI services
"""
import os
from typing import Optional

class Config:
    """Configuration class for AI services"""

    # Model configurations
    NER_MODEL = "dslim/bert-base-NER"
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"
    LAYOUT_MODEL = "microsoft/layoutparser"
    GENERATION_MODEL = "google/flan-t5-base"

    # API settings
    HF_API_KEY: Optional[str] = os.getenv("HF_API_KEY")
    MAX_SEQUENCE_LENGTH = 512
    BATCH_SIZE = 16

    # Service ports
    RESUME_PARSER_PORT = int(os.getenv("RESUME_PARSER_PORT", "8000"))
    MATCHING_ENGINE_PORT = int(os.getenv("MATCHING_ENGINE_PORT", "8001"))
    CAREER_COACH_PORT = int(os.getenv("CAREER_COACH_PORT", "8002"))

    # Performance settings
    MAX_WORKERS = int(os.getenv("MAX_WORKERS", "4"))
    TIMEOUT_SECONDS = 30

    # Cache settings
    CACHE_DIR = os.getenv("MODEL_CACHE_DIR", "./models")
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

    # Logging
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

config = Config()