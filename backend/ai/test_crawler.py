import asyncio
import os
import json
from dotenv import load_dotenv
import os
from dotenv import load_dotenv

# Load env variables from backend directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

from scraper_engine.crawler import scrape_job_posting

async def test_scraper():
    print("Starting Crawl4AI Job Scraper Test...")
    url = "https://boards.greenhouse.io/canonical/jobs/5202868003"
    try:
        job_data = await scrape_job_posting(url)
        print("Success! Extracted Data:")
        print(json.dumps(job_data, indent=2))
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_scraper())
