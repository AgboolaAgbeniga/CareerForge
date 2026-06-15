import os
import logging
from psycopg_pool import AsyncConnectionPool
from psycopg.rows import dict_row
from .config import config

logger = logging.getLogger(__name__)

pool = None

async def get_pool() -> AsyncConnectionPool:
    global pool
    if pool is None:
        db_url = config.DATABASE_URL or os.getenv("DATABASE_URL")
        if not db_url:
            raise ValueError("DATABASE_URL environment variable is not set")
        pool = AsyncConnectionPool(
            conninfo=db_url,
            kwargs={"row_factory": dict_row},
            min_size=1,
            max_size=10,
            open=True,
        )
    return pool

async def fetch_one(query: str, *args):
    p = await get_pool()
    async with p.connection() as conn:
        async with conn.cursor() as cur:
            await cur.execute(query, args)
            return await cur.fetchone()

async def fetch_all(query: str, *args):
    p = await get_pool()
    async with p.connection() as conn:
        async with conn.cursor() as cur:
            await cur.execute(query, args)
            return await cur.fetchall()

async def get_candidate_profile(candidate_id: str):
    query = """
        SELECT u.first_name, u.last_name, j.title, j.experience_years, j.skills, r.parsed_data
        FROM users u
        JOIN job_seekers j ON u.id = j.id
        LEFT JOIN resumes r ON j.id = r.job_seeker_id AND r.is_active = true
        WHERE u.id = %s
    """
    return await fetch_one(query, candidate_id)

async def get_job_description(job_id: str):
    query = """
        SELECT title, description, requirements, responsibilities, skills_required, company_id
        FROM jobs
        WHERE id = %s
    """
    return await fetch_one(query, job_id)

async def get_company_details(company_id: str):
    query = """
        SELECT name, industry, description
        FROM companies
        WHERE id = %s
    """
    return await fetch_one(query, company_id)
