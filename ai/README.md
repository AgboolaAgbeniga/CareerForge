# CareerForge AI Services

A suite of AI-powered microservices for the CareerForge platform, providing intelligent job matching, resume parsing, and career coaching capabilities.

## 🤖 Services Overview

### 1. Resume Parser (`ai/resume_parser/`)
- **Purpose**: Extract structured data from uploaded resumes
- **Technology**: Hugging Face transformers, sentence-transformers
- **Features**: NER, skill extraction, experience parsing, semantic similarity

### 2. Matching Engine (`ai/matching_engine/`)
- **Purpose**: Match candidates with suitable job opportunities
- **Technology**: Sentence transformers, scikit-learn
- **Features**: Semantic matching, skill alignment, experience scoring

### 3. Career Coach (`ai/career_coach/`)
- **Purpose**: Provide personalized career guidance and advice
- **Technology**: Hugging Face transformers, custom NLP pipelines
- **Features**: LinkedIn optimization, cover letter generation, skill gap analysis

## 🛠 Technology Stack

- **Language**: Python 3.9+
- **Framework**: FastAPI (for APIs)
- **ML Libraries**:
  - transformers (Hugging Face)
  - sentence-transformers
  - scikit-learn
  - layoutparser (for document layout)
- **Infrastructure**: Docker, docker-compose
- **Communication**: REST APIs, HTTP clients

## 📁 Project Structure

```
ai/
├── shared/                    # Shared utilities and configuration
│   ├── config.py             # Global configuration
│   ├── utils.py              # Common utilities and HF client
│   └── ...
├── resume_parser/            # Resume parsing service
│   ├── app.py                # FastAPI application
│   ├── parser.py             # Core parsing logic
│   ├── Dockerfile            # Container definition
│   └── requirements.txt      # Python dependencies
├── matching_engine/          # Job matching service
│   ├── app.py                # FastAPI application
│   ├── matcher.py            # Matching algorithms
│   ├── Dockerfile
│   └── requirements.txt
├── career_coach/             # Career coaching service
│   ├── app.py                # FastAPI application
│   ├── coach.py              # Coaching logic
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml        # Multi-service orchestration
├── test_hf_api.py           # Hugging Face API testing
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Docker & Docker Compose
- Hugging Face API key (optional, for API usage)

### Installation

1. **Clone and navigate**
   ```bash
   cd ai/
   ```

2. **Set up environment**
   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit .env with your configuration
   nano .env
   ```

3. **Install dependencies for individual services**
   ```bash
   # For each service
   cd resume_parser
   pip install -r requirements.txt
   cd ../matching_engine
   pip install -r requirements.txt
   cd ../career_coach
   pip install -r requirements.txt
   ```

### Running Services

#### Option 1: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option 2: Individual Services

```bash
# Resume Parser
cd resume_parser
python app.py

# Matching Engine
cd ../matching_engine
python app.py

# Career Coach
cd ../career_coach
python app.py
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `ai/` directory:

```env
# Hugging Face API
HF_API_KEY=your_hugging_face_api_key

# Service Ports
RESUME_PARSER_PORT=8000
MATCHING_ENGINE_PORT=8001
CAREER_COACH_PORT=8002

# Model Configuration
NER_MODEL=dslim/bert-base-NER
EMBEDDING_MODEL=all-MiniLM-L6-v2
GENERATION_MODEL=google/flan-t5-base

# Performance
MAX_WORKERS=4
TIMEOUT_SECONDS=30
BATCH_SIZE=16

# Cache
MODEL_CACHE_DIR=./models
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=INFO
```

### Model Configuration

Models are configured in `shared/config.py`:

- **NER_MODEL**: For named entity recognition
- **EMBEDDING_MODEL**: For semantic similarity
- **GENERATION_MODEL**: For text generation tasks

## 📚 API Documentation

### Resume Parser Service

**Base URL**: `http://localhost:8000`

#### POST /parse
Parse resume text.

**Request**:
```json
{
  "text": "Resume content here..."
}
```

**Response**:
```json
{
  "personal_info": {"name": "John Doe"},
  "skills": ["Python", "React"],
  "experience": [...],
  "education": [...],
  "contact": {"email": "john@example.com"},
  "summary": "Professional summary",
  "confidence_score": 0.85
}
```

#### POST /parse-file
Parse uploaded resume file (PDF/TXT/DOCX).

#### POST /optimize
Optimize resume for job application.

