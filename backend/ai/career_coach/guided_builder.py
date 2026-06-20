import json
import logging
from typing import Dict, List, Any, Optional
from shared.nvidia_client import nvidia_client
from shared.db import fetch_one, fetch_all

logger = logging.getLogger(__name__)

class GuidedResumeBuilder:
    """3-stage guided resume building workflow."""

    async def create_session(self, user_id: str, target_role: str, experience_years: int, key_achievements: str) -> Dict[str, Any]:
        """Create a new guided builder session in the DB."""
        context_data = {
            "target_role": target_role,
            "experience_years": experience_years,
            "key_achievements": key_achievements,
            "current_question_index": 0,
            "questions": [],
            "answers": []
        }
        
        # Generate initial questions
        questions = await self._generate_clarifying_questions(target_role, experience_years, key_achievements)
        context_data["questions"] = questions
        
        query = """
            INSERT INTO guided_builder_sessions (user_id, stage, current_section, context_data, draft_sections, reader_test_results, is_completed)
            VALUES (%s, 1, 'summary', %s, '{}', '{}', false)
            RETURNING id, user_id, stage, current_section, context_data, draft_sections, reader_test_results, is_completed, created_at, updated_at
        """
        row = await fetch_one(query, user_id, json.dumps(context_data))
        return self._normalize_row(row)

    async def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a session by its ID."""
        query = """
            SELECT id, user_id, stage, current_section, context_data, draft_sections, reader_test_results, is_completed, created_at, updated_at
            FROM guided_builder_sessions
            WHERE id = %s
        """
        row = await fetch_one(query, session_id)
        if not row:
            return None
        return self._normalize_row(row)

    async def list_user_sessions(self, user_id: str) -> List[Dict[str, Any]]:
        """List all sessions for a specific user."""
        query = """
            SELECT id, user_id, stage, current_section, context_data, draft_sections, reader_test_results, is_completed, created_at, updated_at
            FROM guided_builder_sessions
            WHERE user_id = %s
            ORDER BY updated_at DESC
        """
        rows = await fetch_all(query, user_id)
        return [self._normalize_row(r) for r in rows]

    async def update_session(self, session_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """Update fields in the session."""
        set_parts = []
        params = []
        for key, val in updates.items():
            db_key = self._to_snake_case(key)
            set_parts.append(f"{db_key} = %s")
            if isinstance(val, (dict, list)):
                params.append(json.dumps(val))
            else:
                params.append(val)
        
        params.append(session_id)
        query = f"""
            UPDATE guided_builder_sessions
            SET {", ".join(set_parts)}, updated_at = NOW()
            WHERE id = %s
            RETURNING id, user_id, stage, current_section, context_data, draft_sections, reader_test_results, is_completed, created_at, updated_at
        """
        row = await fetch_one(query, *params)
        return self._normalize_row(row)

    async def stage_1_gather_context(self, session_id: str, answer: str) -> Dict[str, Any]:
        """Answer questions in Stage 1. Once all answered, move to Stage 2."""
        session = await self.get_session(session_id)
        if not session:
            raise ValueError("Session not found")
            
        context = session["contextData"] or {}
        curr_idx = context.get("current_question_index", 0)
        questions = context.get("questions", [])
        answers = context.get("answers", [])
        
        # Save answer
        if curr_idx < len(questions):
            answers.append({
                "question": questions[curr_idx],
                "answer": answer
            })
            context["answers"] = answers
            context["current_question_index"] = curr_idx + 1
            
        updates = {"context_data": context}
        if context["current_question_index"] >= len(questions):
            # Transition to Stage 2
            updates["stage"] = 2
            updates["current_section"] = "summary"
            # Generate the first draft of the first section (summary)
            draft_sections = session["draftSections"] or {}
            summary_draft = await self._generate_section_proposal(context, "summary", draft_sections)
            draft_sections["summary"] = {
                "content": summary_draft,
                "approved": False,
                "history": [summary_draft]
            }
            updates["draft_sections"] = draft_sections
            
        return await self.update_session(session_id, updates)

    async def stage_2_refine_sections(self, session_id: str, feedback: Optional[str] = None, approve: bool = False) -> Dict[str, Any]:
        """Build section-by-section drafts in Stage 2. Once all approved, move to Stage 3."""
        session = await self.get_session(session_id)
        if not session:
            raise ValueError("Session not found")
            
        section = session["currentSection"]
        draft_sections = session["draftSections"] or {}
        
        if approve:
            # Approve current section
            if section in draft_sections:
                draft_sections[section]["approved"] = True
                
            # Move to next section
            sections_sequence = ["summary", "skills", "experience", "education"]
            curr_sec_idx = sections_sequence.index(section)
            
            updates = {"draft_sections": draft_sections}
            if curr_sec_idx + 1 < len(sections_sequence):
                next_section = sections_sequence[curr_sec_idx + 1]
                updates["current_section"] = next_section
                
                # Generate proposal for next section
                proposal = await self._generate_section_proposal(session["contextData"], next_section, draft_sections)
                draft_sections[next_section] = {
                    "content": proposal,
                    "approved": False,
                    "history": [proposal]
                }
                updates["draft_sections"] = draft_sections
            else:
                # Transition to Stage 3: Reader Test / ATS analysis
                updates["stage"] = 3
                # Prepare resume draft document text
                resume_draft_text = self._compile_resume_text(draft_sections)
                test_results = await self._run_reader_test(session["contextData"], resume_draft_text)
                updates["reader_test_results"] = test_results
                updates["current_section"] = "test"
                
            return await self.update_session(session_id, updates)
            
        elif feedback:
            # User gave feedback, regenerate section
            current_content = draft_sections.get(section, {}).get("content", "")
            regenerated = await self._regenerate_section_with_feedback(
                session["contextData"], 
                section, 
                current_content, 
                feedback,
                draft_sections
            )
            draft_sections[section]["content"] = regenerated
            draft_sections[section]["history"].append(regenerated)
            
            return await self.update_session(session_id, {"draft_sections": draft_sections})
            
        return session

    async def stage_3_reader_test(self, session_id: str, final_approvals: bool = False) -> Dict[str, Any]:
        """Complete the resume building in Stage 3."""
        if final_approvals:
            return await self.update_session(session_id, {"is_completed": True})
        return await self.get_session(session_id)

    # ─── Helper AI Prompts ───────────────────────────────

    async def _generate_clarifying_questions(self, role: str, exp_years: int, achievements: str) -> List[str]:
        """Generate 3-5 clarifying questions based on user's target role."""
        prompt = f"""
        You are an expert executive resume writer. A candidate wants to create an optimized resume for the target role: "{role}" with {exp_years} years of experience.
        Here are some initial highlights they provided:
        "{achievements}"

        Generate exactly 4 highly targeted clarifying questions that will help fill in the gaps needed to construct a world-class professional resume. Focus on quantifiable metrics, specific technologies, and scope of responsibilities.
        Respond with a JSON object containing a "questions" key with a list of exactly 4 strings. Keep the questions short and practical.
        """
        system = "You are a JSON-only resume expert. Always return valid JSON."
        res = await nvidia_client.generate_structured(prompt, system, temperature=0.3)
        return res.get("questions", [
            f"What specific tools or languages did you use most as a {role}?",
            "Can you quantify any key metrics or achievements in your experience?",
            "What was the size of the team or projects you managed?",
            "Are there any specific certifications or education you'd like to highlight?"
        ])

    async def _generate_section_proposal(self, context: Dict[str, Any], section: str, current_drafts: Dict[str, Any]) -> Any:
        """Generate first proposal for a resume section based on gathered context."""
        context_summary = f"""
        Target Role: {context.get('target_role')}
        Years of Experience: {context.get('experience_years')}
        Initial Highlights: {context.get('key_achievements')}
        Q&A Context:
        """
        for qa in context.get("answers", []):
            context_summary += f"Question: {qa.get('question')}\nAnswer: {qa.get('answer')}\n\n"
            
        system = "You are an expert resume writer. Generate highly professional resume content."
        
        if section == "summary":
            prompt = f"""
            {context_summary}
            Based on the context above, write a compelling, professional resume Summary statement for the target role of {context.get('target_role')}.
            Keep it to 3-4 sentences. Focus on value proposition, key competencies, and career path alignment.
            Return only the text of the summary.
            """
            return await nvidia_client.generate(prompt, system, temperature=0.4)
            
        elif section == "skills":
            prompt = f"""
            {context_summary}
            Based on the context, list the top 10-15 relevant skills for the target role of {context.get('target_role')}.
            Group them into 2-3 logical categories (e.g. Core Tech, Methodologies, Tools).
            Respond with a JSON object containing categories and their list of skills. E.g.:
            {{
              "Technical Skills": ["Python", "FastAPI"],
              "Soft Skills": ["Team Leadership"]
            }}
            """
            res = await nvidia_client.generate_structured(prompt, "You are a JSON-only assistant.", temperature=0.2)
            return res if res else {"Skills": []}
            
        elif section == "experience":
            prompt = f"""
            {context_summary}
            Based on the context, write a professional work experience entry (bullet points) for their most recent role.
            Generate 3-5 high-impact, accomplishment-focused bullet points using the STAR method (Situation, Task, Action, Result).
            Include placeholder company, dates, and title if not specified, but make the accomplishments highly realistic and aligned with the role.
            Ensure metrics are included where possible.
            Return only the text of the experience entry (with markdown bullet points).
            """
            return await nvidia_client.generate(prompt, system, temperature=0.4)
            
        elif section == "education":
            prompt = f"""
            {context_summary}
            Format a realistic or context-based Education and Certifications section.
            Return only the markdown formatting of the degree, institution, and certifications.
            """
            return await nvidia_client.generate(prompt, system, temperature=0.3)
            
        return ""

    async def _regenerate_section_with_feedback(self, context: Dict[str, Any], section: str, current_content: Any, feedback: str, drafts: Dict[str, Any]) -> Any:
        """Regenerate a resume section incorporating user feedback."""
        system = "You are an expert resume editor. Modify the content precisely based on the feedback."
        
        if isinstance(current_content, dict):
            current_str = json.dumps(current_content)
            prompt = f"""
            Current skills content:
            {current_str}
            
            Feedback to apply:
            "{feedback}"
            
            Modify the JSON skills categories and items based on this feedback. Keep the JSON structure.
            """
            return await nvidia_client.generate_structured(prompt, "You are a JSON-only assistant.", temperature=0.3)
        else:
            prompt = f"""
            Current section content ({section}):
            {current_content}
            
            Feedback to apply:
            "{feedback}"
            
            Re-write the section content incorporating this feedback. Keep it highly professional and concise.
            """
            return await nvidia_client.generate(prompt, system, temperature=0.4)

    async def _run_reader_test(self, context: Dict[str, Any], resume_text: str) -> Dict[str, Any]:
        """Perform a simulated ATS/Recruiter first impression test on the resume draft."""
        prompt = f"""
        You are a hiring manager reviewing a resume for the target role: "{context.get('target_role')}".
        Here is the resume content:
        ---
        {resume_text}
        ---

        Perform an ATS & Recruiter evaluation of this resume.
        Determine:
        1. ATS score (integer between 0 and 100).
        2. Strengths: 3 key highlights that make this resume strong.
        3. Gaps: 3-4 blind spots or missing details (e.g. keywords, metrics).
        4. Recommendations: Actionable next steps to improve it.

        Respond with a JSON object structured exactly like this:
        {{
          "ats_score": 85,
          "strengths": ["...", "..."],
          "gaps": ["...", "..."],
          "recommendations": ["...", "..."]
        }}
        """
        res = await nvidia_client.generate_structured(prompt, "You are a JSON-only resume checker.", temperature=0.2)
        return res if res else {
            "ats_score": 75,
            "strengths": ["Clear layout"],
            "gaps": ["Missing context"],
            "recommendations": ["Refine achievements"]
        }

    # ─── Formatting / Data helpers ───────────────────────────────

    def _compile_resume_text(self, draft_sections: Dict[str, Any]) -> str:
        """Compile section drafts into a single string for parsing."""
        parts = []
        for sec in ["summary", "skills", "experience", "education"]:
            if sec in draft_sections:
                content = draft_sections[sec].get("content", "")
                parts.append(f"## {sec.upper()}")
                if isinstance(content, dict):
                    for cat, items in content.items():
                        parts.append(f"{cat}: {', '.join(items)}")
                else:
                    parts.append(str(content))
        return "\n\n".join(parts)

    def _normalize_row(self, row: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        """Normalize Postgres row JSON fields to Python dicts and camelCase."""
        if not row:
            return None
            
        def try_parse_json(val):
            if isinstance(val, str):
                try:
                    return json.loads(val)
                except:
                    return val
            return val
            
        return {
            "id": row.get("id"),
            "userId": row.get("user_id"),
            "stage": row.get("stage"),
            "currentSection": row.get("current_section"),
            "contextData": try_parse_json(row.get("context_data")),
            "draftSections": try_parse_json(row.get("draft_sections")),
            "readerTestResults": try_parse_json(row.get("reader_test_results")),
            "isCompleted": row.get("is_completed"),
            "createdAt": row.get("created_at"),
            "updatedAt": row.get("updated_at")
        }

    def _to_snake_case(self, name: str) -> str:
        """Convert camelCase string to snake_case."""
        import re
        return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()
