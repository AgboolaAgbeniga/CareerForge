# CareerForge: World-Class Skills Taxonomy & Framework

## Overview

This document defines the comprehensive skill framework that powers CareerForge's AI-driven matching, parsing, and career guidance. It's based on industry standards (ESCO, O*NET, SFIA) with tech-specific enhancements.

---

## 1. SKILL TAXONOMY STRUCTURE

### Hierarchy Levels

```
Skill Domain (8 top-level)
├── Skill Category (45+ categories)
│   ├── Skill Group (200+ groups)
│   │   ├── Skill (2000+ individual skills)
│   │   │   ├── Proficiency Level (1-5)
│   │   │   ├── Years of Experience
│   │   │   ├── Endorsements/Validation
│   │   │   └── Last Used Date
```

### 8 Primary Domains

1. **Technology & Programming** (600+ skills)
2. **Data & Analytics** (200+ skills)
3. **Cloud & Infrastructure** (300+ skills)
4. **Product & Design** (150+ skills)
5. **Business & Operations** (250+ skills)
6. **Sales & Marketing** (200+ skills)
7. **People & Leadership** (150+ skills)
8. **Soft Skills & Competencies** (100+ skills)

---

## 2. COMPLETE SKILL TAXONOMY

### Domain 1: Technology & Programming (600+ skills)

#### Category 1.1: Frontend Development (120+ skills)

**Web Frameworks:**
- React (versions: 16.x, 17.x, 18.x, 19.x)
- Vue.js (2.x, 3.x, Composition API)
- Angular (12+, RxJS, NgRx)
- Svelte, Astro, Next.js, Nuxt.js
- Remix, Qwik, Solid.js
- Ember.js, Backbone.js (legacy)

**Styling & CSS:**
- CSS (Flexbox, Grid, Animations)
- Tailwind CSS, Bootstrap, Material Design
- SCSS/SASS, PostCSS, CSS-in-JS
- Styled Components, Emotion, CSS Modules
- BEM, OOCSS (methodologies)

**JavaScript/TypeScript:**
- JavaScript (ES5, ES6+, latest features)
- TypeScript (basics, advanced, generics)
- Node.js (Express, Fastify, NestJS)
- Deno, Bun (modern runtimes)
- Package managers: npm, pnpm, yarn

**Testing (Frontend):**
- Jest, Vitest, Mocha, Chai
- React Testing Library, Enzyme
- Cypress, Playwright, Webdriver
- Storybook, Chromatic
- Accessibility testing (axe, WAVE)

**State Management:**
- Redux, Redux Toolkit, Recoil
- Zustand, Jotai, Valtio
- MobX, XState
- TanStack Query, SWR
- Context API, Props Drilling

**Performance & Optimization:**
- Web Vitals (LCP, FID, CLS)
- Bundle optimization, Code splitting
- Image optimization, Lazy loading
- Service Workers, PWA
- Performance monitoring (Sentry, DataDog)

**Browser APIs & DOM:**
- DOM manipulation, Event handling
- Fetch API, XMLHttpRequest
- LocalStorage, IndexedDB, SessionStorage
- Geolocation, Notifications API
- WebSockets, WebRTC

---

#### Category 1.2: Backend Development (180+ skills)

**Languages (Proficiency Levels: 1-5):**
- Python (Web: Django, Flask, FastAPI, Starlette)
- JavaScript/Node.js (Express, NestJS, Hapi)
- Java (Spring Boot, Quarkus, Play Framework)
- Go (Gin, Echo, Chi)
- C# / .NET (ASP.NET Core, Entity Framework)
- Rust (Actix, Rocket, Axum)
- PHP (Laravel, Symfony, Yii)
- Ruby (Rails, Sinatra)
- Kotlin, Scala, Clojure (JVM ecosystem)

**API Design & Architecture:**
- RESTful API design, OpenAPI/Swagger
- GraphQL (Apollo, Hasura, PostGraphile)
- gRPC, Protocol Buffers
- WebSockets, Server-Sent Events
- API versioning, deprecation strategies

**Database Design:**
- Relational databases (SQL)
  - PostgreSQL (advanced: JSON, arrays, custom types)
  - MySQL/MariaDB
  - Oracle, SQL Server
- NoSQL databases
  - MongoDB (aggregation pipeline, transactions)
  - Cassandra, DynamoDB
  - Redis, Memcached
- Search
  - Elasticsearch, OpenSearch
  - Algolia, Meilisearch
  - Solr, Sphinx

