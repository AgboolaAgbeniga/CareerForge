import { AppShell } from '@/components/AppShell'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quickstart Guide | CareerForge Documentation',
  description: 'Get CareerForge running locally in under 10 minutes. Complete setup guide for frontend, backend API, AI services, and database.',
  openGraph: {
    title: 'CareerForge Quickstart Guide',
    description: 'Get CareerForge running locally in under 10 minutes',
    type: 'website',
  },
}

export default function QuickstartPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Quickstart Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Get CareerForge running locally in under 10 minutes
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">What You'll Build</h3>
            <p>
              By the end of this guide, you'll have a fully functional CareerForge instance running locally, 
              complete with the frontend, backend API, AI services, and database.
            </p>
          </div>

          <h2>Prerequisites</h2>
          <p>Before you begin, ensure you have the following installed:</p>
          <ul>
            <li><strong>Node.js 18+</strong> - Download from{' '}
              <a 
                href="https://nodejs.org/" 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                nodejs.org
              </a>
            </li>
            <li><strong>npm or yarn</strong> - Package manager (comes with Node.js)</li>
            <li><strong>Docker Desktop</strong> - For running the database and AI services</li>
            <li><strong>Git</strong> - For version control</li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">System Requirements</h4>
            <ul className="text-yellow-700 dark:text-yellow-300">
              <li>At least 4GB of RAM available</li>
              <li>10GB of free disk space</li>
              <li>Docker Desktop running with at least 2GB allocated</li>
            </ul>
          </div>

          <h2>Step 1: Clone the Repository</h2>
          <p>First, clone the CareerForge repository and navigate to the project directory:</p>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`git clone https://github.com/careerforge/careerforge.git
cd careerforge`}</code>
            </pre>
          </div>

          <h2>Step 2: Install Dependencies</h2>
          <p>Install all required dependencies for the entire project:</p>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..

# Install AI services dependencies
cd ai && pip install -r requirements.txt && cd ..`}</code>
            </pre>
          </div>

          <h2>Step 3: Environment Setup</h2>
          <p>Copy the environment template files and configure them:</p>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Copy environment templates
cp .env.example .env
cp backend/.env.example backend/.env
cp ai/.env.example ai/.env`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Environment Configuration</h4>
            <p className="text-blue-700 dark:text-blue-300 mb-2">
              The default configuration should work for local development. For production deployment, 
              you'll need to update the database URLs and API keys.
            </p>
            <ul className="text-blue-700 dark:text-blue-300">
              <li><strong>Database:</strong> PostgreSQL connection string</li>
              <li><strong>JWT Secret:</strong> Secret key for authentication</li>
              <li><strong>OpenAI API Key:</strong> Required for AI features (optional for basic setup)</li>
            </ul>
          </div>

          <h2>Step 4: Start the Database</h2>
          <p>Start PostgreSQL using Docker Compose:</p>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Start PostgreSQL database
