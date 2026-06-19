from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
from .crawler import scrape_job_posting

logger = logging.getLogger(__name__)

scraper_router = APIRouter(prefix="/scraper", tags=["Scraping"])

class ScrapeRequest(BaseModel):
    url: str

class ScrapeResponse(BaseModel):
    success: bool
    data: dict | None = None
    error: str | None = None

@scraper_router.post("/job", response_model=ScrapeResponse)
async def scrape_job(request: ScrapeRequest):
    """
    Scrape a job posting URL and extract structured data using Crawl4AI.
    """
    try:
        logger.info(f"Received scrape request for URL: {request.url}")
        result = await scrape_job_posting(request.url)
        
        if "error" in result:
            return ScrapeResponse(success=False, error=result["error"])
            
        return ScrapeResponse(success=True, data=result)
    except Exception as e:
        logger.error(f"Scraping failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

async def init_scraper():
    """Initialization logic for the scraper engine"""
    logger.info("Scraper engine initialized. Crawl4AI is ready.")
