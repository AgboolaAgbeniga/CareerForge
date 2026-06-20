import os
import sys
import asyncio
import pytest
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

os.environ['DATABASE_URL'] = 'postgresql://postgres:Jesuschrist%402@localhost:5432/careerforge'

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from career_coach.guided_builder import GuidedResumeBuilder

@pytest.mark.skipif(not os.getenv('DATABASE_URL'), reason='DATABASE_URL not set')
@pytest.mark.asyncio
async def test_guided_resume_builder_flow():
    from shared.db import fetch_one
    user_row = await fetch_one("SELECT id FROM users LIMIT 1")
    if not user_row:
        pytest.skip("No users in DB to run integration test")
        
    user_id = user_row["id"]
    builder = GuidedResumeBuilder()
    
    # 1. Create session
    session = await builder.create_session(
        user_id=user_id,
        target_role="Staff DevOps Engineer",
        experience_years=8,
        key_achievements="Migrated kubernetes clusters, cut cloud bill by 40%."
    )
    
    assert session["id"] is not None
    assert session["userId"] == user_id
    assert session["stage"] == 1
    assert len(session["contextData"]["questions"]) == 4
    
    session_id = session["id"]
    
    # 2. Stage 1 respond
    session = await builder.stage_1_gather_context(session_id, "Python and Go mostly.")
    session = await builder.stage_1_gather_context(session_id, "AWS and GCP.")
    session = await builder.stage_1_gather_context(session_id, "Managed a team of 4.")
    session = await builder.stage_1_gather_context(session_id, "CKA certified.")
    
    # After answering 4 questions, stage should advance to 2
    assert session["stage"] == 2
    assert session["currentSection"] == "summary"
    assert "summary" in session["draftSections"]
    
    # 3. Stage 2 respond with feedback
    session = await builder.stage_2_refine_sections(session_id, feedback="Make it more technical.")
    assert len(session["draftSections"]["summary"]["history"]) == 2
    
    # 4. Stage 2 approve summary
    session = await builder.stage_2_refine_sections(session_id, approve=True)
    assert session["draftSections"]["summary"]["approved"] is True
    assert session["currentSection"] == "skills"
    
    # 5. Approve skills, experience, and education to advance to stage 3
    session = await builder.stage_2_refine_sections(session_id, approve=True) # skills
    session = await builder.stage_2_refine_sections(session_id, approve=True) # experience
    session = await builder.stage_2_refine_sections(session_id, approve=True) # education
    
    assert session["stage"] == 3
    assert session["currentSection"] == "test"
    assert "ats_score" in session["readerTestResults"]
    
    # 6. Stage 3 finalize
    session = await builder.stage_3_reader_test(session_id, final_approvals=True)
    assert session["isCompleted"] is True
    
    # Clean up test session
    from shared.db import get_pool
    p = await get_pool()
    async with p.connection() as conn:
        async with conn.cursor() as cur:
            await cur.execute("DELETE FROM guided_builder_sessions WHERE id = %s", (session_id,))
