import os
import json
from pydantic import BaseModel, Field
import logging

logger = logging.getLogger(__name__)

class JobPostingSchema(BaseModel):
    title: str = Field(..., description="Job title")
    company_name: str = Field(..., description="Name of the company hiring")
    location: str = Field(..., description="Job location or remote status")
    employment_type: str = Field(..., description="Full-time, part-time, contract, etc.")
    description: str = Field(..., description="Full job description")
    requirements: list[str] = Field(default=[], description="List of required skills or qualifications")
    salary_range: str | None = Field(None, description="Salary range if mentioned")

async def scrape_job_posting(url: str) -> dict:
    from crawl4ai import AsyncWebCrawler
    from openai import AsyncOpenAI
    
    api_token = os.getenv("NVIDIA_API_KEY") or os.getenv("OPENAI_API_KEY")
    if not api_token:
        raise ValueError("NVIDIA_API_KEY or OPENAI_API_KEY is required")

    logger.info(f"Starting crawl for {url}")

    try:
        async with AsyncWebCrawler(verbose=True) as crawler:
            result = await crawler.arun(url=url, bypass_cache=True)
            if not result.markdown:
                logger.error("No markdown content extracted from crawler")
                return {"error": "Failed to extract content"}

            markdown_text = result.markdown

            # Use OpenAI client to extract structured data manually
            is_nvidia = bool(os.getenv("NVIDIA_API_KEY"))
            client = AsyncOpenAI(
                api_key=api_token,
                base_url="https://integrate.api.nvidia.com/v1" if is_nvidia else "https://api.openai.com/v1"
            )
            model = "meta/llama-3.1-70b-instruct" if is_nvidia else "gpt-4o-mini"

            prompt = f"""
Extract the following information from the job posting text below.
Return ONLY a valid JSON object matching this schema:
{JobPostingSchema.model_json_schema()}

Job Posting Text:
{markdown_text[:15000]}
            """

            response = await client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "You are a helpful data extraction assistant. You only output raw valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1
            )
            
            content = response.choices[0].message.content.strip()
            # Remove markdown JSON blocks if present
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]

            parsed = json.loads(content)
            if isinstance(parsed, list):
                logger.info("LLM returned a list of jobs. Selecting the first job.")
                parsed = parsed[0] if len(parsed) > 0 else {}
            return parsed
            
    except Exception as e:
        logger.error(f"Error scraping {url}: {str(e)}")
        return {"error": str(e)}
