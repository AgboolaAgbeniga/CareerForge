"""
Shared configuration for AI services
"""
import os
from enum import Enum
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from the backend/.env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))


class AIProvider(str, Enum):
    """AI inference provider selection."""
    NVIDIA = "nvidia"       # NVIDIA NIM (production)
    HUGGINGFACE = "huggingface"  # HF Inference API (fallback)
    LOCAL = "local"         # Local models (dev only)
    AUTO = "auto"           # Auto-detect based on available API keys


class Config:
    """Configuration class for AI services"""

    # ─── AI Provider ────────────────────────────────────────────────────
    AI_PROVIDER = os.getenv("AI_PROVIDER", "auto")

    # ─── NVIDIA NIM Models ──────────────────────────────────────────────
    NVIDIA_API_KEY: Optional[str] = os.getenv("NVIDIA_API_KEY")
    NVIDIA_LLM_MODEL = os.getenv("NVIDIA_LLM_MODEL", "meta/llama-3.1-70b-instruct")
    NVIDIA_EMBEDDING_MODEL = os.getenv("NVIDIA_EMBEDDING_MODEL", "nvidia/nv-embedqa-e5-v5")
    NVIDIA_EMBEDDING_DIM = 1024  # nv-embedqa-e5-v5 output dimension

    # ─── Hugging Face Models (fallback) ─────────────────────────────────
    HF_API_KEY: Optional[str] = os.getenv("HF_API_KEY")
    NER_MODEL = "dslim/bert-base-NER"
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"
    EMBEDDING_DIM = 384  # MiniLM output dimension
    LAYOUT_MODEL = "microsoft/layoutparser"
    GENERATION_MODEL = "google/flan-t5-base"

    # ─── API Settings ───────────────────────────────────────────────────
    MAX_SEQUENCE_LENGTH = 512
    BATCH_SIZE = 16

    # ─── Service Ports ──────────────────────────────────────────────────
    RESUME_PARSER_PORT = int(os.getenv("RESUME_PARSER_PORT", "8000"))
    MATCHING_ENGINE_PORT = int(os.getenv("MATCHING_ENGINE_PORT", "8001"))
    CAREER_COACH_PORT = int(os.getenv("CAREER_COACH_PORT", "8002"))

    # ─── Performance ────────────────────────────────────────────────────
    MAX_WORKERS = int(os.getenv("MAX_WORKERS", "4"))
    TIMEOUT_SECONDS = 30

    # ─── Model Execution Preference ─────────────────────────────────────
    # If True, tries to load models locally (requires significant RAM/Disk).
    # If False, uses Hugging Face Inference API (recommended for low-memory environments like Render Free).
    # Default to API if a key is present, otherwise local.
    USE_API_MODELS = os.getenv("USE_API_MODELS", "true" if os.getenv("HF_API_KEY") else "false").lower() == "true"

    # ─── Cache ──────────────────────────────────────────────────────────
    CACHE_DIR = os.getenv("MODEL_CACHE_DIR", "./models")
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

    # ─── Database (pgvector) ────────────────────────────────────────────
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")

    # ─── Logging ────────────────────────────────────────────────────────
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

    @property
    def effective_provider(self) -> str:
        """Determine which provider to use based on config and available keys."""
        if self.AI_PROVIDER != "auto":
            return self.AI_PROVIDER
        if self.NVIDIA_API_KEY:
            return AIProvider.NVIDIA
        if self.HF_API_KEY:
            return AIProvider.HUGGINGFACE
        return AIProvider.LOCAL

    @property
    def embedding_dim(self) -> int:
        """Return the embedding dimension for the active provider."""
        if self.effective_provider == AIProvider.NVIDIA:
            return self.NVIDIA_EMBEDDING_DIM
        return self.EMBEDDING_DIM


config = Config()