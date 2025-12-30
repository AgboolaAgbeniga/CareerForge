import { ContentDocument } from '@/lib/content-types'

export const gettingStartedContent: ContentDocument = {
  metadata: {
    title: "Getting Started",
    description: "Complete guide for developers to get started with CareerForge APIs, SDKs, and integration tools.",
    version: "1.0.0",
    lastUpdated: "2024-12-30",
    authors: ["Developer Relations Team"],
    tags: ["getting started", "api", "integration", "developer", "onboarding"],
    difficulty: "beginner",
    estimatedTime: 15
  },

  sections: [
    {
      id: "welcome",
      title: "Welcome to CareerForge Developer Platform",
      content: `
        <p>Welcome to the CareerForge Developer Platform! This comprehensive guide will help you get started with integrating CareerForge's powerful AI-driven career services into your applications.</p>

        <div class="welcome-overview">
          <h3>What You Can Build</h3>
          <div class="build-options">
            <div class="build-option">
              <h4>🎯 Job Matching Platforms</h4>
              <p>Integrate intelligent job matching for candidates and employers</p>
            </div>
            <div class="build-option">
              <h4>📄 Resume Processing Tools</h4>
              <p>Extract and analyze resume data with AI-powered parsing</p>
            </div>
            <div class="build-option">
              <h4>💼 Career Development Apps</h4>
              <p>Build personalized career coaching and skill assessment tools</p>
            </div>
            <div class="build-option">
              <h4>🏢 HR Management Systems</h4>
              <p>Enhance recruitment workflows with AI insights</p>
            </div>
          </div>
        </div>

        <h3>Platform Benefits</h3>
        <ul>
          <li><strong>AI-Powered:</strong> Access to state-of-the-art machine learning models</li>
          <li><strong>Scalable:</strong> Enterprise-grade infrastructure handling millions of requests</li>
          <li><strong>Reliable:</strong> 99.9% uptime SLA with comprehensive monitoring</li>
          <li><strong>Secure:</strong> SOC 2 compliant with end-to-end encryption</li>
          <li><strong>Global:</strong> Support for 50+ countries and multiple languages</li>
        </ul>
      `
    },

    {
      id: "prerequisites",
      title: "Prerequisites & Requirements",
      content: `
        <h3>Technical Requirements</h3>
        <div class="requirements-grid">
          <div class="requirement">
            <h4>🔧 Development Environment</h4>
            <ul>
              <li>Node.js 18+ or Python 3.8+</li>
              <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>Git for version control</li>
              <li>Code editor (VS Code, WebStorm, etc.)</li>
            </ul>
          </div>

          <div class="requirement">
            <h4>📚 Knowledge Prerequisites</h4>
            <ul>
              <li>Basic programming concepts</li>
              <li>REST API fundamentals</li>
              <li>JSON data format</li>
              <li>HTTP/HTTPS protocols</li>
            </ul>
          </div>

          <div class="requirement">
            <h4>🔐 Account Requirements</h4>
            <ul>
              <li>Active CareerForge developer account</li>
              <li>API key for authentication</li>
              <li>Valid email address for notifications</li>
              <li>Accepted terms of service</li>
            </ul>
          </div>
        </div>

        <h3>System Compatibility</h3>
        <div class="compatibility-table">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Supported Versions</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Node.js</td>
                <td>18.0+</td>
                <td>Full SDK support</td>
              </tr>
              <tr>
                <td>Python</td>
                <td>3.8+</td>
                <td>Complete library support</td>
              </tr>
              <tr>
                <td>Java</td>
                <td>11+</td>
                <td>Enterprise integrations</td>
              </tr>
              <tr>
                <td>.NET</td>
                <td>6.0+</td>
                <td>Full framework support</td>
              </tr>
              <tr>
                <td>PHP</td>
                <td>8.0+</td>
                <td>Web application support</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    {
      id: "account-setup",
      title: "Setting Up Your Developer Account",
      content: `
        <h3>Creating Your Account</h3>
        <div class="setup-steps">
          <div class="step">
            <h4>1. Visit Developer Portal</h4>
            <p>Navigate to <a href="https://developers.careerforge.ai" class="link">https://developers.careerforge.ai</a></p>
          </div>

          <div class="step">
            <h4>2. Sign Up</h4>
            <p>Click "Sign Up" and provide your details</p>
            <ul>
              <li>Full name and company information</li>
              <li>Valid email address</li>
              <li>Intended use case description</li>
              <li>Accept terms of service</li>
            </ul>
          </div>

          <div class="step">
            <h4>3. Verify Email</h4>
            <p>Check your email for verification link</p>
          </div>

          <div class="step">
            <h4>4. Complete Profile</h4>
            <p>Fill in additional information for better support</p>
            <ul>
              <li>Technical background</li>
              <li>Project details</li>
              <li>Integration timeline</li>
              <li>Support preferences</li>
            </ul>
          </div>
        </div>

        <h3>Account Types</h3>
        <div class="account-types">
          <div class="account-type">
            <h4>🆓 Sandbox Account</h4>
            <p>Free tier for development and testing</p>
            <ul>
              <li>10,000 API calls per month</li>
              <li>Access to all endpoints</li>
              <li>Community support</li>
              <li>Development tools</li>
            </ul>
          </div>

          <div class="account-type">
            <h4>💼 Professional Account</h4>
            <p>Paid tier for production applications</p>
            <ul>
              <li>100,000+ API calls per month</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
              <li>Custom integrations</li>
            </ul>
          </div>

          <div class="account-type">
            <h4>🏢 Enterprise Account</h4>
            <p>Custom solutions for large organizations</p>
            <ul>
              <li>Unlimited API calls</li>
              <li>Dedicated support team</li>
              <li>On-premise deployment options</li>
              <li>Custom SLAs</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "api-key-setup",
      title: "API Key Configuration",
      content: `
        <h3>Generating API Keys</h3>
        <div class="api-key-steps">
          <div class="step">
            <h4>1. Access Dashboard</h4>
            <p>Log into your developer account and navigate to the dashboard</p>
          </div>

          <div class="step">
            <h4>2. Create New Key</h4>
            <p>Click "Create API Key" in the API Keys section</p>
            <ul>
              <li>Provide a descriptive name</li>
              <li>Select appropriate permissions</li>
              <li>Choose environment (sandbox/production)</li>
              <li>Set rate limits if needed</li>
            </ul>
          </div>

          <div class="step">
            <h4>3. Configure Permissions</h4>
            <p>Set granular permissions for your API key</p>
            <div class="permissions-table">
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Resume Parsing</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✗</td>
                  </tr>
                  <tr>
                    <td>Job Matching</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✗</td>
                  </tr>
                  <tr>
                    <td>User Management</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Analytics</td>
                    <td>✓</td>
                    <td>✗</td>
                    <td>✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="step">
            <h4>4. Secure Your Key</h4>
            <p>Store your API key securely and never expose it in client-side code</p>
            <div class="security-tips">
              <h5>Security Best Practices</h5>
              <ul>
                <li>Use environment variables for storage</li>
                <li>Rotate keys regularly</li>
                <li>Monitor key usage</li>
                <li>Implement rate limiting</li>
                <li>Use HTTPS for all API calls</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Environment Configuration</h3>
        <div class="environments">
          <div class="environment">
            <h4>🧪 Sandbox Environment</h4>
            <p>For development and testing</p>
            <ul>
              <li>Base URL: <code>https://api.sandbox.careerforge.ai</code></li>
              <li>Rate Limit: 100 requests/minute</li>
              <li>Data: Mock and test data only</li>
              <li>Support: Community forums</li>
            </ul>
          </div>

          <div class="environment">
            <h4>🚀 Production Environment</h4>
            <p>For live applications</p>
            <ul>
              <li>Base URL: <code>https://api.careerforge.ai</code></li>
              <li>Rate Limit: Based on plan</li>
              <li>Data: Real production data</li>
              <li>Support: Priority support</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "first-api-call",
      title: "Making Your First API Call",
      content: `
        <h3>Basic API Request</h3>
        <p>Let's make your first API call to test the connection and get familiar with the response format.</p>

        <div class="code-example">
          <h4>cURL Example</h4>
          <pre><code class="language-bash">curl -X GET "https://api.sandbox.careerforge.ai/v1/health" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"</code></pre>
        </div>

        <div class="code-example">
          <h4>JavaScript (Node.js) Example</h4>
          <pre><code class="language-javascript">const axios = require('axios');

const CAREERFORGE_API_KEY = 'your-api-key-here';
const BASE_URL = 'https://api.sandbox.careerforge.ai';

async function testConnection() {
  try {
    const response = await axios.get(\`\${BASE_URL}/v1/health\`, {
      headers: {
        'Authorization': \`Bearer \${CAREERFORGE_API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });

    console.log('API Status:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testConnection();</code></pre>
        </div>

        <div class="code-example">
          <h4>Python Example</h4>
          <pre><code class="language-python">import requests

CAREERFORGE_API_KEY = 'your-api-key-here'
BASE_URL = 'https://api.sandbox.careerforge.ai'

def test_connection():
    headers = {
        'Authorization': f'Bearer {CAREERFORGE_API_KEY}',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.get(f'{BASE_URL}/v1/health', headers=headers)
        response.raise_for_status()
        print('API Status:', response.json())
    except requests.exceptions.RequestException as error:
        print('Error:', error)

if __name__ == '__main__':
    test_connection()</code></pre>
        </div>

        <h3>Understanding the Response</h3>
        <div class="response-example">
          <h4>Success Response (200 OK)</h4>
          <pre><code class="language-json">{
  "status": "healthy",
  "version": "2.4.0",
  "timestamp": "2024-12-30T10:00:00Z",
  "services": {
    "resume_parser": "operational",
    "job_matcher": "operational",
    "analytics": "operational"
  }
}</code></pre>
        </div>

        <h3>Troubleshooting Common Issues</h3>
        <div class="troubleshooting">
          <div class="issue">
            <h4>401 Unauthorized</h4>
            <ul>
              <li>Check if your API key is correct</li>
              <li>Ensure the key is not expired</li>
              <li>Verify the Authorization header format</li>
            </ul>
          </div>

          <div class="issue">
            <h4>429 Too Many Requests</h4>
            <ul>
              <li>You've exceeded your rate limit</li>
              <li>Implement exponential backoff</li>
              <li>Consider upgrading your plan</li>
            </ul>
          </div>

          <div class="issue">
            <h4>500 Internal Server Error</h4>
            <ul>
              <li>Check the API status page</li>
              <li>Retry with exponential backoff</li>
              <li>Contact support if persistent</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "sdk-installation",
      title: "SDK Installation & Setup",
      content: `
        <h3>Official SDKs</h3>
        <p>CareerForge provides official SDKs for popular programming languages to simplify integration.</p>

        <div class="sdk-grid">
          <div class="sdk">
            <h4>📦 JavaScript/TypeScript</h4>
            <div class="install-command">
              <code>npm install @careerforge/sdk</code>
            </div>
            <p>Full TypeScript support with modern async/await patterns</p>
          </div>

          <div class="sdk">
            <h4>🐍 Python</h4>
            <div class="install-command">
              <code>pip install careerforge-sdk</code>
            </div>
            <p>Comprehensive Python library with async support</p>
          </div>

          <div class="sdk">
            <h4>☕ Java</h4>
            <div class="install-command">
              <code>// Maven
<dependency>
  <groupId>ai.careerforge</groupId>
  <artifactId>sdk</artifactId>
  <version>2.4.0</version>
</dependency></code>
            </div>
            <p>Enterprise-grade Java SDK with Spring Boot integration</p>
          </div>

          <div class="sdk">
            <h4>🔷 .NET</h4>
            <div class="install-command">
              <code>dotnet add package CareerForge.SDK</code>
            </div>
            <p>Full .NET Standard support with async operations</p>
          </div>
        </div>

        <h3>SDK Initialization</h3>
        <div class="code-example">
          <h4>JavaScript SDK Setup</h4>
          <pre><code class="language-javascript">import { CareerForge } from '@careerforge/sdk';

// Initialize the SDK
const client = new CareerForge({
  apiKey: 'your-api-key',
  environment: 'sandbox', // or 'production'
  timeout: 30000, // 30 seconds
  retryConfig: {
    maxRetries: 3,
    backoffMultiplier: 2
  }
});

// Test the connection
async function initialize() {
  try {
    const health = await client.health.check();
    console.log('SDK initialized successfully:', health);
  } catch (error) {
    console.error('SDK initialization failed:', error);
  }
}

initialize();</code></pre>
        </div>

        <div class="code-example">
          <h4>Python SDK Setup</h4>
          <pre><code class="language-python">from careerforge import CareerForge

# Initialize the SDK
client = CareerForge(
    api_key='your-api-key',
    environment='sandbox',  # or 'production'
    timeout=30.0,  # seconds
    max_retries=3
)

# Test the connection
async def initialize():
    try:
        health = await client.health.check()
        print('SDK initialized successfully:', health)
    except Exception as error:
        print('SDK initialization failed:', error)

# For synchronous usage
def initialize_sync():
    try:
        health = client.health.check_sync()
        print('SDK initialized successfully:', health)
    except Exception as error:
        print('SDK initialization failed:', error)</code></pre>
        </div>

        <h3>SDK Features</h3>
        <div class="sdk-features">
          <div class="feature">
            <h4>🔄 Automatic Retries</h4>
            <p>Built-in retry logic with exponential backoff</p>
          </div>
          <div class="feature">
            <h4>📊 Request/Response Logging</h4>
            <p>Comprehensive logging for debugging</p>
          </div>
          <div class="feature">
            <h4>🔒 Automatic Authentication</h4>
            <p>Handles API key management and rotation</p>
          </div>
          <div class="feature">
            <h4>📈 Rate Limit Handling</h4>
            <p>Automatic rate limit detection and handling</p>
          </div>
          <div class="feature">
            <h4>🎯 Type Safety</h4>
            <p>Full type definitions for better development experience</p>
          </div>
        </div>
      `
    },

    {
      id: "next-steps",
      title: "Next Steps & Resources",
      content: `
        <h3>Continue Your Journey</h3>
        <div class="next-steps">
          <div class="step">
            <h4>📖 Explore API Reference</h4>
            <p>Dive deep into all available endpoints and parameters</p>
            <a href="/docs/developer-resources/api-reference" class="link">View API Reference →</a>
          </div>

          <div class="step">
            <h4>🛠️ Try Code Examples</h4>
            <p>Follow step-by-step tutorials for common use cases</p>
            <a href="/docs/developer-resources/sdks-libraries" class="link">Browse Examples →</a>
          </div>

          <div class="step">
            <h4>✨ Implement Best Practices</h4>
            <p>Learn optimization techniques and security guidelines</p>
            <a href="/docs/developer-resources/best-practices" class="link">Best Practices →</a>
          </div>

          <div class="step">
            <h4>💬 Join Developer Community</h4>
            <p>Connect with other developers and get help</p>
            <a href="https://community.careerforge.ai" class="link">Join Community →</a>
          </div>
        </div>

        <h3>Support & Resources</h3>
        <div class="support-resources">
          <div class="resource">
            <h4>📚 Documentation</h4>
            <ul>
              <li><a href="/docs/developer-resources/api-reference">Complete API Reference</a></li>
              <li><a href="/docs/developer-resources/sdks-libraries">SDK Documentation</a></li>
              <li><a href="/docs/developer-resources/best-practices">Integration Guides</a></li>
            </ul>
          </div>

          <div class="resource">
            <h4>🆘 Support Channels</h4>
            <ul>
              <li><a href="/docs/support-resources/faq">Frequently Asked Questions</a></li>
              <li><a href="/docs/support-resources/troubleshooting">Troubleshooting Guide</a></li>
              <li><a href="/docs/support-resources/contact-support">Contact Support</a></li>
            </ul>
          </div>

          <div class="resource">
            <h4>🎓 Learning Resources</h4>
            <ul>
              <li><a href="https://academy.careerforge.ai">Developer Academy</a></li>
              <li><a href="https://blog.careerforge.ai">Technical Blog</a></li>
              <li><a href="https://webinars.careerforge.ai">Webinar Recordings</a></li>
            </ul>
          </div>
        </div>

        <h3>Quick Start Checklist</h3>
        <div class="checklist">
          <div class="checklist-item">
            <input type="checkbox" id="account" />
            <label for="account">Create developer account</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="key" />
            <label for="key">Generate API key</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="test" />
            <label for="test">Test API connection</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="sdk" />
            <label for="sdk">Install SDK</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="first-call" />
            <label for="first-call">Make first API call</label>
          </div>
          <div class="checklist-item">
            <input type="checkbox" id="explore" />
            <label for="explore">Explore documentation</label>
          </div>
        </div>

        <div class="call-to-action">
          <h3>Ready to Build Something Amazing?</h3>
          <p>Start integrating CareerForge's AI-powered career services into your application today. Our platform makes it easy to add intelligent job matching, resume parsing, and career insights to any product.</p>
          <div class="cta-buttons">
            <a href="/docs/developer-resources/api-reference" class="cta-button primary">Start Building</a>
            <a href="/docs/support-resources/contact-support" class="cta-button secondary">Get Help</a>
          </div>
        </div>
      `
    }
  ]
};