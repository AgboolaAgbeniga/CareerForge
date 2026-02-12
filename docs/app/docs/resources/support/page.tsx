import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  MessageCircle, 
  Mail, 
  Book, 
  Github, 
  Users, 
  Bug, 
  Lightbulb,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support & Community | CareerForge Documentation',
  description: 'Get help with CareerForge, report issues, contribute to the project, and connect with our community.',
  openGraph: {
    title: 'CareerForge Support & Community',
    description: 'Help, support, and community resources for CareerForge',
    type: 'website',
  },
}

export default function SupportPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Support & Community
          </h1>
          <p className="text-xl text-muted-foreground">
            Get help, report issues, and connect with the CareerForge community
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Get Help</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Documentation</h3>
                  <div className="text-sm text-gray-600">Self-service help</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Browse our comprehensive documentation, guides, and API reference.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Getting started guides</li>
                <li>• API documentation</li>
                <li>• Code examples</li>
                <li>• Troubleshooting tips</li>
              </ul>
              <Link href="/docs/quickstart" className="text-blue-600 hover:underline text-sm font-medium">
                Browse Documentation →
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community Forum</h3>
                  <div className="text-sm text-gray-600">Ask questions</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Connect with other developers and get help from our community.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Q&A discussions</li>
                <li>• Best practices sharing</li>
                <li>• Feature discussions</li>
                <li>• Community support</li>
              </ul>
              <a href="#" className="text-green-600 hover:underline text-sm font-medium">
                Join Community →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <div className="text-sm text-gray-600">Direct help</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get personalized help from our support team for complex issues.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Technical support</li>
                <li>• Account issues</li>
                <li>• Integration help</li>
                <li>• Custom solutions</li>
              </ul>
              <a href="mailto:support@careerforge.ai" className="text-purple-600 hover:underline text-sm font-medium">
                Contact Support →
              </a>
            </div>
          </div>

          <h2>Report Issues</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">How to Report Issues</h3>
            <p className="text-muted-foreground mb-4">
              Help us improve CareerForge by reporting bugs, requesting features, or suggesting improvements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Bug className="h-4 w-4 mr-2 text-red-600" />
                  Bug Reports
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Found a bug? Please include:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Clear description of the issue</li>
                  <li>• Steps to reproduce</li>
                  <li>• Expected vs actual behavior</li>
                  <li>• Screenshots or error messages</li>
                  <li>• Browser and device information</li>
                </ul>
                <a href="https://github.com/careerforge/careerforge/issues" className="text-red-600 hover:underline text-sm font-medium mt-2 inline-block">
                  Report Bug on GitHub →
                </a>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                  Feature Requests
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Have an idea for improvement?
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Describe the feature you want</li>
                  <li>• Explain the use case</li>
                  <li>• Suggest implementation approach</li>
                  <li>• Consider alternative solutions</li>
                </ul>
                <a href="https://github.com/careerforge/careerforge/issues" className="text-yellow-600 hover:underline text-sm font-medium mt-2 inline-block">
                  Request Feature →
                </a>
              </div>
            </div>
          </div>

          <h2>Contribute</h2>
          
          <p>
            CareerForge is open source and we welcome contributions from the community. 
            Here's how you can get involved:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Github className="h-6 w-6 text-gray-700" />
                <h3 className="font-semibold">Code Contributions</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Help us build better features and fix bugs by contributing code.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Fork the repository</li>
                <li>• Create a feature branch</li>
                <li>• Make your changes</li>
                <li>• Submit a pull request</li>
                <li>• Participate in code review</li>
              </ul>
              <a href="https://github.com/careerforge/careerforge" className="text-gray-700 hover:underline text-sm font-medium">
                View Repository →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Book className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold">Documentation</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Help improve our documentation to make it clearer and more comprehensive.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Fix typos and grammar</li>
                <li>• Add missing examples</li>
                <li>• Improve explanations</li>
                <li>• Translate to other languages</li>
              </ul>
              <a href="https://github.com/careerforge/careerforge-docs" className="text-blue-600 hover:underline text-sm font-medium">
                Edit Documentation →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold">Community Support</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Help other developers by answering questions and sharing your knowledge.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Answer questions in the forum</li>
                <li>• Share your use cases</li>
                <li>• Mentor new contributors</li>
                <li>• Organize community events</li>
              </ul>
              <a href="#" className="text-green-600 hover:underline text-sm font-medium">
                Join Community →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
                <h3 className="font-semibold">Testing & Feedback</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Test new features and provide feedback to help shape the product.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Join beta testing programs</li>
                <li>• Provide user feedback</li>
                <li>• Report usability issues</li>
                <li>• Suggest UX improvements</li>
              </ul>
              <a href="mailto:beta@careerforge.ai" className="text-purple-600 hover:underline text-sm font-medium">
                Join Beta Program →
              </a>
            </div>
          </div>

          <h2>Development Guidelines</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Contributing Guidelines</h3>
            <p className="text-muted-foreground mb-4">
              Please follow these guidelines when contributing to CareerForge:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Follow our code style and formatting guidelines</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Write comprehensive tests for new features</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Update documentation for any API changes</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Ensure accessibility compliance (WCAG 2.1 AA)</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm">Add appropriate error handling and logging</span>
              </li>
            </ul>
          </div>

          <h2>Response Times</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Issue Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Priority Level
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Security Issues</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Within 24 hours</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Critical</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Bug Reports</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">2-3 business days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">High</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Feature Requests</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">5-7 business days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Medium</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">General Questions</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">1-2 business days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Low</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <a href="https://github.com/careerforge/careerforge" className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <Github className="h-6 w-6 text-gray-700" />
              <div>
                <div className="font-medium">GitHub Repository</div>
                <div className="text-sm text-muted-foreground">Source code and issue tracking</div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
            </a>
            
            <a href="/docs/resources/examples" className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <Book className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium">Code Examples</div>
                <div className="text-sm text-muted-foreground">Implementation examples and tutorials</div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
            </a>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-3">Need Immediate Help?</h3>
            <p className="mb-4">
              For urgent issues or time-sensitive questions, you can reach us directly:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">support@careerforge.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Monday - Friday, 9 AM - 6 PM PST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}