"""
NVIDIA NIM Client with Hugging Face Inference API Fallback.

Uses the OpenAI-compatible NVIDIA API for production-grade inference,
with automatic fallback to HF Inference API when NVIDIA is unavailable.
"""
import os
import logging
import json
from typing import Optional, Any

logger = logging.getLogger(__name__)


class NvidiaClient:
    """
    Unified AI client that routes requests through NVIDIA NIM (primary)
    with HF Inference API as fallback.
    """

    def __init__(self):
        self.nvidia_api_key = os.getenv("NVIDIA_API_KEY")
        self.hf_api_key = os.getenv("HF_API_KEY")
        self.nvidia_base_url = "https://integrate.api.nvidia.com/v1"
        self.hf_base_url = "https://api-inference.huggingface.co"

        # Model mappings
        self.nvidia_llm = os.getenv("NVIDIA_LLM_MODEL", "nvidia/llama-3.1-nemotron-70b-instruct")
        self.nvidia_embedding = os.getenv("NVIDIA_EMBEDDING_MODEL", "nvidia/nv-embedqa-e5-v5")

        # Determine primary provider
        self.provider = os.getenv("AI_PROVIDER", "auto")
        if self.provider == "auto":
            if self.nvidia_api_key:
                self.provider = "nvidia"
            elif self.hf_api_key:
                self.provider = "huggingface"
            else:
                self.provider = "mock"
                logger.warning("No AI API keys configured — using mock responses")

        self._openai_client = None
        self._init_clients()

    def _init_clients(self):
        """Initialize API clients based on available keys."""
        if self.nvidia_api_key:
            try:
                from openai import OpenAI
                self._openai_client = OpenAI(
                    base_url=self.nvidia_base_url,
                    api_key=self.nvidia_api_key,
                )
                logger.info("NVIDIA NIM client initialized")
            except ImportError:
                logger.warning("openai package not installed — NVIDIA NIM unavailable")
            except Exception as e:
                logger.warning(f"Failed to initialize NVIDIA client: {e}")

    async def generate(
        self,
        prompt: str,
        system_prompt: str = "You are a helpful career assistant.",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        response_format: Optional[str] = None,
    ) -> str:
        """
        Generate text using NVIDIA NIM with HF fallback.

        Args:
            prompt: User prompt
            system_prompt: System instruction
            temperature: Sampling temperature
            max_tokens: Maximum output tokens
            response_format: If "json", request JSON output

        Returns:
            Generated text string
        """
        if self.provider == "nvidia" and self._openai_client:
            try:
                return await self._nvidia_generate(
                    prompt, system_prompt, temperature, max_tokens, response_format
                )
            except Exception as e:
                logger.warning(f"NVIDIA NIM failed ({e}), falling back to HF")

        if self.hf_api_key:
            try:
                return await self._hf_generate(prompt, system_prompt, max_tokens)
            except Exception as e:
                logger.warning(f"HF Inference API failed ({e}), using mock")

        return self._mock_generate(prompt)

    async def generate_embedding(self, text: str) -> list[float]:
        """
        Generate embedding vector using NVIDIA NIM with HF fallback.

        Returns:
            List of floats (1024-dim for NVIDIA, 384-dim for HF)
        """
        if self.provider == "nvidia" and self._openai_client:
            try:
                return await self._nvidia_embedding(text)
            except Exception as e:
                logger.warning(f"NVIDIA embedding failed ({e}), falling back to HF")

        if self.hf_api_key:
            try:
                return await self._hf_embedding(text)
            except Exception as e:
                logger.warning(f"HF embedding failed ({e}), using zero vector")

        # Return zero vector as last resort
        return [0.0] * 1024

    async def generate_structured(
        self,
        prompt: str,
        system_prompt: str = "You are a JSON-only assistant. Always respond with valid JSON.",
        temperature: float = 0.3,
        max_tokens: int = 4096,
    ) -> dict:
        """
        Generate structured JSON output.

        Returns:
            Parsed JSON dict
        """
        result = await self.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            response_format="json",
        )

        try:
            # Try to extract JSON from the response
            result = result.strip()
            if result.startswith("```json"):
                result = result[7:]
            if result.startswith("```"):
                result = result[3:]
            if result.endswith("```"):
                result = result[:-3]
            return json.loads(result.strip())
        except json.JSONDecodeError:
            logger.error(f"Failed to parse JSON from AI response: {result[:200]}")
            return {}

    # ─── Private Provider Implementations ───────────────────────────────

    async def _nvidia_generate(
        self,
        prompt: str,
        system_prompt: str,
        temperature: float,
        max_tokens: int,
        response_format: Optional[str],
    ) -> str:
        """Generate using NVIDIA NIM (OpenAI-compatible API)."""
        import asyncio

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ]

        kwargs: dict[str, Any] = {
            "model": self.nvidia_llm,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        if response_format == "json":
            kwargs["response_format"] = {"type": "json_object"}

        # Run sync OpenAI client in executor to not block event loop
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: self._openai_client.chat.completions.create(**kwargs),
        )

        return response.choices[0].message.content or ""

    async def _nvidia_embedding(self, text: str) -> list[float]:
        """Generate embedding using NVIDIA NIM."""
        import asyncio

        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: self._openai_client.embeddings.create(
                model=self.nvidia_embedding,
                input=text,
                encoding_format="float",
            ),
        )

        return response.data[0].embedding

    async def _hf_generate(self, prompt: str, system_prompt: str, max_tokens: int) -> str:
        """Generate using Hugging Face Inference API."""
        import httpx

        model = "google/flan-t5-base"
        url = f"{self.hf_base_url}/models/{model}"

        full_prompt = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                url,
                headers={"Authorization": f"Bearer {self.hf_api_key}"},
                json={
                    "inputs": full_prompt,
                    "parameters": {
                        "max_new_tokens": min(max_tokens, 512),
                        "temperature": 0.7,
                    },
                },
            )

            if response.status_code != 200:
                raise Exception(f"HF API returned {response.status_code}: {response.text}")

            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get("generated_text", "")
            return str(result)

    async def _hf_embedding(self, text: str) -> list[float]:
        """Generate embedding using Hugging Face Inference API."""
        import httpx

        model = "sentence-transformers/all-MiniLM-L6-v2"
        url = f"{self.hf_base_url}/models/{model}"

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                url,
                headers={"Authorization": f"Bearer {self.hf_api_key}"},
                json={"inputs": text},
            )

            if response.status_code != 200:
                raise Exception(f"HF Embedding API returned {response.status_code}")

            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                if isinstance(result[0], list):
                    return result[0]
                return result
            return [0.0] * 384

    def _mock_generate(self, prompt: str) -> str:
        """Return mock response when no API keys are configured."""
        logger.warning("Using mock AI response — configure NVIDIA_API_KEY or HF_API_KEY")
        
        # If it looks like a resume parsing prompt, return a rich mock resume
        if "resume" in prompt.lower() or "extract" in prompt.lower() or "skills" in prompt.lower():
            return json.dumps({
                "name": "Emmanuel Agboola",
                "email": "emmanuel@example.com",
                "phone": "+44 7123 456789",
                "location": "London, UK",
                "skills": ["React", "Next.js", "TypeScript", "Node.js", "Python", "UI/UX Design"],
                "experience": [
                    {
                        "title": "Senior Frontend Engineer",
                        "company": "TechNova Solutions",
                        "location": "London",
                        "start_date": "2021-06",
                        "end_date": "Present",
                        "description": "Led the migration of legacy Angular app to Next.js. Improved performance by 40%."
                    },
                    {
                        "title": "Frontend Developer",
                        "company": "Creative Digital",
                        "location": "Remote",
                        "start_date": "2019-01",
                        "end_date": "2021-05",
                        "description": "Developed dynamic interfaces using React and Tailwind CSS."
                    }
                ],
                "education": [
                    {
                        "degree": "BSc Computer Science",
                        "institution": "University of Manchester",
                        "year": "2018"
                    }
                ],
                "summary": "Experienced Frontend Engineer with a passion for building pixel-perfect, performant web applications.",
                "certifications": ["AWS Certified Developer"],
                "languages": ["English", "French"]
            })
            
        return json.dumps({
            "response": "AI service is not configured. Please set NVIDIA_API_KEY or HF_API_KEY.",
            "mock": True,
        })


# Singleton instance
nvidia_client = NvidiaClient()
