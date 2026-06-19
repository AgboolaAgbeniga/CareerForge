import logging
from pydantic import BaseModel, Field
from typing import List
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from shared.agent_tools import ToolRegistry
from shared.nvidia_client import nvidia_client

logger = logging.getLogger(__name__)
registry = ToolRegistry()

class ExtractDocumentTextArgs(BaseModel):
    file_url: str = Field(..., description="The URL or path to the document file (PDF, DOCX, Image)")

@registry.register(
    name="extract_document_text",
    description="Extracts raw text from a candidate document (PDF, DOCX, Image)",
    args_schema=ExtractDocumentTextArgs
)
async def extract_document_text(file_url: str) -> str:
    # In a real system, this would download the file and use OCR or PyPDF.
    # For now, we simulate extraction.
    return f"Simulated extraction of resume text from {file_url}"

class ParseResumeEntitiesArgs(BaseModel):
    raw_text: str = Field(..., description="The raw text extracted from a resume")

@registry.register(
    name="parse_resume_entities",
    description="Leverages an LLM to extract a strictly typed JSON schema containing: ContactInfo, Education, WorkExperience, Projects, and RawSkills.",
    args_schema=ParseResumeEntitiesArgs
)
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type(Exception),
    reraise=True
)
async def parse_resume_entities(raw_text: str) -> dict:
    logger.info("Parsing resume entities with LLM...")
    prompt = f"""
    Extract the following entities from the resume text into JSON format:
    - ContactInfo (name, email, phone)
    - Education (list of degrees, institutions, years)
    - WorkExperience (list of companies, roles, dates, bullets)
    - Projects (list of names and descriptions)
    - RawSkills (list of strings)
    
    Resume Text:
    {raw_text}
    """
    
    system_prompt = "You are an expert resume parser. Respond strictly with valid JSON."
    
    result = await nvidia_client.generate_structured(
        prompt=prompt,
        system_prompt=system_prompt,
        temperature=0.1
    )
    return result

class NormalizeSkillTaxonomyArgs(BaseModel):
    raw_skills: List[str] = Field(..., description="List of free-text skills to normalize")

@registry.register(
    name="normalize_skill_taxonomy",
    description="Maps free-text skills to canonical internal IDs to ensure database consistency.",
    args_schema=NormalizeSkillTaxonomyArgs
)
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type(Exception),
    reraise=True
)
async def normalize_skill_taxonomy(raw_skills: List[str]) -> List[str]:
    logger.info("Normalizing skill taxonomy...")
    skills_list_str = ", ".join(raw_skills)
    prompt = f"""
    Normalize the following list of free-text skills into standardized IT/Tech skill names.
    For example, 'React.js' -> 'React', 'NodeJS' -> 'Node.js', 'K8s' -> 'Kubernetes'.
    Return the output as a JSON array of strings.
    
    Raw Skills: [{skills_list_str}]
    """
    
    result = await nvidia_client.generate_structured(
        prompt=prompt,
        system_prompt="You are a data standardization bot. Return a JSON object with a single key 'normalized_skills' containing a list of strings.",
        temperature=0.1
    )
    return result.get("normalized_skills", raw_skills)

class AnonymizeCandidateDataArgs(BaseModel):
    parsed_json: dict = Field(..., description="The parsed resume entities JSON")

@registry.register(
    name="anonymize_candidate_data",
    description="Removes PII (Name, Email, Phone, Address, University Names) to generate a blind profile for unbiased recruiter screening.",
    args_schema=AnonymizeCandidateDataArgs
)
async def anonymize_candidate_data(parsed_json: dict) -> dict:
    import copy
    anonymized = copy.deepcopy(parsed_json)
    
    # Strip contact info
    if "ContactInfo" in anonymized:
        anonymized["ContactInfo"] = {
            "name": "REDACTED",
            "email": "REDACTED",
            "phone": "REDACTED"
        }
        
    # Strip university names
    if "Education" in anonymized and isinstance(anonymized["Education"], list):
        for edu in anonymized["Education"]:
            if "institution" in edu:
                edu["institution"] = "REDACTED_UNIVERSITY"
                
    return anonymized

class GenerateProfileEmbeddingArgs(BaseModel):
    standardized_profile: dict = Field(..., description="The standardized profile JSON without PII")

@registry.register(
    name="generate_profile_embedding",
    description="Serializes the candidate's core competencies and passes them to the embedding model for vectorization.",
    args_schema=GenerateProfileEmbeddingArgs
)
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type(Exception),
    reraise=True
)
async def generate_profile_embedding(standardized_profile: dict) -> List[float]:
    import json
    logger.info("Generating profile embedding...")
    # Serialize the core competencies (skills, experience summary) into a dense string
    core_text = json.dumps({
        "skills": standardized_profile.get("RawSkills", []),
        "experience": standardized_profile.get("WorkExperience", [])
    })
    
    embedding = await nvidia_client.generate_embedding(core_text)
    return embedding

