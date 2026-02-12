import { ContentDocument } from '@/lib/content-types'

export const apiReferenceContent: ContentDocument = {
  metadata: {
    title: "API Reference",
    description: "Complete reference for CareerForge APIs, including endpoints, parameters, responses, and examples for all services.",
    version: "2.4.0",
    lastUpdated: "2025-12-30",
    authors: ["API Engineering Team"],
    tags: ["api", "reference", "endpoints", "documentation", "integration"],
    difficulty: "intermediate",
    estimatedTime: 30
  },

  sections: [
    {
      id: "api-overview",
      title: "API Overview",
      content: `
        <h3>Base URLs</h3>
        <div class="api-urls">
          <div class="environment-url">
            <h4>Production</h4>
            <code>https://api.careerforge.ai</code>
          </div>
          <div class="environment-url">
            <h4>Sandbox</h4>
            <code>https://api.sandbox.careerforge.ai</code>
          </div>
        </div>

        <h3>Authentication</h3>
        <p>All API requests require authentication using Bearer tokens:</p>
        <div class="code-example">
          <pre><code class="language-http">Authorization: Bearer YOUR_API_KEY</code></pre>
        </div>

        <h3>Response Format</h3>
        <p>All responses are returned in JSON format with consistent structure:</p>
        <div class="code-example">
          <pre><code class="language-json">{
  "success": true,
  "data": { ... },
  "meta": {
    "request_id": "req_12345",
    "timestamp": "2025-12-30T10:00:00Z",
    "version": "2.4.0"
  }
}</code></pre>
        </div>

        <h3>Rate Limiting</h3>
        <div class="rate-limits">
          <table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Requests/Minute</th>
                <th>Requests/Hour</th>
                <th>Requests/Day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sandbox</td>
                <td>100</td>
                <td>1,000</td>
                <td>10,000</td>
              </tr>
              <tr>
                <td>Professional</td>
                <td>1,000</td>
                <td>10,000</td>
                <td>100,000</td>
              </tr>
              <tr>
                <td>Enterprise</td>
                <td>10,000</td>
                <td>100,000</td>
                <td>Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },

    {
      id: "resume-api",
      title: "Resume Processing API",
      content: `
        <h3>Parse Resume</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">POST</span>
            <span class="path">/v1/resume/parse</span>
          </div>
          <p>Extract structured data from resume files</p>
        </div>

        <h4>Parameters</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>file</td>
              <td>file</td>
              <td>Yes</td>
              <td>Resume file (PDF, DOCX, TXT)</td>
            </tr>
            <tr>
              <td>language</td>
              <td>string</td>
              <td>No</td>
              <td>Document language (default: auto-detect)</td>
            </tr>
            <tr>
              <td>extract_images</td>
              <td>boolean</td>
              <td>No</td>
              <td>Extract images from document</td>
            </tr>
          </tbody>
        </table>

        <h4>Response</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "success": true,
  "data": {
    "personal_info": {
      "name": "John Doe",
      "email": "john.doe@email.com",
      "phone": "+1-555-0123",
      "location": "San Francisco, CA"
    },
    "experience": [
      {
        "job_title": "Senior Software Engineer",
        "company": "Tech Corp",
        "start_date": "2020-01-01",
        "end_date": "2025-01-01",
        "description": "Led development of...",
        "skills": ["Python", "React", "AWS"]
      }
    ],
    "education": [
      {
        "degree": "Bachelor of Science",
        "field": "Computer Science",
        "institution": "University of California",
        "graduation_year": 2019
      }
    ],
    "skills": {
      "technical": ["Python", "JavaScript", "SQL"],
      "soft": ["Leadership", "Communication"],
      "languages": ["English (Native)", "Spanish (Intermediate)"]
    }
  },
  "confidence": {
    "overall": 0.96,
    "personal_info": 0.98,
    "experience": 0.92,
    "education": 0.95,
    "skills": 0.94
  },
  "processing_time": 450
}</code></pre>
        </div>

        <h3>Batch Resume Processing</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">POST</span>
            <span class="path">/v1/resume/parse/batch</span>
          </div>
          <p>Process multiple resumes asynchronously</p>
        </div>

        <h4>Parameters</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>files</td>
              <td>file[]</td>
              <td>Yes</td>
              <td>Array of resume files (max 100)</td>
            </tr>
            <tr>
              <td>webhook_url</td>
              <td>string</td>
              <td>No</td>
              <td>Webhook URL for completion notification</td>
            </tr>
            <tr>
              <td>priority</td>
              <td>string</td>
              <td>No</td>
              <td>Processing priority (normal, high, urgent)</td>
            </tr>
          </tbody>
        </table>
      `
    },

    {
      id: "job-matching-api",
      title: "Job Matching API",
      content: `
        <h3>Find Job Matches</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">POST</span>
            <span class="path">/v1/jobs/match</span>
          </div>
          <p>Find optimal job matches for a candidate profile</p>
        </div>

        <h4>Parameters</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>candidate_profile</td>
              <td>object</td>
              <td>Yes</td>
              <td>Candidate profile data</td>
            </tr>
            <tr>
              <td>job_criteria</td>
              <td>object</td>
              <td>No</td>
              <td>Job search filters</td>
            </tr>
            <tr>
              <td>limit</td>
              <td>integer</td>
              <td>No</td>
              <td>Maximum matches to return (default: 20)</td>
            </tr>
            <tr>
              <td>include_explanations</td>
              <td>boolean</td>
              <td>No</td>
              <td>Include match reasoning</td>
            </tr>
          </tbody>
        </table>

        <h4>Request Example</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "candidate_profile": {
    "skills": ["Python", "React", "AWS"],
    "experience_years": 5,
    "education_level": "Bachelor's",
    "preferred_location": "San Francisco, CA",
    "salary_expectation": 120000
  },
  "job_criteria": {
    "remote_work": true,
    "company_size": "startup",
    "industry": "technology"
  },
  "limit": 10,
  "include_explanations": true
}</code></pre>
        </div>

        <h4>Response</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "success": true,
  "data": {
    "matches": [
      {
        "job_id": "job_12345",
        "title": "Senior Python Developer",
        "company": "Tech Startup Inc",
        "location": "San Francisco, CA",
        "salary_range": "110000-140000",
        "match_score": 0.92,
        "explanation": "High match due to Python expertise, React experience, and AWS skills alignment",
        "key_matches": [
          "Python development experience",
          "React frontend skills",
          "AWS cloud experience"
        ],
        "gaps": [
          "Kubernetes experience could be beneficial"
        ]
      }
    ],
    "total_matches": 1,
    "search_metadata": {
      "query_time": 150,
      "jobs_searched": 50000,
      "algorithm_version": "v2.4.0"
    }
  }
}</code></pre>
        </div>

        <h3>Get Job Details</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/jobs/{job_id}</span>
          </div>
          <p>Retrieve detailed job posting information</p>
        </div>

        <h3>Search Jobs</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/jobs/search</span>
          </div>
          <p>Search for jobs with advanced filtering</p>
        </div>

        <h4>Query Parameters</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>q</td>
              <td>string</td>
              <td>Search query (job title, company, keywords)</td>
            </tr>
            <tr>
              <td>location</td>
              <td>string</td>
              <td>Location filter</td>
            </tr>
            <tr>
              <td>remote</td>
              <td>boolean</td>
              <td>Remote work filter</td>
            </tr>
            <tr>
              <td>salary_min</td>
              <td>integer</td>
              <td>Minimum salary</td>
            </tr>
            <tr>
              <td>skills</td>
              <td>string[]</td>
              <td>Required skills</td>
            </tr>
            <tr>
              <td>page</td>
              <td>integer</td>
              <td>Page number (default: 1)</td>
            </tr>
            <tr>
              <td>limit</td>
              <td>integer</td>
              <td>Results per page (default: 20, max: 100)</td>
            </tr>
          </tbody>
        </table>
      `
    },

    {
      id: "user-management-api",
      title: "User Management API",
      content: `
        <h3>Create User</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">POST</span>
            <span class="path">/v1/users</span>
          </div>
          <p>Create a new user account</p>
        </div>

        <h4>Request Body</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "user_type": "candidate",
  "profile": {
    "title": "Software Engineer",
    "location": "San Francisco, CA",
    "linkedin_url": "https://linkedin.com/in/johndoe"
  }
}</code></pre>
        </div>

        <h3>Get User Profile</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/users/{user_id}</span>
          </div>
          <p>Retrieve user profile information</p>
        </div>

        <h3>Update User</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">PUT</span>
            <span class="path">/v1/users/{user_id}</span>
          </div>
          <p>Update user profile information</p>
        </div>

        <h3>Delete User</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">DELETE</span>
            <span class="path">/v1/users/{user_id}</span>
          </div>
          <p>Delete a user account</p>
        </div>

        <h3>List Users</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/users</span>
          </div>
          <p>Retrieve a list of users with filtering</p>
        </div>

        <h4>Query Parameters</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user_type</td>
              <td>string</td>
              <td>Filter by user type (candidate, employer, admin)</td>
            </tr>
            <tr>
              <td>status</td>
              <td>string</td>
              <td>Filter by account status (active, inactive, suspended)</td>
            </tr>
            <tr>
              <td>created_after</td>
              <td>date</td>
              <td>Filter users created after date</td>
            </tr>
            <tr>
              <td>page</td>
              <td>integer</td>
              <td>Page number</td>
            </tr>
            <tr>
              <td>limit</td>
              <td>integer</td>
              <td>Results per page</td>
            </tr>
          </tbody>
        </table>
      `
    },

    {
      id: "analytics-api",
      title: "Analytics API",
      content: `
        <h3>Get User Analytics</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/analytics/users/{user_id}</span>
          </div>
          <p>Retrieve analytics data for a specific user</p>
        </div>

        <h4>Response</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "success": true,
  "data": {
    "user_id": "user_12345",
    "profile_views": 1250,
    "application_count": 45,
    "interview_count": 12,
    "offer_count": 3,
    "response_rate": 0.85,
    "average_response_time": 2.3,
    "top_skills": ["Python", "React", "AWS"],
    "career_trajectory": {
      "current_level": "Senior",
      "growth_rate": 0.15,
      "predicted_next_role": "Lead Developer"
    },
    "market_value": {
      "current_salary": 120000,
      "market_median": 115000,
      "percentile": 75
    }
  }
}</code></pre>
        </div>

        <h3>Get Job Analytics</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/analytics/jobs/{job_id}</span>
          </div>
          <p>Retrieve analytics for a specific job posting</p>
        </div>

        <h3>Get Platform Analytics</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/analytics/platform</span>
          </div>
          <p>Retrieve platform-wide analytics and metrics</p>
        </div>

        <h4>Query Parameters</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>start_date</td>
              <td>date</td>
              <td>Start date for analytics period</td>
            </tr>
            <tr>
              <td>end_date</td>
              <td>date</td>
              <td>End date for analytics period</td>
            </tr>
            <tr>
              <td>metrics</td>
              <td>string[]</td>
              <td>Specific metrics to include</td>
            </tr>
            <tr>
              <td>group_by</td>
              <td>string</td>
              <td>Group results by (day, week, month)</td>
            </tr>
          </tbody>
        </table>
      `
    },

    {
      id: "webhooks-api",
      title: "Webhooks API",
      content: `
        <h3>Register Webhook</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">POST</span>
            <span class="path">/v1/webhooks</span>
          </div>
          <p>Register a new webhook endpoint</p>
        </div>

        <h4>Request Body</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "url": "https://your-app.com/webhooks/careerforge",
  "events": [
    "resume.parsed",
    "job.match.found",
    "application.submitted"
  ],
  "secret": "your-webhook-secret",
  "active": true
}</code></pre>
        </div>

        <h3>List Webhooks</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">GET</span>
            <span class="path">/v1/webhooks</span>
          </div>
          <p>Retrieve registered webhooks</p>
        </div>

        <h3>Update Webhook</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">PUT</span>
            <span class="path">/v1/webhooks/{webhook_id}</span>
          </div>
          <p>Update webhook configuration</p>
        </div>

        <h3>Delete Webhook</h3>
        <div class="endpoint">
          <div class="endpoint-header">
            <span class="method">DELETE</span>
            <span class="path">/v1/webhooks/{webhook_id}</span>
          </div>
          <p>Remove webhook registration</p>
        </div>

        <h3>Webhook Events</h3>
        <div class="webhook-events">
          <div class="event-category">
            <h4>Resume Events</h4>
            <ul>
              <li><code>resume.parsed</code> - Resume parsing completed</li>
              <li><code>resume.failed</code> - Resume parsing failed</li>
              <li><code>resume.batch.completed</code> - Batch processing finished</li>
            </ul>
          </div>

          <div class="event-category">
            <h4>Job Events</h4>
            <ul>
              <li><code>job.match.found</code> - New job match discovered</li>
              <li><code>job.applied</code> - User applied to job</li>
              <li><code>job.viewed</code> - Job posting viewed</li>
            </ul>
          </div>

          <div class="event-category">
            <h4>User Events</h4>
            <ul>
              <li><code>user.created</code> - New user registered</li>
              <li><code>user.updated</code> - User profile updated</li>
              <li><code>user.deleted</code> - User account deleted</li>
            </ul>
          </div>
        </div>

        <h4>Webhook Payload Structure</h4>
        <div class="code-example">
          <pre><code class="language-json">{
  "event": "resume.parsed",
  "webhook_id": "wh_12345",
  "timestamp": "2025-12-30T10:00:00Z",
  "data": {
    "user_id": "user_12345",
    "resume_id": "resume_67890",
    "status": "completed",
    "results": { ... }
  },
  "signature": "sha256=abc123..."
}</code></pre>
        </div>
      `
    },

    {
      id: "error-handling",
      title: "Error Handling & Status Codes",
      content: `
        <h3>HTTP Status Codes</h3>
        <div class="status-codes">
          <div class="status-group">
            <h4>2xx Success</h4>
            <ul>
              <li><code>200 OK</code> - Request successful</li>
              <li><code>201 Created</code> - Resource created</li>
              <li><code>202 Accepted</code> - Request accepted for processing</li>
            </ul>
          </div>

          <div class="status-group">
            <h4>4xx Client Errors</h4>
            <ul>
              <li><code>400 Bad Request</code> - Invalid request parameters</li>
              <li><code>401 Unauthorized</code> - Invalid or missing API key</li>
              <li><code>403 Forbidden</code> - Insufficient permissions</li>
              <li><code>404 Not Found</code> - Resource not found</li>
              <li><code>429 Too Many Requests</code> - Rate limit exceeded</li>
            </ul>
          </div>

          <div class="status-group">
            <h4>5xx Server Errors</h4>
            <ul>
              <li><code>500 Internal Server Error</code> - Unexpected server error</li>
              <li><code>502 Bad Gateway</code> - Gateway error</li>
              <li><code>503 Service Unavailable</code> - Service temporarily unavailable</li>
              <li><code>504 Gateway Timeout</code> - Request timeout</li>
            </ul>
          </div>
        </div>

        <h3>Error Response Format</h3>
        <div class="code-example">
          <pre><code class="language-json">{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": {
      "field": "email",
      "issue": "Email format is invalid"
    },
    "request_id": "req_12345",
    "timestamp": "2025-12-30T10:00:00Z"
  }
}</code></pre>
        </div>

        <h3>Common Error Codes</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>Error Code</th>
              <th>HTTP Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INVALID_REQUEST</td>
              <td>400</td>
              <td>Request parameters are invalid or missing</td>
            </tr>
            <tr>
              <td>UNAUTHORIZED</td>
              <td>401</td>
              <td>API key is invalid or expired</td>
            </tr>
            <tr>
              <td>FORBIDDEN</td>
              <td>403</td>
              <td>Insufficient permissions for the operation</td>
            </tr>
            <tr>
              <td>NOT_FOUND</td>
              <td>404</td>
              <td>Requested resource does not exist</td>
            </tr>
            <tr>
              <td>RATE_LIMITED</td>
              <td>429</td>
              <td>API rate limit has been exceeded</td>
            </tr>
            <tr>
              <td>INTERNAL_ERROR</td>
              <td>500</td>
              <td>Unexpected internal server error</td>
            </tr>
            <tr>
              <td>SERVICE_UNAVAILABLE</td>
              <td>503</td>
              <td>Service is temporarily unavailable</td>
            </tr>
          </tbody>
        </table>

        <h3>Rate Limiting Headers</h3>
        <p>Rate limiting information is included in response headers:</p>
        <div class="code-example">
          <pre><code class="language-http">X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 60</code></pre>
        </div>
      `
    },

    {
      id: "sdk-integration",
      title: "SDK Integration Examples",
      content: `
        <h3>JavaScript SDK</h3>
        <div class="code-example">
          <pre><code class="language-javascript">import { CareerForge } from '@careerforge/sdk';

