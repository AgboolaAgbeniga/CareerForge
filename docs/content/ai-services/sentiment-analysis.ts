import { PageContent } from '@/lib/content-types'

export const sentimentAnalysisContent: PageContent = {
  metadata: {
    title: "Sentiment Analysis",
    description: "AI-powered sentiment analysis for understanding candidate feedback, job descriptions, and user interactions",
    version: "2.4.0",
    lastUpdated: "2025-12-27",
    authors: ["AI Engineering Team"],
    tags: ["sentiment analysis", "NLP", "feedback analysis", "emotion detection"],
    difficulty: "intermediate",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "sentiment-overview", title: "Sentiment Analysis Overview", level: 1 },
    { id: "algorithms", title: "Analysis Algorithms", level: 1 },
    { id: "applications", title: "Applications", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Understanding Sentiment in Career Services",
    content: `Sentiment analysis helps CareerForge understand emotional context in candidate feedback, job descriptions, and user interactions to improve matching and user experience.`
  },
  sections: [
    {
      id: "sentiment-overview",
      title: "Sentiment Analysis Overview",
      content: `Analyzes text to determine emotional tone and sentiment, helping understand user satisfaction and content emotional impact.`
    },
    {
      id: "algorithms",
      title: "Analysis Algorithms",
      content: `Uses transformer-based models fine-tuned for sentiment classification with domain-specific training on career-related content.`
    },
    {
      id: "applications",
      title: "Applications",
      content: `Applied to candidate feedback, interview responses, job description tone analysis, and user interaction sentiment tracking.`
    }
  ],
  nextSteps: {
    title: "Explore Related Services",
    links: [
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
      href: "/docs/backend-api/sentiment",
      description: "Sentiment analysis API reference"
    }
  ]
}