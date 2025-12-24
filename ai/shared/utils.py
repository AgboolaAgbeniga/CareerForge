"""
Shared utilities for AI services
"""
import os
import time
import logging
from typing import Dict, Any, Optional, Callable, List
from functools import wraps
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from huggingface_hub import HfApi
from .config import config

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

class HuggingFaceAPIClient:
    """Client for Hugging Face Inference API"""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or config.HF_API_KEY
        self.base_url = "https://api-inference.huggingface.co/models"
        self.headers = {"Authorization": f"Bearer {self.api_key}"} if self.api_key else {}
        self.logger = get_logger(__name__)

    def _make_request(self, model: str, inputs: Any, parameters: Optional[Dict] = None) -> Dict[str, Any]:
        """Make a request to Hugging Face Inference API"""
        url = f"{self.base_url}/{model}"
        payload = {"inputs": inputs}
        if parameters:
            payload["parameters"] = parameters

        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.logger.error(f"HF API request failed: {e}")
            raise

    def text_generation(self, model: str, prompt: str, max_length: int = 100, temperature: float = 0.7) -> str:
        """Generate text using Hugging Face models"""
        try:
            result = self._make_request(model, prompt, {
                "max_length": max_length,
                "temperature": temperature,
                "do_sample": True
            })
            if isinstance(result, list) and result:
                return result[0].get("generated_text", "")
            return ""
        except Exception as e:
            self.logger.error(f"Text generation failed: {e}")
            return ""

    def text_classification(self, model: str, text: str) -> List[Dict[str, Any]]:
        """Classify text using Hugging Face models"""
        try:
            result = self._make_request(model, text)
            if isinstance(result, list) and result:
                return result[0] if isinstance(result[0], list) else result
            return []
        except Exception as e:
            self.logger.error(f"Text classification failed: {e}")
            return []

    def question_answering(self, model: str, question: str, context: str) -> Dict[str, Any]:
        """Answer questions using Hugging Face models"""
        try:
            result = self._make_request(model, {
                "question": question,
                "context": context
            })
            return result if isinstance(result, dict) else {}
        except Exception as e:
            self.logger.error(f"Question answering failed: {e}")
            return {}

    def get_embeddings(self, model: str, texts: List[str]) -> List[List[float]]:
        """Get embeddings for texts (if supported by model)"""
        try:
            result = self._make_request(model, texts)
            if isinstance(result, list):
                return [item.get("embedding", []) for item in result if isinstance(item, dict)]
            return []
        except Exception as e:
            self.logger.error(f"Embedding generation failed: {e}")
            return []

# Global HF API client instance
hf_client = HuggingFaceAPIClient()