**ORM & Query Builders:**
- SQLAlchemy, Tortoise ORM (Python)
- Sequelize, TypeORM, Prisma, Drizzle (JavaScript)
- Hibernate, JPA (Java)
- Entity Framework (C#)
- ActiveRecord, Sequel (Ruby)

**Authentication & Authorization:**
- JWT, OAuth 2.0, OpenID Connect
- SAML, kerberos
- Session management, token refresh
- Multi-factor authentication (2FA, TOTP)
- Role-based access control (RBAC)
- Attribute-based access control (ABAC)
- Supabase Auth, Auth0, Cognito

**Data Validation & Serialization:**
- JSON Schema, Zod, Yup, Joi (JavaScript)
- Pydantic, Marshmallow (Python)
- Validation pipelines
- Data sanitization, XSS prevention

**Caching Strategies:**
- In-memory caching (Redis, Memcached)
- HTTP caching (ETags, Cache-Control)
- Cache invalidation patterns
- Cache warming, distributed caching
- CDN caching (CloudFlare, CloudFront)

**Background Jobs & Queues:**
- BullMQ, RabbitMQ, Apache Kafka (JavaScript)
- Celery, RQ (Python)
- Sidekiq (Ruby)
- AWS SQS, Google Cloud Tasks
- Job scheduling, retry logic

**Security Best Practices:**
- SQL injection prevention (parameterized queries)
- CSRF protection, CORS configuration
- Rate limiting, DDoS mitigation
- Secrets management (environment variables, vaults)
- API key rotation
- Encryption at rest/in transit

---

#### Category 1.3: Database Administration (100+ skills)

**PostgreSQL Advanced:**
- Query optimization, EXPLAIN ANALYZE
- Index types (B-tree, Hash, GiST, GIN, BRIN)
- Partitioning (range, list, hash)
- Custom types, extensions (PostGIS, pgvector)
- Replication (streaming, logical)
- Connection pooling (pgBouncer, PgPool)
- Backup & recovery (pg_dump, WAL archiving)
- Performance tuning (work_mem, shared_buffers)

**MongoDB Advanced:**
- Document design patterns
- Aggregation pipeline optimization
- Indexing strategies
- Sharding, replica sets
- Transactions, ACID guarantees
- Change streams, oplog

**Data Warehousing:**
- Snowflake, BigQuery, Redshift, Databricks
- Schema design (star, snowflake)
- ETL/ELT pipelines
- Slowly changing dimensions
- Data quality monitoring

**Vector Databases:**
- pgvector (PostgreSQL extension)
- Pinecone, Weaviate, Milvus
- Vector embedding storage
- Similarity search optimization
- Dimension reduction techniques

---

#### Category 1.4: DevOps & Infrastructure (150+ skills)

**Containerization:**
- Docker (images, containers, multi-stage builds)
- Docker Compose, Docker Swarm
- Container security scanning
- Registry management (DockerHub, ECR, GAR)

**Orchestration:**
- Kubernetes (core concepts, workloads, services)
- Helm, Kustomize (templating)
- Service mesh (Istio, Linkerd)
- Network policies, security policies
- Operators, Custom Resources (CRDs)
- StatefulSets, DaemonSets, Jobs

**Cloud Platforms:**
- **AWS** (EC2, RDS, Lambda, S3, CloudFront, ECS, EKS)
- **Google Cloud** (Compute Engine, Cloud SQL, Cloud Run, GKE)
- **Azure** (VMs, App Service, Azure SQL, AKS)
- **Heroku, Vercel, Netlify** (PaaS)

**Infrastructure as Code:**
- Terraform, CloudFormation, Pulumi
- Ansible, Chef, Puppet (configuration management)
- GitOps (Flux, ArgoCD)
- State management, drift detection

**Monitoring & Logging:**
- Prometheus, Grafana (metrics & visualization)
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Datadog, New Relic, Splunk
- Application Performance Monitoring (APM)
- Distributed tracing (Jaeger, OpenTelemetry)

**CI/CD:**
- GitHub Actions, GitLab CI, Jenkins
- ArgoCD, Spinnaker (deployment automation)
- Release management, blue-green deployments
- Canary releases, feature flags

**Networking:**
- TCP/IP, DNS, HTTP/HTTPS
- SSL/TLS certificates, PKI
- VPNs, firewalls, WAF
- Load balancing, traffic management
- VPC, subnet design, security groups

---

#### Category 1.5: Mobile Development (150+ skills)

**iOS Development:**
- Swift (language fundamentals, concurrency)
- SwiftUI, UIKit (frameworks)
- Core Data, Realm (databases)
- URLSession, Combine (networking)
- Testing (XCTest, Quick/Nimble)
- App Store deployment

**Android Development:**
- Kotlin (language, coroutines, Flow)
- Jetpack Compose, XML layouts
- Android Architecture Components (MVVM, MVI)
- Room, Realm (databases)
- Retrofit, OkHttp (networking)
- Google Play deployment

**Cross-Platform:**
- React Native (Expo, native modules)
- Flutter (Dart language, widgets, state management)
- Xamarin, Ionic, Cordova
- WebView debugging, native bridge

**Mobile-Specific Skills:**
- Push notifications (FCM, APNs)
- Location services, geofencing
- Offline-first architecture, sync
- Battery optimization, memory management
- App store optimization (ASO)

---

#### Category 1.6: Quality Assurance (100+ skills)

**Automated Testing:**
- Unit testing (Jest, pytest, JUnit, xUnit)
- Integration testing, component testing
- End-to-end testing (Cypress, Selenium, Playwright)
- API testing (Postman, Rest Assured)
- Load testing (JMeter, Locust, k6)
- Chaos engineering (Gremlin, Chaos Mesh)

**Testing Frameworks & Tools:**
- BDD frameworks (Cucumber, Behave)
- Test data management
- Mock frameworks (Mockito, Jest mocks)
- Contract testing (Pact)
- Visual regression testing

**Testing Practices:**
- Test-driven development (TDD)
- Behavior-driven development (BDD)
- Continuous testing
- Test coverage analysis
- Flaky test detection

---

### Domain 2: Data & Analytics (200+ skills)

#### Category 2.1: Data Engineering (80+ skills)

**ETL/ELT Pipelines:**
- Apache Airflow (DAGs, operators, sensors)
- Dbt (data transformation, testing)
- Apache Spark (RDD, DataFrame, SQL, MLlib)
- Talend, Informatica (enterprise tools)
- AWS Glue, Google Cloud Dataflow

**Data Processing:**
- Batch processing (Hadoop, Spark)
- Stream processing (Kafka, Flink, Spark Streaming)
- Change Data Capture (CDC)
- Data validation, data quality checks
- Data lineage, metadata management

**Data Warehousing:**
- Snowflake architecture, optimization
- Dimensional modeling, fact tables
- Slowly changing dimensions (SCD)
- Incremental loading strategies
- Cost optimization

**Real-time Data:**
- Apache Kafka (producers, consumers, streams)
- Apache Flink (stateful processing)
- Redis Streams
- Event sourcing architecture
- CQRS pattern

---

#### Category 2.2: Data Science & ML (120+ skills)

**ML Fundamentals:**
- Supervised learning (regression, classification)
- Unsupervised learning (clustering, dimensionality reduction)
- Feature engineering, feature selection
- Model evaluation (cross-validation, metrics)
- Hyperparameter tuning

**ML Frameworks:**
- TensorFlow, PyTorch, JAX
- Scikit-learn, XGBoost, LightGBM
- Hugging Face Transformers
- OpenCV, scikit-image (computer vision)
- NLTK, spaCy, TextBlob (NLP)

**Deep Learning:**
- Neural networks (CNN, RNN, LSTM, GRU, Transformers)
- Attention mechanisms
- Transfer learning, fine-tuning
- Generative models (GANs, VAE, Diffusion)
- Reinforcement learning

**NLP:**
- Text preprocessing, tokenization
- Word embeddings (Word2Vec, GloVe, FastText)
- Language models (GPT, BERT, T5)
- Named entity recognition, sentiment analysis
- Machine translation, question answering
- Prompt engineering

**Computer Vision:**
- Image classification, object detection
- Semantic segmentation, instance segmentation
- Face recognition, pose estimation
- OCR, document understanding

**MLOps:**
- Model versioning (DVC, MLflow)
- Model serving (TensorFlow Serving, TorchServe)
- Model monitoring, drift detection
- Retraining pipelines
- A/B testing frameworks

**Statistical Analysis:**
- Descriptive statistics, hypothesis testing
- A/B testing, multivariate testing
- Time series analysis (ARIMA, Prophet)
- Causal inference
- Bayesian methods

---

#### Category 2.3: Business Intelligence (80+ skills)

**BI Tools:**
- Tableau, Power BI, Looker
- QlikView, Sisense
- Apache Superset, Metabase, Grafana
- Custom dashboards (D3.js, Recharts, ECharts)

**Analytics:**
- Google Analytics, Amplitude, Mixpanel
- Funnel analysis, cohort analysis
- Attribution modeling
- Customer lifetime value (CLV)
- Churn prediction

**Data Visualization:**
- Chart types (bar, line, scatter, heat map)
- Dashboard design principles
- Interactive visualizations
- Data storytelling
- Accessibility in visualizations

---

### Domain 3: Cloud & Infrastructure (300+ skills)

#### Category 3.1: AWS (150+ skills)

**Core Services:**
- EC2 (instance types, AMIs, security groups)
- RDS (PostgreSQL, MySQL, MariaDB, Oracle)
- S3 (buckets, versioning, lifecycle policies, encryption)
- CloudFront (CDN, caching strategies)
- VPC (subnets, routing, NAT gateways, VPN)
- ECS, EKS (container orchestration)

**Managed Services:**
- Lambda (serverless, cold starts, optimization)
- API Gateway (REST, WebSocket, authorization)
- SQS, SNS (messaging, event-driven)
- DynamoDB (NoSQL, on-demand vs provisioned)
- ElastiCache (Redis, Memcached)

**Security & Compliance:**
- IAM (users, roles, policies, cross-account)
- KMS (key management, encryption)
- Secrets Manager, Parameter Store
- VPC security groups, NACLs
- AWS Shield, WAF
- Compliance (HIPAA, PCI-DSS, SOC 2)

**DevOps & Monitoring:**
- CloudWatch (metrics, logs, alarms)
- Systems Manager (patch management, automation)
- CloudFormation, CDK (IaC)
- CodePipeline, CodeBuild, CodeDeploy

---

#### Category 3.2: Google Cloud (100+ skills)

**Core Services:**
- Compute Engine (VMs, custom machine types)
- Cloud SQL (managed database)
- Cloud Storage (buckets, object lifecycle)
- Cloud CDN
- VPC, Firewall rules, Cloud NAT

**Managed Services:**
- Cloud Run (serverless containers)
- App Engine (PaaS for apps)
- Cloud Functions (event-driven)
- Pub/Sub (messaging)
- Cloud Datastore, Firestore

**Big Data & Analytics:**
- BigQuery (data warehouse, SQL)
- Dataflow (Apache Beam pipelines)
- Dataproc (managed Hadoop/Spark)
- Cloud Composer (managed Airflow)

---

#### Category 3.3: Azure (100+ skills)

**Core Services:**
- Virtual Machines, Virtual Machine Scale Sets
- Azure SQL Database, Database for PostgreSQL
- Blob Storage, Azure CDN
- Virtual Network, Network Security Groups

**Managed Services:**
- App Service (PaaS)
- Azure Functions (serverless)
- Service Bus (messaging)
- Cosmos DB (multi-model database)
- Azure Kubernetes Service (AKS)

---

#### Category 3.4: DevOps Practices (50+ skills)

**Version Control:**
- Git (branching, merging, rebasing, bisect)
- GitHub, GitLab (collaboration, code review)
- Git workflow (GitFlow, trunk-based development)

**Build & Release:**
- Build systems (Maven, Gradle, Make)
- Dependency management
- Artifact repositories (Artifactory, Nexus)
- Release notes, semantic versioning

**Deployment Strategies:**
- Blue-green deployments
- Canary releases
- Rolling deployments
- Feature flags
- Database migrations

---

### Domain 4: Product & Design (150+ skills)

#### Category 4.1: Product Management (80+ skills)

**Product Strategy:**
- Product vision, roadmap planning
- Market research, competitive analysis
- User personas, user journey mapping
- Product-market fit
- Go-to-market strategy

**Execution:**
- Requirements gathering, user stories
- Prioritization frameworks (RICE, MoSCoW)
- Agile/Scrum methodologies
- Sprint planning, backlog management
- Release planning

**Analytics & Metrics:**
- OKRs (Objectives & Key Results)
- North Star metrics
- Funnel analysis, user retention
- Product analytics tools
- Experimentation, A/B testing

**Stakeholder Management:**
- Cross-functional collaboration
- Presentation & communication
- Negotiation, conflict resolution
- Executive presence

---

#### Category 4.2: UX/UI Design (70+ skills)

**Design Principles:**
- User-centered design (UCD)
- Interaction design (IxD)
- Information architecture
- Visual hierarchy, color theory
- Typography, whitespace

**Tools:**
- Figma, Sketch, Adobe XD
- Prototyping (InVision, Framer)
- Design systems, component libraries
- Accessibility (WCAG, screen readers)

**Research Methods:**
- User interviews, usability testing
- Heatmaps, session recordings
- A/B testing, multivariate testing
- Surveys, questionnaires
- Analytics interpretation

---

### Domain 5: Business & Operations (250+ skills)

#### Category 5.1: Finance (80+ skills)

**Accounting:**
- General ledger, chart of accounts
- Financial statements (P&L, balance sheet, cash flow)
- Bookkeeping, reconciliation
- Payroll, tax compliance
- Financial forecasting

**Analysis:**
- Variance analysis, variance explanation
- Cash flow analysis, burn rate
- Profitability analysis
- Pricing strategies
- Financial modeling

**Tools:**
- QuickBooks, Xero, SAP
- Excel financial modeling
- Tableau for financial reporting

---

#### Category 5.2: HR & People Operations (100+ skills)

**Recruitment & Hiring:**
- Job description writing
- Resume screening, interview techniques
- Offer negotiation
- Background checks
- Employer branding

**Employee Development:**
- Performance management
- Training programs, onboarding
- Succession planning
- Career development conversations
- Feedback & coaching

**Compliance:**
- Labor laws (FLSA, FMLA, ADA)
- Anti-discrimination policies
- Data privacy (GDPR, CCPA)
- Benefits administration
- Safety compliance

**Organizational Design:**
- Structure design, org charts
- Compensation equity
- Retention strategies
- Employee engagement

---

#### Category 5.3: Operations (70+ skills)

**Process Management:**
- Process mapping, BPM
- Lean, Six Sigma
- Kaizen, continuous improvement
- Quality assurance
- Supplier management

**Supply Chain:**
- Demand forecasting
- Inventory management
- Logistics, fulfillment
- Procurement
- Vendor management

---

### Domain 6: Sales & Marketing (200+ skills)

#### Category 6.1: Marketing (120+ skills)

**Content Marketing:**
- Blog writing, copywriting
- SEO/SEM optimization
- Content strategy, editorial calendar
- Email marketing (campaigns, segmentation)
- Landing page optimization

**Digital Marketing:**
- Google Ads, Facebook Ads, LinkedIn Ads
- Marketing automation (HubSpot, Marketo)
- CRM systems (Salesforce, Pipedrive)
- Analytics (Google Analytics, Mixpanel)
- Attribution modeling

**Brand & Communications:**
- Brand strategy, positioning
- Brand guidelines, asset creation
- PR, media relations
- Internal communications
- Crisis communications

**Growth & Product Marketing:**
- Growth hacking, viral loops
- Retention marketing
- Product-market fit analysis
- Competitive intelligence
- Market segmentation

---

#### Category 6.2: Sales (80+ skills)

**Sales Process:**
- Lead generation, lead qualification
- Sales prospecting, cold outreach
- Discovery calls, needs analysis
- Sales pitching, demos
- Closing, negotiation
- Account management, upselling

**Sales Tools:**
- CRM systems (Salesforce, HubSpot, Pipedrive)
- Sales intelligence tools
- Contract management
- Proposal software

**Sales Methodology:**
- Consultative selling
- Solution selling
- MEDDIC, BANT frameworks
- Sales forecasting
- Pipeline management

---

### Domain 7: People & Leadership (150+ skills)

#### Category 7.1: Leadership (80+ skills)

**Management:**
- Team building, hiring
- Delegation, accountability
- Performance management
- Career development
- Feedback & coaching

**Strategy & Vision:**
- Strategic planning
- Change management
- Organizational development
- Innovation leadership
- Decision-making

**Communication:**
- Public speaking, presentation
- Executive presence
- Active listening
- Conflict resolution
- Difficult conversations

---

#### Category 7.2: Soft Skills (70+ skills)

**Interpersonal:**
- Collaboration, teamwork
- Communication (written, verbal)
- Emotional intelligence
- Relationship building
- Networking

**Problem-Solving:**
- Critical thinking
- Analytical thinking
- Creativity, innovation
- Systems thinking
- Decision-making

**Personal Development:**
- Time management
- Stress management
- Adaptability, resilience
- Learning agility
- Growth mindset

---

### Domain 8: Soft Skills & Competencies (100+ skills)

**Workplace Competencies:**
- Attention to detail
- Organization
- Reliability
- Initiative, proactivity
- Customer focus
- Result orientation

**Industry-Specific Competencies:**
- Legal/Compliance knowledge
- Domain expertise (finance, healthcare, etc.)
- Regulatory knowledge
- Best practices
- Industry trends

---

## 3. PROFICIENCY LEVELS

Each skill has an associated proficiency level (1-5):

```
Level 1: Foundational
- Has theoretical knowledge
- Limited hands-on experience
- Can perform simple tasks with guidance
- Recently learned or rarely used

Level 2: Intermediate
- Can work independently
- Demonstrates competency in most situations
- Some edge cases may require help
- 1-2 years of active use

Level 3: Advanced/Expert
- Highly skilled, can mentor others
- Handles complex scenarios
- Understands best practices & trade-offs
- 3-5 years of active use

Level 4: Leadership/Specialist
- Deep expertise, recognized expert
- Can architect solutions
- Contributes to industry knowledge
- 5+ years, active innovation

Level 5: Mastery/Authority
- World-class expertise
- Recognized thought leader
- Shapes industry standards
- 10+ years, published work
```

---

## 4. SKILL RELATIONSHIPS & PREREQUISITES

### Prerequisite Skills

Some skills require foundational knowledge:

```
React (Level 2) requires:
├─ JavaScript (Level 3+)
├─ HTML (Level 2+)
├─ CSS (Level 2+)
└─ HTTP/REST (Level 2+)

Kubernetes requires:
├─ Docker (Level 3+)
├─ Linux (Level 2+)
├─ Networking (Level 2+)
└─ DevOps (Level 2+)

Machine Learning requires:
├─ Python (Level 3+)
├─ Linear Algebra (Level 2+)
├─ Statistics (Level 2+)
└─ Data Structures (Level 2+)
```

### Related Skills

Skills that complement each other:

```
PostgreSQL + pgvector + Semantic Search
Node.js + Express + TypeScript + PostgreSQL
React + TypeScript + Tailwind CSS + Jest
FastAPI + SQLAlchemy + PostgreSQL + Pydantic
```

---

## 5. SKILL EXTRACTION & NORMALIZATION

### AI-Powered Skill Extraction (NVIDIA Llama 2)

**Prompt for Resume Parsing:**

```python
system_prompt = """
You are an expert skill extractor. Extract EXACT skills from resumes.

Use ONLY skills from this taxonomy (2000+ skills).
For each extracted skill, provide:
1. Skill name (exact from taxonomy)
2. Proficiency level (1-5)
3. Years of experience
4. Evidence from resume

Return as JSON array.
"""

user_prompt = f"""
Extract all skills from this resume text:

{resume_text}

Match against taxonomy skills. For each skill:
- Must be in the official taxonomy
- Estimate proficiency (1-5) based on context
- Estimate years based on dates mentioned
- Cite evidence from resume

Return JSON:
[
  {{
    "skill": "React",
    "proficiency": 4,
    "years": 5,
    "evidence": "Senior React Developer, built 10+ production apps"
  }},
  ...
]
"""
```

**Skill Normalization Process:**

```
1. Extract raw skill strings from resume
   → "react.js", "reactjs", "React 17/18", "Redux/React"
   
2. Normalize to canonical form
   → ["React", "Redux"]
   
3. Validate against taxonomy
   → ✓ React exists in Technology/Frontend
   → ✓ Redux exists in Technology/Frontend
   
4. Deduplicate variants
   → "JavaScript" + "JS" + "ECMAScript" → "JavaScript"
   
5. Map to taxonomy categories
   → React → Technology > Frontend > Web Frameworks
   
6. Return structured format
   → {skill_id: 123, name: "React", category: "Frontend", proficiency: 4}
```

---

## 6. SKILL VALIDATION & QUALITY

### Skill Extraction Accuracy Targets

| Task | Target Precision | Target Recall | Validation |
|------|-------------------|--|--|
| Identify technical skills | 95%+ | 90%+ | Manual spot-check by domain experts |
| Proficiency estimation | 85%+ | N/A | Compare to job history dates |
| Skill categorization | 98%+ | N/A | Cross-check with taxonomy |

### Quality Assurance Process

```
1. Extract skills with Llama 2
   ↓
2. Validate against taxonomy (1-2000 skills)
   ↓
3. Deduplicate & normalize variants
   ↓
4. Manual review by domain expert (sample 10%)
   ↓
5. Measure precision/recall/F1 score
   ↓
6. Re-train if below target thresholds
```

---

## 7. SKILL ENDORSEMENT & VERIFICATION

### Self-Assessment vs Verified Skills

```
Self-Assessed (from resume/profile):
- User claims skill
- Trust score: Low (50%)
- Used for matching, with discount

Verified by Others:
- LinkedIn endorsements, references
- Portfolio evidence
- Interview-based assessment
- Trust score: High (85-100%)
- Used for premium matching

Tested/Certified:
- Passed coding challenges (LeetCode, HackerRank)
- Passed certifications (AWS, GCP, Azure)
- Work samples, GitHub contributions
- Trust score: Very High (95%+)
- Weighted 2-3x in matching
```

---

## 8. INDUSTRY-SPECIFIC SKILL SETS

### Software Engineer (Full-Stack)

**Critical Skills** (must-have):
- JavaScript/TypeScript (Level 3+)
- React or equivalent frontend framework (Level 3+)
- Node.js or Python backend (Level 3+)
- PostgreSQL or equivalent database (Level 3+)
- Git, version control (Level 2+)
- REST APIs, API design (Level 2+)
- HTML, CSS (Level 2+)

**Important Skills** (should-have):
- Docker, containerization (Level 2+)
- Kubernetes or orchestration (Level 2)
- Testing (Jest, Pytest) (Level 2+)
- SQL optimization (Level 2)
- DevOps basics (Level 2)
- System design (Level 2)

**Nice-to-Have Skills:**
- GraphQL (Level 2)
- Microservices (Level 2)
- Event-driven architecture (Level 2)
- Security best practices (Level 2)
- AWS/GCP (Level 2)
- Machine Learning basics (Level 1)

---

### Data Engineer

**Critical Skills:**
- Python or Java (Level 3+)
- SQL, database design (Level 3+)
- Apache Spark or equivalent (Level 3+)
- ETL/ELT pipelines (Level 3+)
- Data warehousing concepts (Level 2+)

**Important Skills:**
- Apache Kafka or streaming (Level 2+)
- Cloud platforms (AWS/GCP/Azure) (Level 2+)
- Dbt or equivalent transformation (Level 2)
- Docker (Level 2)
- Git (Level 2)

---

### Product Manager

**Critical Skills:**
- Product strategy & vision (Level 3+)
- User research, discovery (Level 3+)
- Roadmap planning & prioritization (Level 3+)
- Analytics, data interpretation (Level 3+)
- Agile/Scrum (Level 2+)

**Important Skills:**
- Communication, storytelling (Level 3+)
- A/B testing, experimentation (Level 2+)
- Technical literacy (Level 2)
- Design thinking (Level 2)
- Stakeholder management (Level 2)

---

## 9. SKILL MARKETABILITY & TRENDING

### Market Demand Scoring

```
Each skill has a score (1-100) representing job market demand:

Very High Demand (80-100):
- React, Python, JavaScript
- AWS, Kubernetes, Docker
- PostgreSQL, SQL
- System Design
- Machine Learning

High Demand (60-79):
- Vue.js, Angular
- Java, Go, Rust
- MongoDB, Redis
- CI/CD, GitOps
- Product management

Medium Demand (40-59):
- Ember.js, Backbone.js
- COBOL, Fortran (legacy)
- Cassandra, HBase
- Older AWS services
- Legacy system knowledge

Low/Declining (< 40):
- Flash, Silverlight (deprecated)
- Internet Explorer support
- Older Python versions
```

### Skill Growth Prediction

Track trends over time:

```
JavaScript: Growth +2% YoY (plateau, very high base)
Python: Growth +8% YoY (still rising, general purpose)
Rust: Growth +15% YoY (emerging, high growth)
COBOL: Growth -5% YoY (declining, legacy systems)
```

---

## 10. SKILL MATCHING ALGORITHM

### Resume-to-Job Skill Matching

```
For each job requirement:
  extracted_skills = get_resume_skills()
  required_skills = get_job_requirements()
  
  for req_skill in required_skills:
    if req_skill in extracted_skills:
      match_score += 1
    elif similar_skill(req_skill, extracted_skills):
      match_score += 0.7  # Partial credit for related skills
  
  overall_score = match_score / total_requirements
  
Return match_score (0-1), missing_skills, confidence_level
```

### Skill Gap Analysis

```
For career advancement:
  current_skills = user.skills
  target_role = input.target_role
  required_skills = taxonomy.get_role_skills(target_role)
  
  missing_skills = required_skills - current_skills
  weak_skills = [s for s in required_skills if user[s].proficiency < 3]
  
  priority_gaps = rank_by_importance(missing_skills)
  learning_path = generate_learning_path(priority_gaps)
  
Return learning_path with resources, timeline, difficulty
```

---

## 11. DATABASE SCHEMA

```sql
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  domain_id INT REFERENCES skill_domains(id),
  category_id INT REFERENCES skill_categories(id),
  group_id INT REFERENCES skill_groups(id),
  description TEXT,
  marketplace_demand INT (0-100),
  growth_trend FLOAT (-20 to +20),
  prerequisites JSONB,  -- Array of skill_ids
  related_skills JSONB, -- Array of skill_ids
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE skill_endorsements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  skill_id INT REFERENCES skills(id),
  proficiency_level INT (1-5),
  years_experience INT,
  verified BOOLEAN DEFAULT false,
  verification_type VARCHAR(50), -- 'self', 'endorsement', 'test', 'certification'
  evidence_url TEXT,
  trust_score FLOAT (0-1),
  endorsed_by_count INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, skill_id)
);

CREATE TABLE skill_synonyms (
  id SERIAL PRIMARY KEY,
  canonical_skill_id INT REFERENCES skills(id),
  synonym VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE role_skill_requirements (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(255),
  skill_id INT REFERENCES skills(id),
  proficiency_required INT (1-5),
  importance INT (1-5),  -- Critical, Important, Nice-to-have
  percentage_jobs_requiring FLOAT
);
```

---

## 12. IMPLEMENTATION ROADMAP

### Phase 1: Core Taxonomy (Week 1-2)
- [ ] Define 8 domains + 45 categories
- [ ] Create base skill list (2000+ skills)
- [ ] Build skill synonyms mapping
- [ ] Create database schema

### Phase 2: Skill Extraction (Week 3-4)
- [ ] Train NVIDIA Llama prompt for skill extraction
- [ ] Build normalization pipeline
- [ ] Create skill validator against taxonomy
- [ ] Test on 500+ resumes, measure precision/recall

### Phase 3: Job Matching (Week 5-6)
- [ ] Implement skill gap detection
- [ ] Build job-to-candidate matching algorithm
- [ ] Create candidate ranking by job fit
- [ ] Test with recruiter feedback

### Phase 4: Career Coaching (Week 7)
- [ ] Build learning path generator
- [ ] Create skill recommendations for advancement
- [ ] Add market demand & trending data
- [ ] Generate NVIDIA-powered advice

### Phase 5: Quality & Optimization (Week 8)
- [ ] Measure extraction accuracy (target: 95%+)
- [ ] Optimize for speed (target: <500ms per resume)
- [ ] A/B test matching algorithm
- [ ] Fine-tune prompts based on feedback

---

## 13. NVIDIA PROMPT FOR SKILL EXTRACTION

```python
SKILL_EXTRACTION_PROMPT = """
You are an expert HR analyst and recruiter. Extract skills from resumes with high precision.

IMPORTANT INSTRUCTIONS:
1. Extract ONLY skills that are in the provided taxonomy (don't invent skills)
2. For each skill, estimate proficiency level (1-5) based on context
3. Match variant names to canonical skills (e.g., "JavaScript" not "JS")
4. Include years of experience if mentioned
5. Provide evidence from resume for each skill

SKILL TAXONOMY CATEGORIES:
- Technology & Programming: React, Python, JavaScript, Java, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, etc.
- Data & Analytics: Python, Spark, Kafka, ETL, SQL, Tableau, BigQuery, etc.
- Cloud & Infrastructure: AWS, GCP, Azure, Terraform, Jenkins, Kubernetes, etc.
- Product & Design: Product Strategy, User Research, A/B Testing, Figma, etc.
- Business & Operations: Project Management, Scrum, Process Improvement, etc.
- Sales & Marketing: Sales Strategy, Content Marketing, Google Ads, CRM, etc.
- People & Leadership: Team Management, Strategic Planning, Communication, etc.
- Soft Skills: Problem-Solving, Communication, Adaptability, Critical Thinking, etc.

Extract skills and return as JSON array:

[
  {
    "skill": "React",
    "category": "Technology & Programming / Frontend",
    "proficiency_level": 4,
    "years_experience": 5,
    "evidence": "Led React architecture for 10+ production applications. Expert in hooks, context API, performance optimization."
  },
  {
    "skill": "Python",
    "category": "Technology & Programming / Backend",
    "proficiency_level": 3,
    "years_experience": 3,
    "evidence": "Built backend APIs using Python and FastAPI. Experience with Django and Flask."
  },
  ...
]

Resume:
{resume_text}

Extract all relevant skills now:
"""
```

---

## 14. SUCCESS METRICS

- **Skill Extraction Accuracy:** 95%+ (measure vs manual review)
- **Job-to-Candidate Match Relevance:** 85%+ recruiter satisfaction
- **Skill Recommendation Usefulness:** 80%+ users find advice actionable
- **Career Advancement Success:** Track if users learn recommended skills
- **Taxonomy Coverage:** 99% of job postings covered by taxonomy

---

This comprehensive taxonomy ensures world-class AI matching and career guidance.
