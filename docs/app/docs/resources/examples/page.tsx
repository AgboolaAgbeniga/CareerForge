import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Code, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  Play, 
  FileText,
  Database,
  Search,
  Users,
  Settings,
  Zap,
  Shield,
  ArrowRight,
  Github
} from 'lucide-react'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Examples & Tutorials | CareerForge Documentation',
  description: 'Complete examples, tutorials, and implementation guides for CareerForge recruitment platform.',
  openGraph: {
    title: 'CareerForge Examples & Tutorials',
    description: 'Code examples and implementation tutorials for CareerForge',
    type: 'website',
  },
}

const codeExamples = [
  {
    title: 'Basic Job Posting',
    description: 'Create and manage job postings with comprehensive details',
    language: 'javascript',
    category: 'Core Features',
    difficulty: 'Beginner',
    code: `// Create a new job posting
const jobPosting = await careerforge.jobs.create({
  title: 'Senior Software Engineer',
  department: 'Engineering',
  location: 'San Francisco, CA',
  type: 'full-time',
  experience_level: 'senior',
  salary_range: {
    min: 120000,
    max: 180000,
    currency: 'USD'
  },
  description: \`
    We are looking for a Senior Software Engineer to join our growing team.
    
    Requirements:
    • 5+ years of experience in software development
    • Proficiency in JavaScript, React, Node.js
    • Experience with cloud platforms (AWS, Azure)
    • Strong problem-solving skills
  \`,
  requirements: [
    'Bachelor\'s degree in Computer Science or related field',
    '5+ years of software development experience',
    'Proficiency in JavaScript and modern frameworks',
    'Experience with cloud platforms'
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'TypeScript'],
  benefits: [
    'Competitive salary and equity',
    'Health, dental, and vision insurance',
    '401(k) with company matching',
    'Flexible working hours'
  ]
});

console.log('Job posting created:', jobPosting.id);`
  },
  {
    title: 'Resume Parsing & Analysis',
    description: 'Extract and analyze resume data using AI-powered parsing',
    language: 'python',
    category: 'AI Features',
    difficulty: 'Intermediate',
    code: `from careerforge import ResumeParser
import json

# Initialize the resume parser
parser = ResumeParser()

# Parse a resume file
resume_data = parser.parse_file('path/to/resume.pdf')

# Access parsed information
print(f"Name: {resume_data.name}")
print(f"Email: {resume_data.email}")
print(f"Phone: {resume_data.phone}")
print(f"Skills: {resume_data.skills}")
print(f"Experience: {len(resume_data.experience)} positions")

# Analyze resume quality and fit
analysis = parser.analyze_fit(
    resume_data=resume_data,
    job_requirements={
        'required_skills': ['JavaScript', 'React', 'Node.js'],
        'min_experience_years': 3,
        'education_level': 'bachelor'
    }
)

print(f"Fit Score: {analysis.fit_score}/100")
print(f"Missing Skills: {analysis.missing_skills}")
print(f"Recommendations: {analysis.recommendations}")`
  },
  {
    title: 'Candidate Matching System',
    description: 'Intelligent matching between candidates and job opportunities',
    language: 'javascript',
    category: 'AI Features',
    difficulty: 'Advanced',
    code: `// Find the best candidates for a job
const jobPosting = await careerforge.jobs.get('job-id-123');
const candidates = await careerforge.candidates.list({
  status: 'active',
  location: jobPosting.location,
  experience_level: jobPosting.experience_level
});

// Perform intelligent matching
const matches = await careerforge.matching.findMatches({
  job_id: jobPosting.id,
  candidate_ids: candidates.map(c => c.id),
  criteria: {
    skills_match_weight: 0.4,
    experience_match_weight: 0.3,
    location_preference: 0.2,
    salary_alignment: 0.1
  },
  min_match_score: 0.7
});

// Sort by match score and get top candidates
const topCandidates = matches
  .sort((a, b) => b.match_score - a.match_score)
  .slice(0, 10);

topCandidates.forEach(candidate => {
  console.log(\`\${candidate.candidate.name} - Score: \${candidate.match_score}\`);
  console.log(\`Skills Match: \${candidate.skill_match}%\`);
  console.log(\`Experience Match: \${candidate.experience_match}%\`);
});`
  },
  {
    title: 'API Authentication',
    description: 'Secure API access with authentication and authorization',
    language: 'bash',
    category: 'Security',
    difficulty: 'Beginner',
    code: `# Set up API authentication
export CAREERFORGE_API_KEY="your-api-key-here"
export CAREERFORGE_API_SECRET="your-api-secret-here"

# Make authenticated API request
curl -X GET "https://api.careerforge.ai/v1/jobs" \\
  -H "Authorization: Bearer $CAREERFORGE_API_KEY" \\
  -H "Content-Type: application/json"

# JavaScript example with fetch
const response = await fetch('https://api.careerforge.ai/v1/jobs', {
  headers: {
    'Authorization': \`Bearer \${process.env.CAREERFORGE_API_KEY}\`,
    'Content-Type': 'application/json'
  }
});

const jobs = await response.json();`
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track recruitment metrics and performance analytics',
    language: 'javascript',
    category: 'Analytics',
    difficulty: 'Intermediate',
    code: `// Get recruitment analytics
const analytics = await careerforge.analytics.getDashboard({
  time_range: 'last_30_days',
  metrics: [
    'applications_received',
    'candidates_screened',
    'interviews_scheduled',
    'offers_made',
    'hires_completed'
  ]
});

console.log('Applications:', analytics.applications_received);
console.log('Conversion Rate:', analytics.conversion_rate + '%');

// Track individual candidate journey
const candidateJourney = await careerforge.analytics.getCandidateJourney(
  'candidate-id-123'
);

console.log('Current Stage:', candidateJourney.current_stage);
console.log('Time in Stage:', candidateJourney.days_in_stage);
console.log('Next Action:', candidateJourney.recommended_actions);`
  },
  {
    title: 'Bulk Operations',
    description: 'Efficiently process multiple candidates or jobs',
    language: 'python',
    category: 'Core Features',
    difficulty: 'Advanced',
    code: `from careerforge import BulkProcessor
import pandas as pd

# Load candidate data from CSV
df = pd.read_csv('candidates.csv')
candidate_data = df.to_dict('records')

# Bulk create candidates
processor = BulkProcessor()

# Process in batches for better performance
batch_size = 100
results = []

for i in range(0, len(candidate_data), batch_size):
    batch = candidate_data[i:i + batch_size]
    
    result = await processor.create_candidates(
        candidates=batch,
        validate_data=True,
        skip_duplicates=True
    )
    
    results.append(result)
    print(f"Processed batch {i//batch_size + 1}")

# Get summary of bulk operations
summary = processor.get_summary()
print(f"Total processed: {summary.total_processed}")
print(f"Successful: {summary.successful}")
print(f"Failed: {summary.failed}")
print(f"Skipped: {summary.skipped}")`
  }
];