const client = new CareerForge({
  apiKey: process.env.CAREERFORGE_API_KEY,
  environment: 'production'
});

// Parse a resume
async function parseResume(file) {
  try {
    const result = await client.resume.parse(file);
    console.log('Resume parsed:', result.data);
    return result.data;
  } catch (error) {
    console.error('Parsing failed:', error.message);
    throw error;
  }
}

// Find job matches
async function findMatches(candidateProfile) {
  try {
    const matches = await client.jobs.match(candidateProfile);
    return matches.data.matches;
  } catch (error) {
    console.error('Matching failed:', error.message);
    throw error;
  }
}

// Handle webhooks
app.post('/webhooks/careerforge', (req, res) => {
  const signature = req.headers['x-careerforge-signature'];
  
  if (!client.webhooks.verify(signature, req.body)) {
    return res.status(401).send('Invalid signature');
  }
  
  const { event, data } = req.body;
  
  switch (event) {
    case 'resume.parsed':
      handleResumeParsed(data);
      break;
    case 'job.match.found':
      handleJobMatch(data);
      break;
  }
  
  res.sendStatus(200);
});</code></pre>
        </div>

        <h3>Python SDK</h3>
        <div class="code-example">
          <pre><code class="language-python">from careerforge import CareerForge
import os

client = CareerForge(
    api_key=os.getenv('CAREERFORGE_API_KEY'),
    environment='production'
)

