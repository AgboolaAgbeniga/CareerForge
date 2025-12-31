// Backend API Notifications Content
import { PageContent } from '@/lib/content-types'

export const backendApiNotificationsContent: PageContent = {
  metadata: {
    title: "Notifications API",
    description: "Complete guide to notification system, real-time messaging, and communication channels",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "notifications", "real-time", "messaging", "communication"],
    difficulty: "intermediate",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "notifications-overview", title: "Notifications Overview", level: 1 },
    { id: "notification-types", title: "Notification Types & Channels", level: 1 },
    { id: "real-time-messaging", title: "Real-Time Messaging", level: 1 },
    { id: "notification-preferences", title: "User Preferences & Settings", level: 1 },
    { id: "notification-delivery", title: "Delivery & Reliability", level: 1 },
    { id: "bulk-notifications", title: "Bulk Notifications", level: 1 },
    { id: "notification-analytics", title: "Analytics & Monitoring", level: 1 },
    { id: "notification-endpoints", title: "Notification Endpoints", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Notifications API",
    content: `The Notifications API provides comprehensive messaging and communication capabilities for CareerForge, supporting real-time notifications, email communications, in-app messages, and multi-channel delivery. This API ensures timely, relevant communication between employers, candidates, and the platform.`
  },
  sections: [
    {
      id: "notifications-overview",
      title: "Notifications Overview",
      content: `CareerForge's notification system is designed to keep users engaged and informed throughout their career journey. The system supports multiple communication channels, real-time delivery, and intelligent preference management.

### Key Features

- **Multi-Channel Delivery**: Email, SMS, push notifications, in-app messages
- **Real-Time Communication**: WebSocket-based instant messaging
- **Intelligent Routing**: Smart channel selection based on user preferences
- **Template System**: Pre-built notification templates with personalization
- **Analytics Integration**: Delivery tracking and engagement metrics
- **Compliance Ready**: GDPR-compliant with proper consent management

### Notification Architecture

\`\`\`mermaid
graph TB
    A[Event Trigger] --> B[Notification Service]
    B --> C[Channel Router]
    C --> D[Email Service]
    C --> E[SMS Service]
    C --> F[Push Service]
    C --> G[In-App Service]
    D --> H[Delivery Queue]
    E --> H
    F --> H
    G --> H
    H --> I[User Inbox]
    I --> J[Analytics Service]
\`\`\`

### Notification Categories

#### System Notifications
- Account verification and security alerts
- Platform updates and maintenance notices
- Policy changes and legal updates

#### Job-Related Notifications
- New job matches and recommendations
- Application status updates
- Interview scheduling and reminders
- Job posting expiration warnings

#### Application Notifications
- New application received (employers)
- Application status changes (candidates)
- Interview feedback and decisions
- Offer letters and negotiations

#### Communication Notifications
- Direct messages between users
- Interview scheduling confirmations
- Feedback requests and responses`,
      calloutBoxes: [
        {
          type: "info",
          title: "Notification Volume",
          content: "The system processes over 1 million notifications daily with 99.5% delivery success rate."
        }
      ]
    },
    {
      id: "notification-types",
      title: "Notification Types & Channels",
      content: `CareerForge supports multiple notification types and delivery channels to ensure users receive information through their preferred methods.

### Notification Types

#### Instant Notifications
- **Real-time Events**: Immediate delivery for time-sensitive information
- **Urgent Alerts**: Security issues, interview confirmations
- **System Critical**: Account suspension, payment failures

#### Scheduled Notifications
- **Digest Emails**: Daily/weekly summaries of activity
- **Reminder Notifications**: Interview reminders, deadline warnings
- **Follow-up Messages**: Post-interaction communications

#### Batch Notifications
- **Bulk Communications**: Company-wide announcements
- **Marketing Messages**: Feature updates, tips, and insights
- **Newsletter Communications**: Industry news and trends

### Delivery Channels

#### Email Notifications
\`\`\`javascript
{
  "channel": "email",
  "priority": "high",
  "template": "interview_invite",
  "recipients": ["user@example.com"],
  "data": {
    "interviewTime": "2025-01-15T14:00:00Z",
    "interviewer": "Sarah Johnson",
    "meetingLink": "https://meet.careerforge.com/abc123"
  }
}
\`\`\`

#### SMS Notifications
\`\`\`javascript
{
  "channel": "sms",
  "priority": "urgent",
  "message": "Your interview with TechCorp is in 30 minutes",
  "recipient": "+1234567890"
}
\`\`\`

#### Push Notifications
\`\`\`javascript
{
  "channel": "push",
  "title": "New Job Match!",
  "body": "You have a new job match for Senior Developer at Google",
  "data": {
    "jobId": "job-123",
    "type": "job_match"
  },
  "actions": [
    {
      "title": "View Job",
      "action": "view_job",
      "jobId": "job-123"
    }
  ]
}
\`\`\`

#### In-App Notifications
\`\`\`javascript
{
  "channel": "in_app",
  "type": "application_update",
  "title": "Application Status Update",
  "message": "Your application for Software Engineer has been viewed",
  "metadata": {
    "applicationId": "app-456",
    "jobId": "job-123",
    "employerId": "emp-789"
  },
  "actions": [
    {
      "label": "View Application",
      "url": "/applications/app-456"
    }
  ]
}
\`\`\`

### Channel Selection Logic

\`\`\`javascript
const selectNotificationChannel = (user, notificationType, urgency) => {
  const preferences = user.notificationPreferences;

  // Urgent notifications always try primary channel first
  if (urgency === 'urgent') {
    if (preferences.sms && isPhoneVerified(user)) {
      return 'sms';
    }
    if (preferences.push && hasPushToken(user)) {
      return 'push';
    }
  }

  // Check user preferences in priority order
  if (preferences.inApp && notificationType !== 'marketing') {
    return 'in_app';
  }

  if (preferences.email) {
    return 'email';
  }

  if (preferences.push && hasPushToken(user)) {
    return 'push';
  }

  // Fallback to email for important notifications
  return 'email';
};
\`\`\``,
      calloutBoxes: [
        {
          type: "warning",
          title: "Channel Preferences",
          content: "Users can customize notification preferences. Always respect user channel preferences and consent."
        }
      ]
    },
    {
      id: "real-time-messaging",
      title: "Real-Time Messaging",
      content: `Real-time messaging capabilities enable instant communication between users through WebSocket connections and persistent messaging.

### WebSocket Implementation

#### Connection Establishment
\`\`\`javascript
// Client-side WebSocket connection
const connectToNotifications = (userId, token) => {
  const wsUrl = \`wss://api.careerforge.com/notifications?userId=\${userId}&token=\${token}\`;

  const socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log('Connected to notification service');
    // Send heartbeat every 30 seconds
    setInterval(() => socket.send(JSON.stringify({ type: 'ping' })), 30000);
  };

  socket.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    handleRealtimeNotification(notification);
  };

  socket.onclose = () => {
    console.log('Disconnected from notification service');
    // Implement reconnection logic
    setTimeout(() => connectToNotifications(userId, token), 5000);
  };

  return socket;
};
\`\`\`

#### Message Types

##### System Messages
\`\`\`json
{
  "type": "system",
  "id": "notif-123",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "event": "job_match",
    "jobId": "job-456",
    "message": "New job match available"
  }
}
\`\`\`

##### Chat Messages
\`\`\`json
{
  "type": "chat",
  "id": "msg-789",
  "timestamp": "2025-01-15T10:31:00Z",
  "data": {
    "conversationId": "conv-101",
    "senderId": "user-202",
    "senderName": "John Doe",
    "message": "Hi, I'd like to schedule an interview",
    "attachments": []
  }
}
\`\`\`

##### Typing Indicators
\`\`\`json
{
  "type": "typing",
  "data": {
    "conversationId": "conv-101",
    "userId": "user-202",
    "isTyping": true
  }
}
\`\`\`

### Conversation Management

#### Creating Conversations
\`\`\`javascript
const createConversation = async (participants, initialMessage) => {
  const response = await fetch('/api/conversations', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      participants: participants.map(p => ({ userId: p.id, role: p.role })),
      type: 'direct', // direct, group, support
      initialMessage: {
        content: initialMessage,
        attachments: []
      }
    })
  });

  return await response.json();
};
\`\`\`

#### Sending Messages
\`\`\`javascript
const sendMessage = async (conversationId, messageData) => {
  const response = await fetch(\`/api/conversations/\${conversationId}/messages\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: messageData.content,
      messageType: 'text', // text, file, system
      attachments: messageData.attachments || [],
      metadata: messageData.metadata || {}
    })
  });

  return await response.json();
};
\`\`\`

### Message History & Pagination

\`\`\`javascript
const getMessageHistory = async (conversationId, options = {}) => {
  const params = new URLSearchParams({
    limit: options.limit || 50,
    before: options.before || '',
    after: options.after || ''
  });

  const response = await fetch(\`/api/conversations/\${conversationId}/messages?\${params}\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

### Real-Time Features

#### Presence Indicators
\`\`\`javascript
const updatePresence = async (status) => {
  const response = await fetch('/api/presence', {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: status, // online, away, busy, offline
      lastSeen: new Date().toISOString()
    })
  });

  return await response.json();
};
\`\`\`

#### Read Receipts
\`\`\`javascript
const markMessagesRead = async (conversationId, messageIds) => {
  const response = await fetch(\`/api/conversations/\${conversationId}/read\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messageIds
    })
  });

  return await response.json();
};
\`\`\``,
      codeExamples: [
        {
          id: "websocket-client",
          title: "WebSocket Client Implementation",
          description: "Complete WebSocket client for real-time notifications",
          language: "typescript",
          code: `class NotificationWebSocket {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(
    private userId: string,
    private token: string,
    private onNotification: (notification: any) => void,
    private onConnectionChange: (connected: boolean) => void
  ) {}

  connect() {
    const wsUrl = \`wss://api.careerforge.com/notifications?userId=\${this.userId}&token=\${this.token}\`;

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.onConnectionChange(true);
        this.startHeartbeat();
      };

      this.socket.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          this.onNotification(notification);
        } catch (error) {
          console.error('Failed to parse notification:', error);
        }
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.onConnectionChange(false);
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private startHeartbeat() {
    setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      setTimeout(() => {
        console.log(\`Attempting to reconnect (\${this.reconnectAttempts}/\${this.maxReconnectAttempts})\`);
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Client disconnect');
      this.socket = null;
    }
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected');
    }
  }
}`
        }
      ]
    },
    {
      id: "notification-preferences",
      title: "User Preferences & Settings",
      content: `Comprehensive user preference management for controlling notification delivery across all channels and types.

### Preference Categories

#### Channel Preferences
\`\`\`javascript
{
  "email": {
    "enabled": true,
    "frequency": "immediate", // immediate, daily, weekly
    "types": {
      "job_matches": true,
      "application_updates": true,
      "interview_invites": true,
      "marketing": false,
      "system": true
    }
  },
  "sms": {
    "enabled": true,
    "types": {
      "urgent": true,
      "interview_reminders": true,
      "offers": true
    }
  },
  "push": {
    "enabled": true,
    "quiet_hours": {
      "enabled": true,
      "start": "22:00",
      "end": "08:00"
    },
    "types": {
      "job_alerts": true,
      "messages": true,
      "system": false
    }
  },
  "in_app": {
    "enabled": true,
    "sound": true,
    "badge": true,
    "preview": true
  }
}
\`\`\`

#### Content Preferences
\`\`\`javascript
{
  "job_preferences": {
    "new_matches": true,
    "similar_jobs": false,
    "saved_search_alerts": true,
    "application_deadlines": true
  },
  "application_preferences": {
    "status_changes": true,
    "interview_scheduled": true,
    "feedback_requests": true,
    "rejection_notices": true
  },
  "communication_preferences": {
    "direct_messages": true,
    "group_messages": false,
    "mention_notifications": true,
    "follow_notifications": false
  }
}
\`\`\`

### Managing Preferences

#### Get Current Preferences
\`\`\`javascript
const getNotificationPreferences = async () => {
  const response = await fetch('/api/notifications/preferences', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

#### Update Preferences
\`\`\`javascript
const updateNotificationPreferences = async (preferences) => {
  const response = await fetch('/api/notifications/preferences', {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(preferences)
  });

  return await response.json();
};
\`\`\`

#### Bulk Preference Updates
\`\`\`javascript
const updateMultiplePreferences = async (updates) => {
  const response = await fetch('/api/notifications/preferences/bulk', {
    method: 'PATCH',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      updates: [
        { path: 'email.types.job_matches', value: false },
        { path: 'push.quiet_hours.enabled', value: true },
        { path: 'sms.enabled', value: false }
      ]
    })
  });

  return await response.json();
};
\`\`\`

### Preference Templates

#### Quick Setup Templates
\`\`\`javascript
const applyPreferenceTemplate = async (templateName) => {
  const templates = {
    'career_focused': {
      email: { enabled: true, frequency: 'immediate' },
      push: { enabled: true },
      sms: { enabled: false },
      in_app: { enabled: true }
    },
    'balanced': {
      email: { enabled: true, frequency: 'daily' },
      push: { enabled: true, quiet_hours: { enabled: true } },
      sms: { enabled: false },
      in_app: { enabled: true }
    },
    'minimal': {
      email: { enabled: false },
      push: { enabled: false },
      sms: { enabled: false },
      in_app: { enabled: true, sound: false }
    }
  };

  const template = templates[templateName];
  if (!template) {
    throw new Error('Template not found');
  }

  return await updateNotificationPreferences(template);
};
\`\`\`

### Preference Validation

All preference updates are validated for:
- Channel availability (phone verification for SMS)
- Logical consistency (can't disable all channels for critical notifications)
- Rate limiting (prevent preference spam)
- Business rules (marketing preferences always optional)

### Preference Inheritance

#### Organization-Level Preferences
\`\`\`javascript
// Company admins can set default preferences for team members
const setCompanyDefaults = async (companyId, defaults) => {
  const response = await fetch(\`/api/companies/\${companyId}/notification-defaults\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(defaults)
  });

  return await response.json();
};
\`\`\`

#### User Override Rules
- User preferences always override company defaults
- Critical system notifications cannot be disabled
- Legal/compliance notifications are mandatory`,
      lists: [
        {
          type: "unordered",
          items: [
            "Preference changes take effect immediately for new notifications",
            "Users can test notification preferences with sample messages",
            "Preference history is maintained for audit purposes",
            "Bulk preference updates support partial modifications"
          ]
        }
      ]
    },
    {
      id: "notification-delivery",
      title: "Delivery & Reliability",
      content: `Robust notification delivery system with retry logic, delivery tracking, and failure handling.

### Delivery Pipeline

1. **Queue Management**: Notifications are queued for processing
2. **Channel Selection**: Optimal channel selected based on preferences
3. **Content Rendering**: Templates rendered with user-specific data
4. **Delivery Attempt**: Message sent through selected channel
5. **Status Tracking**: Delivery status recorded and monitored
6. **Retry Logic**: Failed deliveries automatically retried
7. **Fallback Channels**: Alternative channels used when primary fails

### Delivery Reliability

#### Retry Strategy
\`\`\`javascript
const deliveryRetryStrategy = {
  maxAttempts: 5,
  backoffMultiplier: 2,
  initialDelay: 1000, // 1 second
  maxDelay: 300000,   // 5 minutes

  calculateDelay: function(attempt) {
    const delay = this.initialDelay * Math.pow(this.backoffMultiplier, attempt - 1);
    return Math.min(delay, this.maxDelay);
  },

  shouldRetry: function(error, attempt) {
    if (attempt >= this.maxAttempts) return false;

    // Retry on temporary failures
    const retryableErrors = [
      'NETWORK_ERROR',
      'SERVICE_UNAVAILABLE',
      'RATE_LIMITED',
      'TEMPORARY_FAILURE'
    ];

    return retryableErrors.includes(error.code);
  }
};
\`\`\`

#### Delivery Status Tracking

\`\`\`javascript
const trackDeliveryStatus = async (notificationId, status, metadata) => {
  const response = await fetch(\`/api/notifications/\${notificationId}/status\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status, // queued, sent, delivered, failed, bounced
      timestamp: new Date().toISOString(),
      metadata: {
        channel: metadata.channel,
        provider: metadata.provider,
        attempt: metadata.attempt,
        error: metadata.error
      }
    })
  });

  return await response.json();
};
\`\`\`

### Channel-Specific Handling

#### Email Delivery
\`\`\`javascript
const sendEmailNotification = async (notification) => {
  try {
    const result = await emailService.send({
      to: notification.recipient,
      subject: notification.subject,
      html: notification.htmlContent,
      text: notification.textContent,
      tracking: {
        notificationId: notification.id,
        userId: notification.userId
      }
    });

    await trackDeliveryStatus(notification.id, 'sent', {
      channel: 'email',
      provider: 'sendgrid',
      messageId: result.messageId
    });

    return result;
  } catch (error) {
    await trackDeliveryStatus(notification.id, 'failed', {
      channel: 'email',
      error: error.message,
      attempt: notification.attemptCount
    });

    throw error;
  }
};
\`\`\`

#### SMS Delivery
\`\`\`javascript
const sendSmsNotification = async (notification) => {
  try {
    const result = await smsService.send({
      to: notification.recipient,
      message: notification.message,
      tracking: {
        notificationId: notification.id
      }
    });

    await trackDeliveryStatus(notification.id, 'sent', {
      channel: 'sms',
      provider: 'twilio',
      messageId: result.messageId
    });

    return result;
  } catch (error) {
    // Handle SMS-specific errors
    if (error.code === 'INVALID_NUMBER') {
      await updateUserPhoneStatus(notification.userId, 'invalid');
    }

    await trackDeliveryStatus(notification.id, 'failed', {
      channel: 'sms',
      error: error.message
    });

    throw error;
  }
};
\`\`\`

### Delivery Analytics

#### Success Metrics
\`\`\`javascript
const getDeliveryMetrics = async (dateRange) => {
  const response = await fetch('/api/notifications/delivery/metrics', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      startDate: dateRange.start,
      endDate: dateRange.end
    }
  });

  return await response.json();
};

// Returns:
// - Overall delivery rate
// - Channel-specific rates
// - Bounce rates
// - Spam complaint rates
// - Average delivery time
\`\`\`

#### Failure Analysis
\`\`\`javascript
const analyzeDeliveryFailures = async (dateRange) => {
  const response = await fetch('/api/notifications/delivery/failures', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      startDate: dateRange.start,
      endDate: dateRange.end
    }
  });

  return await response.json();
};

// Returns:
// - Failure reasons breakdown
// - Channel failure rates
// - User opt-out trends
// - Geographic failure patterns
\`\`\`

### Fallback Strategies

#### Channel Fallback
\`\`\`javascript
const attemptDeliveryWithFallback = async (notification) => {
  const channels = ['email', 'push', 'sms', 'in_app'];

  for (const channel of channels) {
    if (await canUseChannel(notification.userId, channel)) {
      try {
        await sendViaChannel(notification, channel);
        return { success: true, channel };
      } catch (error) {
        console.warn(\`Failed to deliver via \${channel}:\`, error);
        continue;
      }
    }
  }

  // All channels failed
  await handleTotalDeliveryFailure(notification);
  return { success: false, reason: 'all_channels_failed' };
};
\`\`\`

#### Content Fallback
\`\`\`javascript
const generateFallbackContent = (notification, failedChannel) => {
  const fallbacks = {
    email: {
      sms: truncateForSms(notification.subject),
      push: createPushFromEmail(notification)
    },
    sms: {
      email: createEmailFromSms(notification),
      push: createPushFromSms(notification)
    }
  };

  return fallbacks[failedChannel]?.[notification.fallbackChannel];
};
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Delivery Guarantees",
          content: "Critical notifications have 99.9% delivery success rate with automatic retries and channel fallbacks."
        }
      ]
    },
    {
      id: "bulk-notifications",
      title: "Bulk Notifications",
      content: `Efficient bulk notification processing for large-scale communications and campaigns.

### Bulk Notification Types

#### Broadcast Notifications
- Company-wide announcements
- Platform updates
- Policy changes
- Emergency communications

#### Targeted Campaigns
- Job-specific notifications
- Industry-focused messages
- Geographic targeting
- Role-based communications

#### Scheduled Campaigns
- Welcome series for new users
- Re-engagement campaigns
- Seasonal promotions
- Educational content series

### Bulk Processing Architecture

\`\`\`mermaid
graph TB
    A[Bulk Request] --> B[Validation]
    B --> C[Audience Segmentation]
    C --> D[Batch Creation]
    D --> E[Queue Distribution]
    E --> F[Worker Pool]
    F --> G[Channel Delivery]
    G --> H[Status Aggregation]
    H --> I[Reporting]
\`\`\`

### Creating Bulk Notifications

#### Basic Bulk Notification
\`\`\`javascript
const createBulkNotification = async (campaignData) => {
  const response = await fetch('/api/notifications/bulk', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: campaignData.name,
      description: campaignData.description,
      audience: {
        type: 'segment', // all, segment, list
        segmentId: campaignData.segmentId,
        filters: campaignData.filters
      },
      content: {
        subject: campaignData.subject,
        message: campaignData.message,
        channels: ['email', 'push'],
        template: campaignData.template
      },
      schedule: {
        type: 'immediate', // immediate, scheduled, recurring
        scheduledFor: campaignData.scheduledFor
      },
      settings: {
        respectPreferences: true,
        trackOpens: true,
        trackClicks: true,
        allowUnsubscribe: true
      }
    })
  });

  return await response.json();
};
\`\`\`

### Audience Segmentation

#### Dynamic Segments
\`\`\`javascript
const createAudienceSegment = async (segmentDefinition) => {
  const response = await fetch('/api/audience/segments', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: segmentDefinition.name,
      description: segmentDefinition.description,
      filters: {
        userType: segmentDefinition.userType, // job_seeker, employer
        location: segmentDefinition.location,
        industry: segmentDefinition.industry,
        activityLevel: segmentDefinition.activityLevel, // active, inactive, new
        customFilters: segmentDefinition.customFilters
      },
      estimatedSize: segmentDefinition.estimatedSize
    })
  });

  return await response.json();
};
\`\`\`

#### Static Lists
\`\`\`javascript
const createStaticList = async (listData) => {
  const response = await fetch('/api/audience/lists', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: listData.name,
      description: listData.description,
      users: listData.userIds,
      source: listData.source // upload, api, manual
    })
  });

  return await response.json();
};
\`\`\`

### Batch Processing

#### Processing Configuration
\`\`\`javascript
const bulkProcessingConfig = {
  batchSize: 1000,        // Users per batch
  concurrency: 5,         // Concurrent batches
  rateLimit: 100,         // Messages per second
  retryConfig: {
    maxAttempts: 3,
    backoffMs: 1000
  },
  progressCallback: (progress) => {
    console.log(\`Processed \${progress.completed}/\${progress.total} notifications\`);
  }
};
\`\`\`

#### Progress Tracking
\`\`\`javascript
const monitorBulkCampaign = async (campaignId) => {
  const response = await fetch(\`/api/notifications/bulk/\${campaignId}/progress\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Total recipients
// - Processed count
// - Success count
// - Failure count
// - Estimated completion time
// - Current batch status
\`\`\`

### A/B Testing for Bulk Notifications

\`\`\`javascript
const createABTestCampaign = async (testData) => {
  const response = await fetch('/api/notifications/bulk/ab-test', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: testData.name,
      audience: testData.audience,
      variants: [
        {
          name: 'variant_a',
          subject: testData.variantA.subject,
          content: testData.variantA.content,
          weight: 50 // 50% of audience
        },
        {
          name: 'variant_b',
          subject: testData.variantB.subject,
          content: testData.variantB.content,
          weight: 50 // 50% of audience
        }
      ],
      goal: 'open_rate', // open_rate, click_rate, conversion
      duration: testData.duration // hours
    })
  });

  return await response.json();
};
\`\`\`

### Compliance & Opt-Outs

#### Unsubscribe Handling
\`\`\`javascript
const handleUnsubscribe = async (userId, campaignType) => {
  const response = await fetch('/api/notifications/unsubscribe', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      campaignType, // marketing, newsletter, promotional
      reason: 'user_request'
    })
  });

  return await response.json();
};
\`\`\`

#### Compliance Checks
\`\`\`javascript
const checkCompliance = async (campaignData) => {
  // GDPR compliance
  const hasConsent = await checkUserConsents(campaignData.audience);

  // CAN-SPAM compliance
  const hasUnsubscribeLink = campaignData.content.includes('unsubscribe');

  // TCPA compliance for SMS
  const hasSmsConsent = await checkSmsConsents(campaignData.audience);

  return {
    gdpr: hasConsent,
    canSpam: hasUnsubscribeLink,
    tcpa: hasSmsConsent,
    compliant: hasConsent && hasUnsubscribeLink && hasSmsConsent
  };
};
\`\`\`

### Bulk Notification Limits

- **Maximum Audience Size**: 1,000,000 recipients
- **Rate Limits**: 10,000 messages per minute
- **Concurrent Campaigns**: 5 per organization
- **Scheduling**: Up to 90 days in advance
- **Content Size**: 1MB per message`,
      codeExamples: [
        {
          id: "bulk-notification-processor",
          title: "Bulk Notification Processor",
          description: "Scalable bulk notification processing with progress tracking",
          language: "typescript",
          code: `class BulkNotificationProcessor {
  private batchSize = 1000;
  private concurrency = 5;
  private rateLimiter = new RateLimiter(100); // 100 per second

  async processBulkCampaign(campaignId: string, onProgress?: (progress: any) => void) {
    const campaign = await this.getCampaign(campaignId);
    const audience = await this.getAudience(campaign.audienceId);

    const batches = this.createBatches(audience, this.batchSize);
    const results = {
      total: audience.length,
      processed: 0,
      successful: 0,
      failed: 0,
      batches: batches.length
    };

    // Process batches with controlled concurrency
    const batchPromises = batches.map((batch, index) =>
      this.processBatch(campaign, batch, index, results, onProgress)
    );

    // Limit concurrency
    const chunks = this.chunkArray(batchPromises, this.concurrency);

    for (const chunk of chunks) {
      await Promise.all(chunk);
    }

    await this.finalizeCampaign(campaignId, results);
    return results;
  }

  private async processBatch(
    campaign: any,
    batch: any[],
    batchIndex: number,
    results: any,
    onProgress?: (progress: any) => void
  ) {
    const batchResults = {
      successful: 0,
      failed: 0,
      errors: []
    };

    for (const recipient of batch) {
      try {
        await this.rateLimiter.waitForSlot();

        const personalizedContent = await this.personalizeContent(
          campaign.content,
          recipient
        );

        await this.sendNotification(campaign, recipient, personalizedContent);

        batchResults.successful++;
        results.successful++;
      } catch (error) {
        batchResults.failed++;
        results.failed++;
        batchResults.errors.push({
          recipient: recipient.id,
          error: error.message
        });
      }

      results.processed++;

      if (onProgress && results.processed % 100 === 0) {
        onProgress({ ...results });
      }
    }

    await this.recordBatchResults(campaign.id, batchIndex, batchResults);
  }

  private createBatches(audience: any[], batchSize: number): any[][] {
    const batches = [];
    for (let i = 0; i < audience.length; i += batchSize) {
      batches.push(audience.slice(i, i + batchSize));
    }
    return batches;
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}`
        }
      ]
    },
    {
      id: "notification-analytics",
      title: "Analytics & Monitoring",
      content: `Comprehensive analytics and monitoring for notification performance, user engagement, and system health.

### Delivery Analytics

#### Real-Time Metrics
\`\`\`javascript
const getRealtimeMetrics = async () => {
  const response = await fetch('/api/notifications/analytics/realtime', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Messages sent per minute
// - Delivery success rate
// - Average delivery time
// - Queue depth
// - System health status
\`\`\`

#### Historical Analytics
\`\`\`javascript
const getHistoricalAnalytics = async (dateRange, granularity) => {
  const response = await fetch('/api/notifications/analytics/historical', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      startDate: dateRange.start,
      endDate: dateRange.end,
      granularity: granularity || 'hour' // minute, hour, day, week, month
    }
  });

  return await response.json();
};
\`\`\`

### User Engagement Analytics

#### Open & Click Tracking
\`\`\`javascript
const getEngagementMetrics = async (notificationId) => {
  const response = await fetch(\`/api/notifications/\${notificationId}/engagement\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Open rate
// - Click rate
// - Conversion rate
// - Time to engagement
// - Device breakdown
// - Geographic distribution
\`\`\`

#### User Behavior Patterns
\`\`\`javascript
const getUserBehaviorPatterns = async (userId, dateRange) => {
  const response = await fetch(\`/api/users/\${userId}/notification-behavior\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      startDate: dateRange.start,
      endDate: dateRange.end
    }
  });

  return await response.json();
};

// Returns:
// - Preferred channels
// - Best send times
// - Engagement patterns
// - Opt-out trends
// - Content preferences
\`\`\`

### Campaign Analytics

#### Campaign Performance
\`\`\`javascript
const getCampaignAnalytics = async (campaignId) => {
  const response = await fetch(\`/api/notifications/campaigns/\${campaignId}/analytics\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Delivery metrics
// - Engagement metrics
// - Conversion metrics
// - A/B test results
// - ROI calculations
\`\`\`

#### Comparative Analysis
\`\`\`javascript
const compareCampaigns = async (campaignIds, metrics) => {
  const response = await fetch('/api/notifications/campaigns/compare', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      campaignIds,
      metrics: metrics || ['open_rate', 'click_rate', 'conversion_rate']
    })
  });

  return await response.json();
};
\`\`\`

### System Monitoring

#### Health Checks
\`\`\`javascript
const getSystemHealth = async () => {
  const response = await fetch('/api/notifications/health', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Service status
// - Queue depths
// - Error rates
// - Performance metrics
// - Resource utilization
\`\`\`

#### Alert Configuration
\`\`\`javascript
const configureAlerts = async (alertConfig) => {
  const response = await fetch('/api/notifications/alerts', {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alerts: [
        {
          type: 'delivery_rate',
          threshold: 95, // percent
          condition: 'below',
          channels: ['email', 'slack']
        },
        {
          type: 'queue_depth',
          threshold: 10000,
          condition: 'above',
          channels: ['email']
        }
      ]
    })
  });

  return await response.json();
};
\`\`\`

### Predictive Analytics

#### Optimal Send Times
\`\`\`javascript
const getOptimalSendTimes = async (userId, channel) => {
  const response = await fetch(\`/api/users/\${userId}/optimal-send-times\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: { channel }
  });

  return await response.json();
};

// Returns:
// - Best days of week
// - Best times of day
// - Channel-specific recommendations
// - Confidence scores
\`\`\`

#### Churn Prediction
\`\`\`javascript
const predictUserChurn = async (userId) => {
  const response = await fetch(\`/api/users/\${userId}/churn-prediction\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Churn probability
// - Risk factors
// - Recommended actions
// - Retention strategies
\`\`\`

### Reporting & Dashboards

#### Automated Reports
\`\`\`javascript
const generateAnalyticsReport = async (reportConfig) => {
  const response = await fetch('/api/notifications/reports', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: reportConfig.type, // daily, weekly, monthly, custom
      dateRange: reportConfig.dateRange,
      metrics: reportConfig.metrics,
      format: reportConfig.format || 'pdf', // pdf, csv, json
      recipients: reportConfig.recipients
    })
  });

  return await response.json();
};
\`\`\`

#### Custom Dashboards
\`\`\`javascript
const createAnalyticsDashboard = async (dashboardConfig) => {
  const response = await fetch('/api/notifications/dashboards', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: dashboardConfig.name,
      description: dashboardConfig.description,
      widgets: [
        {
          type: 'metric',
          metric: 'delivery_rate',
          title: 'Delivery Rate',
          timeframe: '24h'
        },
        {
          type: 'chart',
          metric: 'engagement_trend',
          title: 'Engagement Trend',
          timeframe: '7d'
        }
      ],
      schedule: dashboardConfig.schedule // daily, weekly, realtime
    })
  });

  return await response.json();
};
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Analytics data is updated in real-time with sub-minute latency",
            "All user interactions are tracked with privacy compliance",
            "Predictive analytics use machine learning for optimization",
            "Automated reports can be scheduled and distributed"
          ]
        }
      ]
    },
    {
      id: "notification-endpoints",
      title: "Notification Endpoints",
      content: `Complete API reference for notification management and real-time messaging.

### Notification Management

#### POST /notifications
Send a notification.

#### GET /notifications
List user notifications.

#### GET /notifications/{id}
Get notification details.

#### PUT /notifications/{id}/read
Mark notification as read.

#### DELETE /notifications/{id}
Delete notification.

### Preferences

#### GET /notifications/preferences
Get notification preferences.

#### PUT /notifications/preferences
Update notification preferences.

#### GET /notifications/preferences/templates
Get preference templates.

### Real-Time Messaging

#### WebSocket /notifications/ws
Real-time notification WebSocket.

#### POST /conversations
Create conversation.

#### GET /conversations
List user conversations.

#### GET /conversations/{id}
Get conversation details.

#### POST /conversations/{id}/messages
Send message.

#### GET /conversations/{id}/messages
Get message history.

### Bulk Operations

#### POST /notifications/bulk
Create bulk notification campaign.

#### GET /notifications/bulk/{id}
Get bulk campaign status.

#### PUT /notifications/bulk/{id}/pause
Pause bulk campaign.

#### DELETE /notifications/bulk/{id}
Cancel bulk campaign.

### Analytics

#### GET /notifications/analytics/delivery
Get delivery analytics.

#### GET /notifications/analytics/engagement
Get engagement analytics.

#### GET /notifications/analytics/campaigns
Get campaign analytics.

### Administrative

#### GET /admin/notifications
Admin notification search.

#### POST /admin/notifications/broadcast
Send platform-wide broadcast.

#### GET /admin/notifications/health
Get notification system health.

### Response Examples

#### Send Notification Response
\`\`\`json
{
  "success": true,
  "data": {
    "id": "notif-123",
    "status": "queued",
    "channels": ["email", "push"],
    "estimatedDelivery": "2025-01-15T10:35:00Z"
  }
}
\`\`\`

#### Notification List Response
\`\`\`json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif-123",
        "type": "job_match",
        "title": "New Job Match",
        "message": "You have a new job match for Senior Developer",
        "read": false,
        "createdAt": "2025-01-15T10:30:00Z",
        "actions": [
          {
            "label": "View Job",
            "url": "/jobs/456"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150
    }
  }
}
\`\`\`

#### Conversation Response
\`\`\`json
{
  "success": true,
  "data": {
    "id": "conv-789",
    "participants": [
      {
        "userId": "user-123",
        "name": "John Doe",
        "role": "candidate"
      },
      {
        "userId": "user-456",
        "name": "Jane Smith",
        "role": "employer"
      }
    ],
    "lastMessage": {
      "content": "Hi, I'd like to schedule an interview",
      "senderId": "user-123",
      "timestamp": "2025-01-15T11:00:00Z"
    },
    "unreadCount": 2
  }
}
\`\`\`

#### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "INVALID_RECIPIENT",
    "message": "Recipient not found or has unsubscribed",
    "details": {
      "recipientId": "user-123",
      "reason": "user_unsubscribed"
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "All notification endpoints require authentication",
            "WebSocket connections require valid JWT tokens",
            "Bulk operations are rate-limited based on subscription tier",
            "Administrative endpoints require admin role"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Analytics API",
        href: "/docs/backend-api/analytics",
        description: "Track notification performance and user engagement"
      },
      {
        text: "Rate Limiting API",
        href: "/docs/backend-api/rate-limiting",
        description: "Manage notification API usage limits"
      },
      {
        text: "Real-Time Features",
        href: "/docs/frontend/real-time",
        description: "Implement real-time features in your frontend"
      }
    ]
  },
  relatedResources: [
    {
      text: "WebSocket Protocol",
      href: "/docs/api/websocket",
      description: "Detailed WebSocket implementation guide"
    },
    {
      text: "Email Templates",
      href: "/docs/design/email-templates",
      description: "Notification email template guidelines"
    },
    {
      text: "Privacy & Compliance",
      href: "/docs/legal/privacy",
      description: "Notification privacy and compliance requirements"
    }
  ]
}