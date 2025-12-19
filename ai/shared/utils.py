"""
Shared utilities for AI services
"""
import logging
import time
from typing import Dict, Any, Optional
from functools import wraps

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def get_logger(name: str) -> logging.Logger:
    """Get configured logger"""
    return logging.getLogger(name)

def timing_decorator(func):
    """Decorator to measure function execution time"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        logger = get_logger(func.__module__)
        logger.info(f"{func.__name__} took {end_time - start_time:.2f} seconds")
        return result
    return wrapper

def validate_text_input(text: str, max_length: int = 10000) -> str:
    """Validate and sanitize text input"""
    if not text or not isinstance(text, str):
        raise ValueError("Invalid text input")

    if len(text) > max_length:
        raise ValueError(f"Text too long (max {max_length} characters)")

    # Basic sanitization
    return text.strip()

def safe_model_call(func, fallback=None, max_retries: int = 3):
    """Safely call model functions with retry logic"""
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            logger = get_logger(__name__)
            logger.warning(f"Model call failed (attempt {attempt + 1}): {e}")
            if attempt == max_retries - 1:
                logger.error(f"Model call failed after {max_retries} attempts")
                return fallback
            time.sleep(0.5 * (2 ** attempt))  # Exponential backoff
    return fallback

class ModelCache:
    """Simple in-memory cache for model results"""
    def __init__(self, max_size: int = 1000):
        self.cache: Dict[str, Any] = {}
        self.max_size = max_size

    def get(self, key: str) -> Optional[Any]:
        return self.cache.get(key)

    def set(self, key: str, value: Any) -> None:
        if len(self.cache) >= self.max_size:
            # Simple LRU: remove oldest
            oldest_key = next(iter(self.cache))
            del self.cache[oldest_key]
        self.cache[key] = value

    def clear(self) -> None:
        self.cache.clear()

# Global cache instance
model_cache = ModelCache()