async def parse_resume(file_path):
    """Parse a resume file"""
    try:
        with open(file_path, 'rb') as f:
            result = await client.resume.parse(f)
        return result.data
    except Exception as error:
        print(f'Parsing failed: {error}')
        raise

async def find_job_matches(candidate_profile):
    """Find job matches for a candidate"""
    try:
        matches = await client.jobs.match(candidate_profile)
        return matches.data.matches
    except Exception as error:
        print(f'Matching failed: {error}')
        raise

def handle_webhook(payload, signature):
    """Handle incoming webhooks"""
    if not client.webhooks.verify(signature, payload):
        raise ValueError('Invalid webhook signature')
    
    event = payload['event']
    data = payload['data']
    
    if event == 'resume.parsed':
        process_parsed_resume(data)
    elif event == 'job.match.found':
        process_job_match(data)

# Flask webhook endpoint
@app.route('/webhooks/careerforge', methods=['POST'])
def careerforge_webhook():
    signature = request.headers.get('X-CareerForge-Signature')
    payload = request.get_json()
    
    try:
        handle_webhook(payload, signature)
        return jsonify({'status': 'processed'}), 200
    except ValueError:
        return jsonify({'error': 'invalid signature'}), 401</code></pre>
        </div>

        <h3>Rate Limiting Best Practices</h3>
        <div class="best-practices">
          <div class="practice">
            <h4>Implement Exponential Backoff</h4>
            <pre><code class="language-javascript">async function apiCallWithRetry(endpoint, options, maxRetries = 3) {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await fetch(endpoint, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('X-RateLimit-Retry-After');
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
}</code></pre>
          </div>

          <div class="practice">
            <h4>Monitor Rate Limits</h4>
            <pre><code class="language-javascript">class RateLimitMonitor {
  constructor() {
    this.requests = [];
    this.limit = 1000; // requests per minute
    this.window = 60 * 1000; // 1 minute
  }
  
  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.window);
    return this.requests.length < this.limit;
  }
  
  recordRequest() {
    this.requests.push(Date.now());
  }
}</code></pre>
          </div>
        </div>
      `
    }
  ]
};