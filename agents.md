# CareerForge AI Agents & Skills Architecture

CareerForge is heavily powered by AI, operating on two distinct fronts:
1. **Internal Application Agents**: The AI services running on the backend that power the product features.
2. **Development Skills**: The local IDE Agent Skills (via `skills.sh`) installed to assist in building the product.

---

## 1. Internal Application Agents (Backend Services)
These agents reside in `backend/ai/` and utilize **NVIDIA NIM (Llama 3.1 Nemotron 70B)** combined with strict XML/JSON prompt engineering.

### Career Coach Agent (`career_coach/`)
- **Capabilities**: Provides personalized career advice, optimizes LinkedIn profiles, generates cover letters, and analyzes skill gaps.
- **Tools**: Generates structured JSON roadmaps and actionable feedback based on target roles.

### Matching Engine (`matching_engine/`)
- **Capabilities**: Hybrid job-candidate matching.
- **Tech**: Uses `pgvector` with `vector_cosine_ops` (Cosine Similarity) for semantic similarity, blended with a scalar CTE system to produce a weighted composite score (vector similarity + metadata filters).

### Resume Parser (`resume_parser/`)
- **Capabilities**: Ingests unstructured candidate documents and extracts robust, normalized Pydantic JSON schemas.
- **Resilience**: Features exponential backoff (`tenacity`) to gracefully handle rate limits, and anonymizes profiles to remove PII.

### Verification & Scraper Agent (`verification/`)
- **Capabilities**: Validates candidate credentials and fetches company intel.
- **Tools**: Integrates `agent-browser` logic. Can scrape public GitHub profiles and DuckDuckGo search results when official API keys (GitHub/Clearbit) are unavailable.

### Assessment Agent
- **Capabilities**: Conducts mock behavioral and technical interview prep, providing real-time feedback based on STAR methodologies.

---

## 2. Development Agent Skills (IDE Integrations)
These are local capabilities added via `npx skills add` to enhance the developer agent's ability to maintain the codebase.

### UI/UX & Design Skills
- **`ui-ux-pro-max`**: Provides high-level UX guidelines, color palettes, spacing systems, and accessibility checks.
- **`frontend-design`**: (Anthropic/Claude) Ensures modern, production-grade frontend component generation, avoiding generic AI aesthetics.
- **`tailwind-design-system`**: Enforces scalable design tokens and Tailwind CSS best practices.
- **`shadcn`**: Manages the integration, composition, and debugging of `shadcn/ui` components automatically.

### Browser Automation
- **`agent-browser`**: Used both internally for scraping and externally by the agent to test and visually parse the UI.