docker-compose up -d postgres`}</code>
            </pre>
          </div>

          <p>Wait for the database to be ready (about 30 seconds), then run migrations:</p>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Run database migrations
cd backend
npm run migrate
cd ..`}</code>
            </pre>
          </div>

          <h2>Step 5: Start All Services</h2>
          <p>Now let's start all the services. Open four terminal windows or use a process manager:</p>

          <h3>Terminal 1: Frontend (Next.js)</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`cd frontend
npm run dev`}</code>
            </pre>
          </div>

          <h3>Terminal 2: Backend API</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`cd backend
npm run dev`}</code>
            </pre>
          </div>

          <h3>Terminal 3: AI Services</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`cd ai
# Start all AI services
npm run services:dev`}</code>
            </pre>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Service Ports</h4>
            <ul className="text-green-700 dark:text-green-300">
              <li><strong>Frontend:</strong> http://localhost:3000</li>
              <li><strong>Backend API:</strong> http://localhost:5000</li>
              <li><strong>Resume Parser:</strong> http://localhost:8001</li>
              <li><strong>Matching Engine:</strong> http://localhost:8002</li>
              <li><strong>Career Coach:</strong> http://localhost:8003</li>
              <li><strong>Database:</strong> localhost:5432</li>
            </ul>
          </div>

          <h2>Step 6: Verify the Setup</h2>
          <p>Open your browser and visit the following URLs to verify everything is working:</p>
          <ol>
            <li><strong>Frontend:</strong> <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a></li>
            <li><strong>Backend Health Check:</strong> <a href="http://localhost:5000/health" className="text-primary hover:underline">http://localhost:5000/health</a></li>
            <li><strong>API Documentation:</strong> <a href="http://localhost:5000/api-docs" className="text-primary hover:underline">http://localhost:5000/api-docs</a></li>
          </ol>

          <h2>Step 7: Create Your First User</h2>
          <p>Visit the frontend application and create your first user account:</p>
          <ol>
            <li>Go to <a href="http://localhost:3000/auth/signup" className="text-primary hover:underline">http://localhost:3000/auth/signup</a></li>
            <li>Fill in your details and submit the form</li>
            <li>Check your email for verification (if email verification is enabled)</li>
            <li>Sign in at <a href="http://localhost:3000/auth/login" className="text-primary hover:underline">http://localhost:3000/auth/login</a></li>
          </ol>

          <h2>Common Issues and Troubleshooting</h2>

          <h3>Database Connection Issues</h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
            <p className="text-red-700 dark:text-red-300 mb-2">
              If you see "connection refused" errors:
            </p>
            <ul className="text-red-700 dark:text-red-300">
              <li>Ensure Docker Desktop is running</li>
              <li>Wait for PostgreSQL to fully start (30-60 seconds)</li>
              <li>Check the database logs: <code>docker-compose logs postgres</code></li>
            </ul>
          </div>

          <h3>Port Already in Use</h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
            <p className="text-red-700 dark:text-red-300 mb-2">
              If ports are already in use:
            </p>
            <ul className="text-red-700 dark:text-red-300">
              <li>Kill processes on ports: <code>lsof -ti:3000 | xargs kill -9</code></li>
              <li>Or change ports in the environment files</li>
            </ul>
          </div>

          <h3>AI Services Not Starting</h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
            <p className="text-red-700 dark:text-red-300 mb-2">
              If AI services fail to start:
            </p>
            <ul className="text-red-700 dark:text-red-300">
              <li>Ensure Python 3.8+ is installed</li>
              <li>Check AI service logs: <code>cd ai && npm run logs</code></li>
              <li>Install missing dependencies: <code>pip install -r requirements.txt</code></li>
            </ul>
          </div>

          <h2>Next Steps</h2>
          <p>Congratulations! You now have a fully functional CareerForge instance running locally. Here's what you can do next:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Explore the Code</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Review the{' '}
                  <Link href="/docs/architecture" className="text-primary hover:underline">
                    system architecture
                  </Link>
                </li>
                <li>• Check out the{' '}
                  <Link href="/docs/backend-api/introduction" className="text-primary hover:underline">
                    API documentation
                  </Link>
                </li>
                <li>• Understand the{' '}
                  <Link href="/docs/backend-api/introduction" className="text-primary hover:underline">
                    data layer
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Customize CareerForge</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Modify the UI theme and branding</li>
                <li>• Add custom fields to user profiles</li>
                <li>• Integrate with external job boards</li>
                <li>• Set up email notifications</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Deploy to Production</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Follow our deployment guide</li>
                <li>• Configure production environment variables</li>
                <li>• Set up SSL certificates</li>
                <li>• Configure monitoring and logging</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Contribute</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Read our{' '}
                  <Link href="/docs/resources/support" className="text-primary hover:underline">
                    contribution guide
                  </Link>
                </li>
                <li>• Report bugs or request features</li>
                <li>• Improve documentation</li>
                <li>• Submit pull requests</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <p className="mb-4">
              If you encounter any issues or have questions, don't hesitate to reach out:
            </p>
            <ul className="space-y-2">
              <li>• Check the{' '}
                <Link href="/docs/resources/support" className="text-primary hover:underline">
                  support page
                </Link>
              </li>
              <li>• Browse{' '}
                <Link href="/docs/resources/examples" className="text-primary hover:underline">
                  code examples
                </Link>
              </li>
              <li>• Visit our{' '}
                <a 
                  href="https://github.com/careerforge/careerforge" 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View CareerForge on GitHub (opens in new tab)"
                >
                  GitHub repository
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  )
}