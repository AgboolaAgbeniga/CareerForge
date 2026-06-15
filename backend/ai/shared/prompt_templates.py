"""
Centralized prompt engineering library for all AI tasks.

All prompts use a consistent structure optimized for NVIDIA NIM's
Llama 3.1 Nemotron 70B Instruct model.
"""


class PromptTemplates:
    """Prompt templates for CareerForge AI tasks."""

    # ─── Resume Parsing ─────────────────────────────────────────────────

    RESUME_PARSE_SYSTEM = """You are an expert resume parser. Extract structured information from resumes with high accuracy.
Always respond with valid JSON. Do not include any text outside the JSON object."""

    RESUME_PARSE_USER = """Parse the following resume text and extract structured information.

Resume Text:
{resume_text}

Return a JSON object with these fields:
{{
    "name": "Full name",
    "email": "Email address",
    "phone": "Phone number",
    "location": "City, State/Country",
    "title": "Current/most recent job title",
    "summary": "Professional summary (2-3 sentences)",
    "experience_years": <number>,
    "skills": ["skill1", "skill2", ...],
    "experience": [
        {{
            "title": "Job Title",
            "company": "Company Name",
            "start_date": "YYYY-MM",
            "end_date": "YYYY-MM or Present",
            "description": "Key responsibilities and achievements"
        }}
    ],
    "education": [
        {{
            "degree": "Degree name",
            "institution": "School name",
            "graduation_year": "YYYY"
        }}
    ],
    "certifications": ["cert1", "cert2", ...],
    "languages": ["language1", "language2", ...]
}}"""

    # ─── Career Advice ───────────────────────────────────────────────────

    CAREER_ADVICE_SYSTEM = """You are an expert AI career coach with deep knowledge of job markets, career development, and professional growth strategies.
Provide actionable, specific advice. Be encouraging but realistic."""

    CAREER_ADVICE_USER = """User Context: {user_context}

User Question: {question}

Provide career advice in JSON format:
{{
    "advice": "Detailed career advice (3-5 paragraphs)",
    "action_items": ["Specific action 1", "Specific action 2", "Specific action 3"],
    "resources": ["Resource or link 1", "Resource or link 2"],
    "confidence_score": 0.85,
    "follow_up_questions": ["Suggested follow-up question 1", "Suggested follow-up question 2"]
}}"""

    # ─── Cover Letter Generation ─────────────────────────────────────────

    COVER_LETTER_SYSTEM = """You are an expert cover letter writer. Write compelling, personalized cover letters that match the candidate's experience to the job requirements."""

    COVER_LETTER_USER = """Write a professional cover letter for this candidate and job:

Candidate Profile:
{candidate_profile}

Job Description:
{job_description}

Return JSON:
{{
    "cover_letter": "Full cover letter text (3-4 paragraphs)",
    "key_matches": ["Matched qualification 1", "Matched qualification 2"],
    "customization_tips": ["Tip 1", "Tip 2"]
}}"""

    # ─── Skill Gap Analysis ──────────────────────────────────────────────

    SKILL_GAP_SYSTEM = """You are a career development analyst specializing in skill gap assessment and learning path recommendations."""

    SKILL_GAP_USER = """Analyze the skill gap between this candidate and their target roles:

Current Skills: {current_skills}
Experience: {experience_years} years
Current Title: {current_title}
Target Roles: {target_roles}

Return JSON:
{{
    "gaps": [
        {{
            "skill": "Missing skill name",
            "importance": "critical|important|nice_to_have",
            "current_level": 0-100,
            "target_level": 0-100,
            "learning_path": "How to acquire this skill"
        }}
    ],
    "strengths": ["Existing strength 1", "Existing strength 2"],
    "recommended_courses": [
        {{
            "name": "Course name",
            "platform": "Platform name",
            "estimated_hours": <number>,
            "priority": "high|medium|low"
        }}
    ],
    "timeline_months": <estimated months to close gaps>,
    "readiness_score": 0-100
}}"""

    # ─── Job Matching ────────────────────────────────────────────────────

    JOB_MATCH_SYSTEM = """You are a recruitment AI that evaluates how well candidates match job requirements. Be objective and data-driven."""

    JOB_MATCH_USER = """Evaluate the match between this candidate and job:

Candidate:
- Skills: {candidate_skills}
- Experience: {experience_years} years
- Title: {candidate_title}
- Education: {education}

Job Requirements:
- Title: {job_title}
- Required Skills: {required_skills}
- Experience Level: {experience_level}
- Description: {job_description}

Return JSON:
{{
    "overall_score": 0-100,
    "skill_match": 0-100,
    "experience_match": 0-100,
    "education_match": 0-100,
    "strengths": ["Why candidate is a good fit"],
    "gaps": ["Where candidate falls short"],
    "recommendation": "strong_match|good_match|partial_match|weak_match"
}}"""

    # ─── LinkedIn Optimization ───────────────────────────────────────────

    LINKEDIN_OPTIMIZE_SYSTEM = """You are a LinkedIn profile optimization expert who helps professionals maximize their visibility and attract opportunities."""

    LINKEDIN_OPTIMIZE_USER = """Optimize this LinkedIn profile for the target role:

Current Headline: {current_headline}
Target Role: {target_role}

Return JSON:
{{
    "optimized_headline": "New headline (max 220 chars)",
    "about_section": "Optimized about section (2-3 paragraphs)",
    "keyword_suggestions": ["keyword1", "keyword2"],
    "profile_tips": ["Tip 1", "Tip 2", "Tip 3"]
}}"""

    # ─── Job Description Optimization ────────────────────────────────────

    JOB_DESCRIPTION_SYSTEM = """You are a recruitment content expert who writes inclusive, engaging job descriptions that attract top talent."""

    JOB_DESCRIPTION_USER = """Optimize this job description draft:

Draft:
{job_draft}

Return JSON:
{{
    "optimized_title": "Better job title",
    "optimized_description": "Improved description",
    "inclusivity_score": 0-100,
    "readability_score": 0-100,
    "suggestions": ["Improvement 1", "Improvement 2"],
    "removed_bias_words": ["biased term replaced"]
}}"""

    # ─── Interview Prep ──────────────────────────────────────────────────

    INTERVIEW_PREP_SYSTEM = """You are an interview preparation coach with deep knowledge of behavioral and technical interview techniques."""

    INTERVIEW_PREP_USER = """Generate interview preparation for this role:

Role: {role}
Company Type: {company_type}
Candidate Skills: {skills}

Return JSON:
{{
    "behavioral_questions": [
        {{
            "question": "Interview question",
            "strategy": "How to answer this well",
            "example_answer": "Sample STAR format answer"
        }}
    ],
    "technical_questions": [
        {{
            "question": "Technical question",
            "key_points": ["Point 1", "Point 2"]
        }}
    ],
    "tips": ["General tip 1", "General tip 2"],
    "common_mistakes": ["Mistake to avoid 1", "Mistake to avoid 2"]
}}"""


# Singleton instance
prompts = PromptTemplates()
