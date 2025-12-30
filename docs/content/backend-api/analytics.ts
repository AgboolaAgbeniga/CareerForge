import { PageContent } from '../../lib/content-types';

export const analyticsContent: PageContent = {
  metadata: {
    title: 'Analytics & Reporting API',
    description: 'Comprehensive analytics and reporting capabilities for platform insights, performance metrics, and business intelligence.',
    version: '1.0.0',
    lastUpdated: '2024-12-28',
    authors: ['CareerForge Team'],
    tags: ['backend', 'api', 'analytics', 'reporting', 'metrics', 'business-intelligence'],
    difficulty: 'advanced',
    estimatedTime: 25
  },
  tableOfContents: [
    { id: 'overview', title: 'Overview', level: 2 },
    { id: 'data-models', title: 'Data Models', level: 2 },
    { id: 'endpoints', title: 'API Endpoints', level: 2 },
    { id: 'usage-examples', title: 'Usage Examples', level: 2 },
    { id: 'best-practices', title: 'Best Practices', level: 2 },
    { id: 'security-considerations', title: 'Security Considerations', level: 2 }
  ],
  introduction: {
    id: 'introduction',
    title: 'Analytics & Reporting API Overview',
    content: `The Analytics & Reporting API provides comprehensive insights into platform performance, user behavior, and business metrics. This API enables stakeholders to make data-driven decisions through real-time and historical analytics.`
  },
  sections: [
    {
  
      id: 'overview',
      title: 'Overview',
      content: `The Analytics & Reporting API provides comprehensive insights into platform performance, user behavior, and business metrics. This API enables stakeholders to make data-driven decisions through real-time and historical analytics.

## Key Features

- **Real-time Metrics**: Live dashboard data and performance indicators
- **Historical Analytics**: Trend analysis and long-term reporting
- **Custom Reports**: Flexible report generation with custom parameters
- **Data Export**: Multiple export formats (JSON, CSV, PDF)
- **Scheduled Reports**: Automated report generation and delivery
- **Performance Monitoring**: System health and API performance metrics

## Use Cases

- Business intelligence and KPI tracking
- User engagement analysis
- Platform performance monitoring
- Revenue and growth analytics
- Compliance reporting
- Operational insights`
    },
    {
  
      id: 'data-models',
      title: 'Data Models',
      content: `## Analytics Data Structures

### Metric Types
\`\`\`typescript
interface MetricType {
  id: string;
  name: string;
  category: 'user' | 'job' | 'application' | 'company' | 'system' | 'revenue';
  dataType: 'count' | 'percentage' | 'currency' | 'duration' | 'ratio';
  aggregation: 'sum' | 'avg' | 'min' | 'max' | 'count' | 'distinct';
  unit?: string;
  description: string;
}
\`\`\`

### Analytics Report
\`\`\`typescript
interface AnalyticsReport {
  id: string;
  title: string;
  description?: string;
  type: 'dashboard' | 'custom' | 'scheduled';
  dateRange: {
    start: string; // ISO 8601 date
    end: string;   // ISO 8601 date
  };
  metrics: Metric[];
  filters: ReportFilter[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
\`\`\`

### Metric Data
\`\`\`typescript
interface Metric {
  type: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changePercent?: number;
  period: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  timestamp: string;
  metadata?: Record<string, any>;
}
\`\`\`

### Report Filter
\`\`\`typescript
interface ReportFilter {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'regex';
  value: any;
  type: 'string' | 'number' | 'date' | 'boolean' | 'array';
}
\`\`\`

### Dashboard Configuration
\`\`\`typescript
interface DashboardConfig {
  id: string;
  name: string;
  description?: string;
  widgets: DashboardWidget[];
  layout: {
    columns: number;
    rows: number;
    gap: number;
  };
  permissions: {
    view: string[];
    edit: string[];
    delete: string[];
  };
  isPublic: boolean;
  refreshInterval?: number; // seconds
}
\`\`\`

### Dashboard Widget
\`\`\`typescript
interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'map' | 'text';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: {
    metric?: string;
    chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
    dataSource: string;
    filters?: ReportFilter[];
    refreshInterval?: number;
  };
}
\`\`\`

### Export Configuration
\`\`\`typescript
interface ExportConfig {
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  includeHeaders: boolean;
  dateFormat?: string;
  compression?: 'gzip' | 'none';
  delimiter?: string; // for CSV
  pageSize?: number; // for PDF
  orientation?: 'portrait' | 'landscape'; // for PDF
}
\`\`\`

### Scheduled Report
\`\`\`typescript
interface ScheduledReport {
  id: string;
  reportId: string;
  name: string;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    time: string; // HH:MM format
    timezone: string;
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
  };
  recipients: string[]; // email addresses
  format: ExportConfig['format'];
  isActive: boolean;
  lastRun?: string;
  nextRun: string;
  createdBy: string;
}
\`\`\``
    },
    {
  
      id: 'endpoints',
      title: 'API Endpoints',
      content: `## Analytics Endpoints

### Get Dashboard Metrics
\`\`\`http
GET /api/v1/analytics/dashboard
\`\`\`

**Query Parameters:**
- \`period\` (string): Time period (hour, day, week, month, quarter, year)
- \`startDate\` (string): Start date (ISO 8601)
- \`endDate\` (string): End date (ISO 8601)
- \`metrics\` (array): List of metric IDs to include

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "totalUsers": {
      "value": 15420,
      "change": 245,
      "changePercent": 1.62,
      "period": "month"
    },
    "activeJobs": {
      "value": 1250,
      "change": -15,
      "changePercent": -1.18,
      "period": "month"
    },
    "totalApplications": {
      "value": 8750,
      "change": 320,
      "changePercent": 3.80,
      "period": "month"
    }
  }
}
\`\`\`

### Get Custom Report
\`\`\`http
POST /api/v1/analytics/reports
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "Monthly User Growth Report",
  "dateRange": {
    "start": "2024-11-01T00:00:00Z",
    "end": "2024-11-30T23:59:59Z"
  },
  "metrics": ["user_registrations", "user_activations", "user_retention"],
  "filters": [
    {
      "field": "user_type",
      "operator": "in",
      "value": ["job_seeker", "employer"],
      "type": "array"
    }
  ],
  "groupBy": ["date", "user_type"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "report_12345",
    "title": "Monthly User Growth Report",
    "data": [
      {
        "date": "2024-11-01",
        "user_type": "job_seeker",
        "user_registrations": 145,
        "user_activations": 120,
        "user_retention": 0.85
      }
    ],
    "metadata": {
      "totalRecords": 30,
      "generatedAt": "2024-12-01T10:30:00Z"
    }
  }
}
\`\`\`

### Export Report Data
\`\`\`http
GET /api/v1/analytics/reports/{reportId}/export
\`\`\`

**Query Parameters:**
- \`format\` (string): Export format (json, csv, pdf, xlsx)
- \`includeHeaders\` (boolean): Include column headers (default: true)

**Response:** File download with appropriate content-type

### Create Dashboard
\`\`\`http
POST /api/v1/analytics/dashboards
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "Executive Dashboard",
  "description": "Key metrics for executive team",
  "widgets": [
    {
      "type": "metric",
      "title": "Total Users",
      "position": { "x": 0, "y": 0, "width": 4, "height": 2 },
      "config": {
        "metric": "total_users",
        "refreshInterval": 300
      }
    }
  ],
  "layout": {
    "columns": 12,
    "rows": 8,
    "gap": 16
  },
  "isPublic": false
}
\`\`\`

### Schedule Report
\`\`\`http
POST /api/v1/analytics/reports/{reportId}/schedule
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "Weekly Performance Report",
  "schedule": {
    "frequency": "weekly",
    "time": "09:00",
    "timezone": "America/New_York",
    "dayOfWeek": 1
  },
  "recipients": ["executive@company.com", "manager@company.com"],
  "format": "pdf"
}
\`\`\`

### Get System Health Metrics
\`\`\`http
GET /api/v1/analytics/system/health
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "api_response_time": {
      "value": 245,
      "unit": "ms",
      "status": "good"
    },
    "database_connections": {
      "value": 85,
      "unit": "count",
      "status": "good"
    },
    "error_rate": {
      "value": 0.02,
      "unit": "percentage",
      "status": "warning"
    },
    "uptime": {
      "value": 99.98,
      "unit": "percentage",
      "status": "good"
    }
  }
}
\`\`\`

### Get Revenue Analytics
\`\`\`http
GET /api/v1/analytics/revenue
\`\`\`

**Query Parameters:**
- \`period\` (string): Time period
- \`breakdown\` (string): Breakdown by (subscription, job_posting, premium_features)

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "total_revenue": {
      "value": 45670.50,
      "currency": "USD",
      "change": 1250.75,
      "changePercent": 2.82
    },
    "breakdown": {
      "subscription": 32500.00,
      "job_posting": 11250.50,
      "premium_features": 1920.00
    },
    "monthly_trend": [
      { "month": "2024-11", "revenue": 42150.25 },
      { "month": "2024-12", "revenue": 45670.50 }
    ]
  }
}
\`\`\``
    },
    {
  
      id: 'usage-examples',
      title: 'Usage Examples',
      content: `## Code Examples

### Fetch Dashboard Metrics
\`\`\`typescript
// Get real-time dashboard metrics
const dashboardMetrics = await fetch('/api/v1/analytics/dashboard?period=month')
  .then(res => res.json());

console.log('Total Users:', dashboardMetrics.data.totalUsers.value);
console.log('Growth:', dashboardMetrics.data.totalUsers.changePercent + '%');
\`\`\`

### Generate Custom Report
\`\`\`typescript
// Create a custom user engagement report
const reportConfig = {
  title: 'User Engagement Analysis',
  dateRange: {
    start: '2024-11-01T00:00:00Z',
    end: '2024-11-30T23:59:59Z'
  },
  metrics: ['user_logins', 'profile_views', 'application_submissions'],
  filters: [
    {
      field: 'user_type',
      operator: 'eq',
      value: 'job_seeker',
      type: 'string'
    }
  ],
  groupBy: ['date']
};

const report = await fetch('/api/v1/analytics/reports', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(reportConfig)
}).then(res => res.json());
\`\`\`

### Export Data to CSV
\`\`\`typescript
// Export report data as CSV
const exportUrl = \`/api/v1/analytics/reports/\${reportId}/export?format=csv&includeHeaders=true\`;

const response = await fetch(exportUrl);
const blob = await response.blob();

const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(blob);
downloadLink.download = 'analytics-report.csv';
downloadLink.click();
\`\`\`

### Create Executive Dashboard
\`\`\`typescript
// Create a comprehensive executive dashboard
const dashboardConfig = {
  name: 'Executive Overview',
  description: 'Key performance indicators for leadership',
  widgets: [
    {
      type: 'metric',
      title: 'Monthly Active Users',
      position: { x: 0, y: 0, width: 3, height: 2 },
      config: {
        metric: 'monthly_active_users',
        refreshInterval: 300
      }
    },
    {
      type: 'chart',
      title: 'Revenue Trend',
      position: { x: 3, y: 0, width: 6, height: 4 },
      config: {
        chartType: 'line',
        dataSource: 'revenue_analytics',
        refreshInterval: 3600
      }
    },
    {
      type: 'table',
      title: 'Top Performing Jobs',
      position: { x: 0, y: 2, width: 9, height: 3 },
      config: {
        dataSource: 'job_performance',
        filters: [
          { field: 'status', operator: 'eq', value: 'active', type: 'string' }
        ],
        sortBy: 'applications',
        limit: 10
      }
    }
  ],
  layout: { columns: 12, rows: 6, gap: 16 },
  isPublic: false
};

const dashboard = await fetch('/api/v1/analytics/dashboards', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dashboardConfig)
}).then(res => res.json());
\`\`\`

### Schedule Automated Reports
\`\`\`typescript
// Schedule weekly performance report
const scheduleConfig = {
  name: 'Weekly Performance Summary',
  schedule: {
    frequency: 'weekly',
    time: '08:00',
    timezone: 'America/New_York',
    dayOfWeek: 1 // Monday
  },
  recipients: [
    'ceo@company.com',
    'cfo@company.com',
    'analytics@company.com'
  ],
  format: 'pdf'
};

await fetch(\`/api/v1/analytics/reports/\${reportId}/schedule\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(scheduleConfig)
});
\`\`\`

### Monitor System Health
\`\`\`typescript
// Check system health metrics
const healthMetrics = await fetch('/api/v1/analytics/system/health')
  .then(res => res.json());

// Alert if error rate is too high
if (healthMetrics.data.error_rate.value > 0.05) {
  console.warn('High error rate detected:', healthMetrics.data.error_rate.value);
  // Send alert notification
}
\`\`\``
    },
    {
  
      id: 'best-practices',
      title: 'Best Practices',
      content: `## Analytics Implementation Best Practices

### Data Collection
- **Consistent Metrics**: Define clear metric definitions and ensure consistent collection
- **Data Quality**: Implement validation and cleansing for all analytics data
- **Privacy Compliance**: Ensure GDPR/CCPA compliance for user data analytics
- **Performance Impact**: Monitor the performance impact of analytics collection

### Report Generation
- **Caching Strategy**: Implement appropriate caching for frequently accessed reports
- **Async Processing**: Use background jobs for heavy report generation
- **Pagination**: Always implement pagination for large datasets
- **Rate Limiting**: Apply appropriate rate limits to prevent abuse

### Dashboard Design
- **User-Centric**: Design dashboards based on user roles and needs
- **Performance**: Optimize widget loading and refresh intervals
- **Mobile Responsive**: Ensure dashboards work well on mobile devices
- **Accessibility**: Follow WCAG guidelines for dashboard accessibility

### Security Considerations
- **Data Access Control**: Implement role-based access to sensitive metrics
- **Audit Logging**: Log all analytics data access and modifications
- **Data Encryption**: Encrypt sensitive analytics data at rest and in transit
- **Export Security**: Secure exported files with appropriate permissions

### Performance Optimization
- **Database Indexing**: Ensure proper indexing for analytics queries
- **Query Optimization**: Use efficient queries and avoid N+1 problems
- **Caching Layers**: Implement Redis or similar for frequently accessed data
- **Background Processing**: Move heavy computations to background jobs

### Monitoring and Maintenance
- **Alert Thresholds**: Set up alerts for metric anomalies
- **Data Retention**: Define clear data retention policies
- **Regular Audits**: Perform regular audits of analytics data accuracy
- **Version Control**: Keep track of metric definition changes`
    },
    {
  
      id: 'security-considerations',
      title: 'Security Considerations',
      content: `## Analytics Security

### Access Control
- **Role-Based Permissions**: Different access levels for different user roles
- **Data Classification**: Classify analytics data by sensitivity level
- **Audit Trails**: Comprehensive logging of all analytics access
- **Session Management**: Secure session handling for dashboard access

### Data Protection
- **Encryption**: Encrypt sensitive analytics data
- **Data Masking**: Mask PII in analytics reports
- **Retention Policies**: Clear data retention and deletion policies
- **Backup Security**: Secure backup and recovery procedures

### API Security
- **Rate Limiting**: Prevent abuse of analytics endpoints
- **Input Validation**: Validate all input parameters
- **SQL Injection Prevention**: Use parameterized queries
- **XSS Protection**: Sanitize output for web dashboards

### Compliance
- **GDPR Compliance**: Handle user data according to GDPR requirements
- **Data Export Controls**: Control and audit data exports
- **Privacy by Design**: Build privacy considerations into analytics design
- **Regular Security Audits**: Conduct regular security assessments

### Monitoring
- **Access Monitoring**: Monitor who accesses what analytics data
- **Anomaly Detection**: Detect unusual analytics access patterns
- **Security Alerts**: Real-time alerts for security incidents
- **Incident Response**: Defined procedures for security incidents`
    }
  ],
  nextSteps: {
    title: 'Next Steps',
    links: [
      { text: 'Authentication API', href: '/docs/backend-api/authentication', description: 'Learn about securing your analytics API requests' },
      { text: 'Error Handling', href: '/docs/backend-api/error-handling', description: 'Understand how to handle API errors and exceptions' },
      { text: 'Rate Limiting', href: '/docs/backend-api/rate-limiting', description: 'Review API rate limiting policies and best practices' }
    ]
  },
  relatedResources: [
    { text: 'User Management API', href: '/docs/backend-api/user-management', description: 'API documentation for managing user accounts and profiles' },
    { text: 'Analytics API Specification', href: 'https://api.careerforge.com/docs/analytics', description: 'Complete API specification and reference documentation' },
    { text: 'Dashboard Design Guidelines', href: 'https://design.careerforge.com/analytics', description: 'Best practices for designing analytics dashboards' },
    { text: 'Data Privacy Policy', href: 'https://careerforge.com/privacy', description: 'Understanding data privacy and compliance requirements' }
  ]
};