const tutorials = [
  {
    title: 'Getting Started with CareerForge',
    description: 'Complete guide to setting up and using CareerForge for the first time',
    duration: '15 minutes',
    difficulty: 'Beginner',
    steps: [
      'Account setup and API key generation',
      'Your first job posting',
      'Processing resumes',
      'Basic candidate matching'
    ],
    link: '/docs/quickstart'
  },
  {
    title: 'Building an Applicant Tracking System',
    description: 'Create a complete ATS using CareerForge APIs',
    duration: '45 minutes',
    difficulty: 'Intermediate',
    steps: [
      'Design your ATS architecture',
      'Implement job posting workflows',
      'Build candidate screening process',
      'Create interview scheduling system',
      'Add reporting and analytics'
    ],
    link: '/docs/tutorials/ats-building'
  },
  {
    title: 'AI-Powered Resume Screening',
    description: 'Implement intelligent resume analysis and ranking',
    duration: '30 minutes',
    difficulty: 'Advanced',
    steps: [
      'Set up resume parsing service',
      'Configure AI analysis parameters',
      'Build screening workflows',
      'Implement bias-free ranking',
      'Add human review processes'
    ],
    link: '/docs/tutorials/ai-screening'
  },
  {
    title: 'Integration with HR Systems',
    description: 'Connect CareerForge with existing HR tools and systems',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    steps: [
      'API authentication setup',
      'Data synchronization patterns',
      'Webhook implementation',
      'Error handling and retry logic',
      'Testing and validation'
    ],
    link: '/docs/tutorials/hr-integration'
  }
];

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState('examples');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Core Features': return <FileText className="h-4 w-4" />;
      case 'AI Features': return <Zap className="h-4 w-4" />;
      case 'Security': return <Shield className="h-4 w-4" />;
      case 'Analytics': return <Database className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Examples & Tutorials
          </h1>
          <p className="text-xl text-muted-foreground">
            Practical examples, code snippets, and step-by-step tutorials to help you build with CareerForge
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('examples')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'examples'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Code className="h-4 w-4 inline mr-2" />
              Code Examples
            </button>
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tutorials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Play className="h-4 w-4 inline mr-2" />
              Tutorials
            </button>
          </nav>
        </div>

        {activeTab === 'examples' && (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg mb-8">
              Here are practical code examples showing how to implement common CareerForge features. 
              Each example includes complete, working code that you can adapt for your use case.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {codeExamples.map((example, index) => (
                <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(example.category)}
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {example.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(example.difficulty)}`}>
                            {example.difficulty}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                    </div>

                    <div className="relative">
                      <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{example.code}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(example.code, `example-${index}`)}
                        className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background rounded-md transition-colors"
                        title="Copy code"
                      >
                        {copiedCode === `example-${index}` ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {example.language}
                      </span>
                      <a
                        href={`https://github.com/careerforge/careerforge/tree/main/examples/${example.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-xs text-primary hover:underline flex items-center"
                      >
                        View on GitHub
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold mb-4">Need More Examples?</h3>
              <p className="text-muted-foreground mb-4">
                We're constantly adding new examples and tutorials. Can't find what you're looking for?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/careerforge/careerforge/tree/main/examples"
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Browse All Examples
                </a>
                <a
                  href="/docs/resources/support"
                  className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  Request Example
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tutorials' && (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg mb-8">
              Step-by-step tutorials that walk you through building complete solutions with CareerForge. 
              Each tutorial includes detailed explanations, code samples, and best practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                      {tutorial.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">{tutorial.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">What you'll learn:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tutorial.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href={tutorial.link}
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    Start Tutorial
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold mb-4">Interactive Learning</h3>
              <p className="text-muted-foreground mb-4">
                Prefer hands-on learning? Try our interactive coding environment where you can experiment 
                with CareerForge APIs without setting up a local development environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Try Interactive Tutorial
                </a>
                <a
                  href="/docs/resources/support"
                  className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  Get Tutorial Help
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>

            <h2>Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <Database className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">API Reference</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete API documentation with request/response examples and authentication guides.
                </p>
                <Link href="/docs/resources/api-reference" className="text-primary hover:underline text-sm font-medium">
                  View API Reference →
                </Link>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <Users className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">Community Examples</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See how other developers are using CareerForge and share your own implementations.
                </p>
                <a href="#" className="text-green-600 hover:underline text-sm font-medium">
                  Join Community →
                </a>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <Settings className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn industry best practices for building scalable recruitment solutions.
                </p>
                <Link href="/docs/architecture" className="text-purple-600 hover:underline text-sm font-medium">
                  Architecture Guide →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}