### Matching Engine Service

**Base URL**: `http://localhost:8001`

#### POST /match
Calculate match score between candidate and job.

**Request**:
```json
{
  "job_seeker": {
    "id": 1,
    "skills": ["Python", "React"],
    "experience_years": 3
  },
  "job": {
    "id": 1,
    "title": "Software Engineer",
    "requirements": ["Python", "JavaScript"],
    "experience_level": "mid"
  }
}
```

**Response**:
```json
{
  "score": 0.85,
  "semantic_similarity": 0.82,
  "skill_match": 0.90,
  "experience_match": 0.80,
  "reasons": ["Strong Python skills", "Good experience match"]
}
```

#### GET /suggestions/{candidate_id}
Get job suggestions for candidate.

### Career Coach Service

**Base URL**: `http://localhost:8002`

#### POST /advice
Get personalized career advice.

**Request**:
```json
{
  "user_profile": {
    "experience_years": 2,
    "skills": ["Python", "SQL"]
  },
  "context": "I want to advance my career in data science"
}
```

**Response**:
```json
{
  "advice": "Focus on building expertise in machine learning...",
  "action_items": ["Take ML courses", "Build projects"],
  "resources": ["Coursera", "Kaggle"],
  "confidence_score": 0.88
}
```

#### POST /optimize-linkedin
Optimize LinkedIn profile headline.

#### POST /generate-cover-letter
Generate personalized cover letter.

## 🔧 Development

### Testing Hugging Face Integration

```bash
python test_hf_api.py
```

### Adding New Models

1. Update `shared/config.py` with new model configurations
2. Modify service code to use new models
3. Update requirements.txt if needed
4. Test integration

### Performance Optimization

- Models are cached locally after first download
- Use batch processing for multiple requests
- Implement request queuing for high load
- Monitor memory usage and implement cleanup

## 🐳 Docker Deployment

### Building Individual Services

```bash
# Build resume parser
cd resume_parser
docker build -t careerforge-resume-parser .

# Build matching engine
cd ../matching_engine
docker build -t careerforge-matching-engine .

# Build career coach
cd ../career_coach
docker build -t careerforge-career-coach .
```

### Docker Compose

The `docker-compose.yml` orchestrates all services:

```yaml
version: '3.8'
services:
  resume-parser:
    build: ./resume_parser
    ports:
      - "8000:8000"
    environment:
      - HF_API_KEY=${HF_API_KEY}

  matching-engine:
    build: ./matching_engine
    ports:
      - "8001:8001"

  career-coach:
    build: ./career_coach
    ports:
      - "8002:8002"
```

## 📊 Monitoring & Logging

### Logging

All services use structured logging with the following levels:
- **DEBUG**: Detailed debugging information
- **INFO**: General operational messages
- **WARNING**: Warning conditions
- **ERROR**: Error conditions

### Health Checks

Each service provides a `/health` endpoint for monitoring.

### Performance Metrics

- Request latency tracking
- Model inference times
- Memory usage monitoring
- Error rate tracking

## 🔒 Security

- API key authentication for Hugging Face
- Input validation and sanitization
- Rate limiting (implement as needed)
- Secure model file handling
- No sensitive data logging

## 🚀 Scaling

### Horizontal Scaling

- Deploy multiple instances behind load balancer
- Use Redis for caching shared state
- Implement request queuing

### Model Optimization

- Use quantized models for faster inference
- Implement model versioning
- Cache frequent computations

## 🤝 Contributing

1. Follow the existing code structure
2. Add comprehensive tests
3. Update documentation
4. Use type hints
5. Follow PEP 8 style guidelines

### Code Standards

- Use type hints for all functions
- Write docstrings for classes and methods
- Handle exceptions appropriately
- Log important operations
- Keep functions focused and testable

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Model Download Failures**
   - Check internet connection
   - Verify Hugging Face API key
   - Check available disk space

2. **Memory Issues**
   - Reduce batch size
   - Use smaller models
   - Implement model unloading

3. **Port Conflicts**
   - Change ports in docker-compose.yml
   - Stop conflicting services

### Debug Mode

Run services with debug logging:

```bash
LOG_LEVEL=DEBUG python app.py
```

## 📈 Roadmap

- [ ] GPU support for faster inference
- [ ] Advanced model fine-tuning
- [ ] Multi-language support
- [ ] Real-time model updates
- [ ] Advanced analytics integration

---

**Status**: ✅ AI services fully implemented and documented