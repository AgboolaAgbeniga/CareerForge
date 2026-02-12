import { PageContent } from '@/lib/content-types'

export const resumeParsingContent: PageContent = {
  metadata: {
    title: "Resume Parsing Service",
    description: "Comprehensive guide to CareerForge's AI-powered resume parsing capabilities, including text extraction, entity recognition, and structured data generation",
    version: "2.5.0",
    lastUpdated: "2025-12-30",
    authors: ["AI Engineering Team"],
    tags: ["resume parsing", "NLP", "entity recognition", "text extraction", "AI", "machine learning"],
    difficulty: "intermediate",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "service-overview", title: "Service Overview", level: 1 },
    { id: "architecture", title: "Service Architecture", level: 1 },
    { id: "nlp-pipeline", title: "NLP Pipeline", level: 1 },
    { id: "data-extraction", title: "Data Extraction", level: 1 },
    { id: "performance-metrics", title: "Performance & Metrics", level: 1 },
    { id: "integration", title: "Integration Guide", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "AI-Powered Resume Parsing",
    content: `CareerForge's Resume Parsing Service leverages advanced natural language processing and machine learning to automatically extract structured data from resumes in various formats. The service processes over 1 million resumes monthly, converting unstructured text into actionable candidate profiles with industry-leading accuracy.`
  },
  sections: [
    {
      id: "service-overview",
      title: "Service Overview",
      content: `The Resume Parsing Service is a core component of CareerForge's AI ecosystem, designed to handle the complex task of converting human-readable resume documents into structured, machine-readable data.

### Key Capabilities

#### Multi-Format Support
- **PDF Documents**: OCR-powered text extraction with layout analysis
- **Word Documents**: Native DOCX parsing with formatting preservation
- **Plain Text**: Direct processing with encoding detection
- **HTML Resumes**: Web-based resume parsing

#### Advanced Entity Recognition
- **Personal Information**: Names, contact details, locations
- **Professional Experience**: Job titles, companies, dates, descriptions
- **Education**: Degrees, institutions, GPA, graduation dates
- **Skills & Competencies**: Technical skills, soft skills, languages

#### Quality Assurance
- **Confidence Scoring**: Each extraction includes accuracy confidence
- **Validation Rules**: Business logic validation for extracted data
- **Fallback Mechanisms**: Graceful handling of edge cases
- **Continuous Learning**: Model improvement through user feedback`,
      calloutBoxes: [
        {
          type: "info",
          title: "Processing Scale",
          content: "The service processes over 1 million resumes monthly with 96% average accuracy across all extraction fields."
        }
      ]
    },

    {
      id: "architecture",
      title: "Service Architecture",
      content: `The Resume Parser operates as an independent microservice with dedicated compute resources, designed for high performance and fault isolation.

### Microservice Design

#### Service Components
- **API Gateway**: Request routing and rate limiting
- **Processing Engine**: Core parsing logic and orchestration
- **OCR Service**: Optical character recognition for scanned documents
- **NLP Engine**: Natural language processing and entity extraction
- **Data Validator**: Quality assurance and confidence scoring

#### Data Flow Architecture
\`\`\`mermaid
graph TD
    A[Resume Upload] --> B[Format Detection]
    B --> C{File Type}
    C -->|PDF| D[OCR Processing]
    C -->|DOCX| E[Document Parsing]
    C -->|TXT| F[Text Processing]
    D --> G[NLP Pipeline]
    E --> G
    F --> G
    G --> H[Entity Extraction]
    H --> I[Data Validation]
    I --> J[Structured Output]
\`\`\`

#### Scalability Features
- **Horizontal Scaling**: Auto-scaling based on request volume
- **Load Balancing**: Distributed processing across multiple instances
- **Queue Management**: Asynchronous processing for large batches
- **Caching Layer**: Redis-based caching for frequent requests`,
      codeExamples: [
        {
          id: "service-interface",
          title: "Resume Parser Service Interface",
          description: "TypeScript interface for the Resume Parser service",
          language: "typescript",
          code: `// Resume Parser Service Interface
interface ResumeParserService {
  // Parse a single resume file
  parseResume(file: File, options?: ParseOptions): Promise<ParsedResume>;

  // Batch processing for multiple resumes
  parseBatch(files: File[], options?: BatchOptions): Promise<ParsedResume[]>;

  // Extract text from document (OCR for PDFs)
  extractText(file: File): Promise<string>;

  // Get parsing confidence scores
  getConfidenceScores(resume: ParsedResume): ConfidenceScores;
}

interface ParseOptions {
  language?: string;
  extractImages?: boolean;
  preserveFormatting?: boolean;
}

interface ParsedResume {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  metadata: ResumeMetadata;
}

interface ConfidenceScores {
  overall: number;
  personalInfo: number;
  experience: number;
  education: number;
  skills: number;
}`
        }
      ]
    },

    {
      id: "nlp-pipeline",
      title: "NLP Pipeline",
      content: `Our advanced NLP pipeline combines multiple state-of-the-art models and techniques for comprehensive resume analysis.

### Named Entity Recognition (NER)

#### Pre-trained Models
- **spaCy**: Industrial-strength NLP with transformer models
- **BERT-based NER**: Fine-tuned for resume-specific entities
- **Custom Models**: Trained on 500K+ annotated resumes

#### Entity Types Extracted
- **PERSON**: Full names and name variations
- **ORG**: Company names and organizations
- **GPE**: Geographic locations and addresses
- **DATE**: Employment dates and education periods
- **MONEY**: Salary information and compensation
- **PERCENT**: GPA and performance metrics

### Skill Extraction

#### Taxonomy-Based Approach
- **Technical Skills**: Programming languages, frameworks, tools
- **Soft Skills**: Communication, leadership, problem-solving
- **Domain Knowledge**: Industry-specific competencies
- **Language Skills**: Programming and human languages

#### Machine Learning Models
- **Transformer Models**: BERT, RoBERTa for context understanding
- **Sequence Labeling**: BiLSTM-CRF for skill span detection
- **Similarity Matching**: Semantic similarity for skill normalization

### Experience Parsing

#### Temporal Analysis
- **Date Extraction**: Flexible date format recognition
- **Duration Calculation**: Employment period computation
- **Chronological Ordering**: Career timeline construction

#### Content Analysis
- **Job Title Classification**: Standardized title mapping
- **Responsibility Extraction**: Key achievement identification
- **Company Recognition**: Organization name normalization`,
      codeExamples: [
        {
          id: "nlp-pipeline",
          title: "NLP Pipeline Implementation",
          description: "Python implementation of the resume parsing NLP pipeline",
          language: "python",
          code: `import spacy
from transformers import pipeline, AutoTokenizer, AutoModelForTokenClassification
import re
from typing import Dict, List, Tuple

class ResumeNLPPipeline:
    def __init__(self):
        # Load spaCy model for general NLP
        self.nlp = spacy.load("en_core_web_trf")

        # Load custom NER model for resume entities
        self.ner_tokenizer = AutoTokenizer.from_pretrained(
            "dbmdz/bert-large-cased-finetuned-conll03-english"
        )
        self.ner_model = AutoModelForTokenClassification.from_pretrained(
            "dbmdz/bert-large-cased-finetuned-conll03-english"
        )
        self.ner_pipeline = pipeline(
            "ner",
            model=self.ner_model,
            tokenizer=self.ner_tokenizer,
            aggregation_strategy="simple"
        )

        # Skill extraction patterns
        self.skill_patterns = self._load_skill_patterns()

    def process_resume(self, text: str) -> Dict[str, any]:
        """Main processing pipeline"""
        # Basic NLP processing
        doc = self.nlp(text)

        # Named Entity Recognition
        entities = self.ner_pipeline(text)

        # Extract structured information
        personal_info = self._extract_personal_info(doc, entities)
        experience = self._extract_experience(doc)
        education = self._extract_education(doc)
        skills = self._extract_skills(text)

        return {
            "personal_info": personal_info,
            "experience": experience,
            "education": education,
            "skills": skills,
            "entities": entities
        }

    def _extract_personal_info(self, doc, entities) -> Dict[str, str]:
        """Extract personal information"""
        personal_info = {}

        # Extract name
        person_entities = [e for e in entities if e["entity_group"] == "PERSON"]
        if person_entities:
            personal_info["name"] = person_entities[0]["word"]

        # Extract email using regex
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, doc.text)
        if emails:
            personal_info["email"] = emails[0]

        # Extract phone using regex
        phone_pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'
        phones = re.findall(phone_pattern, doc.text)
        if phones:
            personal_info["phone"] = phones[0]

        return personal_info

    def _extract_skills(self, text: str) -> List[str]:
        """Extract skills using pattern matching and ML"""
        skills = []

        # Pattern-based extraction
        for pattern, skill_type in self.skill_patterns.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            skills.extend(matches)

        # Remove duplicates and normalize
        skills = list(set(skills))
        skills = [skill.lower().strip() for skill in skills]

        return skills

    def _load_skill_patterns(self) -> Dict[str, str]:
        """Load skill extraction patterns"""
        return {
            r'\b(python|java|javascript|typescript|c\+\+|c#|ruby|php|go|rust)\b': 'programming',
            r'\b(react|angular|vue|django|flask|spring|express)\b': 'framework',
            r'\b(sql|mysql|postgresql|mongodb|redis)\b': 'database',
            r'\b(docker|kubernetes|aws|azure|gcp)\b': 'cloud'
        }`
        }
      ]
    },

    {
      id: "data-extraction",
      title: "Data Extraction Process",
      content: `The service extracts and structures 25+ data fields from resumes with industry-leading accuracy rates.

### Extraction Categories

#### Personal Information (98% Accuracy)
- **Full Name**: Primary name and name variations
- **Contact Details**: Email, phone, LinkedIn, portfolio URLs
- **Location**: City, state, country with geocoding
- **Professional Summary**: Career objective and summary text

#### Professional Experience (92% Accuracy)
- **Job Titles**: Standardized job title classification
- **Company Names**: Organization name normalization
- **Employment Dates**: Flexible date parsing and validation
- **Job Descriptions**: Responsibility and achievement extraction
- **Industry Classification**: Company industry categorization

#### Education (96% Accuracy)
- **Degree Types**: Bachelor's, Master's, PhD classification
- **Institutions**: University name normalization
- **Graduation Dates**: Completion date extraction
- **GPA Scores**: Grade point average parsing
- **Majors/Minors**: Field of study identification

#### Skills & Competencies (94% Accuracy)
- **Technical Skills**: Programming languages, frameworks, tools
- **Soft Skills**: Communication, leadership, problem-solving
- **Certifications**: Professional certification recognition
- **Languages**: Human language proficiency levels

### Quality Metrics

#### Accuracy Benchmarks
| Field Category | Accuracy Rate | Confidence Threshold |
|----------------|---------------|---------------------|
| Personal Info | 98% | 0.95 |
| Skills | 94% | 0.90 |
| Experience | 92% | 0.85 |
| Education | 96% | 0.92 |

#### Validation Rules
- **Cross-field Consistency**: Experience dates vs. education dates
- **Logical Validation**: Degree levels vs. job titles
- **Completeness Checks**: Required field validation
- **Duplicate Detection**: Multiple entry deduplication`,
      lists: [
        {
          type: "unordered",
          title: "Data Quality Assurance",
          items: [
            "Automated validation against business rules",
            "Confidence scoring for each extracted field",
            "Manual review workflow for low-confidence extractions",
            "Continuous model improvement through user feedback",
            "A/B testing for extraction accuracy improvements"
          ]
        }
      ]
    },

    {
      id: "performance-metrics",
      title: "Performance & Metrics",
      content: `The Resume Parsing Service is optimized for high performance and reliability, processing thousands of resumes per minute.

### Performance Benchmarks

#### Speed Metrics
- **Average Processing Time**: < 500ms for standard resumes
- **OCR Processing**: < 2 seconds for scanned PDFs
- **Batch Processing**: 1000+ resumes per minute
- **99th Percentile**: < 2 seconds for complex documents

#### Scalability Metrics
- **Concurrent Requests**: 10,000+ simultaneous processing
- **Auto-scaling**: 0-100 instances based on demand
- **Queue Depth**: Handles traffic spikes gracefully
- **Resource Utilization**: Optimized CPU and memory usage

#### Reliability Metrics
- **Uptime SLA**: 99.9% availability
- **Error Rate**: < 0.1% processing failures
- **Data Accuracy**: 96% average across all fields
- **False Positive Rate**: < 2% for entity extraction

### Monitoring & Alerting

#### Real-time Metrics
- **Processing Latency**: Per-request timing distribution
- **Error Rates**: By error type and severity
- **Queue Length**: Current and historical queue depths
- **Resource Usage**: CPU, memory, and disk utilization

#### Quality Monitoring
- **Accuracy Tracking**: Field-level accuracy over time
- **Confidence Distribution**: Extraction confidence histograms
- **User Feedback**: Manual correction and validation rates
- **Model Drift Detection**: Automatic accuracy degradation alerts`,
      calloutBoxes: [
        {
          type: "success",
          title: "Performance Achievement",
          content: "The service maintains sub-500ms processing times while achieving 96% accuracy across all extraction fields."
        }
      ]
    },

    {
      id: "integration",
      title: "Integration Guide",
      content: `Seamlessly integrate the Resume Parsing Service into your applications using our REST API and client libraries.

### API Endpoints

#### Parse Resume
\`\`\`http
POST /api/v1/resume/parse
Content-Type: multipart/form-data

# Request
{
  "file": "<resume_file>",
  "options": {
    "language": "en",
    "extract_images": false,
    "webhook_url": "https://your-app.com/webhook"
  }
}

# Response
{
  "id": "parse_12345",
  "status": "completed",
  "data": {
    "personal_info": {...},
    "experience": [...],
    "education": [...],
    "skills": [...]
  },
  "confidence": {
    "overall": 0.96,
    "personal_info": 0.98,
    "experience": 0.92
  },
  "processing_time": 450
}
\`\`\`

#### Batch Processing
\`\`\`http
POST /api/v1/resume/parse/batch
Content-Type: multipart/form-data

# Supports up to 100 files per request
# Asynchronous processing with webhook notifications
\`\`\`

### Client Libraries

#### JavaScript/TypeScript
\`\`\`typescript
import { CareerForgeAI } from '@careerforge/ai-client';

const client = new CareerForgeAI({
  apiKey: 'your-api-key'
});

// Parse single resume
const result = await client.resume.parse(file);

// Parse multiple resumes
const results = await client.resume.parseBatch(files, {
  onProgress: (progress) => console.log(\`Progress: \${progress}%\`),
  webhookUrl: 'https://your-app.com/webhook'
});
\`\`\`

#### Python
\`\`\`python
from careerforge_ai import CareerForgeAI

client = CareerForgeAI(api_key='your-api-key')

# Parse resume
result = client.resume.parse('path/to/resume.pdf')

# Access structured data
print(result.personal_info.name)
print(result.experience[0].job_title)
print(result.skills.technical)
\`\`\`

### Webhook Integration

#### Event Types
- **parse.completed**: Processing finished successfully
- **parse.failed**: Processing encountered an error
- **batch.completed**: Batch processing finished

#### Webhook Payload
\`\`\`json
{
  "event": "parse.completed",
  "id": "parse_12345",
  "timestamp": "2025-12-27T10:00:00Z",
  "data": {
    "personal_info": {...},
    "experience": [...],
    "education": [...],
    "skills": [...]
  },
  "confidence": {...}
}
\`\`\`

### Rate Limiting
- **Free Tier**: 100 requests per month
- **Pro Tier**: 10,000 requests per month
- **Enterprise**: Unlimited with custom limits
- **Burst Rate**: 100 requests per minute`,
      codeExamples: [
        {
          id: "webhook-handler",
          title: "Webhook Handler Example",
          description: "Node.js webhook handler for processing parsed resume data",
          language: "typescript",
          code: `import express from 'express';
import { CareerForgeWebhook } from '@careerforge/ai-webhooks';

const app = express();
app.use(express.json());

// Webhook endpoint for resume parsing results
app.post('/webhooks/resume-parsed', async (req, res) => {
  try {
    const webhook = new CareerForgeWebhook(req.headers, req.body);

    // Verify webhook authenticity
    if (!webhook.verify('your-webhook-secret')) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data, confidence } = webhook.payload;

    if (event === 'parse.completed') {
      // Process the parsed resume data
      await processParsedResume(data, confidence);

      // Update candidate profile in your database
      await updateCandidateProfile(data);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

async function processParsedResume(data: any, confidence: any) {
  // Validate confidence scores
  if (confidence.overall < 0.8) {
    // Flag for manual review
    await flagForReview(data.id);
    return;
  }

  // Extract key information
  const candidate = {
    name: data.personal_info.name,
    email: data.personal_info.email,
    skills: data.skills.technical,
    experience_years: calculateExperienceYears(data.experience),
    current_title: data.experience[0]?.job_title
  };

  // Store in your database
  await saveCandidate(candidate);
}`
        }
      ]
    }
  ],
  nextSteps: {
    title: "Explore Related Services",
    links: [
      {
        text: "Job Matching Engine",
        href: "/docs/ai-services/job-matching",
        description: "Learn how parsed resume data powers intelligent job matching"
      },
      {
        text: "Skill Extraction API",
        href: "/docs/ai-services/skill-extraction",
        description: "Deep dive into our advanced skill extraction capabilities"
      },
      {
        text: "AI Services Overview",
        href: "/docs/ai-services/introduction",
        description: "Return to the AI services overview"
      }
    ]
  },
  relatedResources: [
    {
      text: "API Documentation",
      href: "/docs/backend-api/ai",
      description: "Complete API reference for AI services integration"
    },
    {
      text: "Data Models",
      href: "/docs/backend/database-models",
      description: "Understanding the data structures used by AI services"
    },
    {
      text: "Authentication",
      href: "/docs/backend-api/authentication",
      description: "API authentication and security"
    }
  ]
}