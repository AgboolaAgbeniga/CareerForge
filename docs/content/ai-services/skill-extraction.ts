import { PageContent } from '@/lib/content-types'

export const skillExtractionContent: PageContent = {
  metadata: {
    title: "Skill Extraction",
    description: "Advanced AI for extracting and categorizing skills from resumes, job descriptions, and text content",
    version: "2.4.0",
    lastUpdated: "2025-12-27",
    authors: ["AI Engineering Team"],
    tags: ["skill extraction", "NLP", "taxonomy", "competency mapping"],
    difficulty: "intermediate",
    estimatedTime: 18
  },
  tableOfContents: [
    { id: "extraction-overview", title: "Skill Extraction Overview", level: 1 },
    { id: "taxonomy", title: "Skill Taxonomy", level: 1 },
    { id: "algorithms", title: "Extraction Algorithms", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Intelligent Skill Extraction",
    content: `CareerForge's skill extraction service automatically identifies, categorizes, and normalizes skills from various text sources using advanced NLP techniques.`
  },
  sections: [
    {
      id: "extraction-overview",
      title: "Skill Extraction Overview",
      content: `Extracts technical and soft skills from resumes, job descriptions, and other career-related content with high accuracy and comprehensive coverage.`
    },
    {
      id: "taxonomy",
      title: "Skill Taxonomy",
      content: `Uses a hierarchical skill taxonomy covering programming languages, frameworks, tools, soft skills, and domain-specific competencies.`
    },
    {
      id: "algorithms",
      title: "Extraction Algorithms",
      content: `Combines rule-based approaches, machine learning models, and transformer-based architectures for robust skill identification.`
    }
  ],
  nextSteps: {
    title: "Explore Related Services",
    links: [
      {
        text: "Resume Parsing Service",
        href: "/docs/ai-services/resume-parsing",
        description: "Learn how skill extraction integrates with resume parsing"
      }
    ]
  },
  relatedResources: [
    {
      text: "API Documentation",
      href: "/docs/backend-api/skills",
      description: "Skill extraction API reference"
    }
  ]
}