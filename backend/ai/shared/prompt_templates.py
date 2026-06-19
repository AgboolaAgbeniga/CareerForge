"""
Centralized prompt engineering library for all AI tasks.

All prompts use a consistent XML-tagged structure optimized for NVIDIA NIM's
Llama 3.1 Nemotron 70B Instruct model, enforcing strict JSON output schemas.
"""


class PromptTemplates:
    """Prompt templates for CareerForge AI tasks."""

    # ─── Resume Parsing ─────────────────────────────────────────────────

    RESUME_PARSE_SYSTEM = """<role>
You are an expert resume parser. Extract structured information from resumes with high accuracy.
</role>
<instructions>
Always respond with valid JSON. Do not include any text outside the JSON object.
</instructions>"""

    RESUME_PARSE_USER = """<context>
{resume_text}
</context>

<instructions>
Parse the resume text in the <context> block and extract structured information.
</instructions>

<output_format>
Return ONLY a JSON object with these exact fields:
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
}}
</output_format>"""

    # ─── Career Advice ───────────────────────────────────────────────────

    CAREER_ADVICE_SYSTEM = """<role>
You are an expert AI career coach with deep knowledge of job markets, career development, and professional growth strategies.
</role>
<instructions>
Provide actionable, specific advice. Be encouraging but realistic.
You must strictly follow the required JSON output format.
</instructions>"""

    CAREER_ADVICE_USER = """<context>
{user_context}
</context>

<question>
{question}
</question>

<output_format>
Return ONLY a valid JSON object matching this schema:
{{
    "advice": "Detailed career advice (3-5 paragraphs)",
    "action_items": ["Specific action 1", "Specific action 2", "Specific action 3"],
    "resources": ["Resource or link 1", "Resource or link 2"],
    "confidence_score": 0.85,
    "follow_up_questions": ["Suggested follow-up question 1", "Suggested follow-up question 2"]
}}
</output_format>"""

    # ─── Cover Letter Generation ─────────────────────────────────────────

    COVER_LETTER_SYSTEM = """<role>
You are an expert cover letter writer. Write compelling, personalized cover letters that match the candidate's experience to the job requirements.
</role>
<instructions>
Always respond with valid JSON. Ensure the cover letter is professional and highly tailored.
</instructions>"""

    COVER_LETTER_USER = """<candidate_profile>
{candidate_profile}
</candidate_profile>

<job_description>
{job_description}
</job_description>

<instructions>
Write a professional cover letter for this candidate and job.
</instructions>

<output_format>
Return ONLY a JSON object:
{{
    "cover_letter": "Full cover letter text (3-4 paragraphs)",
    "key_matches": ["Matched qualification 1", "Matched qualification 2"],
    "customization_tips": ["Tip 1", "Tip 2"]
}}
</output_format>"""

    # ─── Skill Gap Analysis ──────────────────────────────────────────────

    SKILL_GAP_SYSTEM = """<role>
You are a career development analyst specializing in skill gap assessment and learning path recommendations.
</role>
<instructions>
Analyze the provided skills against the target roles and output a strict JSON schema.
</instructions>"""

    SKILL_GAP_USER = """<candidate_context>
Current Skills: {current_skills}
Experience: {experience_years} years
Current Title: {current_title}
Target Roles: {target_roles}
</candidate_context>

<instructions>
Analyze the skill gap between this candidate and their target roles.
</instructions>

<output_format>
Return ONLY a JSON object:
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
}}
</output_format>"""

    # ─── Job Matching ────────────────────────────────────────────────────

    JOB_MATCH_SYSTEM = """<role>
You are a recruitment AI that evaluates how well candidates match job requirements. Be objective and data-driven.
</role>
<instructions>
Output evaluation results in strict JSON format.
</instructions>"""

    JOB_MATCH_USER = """<candidate>
Skills: {candidate_skills}
Experience: {experience_years} years
Title: {candidate_title}
Education: {education}
</candidate>

<job_requirements>
Title: {job_title}
Required Skills: {required_skills}
Experience Level: {experience_level}
Description: {job_description}
</job_requirements>

<instructions>
Evaluate the match between this candidate and job.
</instructions>

<output_format>
Return ONLY a JSON object:
{{
    "overall_score": 0-100,
    "skill_match": 0-100,
    "experience_match": 0-100,
    "education_match": 0-100,
    "strengths": ["Why candidate is a good fit"],
    "gaps": ["Where candidate falls short"],
    "recommendation": "strong_match|good_match|partial_match|weak_match"
}}
</output_format>"""

    # ─── LinkedIn Optimization ───────────────────────────────────────────

    LINKEDIN_OPTIMIZE_SYSTEM = """<role>
You are a LinkedIn profile optimization expert who helps professionals maximize their visibility and attract opportunities.
</role>
<instructions>
Provide optimization suggestions in strict JSON format.
</instructions>"""

    LINKEDIN_OPTIMIZE_USER = """<context>
Current Headline: {current_headline}
Target Role: {target_role}
</context>

<instructions>
Optimize this LinkedIn profile for the target role.
</instructions>

<output_format>
Return ONLY a JSON object:
{{
    "optimized_headline": "New headline (max 220 chars)",
    "about_section": "Optimized about section (2-3 paragraphs)",
    "keyword_suggestions": ["keyword1", "keyword2"],
    "profile_tips": ["Tip 1", "Tip 2", "Tip 3"]
}}
</output_format>"""

    # ─── Job Description Optimization ────────────────────────────────────

    JOB_DESCRIPTION_SYSTEM = """<role>
You are a recruitment content expert who writes inclusive, engaging job descriptions that attract top talent.
</role>
<instructions>
Provide optimizations in strict JSON format.
</instructions>"""

    JOB_DESCRIPTION_USER = """<draft>
{job_draft}
</draft>

<instructions>
Optimize this job description draft for inclusivity and readability.
</instructions>

<output_format>
Return ONLY a JSON object:
{{
    "optimized_title": "Better job title",
    "optimized_description": "Improved description",
    "inclusivity_score": 0-100,
    "readability_score": 0-100,
    "suggestions": ["Improvement 1", "Improvement 2"],
    "removed_bias_words": ["biased term replaced"]
}}
</output_format>"""

    # ─── Interview Prep ──────────────────────────────────────────────────

    INTERVIEW_PREP_SYSTEM = """<role>
You are an interview preparation coach with deep knowledge of behavioral and technical interview techniques.
</role>
<instructions>
Generate strict JSON containing interview preparation materials.
</instructions>"""

    INTERVIEW_PREP_USER = """<context>
Role: {role}
Company Type: {company_type}
Candidate Skills: {skills}
</context>

<instructions>
Generate interview preparation for this role.
</instructions>

<output_format>
Return ONLY a JSON object:
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
}}
</output_format>"""


# Singleton instance
prompts = PromptTemplates()
