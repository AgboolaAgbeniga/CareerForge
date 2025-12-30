import { PageContent } from '@/lib/content-types';

export const messagingSystemContent: PageContent = {
  metadata: {
    title: "Messaging System",
    description: "Comprehensive guide to real-time messaging, notifications, and communication features",
    version: "1.0.0",
    lastUpdated: "2024-12-27",
    authors: ["CareerForge Team"],
    tags: ["frontend", "messaging", "real-time", "notifications", "communication"],
    difficulty: "intermediate" as const,
    estimatedTime: 18
  },
  tableOfContents: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "real-time-messaging", title: "Real-time Messaging", level: 2 },
    { id: "notification-system", title: "Notification System", level: 2 },
    { id: "message-components", title: "Message Components", level: 2 },
    { id: "conversation-management", title: "Conversation Management", level: 2 },
    { id: "push-notifications", title: "Push Notifications", level: 2 },
    { id: "message-threading", title: "Message Threading", level: 2 },
    { id: "file-sharing", title: "File Sharing", level: 2 },
    { id: "message-search", title: "Message Search", level: 2 },
    { id: "privacy-security", title: "Privacy & Security", level: 2 },
    { id: "performance-optimization", title: "Performance Optimization", level: 2 }
  ],
  introduction: {
    id: "introduction",
    title: "Messaging System",
    content: `
The messaging system provides seamless, real-time communication between job seekers, recruiters, and hiring managers throughout the recruitment process. Built with modern WebSocket technology and optimized for both desktop and mobile experiences, it ensures timely, secure, and efficient communication.

## Key Features

- **Real-time Messaging**: Instant message delivery with WebSocket technology
- **Multi-party Conversations**: Support for group discussions and team collaboration
- **Rich Media Support**: Share documents, images, and links seamlessly
- **Message Threading**: Organized conversation flows with reply functionality
- **Notification System**: Smart notifications for new messages and important updates
- **Message Search**: Full-text search across conversation history
- **Message Encryption**: End-to-end encryption for sensitive communications
- **Offline Support**: Message queuing and synchronization for offline users
- **Typing Indicators**: Real-time typing status and read receipts
- **Mobile Optimization**: Responsive design optimized for mobile messaging

## User Experience

The messaging system is designed to facilitate natural, efficient communication while maintaining professional standards appropriate for recruitment contexts. It balances real-time responsiveness with thoughtful notification management to prevent communication overload.

## Technology Implementation

Built on Next.js with WebSocket support, TypeScript for type safety, and real-time data synchronization using modern web technologies. The system supports both real-time and offline messaging with intelligent synchronization.
    `
  },
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: `
The messaging system serves as the primary communication channel throughout the recruitment lifecycle, enabling seamless interaction between all stakeholders in the hiring process.

### System Architecture

#### Real-time Communication Layer
- **WebSocket Connections**: Persistent connections for real-time message delivery
- **Message Queuing**: Intelligent queuing system for offline users
- **Connection Management**: Automatic reconnection and failover handling
- **Message Synchronization**: Cross-device message synchronization

#### Data Management
- **Message Storage**: Efficient message storage and retrieval
- **Conversation Management**: Thread organization and participant management
- **Search Indexing**: Full-text search across message content
- **Data Retention**: Configurable message retention policies

### User Roles & Permissions

#### Job Seekers
- **Direct Messages**: Communicate directly with recruiters and hiring managers
- **Application Updates**: Receive notifications about application status
- **Interview Coordination**: Schedule and manage interview communications
- **Document Sharing**: Share resumes, portfolios, and other materials

#### Recruiters & Hiring Managers
- **Candidate Communication**: Message candidates about opportunities
- **Team Collaboration**: Coordinate with team members on hiring decisions
- **Application Reviews**: Discuss candidate qualifications internally
- **Interview Management**: Coordinate interview schedules and feedback

#### System Administrators
- **Platform Communications**: Send system-wide announcements
- **Support Communications**: Provide customer support via messaging
- **Compliance Monitoring**: Monitor communications for policy compliance
- **Analytics & Reporting**: Access communication analytics and reports

### Communication Workflows

#### Application Communication
1. **Initial Interest**: Automated welcome messages when users express interest
2. **Application Updates**: Status change notifications and next steps
3. **Interview Coordination**: Schedule interviews and send reminders
4. **Feedback Delivery**: Share interview feedback and decision outcomes
5. **Onboarding Support**: Assist with onboarding process communication

#### Proactive Communication
- **Job Alerts**: Notify candidates about relevant job opportunities
- **Profile Updates**: Suggest profile improvements and optimizations
- **Market Insights**: Share industry trends and career advice
- **System Updates**: Communicate platform changes and new features
      `
    },
    {
      id: "real-time-messaging",
      title: "Real-time Messaging",
      content: `
The real-time messaging system provides instant communication capabilities using WebSocket technology, ensuring messages are delivered immediately and efficiently across all devices.

### WebSocket Implementation

#### Connection Management
The messaging system establishes persistent WebSocket connections for real-time communication, with automatic reconnection and intelligent connection pooling.

**Connection Features:**
- Automatic connection establishment and maintenance
- Reconnection logic with exponential backoff
- Connection pooling for multiple concurrent conversations
- Heartbeat monitoring to detect connection health
- Graceful degradation to HTTP polling when WebSocket unavailable

**Implementation Example:**
\`\`\`typescript
interface MessageConnection {
  userId: string;
  conversationId: string;
  lastMessageId?: string;
  unreadCount: number;
  isTyping: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'reconnecting';
}

class MessageSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  private maxReconnectAttempts = 5;

  async connectToConversation(conversationId: string, userId: string): Promise<void> {
    const wsUrl = \`wss://api.careerforge.com/messages/\${conversationId}?userId=\${userId}\`;
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log(\`Connected to conversation \${conversationId}\`);
      this.connections.set(conversationId, ws);
      this.reconnectAttempts.set(conversationId, 0);
      
      // Send authentication and subscription
      ws.send(JSON.stringify({
        type: 'auth',
        token: this.getAuthToken(),
        conversationId,
        userId
      }));
    };

    ws.onmessage = (event) => {
      this.handleIncomingMessage(conversationId, JSON.parse(event.data));
    };

    ws.onclose = () => {
      this.handleDisconnection(conversationId);
    };

    ws.onerror = (error) => {
      console.error(\`WebSocket error for conversation \${conversationId}:\`, error);
    };
  }

  private async handleDisconnection(conversationId: string): Promise<void> {
    this.connections.delete(conversationId);
    
    const attempts = this.reconnectAttempts.get(conversationId) || 0;
    if (attempts < this.maxReconnectAttempts) {
      const delay = Math.pow(2, attempts) * 1000; // Exponential backoff
      this.reconnectAttempts.set(conversationId, attempts + 1);
      
      setTimeout(() => {
        console.log(\`Reconnecting to conversation \${conversationId}...\`);
        // Attempt reconnection
      }, delay);
    }
  }
}
\`\`\`

#### Message Delivery
- **Instant Delivery**: Messages delivered in real-time to all active participants
- **Offline Queuing**: Messages queued for offline recipients
- **Delivery Confirmation**: Receipt confirmation for message delivery status
- **Read Receipts**: Show when messages have been read by recipients

#### Typing Indicators
Real-time typing status updates help users know when others are composing responses.

**Typing Features:**
- Real-time typing status updates
- Typing timeout handling (stop showing typing after inactivity)
- Privacy controls for typing indicators
- Performance optimization for high-traffic conversations

### Message Types & Formats

#### Standard Messages
- **Text Messages**: Rich text with formatting and emoji support
- **System Messages**: Automated notifications and status updates
- **File Attachments**: Document and image sharing with preview
- **Link Previews**: Automatic preview generation for shared links

#### Rich Content Support
- **Markdown Formatting**: Support for basic markdown in messages
- **Emoji Reactions**: Quick reactions to messages using emoji
- **Message Threading**: Reply to specific messages in conversations
- **Message Editing**: Edit sent messages with version history

#### Media Support
- **Image Sharing**: Share images with compression and optimization
- **Document Upload**: Support for PDF, DOC, and other document formats
- **Voice Messages**: Audio message recording and playback (future feature)
- **Video Messages**: Short video message support (future feature)
      `
    },
    {
      id: "notification-system",
      title: "Notification System",
      content: `
The notification system intelligently manages message alerts and system communications to ensure users stay informed without being overwhelmed by unnecessary notifications.

### Notification Types

#### Message Notifications
- **New Message Alerts**: Instant notifications for new messages
- **Mentions & Replies**: Special alerts for mentions and message replies
- **Group Conversation Updates**: Notifications for group conversation activity
- **Message Read Status**: Notifications when messages are read

#### System Notifications
- **Application Updates**: Status changes in job applications
- **Interview Reminders**: Upcoming interview notifications
- **Job Recommendations**: New job opportunities matching user preferences
- **Profile Suggestions**: Recommendations for profile improvements

#### Administrative Notifications
- **Security Alerts**: Important security-related communications
- **Account Updates**: Changes to account settings or preferences
- **Feature Announcements**: New platform features and updates
- **Policy Updates**: Changes to terms of service or privacy policies

### Notification Management

#### Smart Notification Logic
The system uses intelligent algorithms to determine when to send notifications based on user preferences, activity patterns, and context.

**Notification Logic:**
- **User Activity Status**: Respect do-not-disturb and active status
- **Message Importance**: Prioritize notifications based on message type
- **Time-based Filtering**: Avoid notifications during specified quiet hours
- **Conversation Priority**: Higher priority for direct messages vs group messages

**Implementation Example:**
\`\`\`typescript
interface NotificationPreferences {
  messageNotifications: {
    directMessages: boolean;
    groupMessages: boolean;
    mentions: boolean;
    replies: boolean;
  };
  systemNotifications: {
    applicationUpdates: boolean;
    interviewReminders: boolean;
    jobRecommendations: boolean;
    profileSuggestions: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string;   // HH:MM format
    timezone: string;
  };
  doNotDisturb: {
    enabled: boolean;
    until?: string; // ISO timestamp
  };
}

class NotificationManager {
  private preferences: NotificationPreferences;

  async shouldSendNotification(
    notificationType: string,
    senderId: string,
    conversationId: string,
    messageContent: string
  ): Promise<boolean> {
    // Check do-not-disturb status
    if (this.preferences.doNotDisturb.enabled) {
      const now = new Date();
      if (!this.preferences.doNotDisturb.until || new Date(this.preferences.doNotDisturb.until) > now) {
        return false;
      }
    }

    // Check quiet hours
    if (this.preferences.quietHours.enabled && this.isWithinQuietHours()) {
      return false;
    }

    // Check conversation-specific preferences
    if (this.isDirectMessage(conversationId)) {
      return this.preferences.messageNotifications.directMessages;
    }

    if (this.isGroupMessage(conversationId)) {
      return this.preferences.messageNotifications.groupMessages;
    }

    // Check for mentions
    if (this.containsMention(messageContent)) {
      return this.preferences.messageNotifications.mentions;
    }

    return true;
  }

  private isWithinQuietHours(): boolean {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    const startTime = this.preferences.quietHours.startTime;
    const endTime = this.preferences.quietHours.endTime;
    
    return currentTime >= startTime && currentTime <= endTime;
  }
}
\`\`\`

#### Notification Delivery Channels
- **In-app Notifications**: Real-time notifications within the application
- **Push Notifications**: Mobile and desktop push notifications
- **Email Notifications**: Email alerts for important communications
- **SMS Notifications**: Text messages for urgent communications (opt-in)

#### Notification Customization
- **Granular Controls**: Fine-grained control over notification types
- **Conversation-level Settings**: Per-conversation notification preferences
- **Time-based Rules**: Automatic notification management based on time
- **Keyword Filtering**: Filter notifications based on message content
      `
    },
    {
      id: "message-components",
      title: "Message Components",
      content: `
The messaging system uses a comprehensive set of React components designed for optimal user experience and accessibility across all device types.

### Core Message Components

#### MessageList
The primary component for displaying conversations and message threads.

**Features:**
- Virtual scrolling for performance with large message lists
- Infinite scroll for loading older messages
- Message grouping by sender and time
- Real-time message updates
- Drag-and-drop file upload support

**Implementation:**
\`\`\`typescript
interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  messageType: 'text' | 'file' | 'system' | 'image';
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
  replyToId?: string;
  editedAt?: string;
  isRead: boolean;
  isOwn: boolean; // Whether current user sent the message
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  conversationId: string;
  onMessageAction: (messageId: string, action: string) => void;
  onLoadMore: () => void;
  hasMoreMessages: boolean;
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  conversationId,
  onMessageAction,
  onLoadMore,
  hasMoreMessages,
  loading
}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom for new messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    
    setShowScrollButton(!isAtBottom);

    // Load more messages when scrolling up
    if (scrollTop < 100 && hasMoreMessages && !loading) {
      onLoadMore();
    }
  }, [hasMoreMessages, loading, onLoadMore]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      onScroll={handleScroll}
    >
      {loading && hasMoreMessages && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500" />
        </div>
      )}

      {messages.map((message, index) => {
        const prevMessage = index > 0 ? messages[index - 1] : null;
        const isGrouped = prevMessage && 
          prevMessage.senderId === message.senderId &&
          new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 300000; // 5 minutes

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isGrouped={isGrouped}
            isOwn={message.senderId === currentUserId}
            onAction={(action) => onMessageAction(message.id, action)}
          />
        );
      })}

      <div ref={messagesEndRef} />

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-20 right-4 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
\`\`\`

#### MessageBubble
Displays individual messages with appropriate styling and interactions.

**Features:**
- Different styles for sent vs received messages
- Support for various message types (text, file, image)
- Message actions (reply, edit, delete)
- Read status indicators
- Message timestamp display

#### MessageInput
Rich text input component for composing messages.

**Features:**
- Rich text formatting with toolbar
- Emoji picker integration
- File upload with drag-and-drop
- Mention suggestions
- Auto-resize textarea
- Send message shortcuts (Enter to send, Shift+Enter for new line)

### Supporting Components

#### ConversationList
Displays all conversations with preview and unread counts.

**Features:**
- Search and filter conversations
- Unread message indicators
- Conversation previews
- Last message timestamps
- Online status indicators

#### NotificationPanel
Manages in-app notifications and alerts.

**Features:**
- Toast notifications for new messages
- Notification history
- Notification preferences
- Mark as read functionality

#### TypingIndicator
Shows when other users are typing.

**Features:**
- Real-time typing status
- Multiple user typing support
- Typing timeout handling
- Smooth animations
      `
    },
    {
      id: "conversation-management",
      title: "Conversation Management",
      content: `
The conversation management system organizes and manages all user communications, providing efficient navigation and organization of message threads.

### Conversation Organization

#### Conversation Types
- **Direct Messages**: One-on-one conversations between users
- **Group Conversations**: Multi-party discussions for team collaboration
- **Application Threads**: Conversations related to specific job applications
- **Interview Coordination**: Dedicated threads for interview scheduling
- **System Conversations**: Automated messages and notifications

#### Conversation Metadata
Each conversation maintains comprehensive metadata for organization and management.

**Metadata Properties:**
- Conversation ID and type
- Participant information
- Last message timestamp
- Unread message count
- Conversation status (active, archived, muted)
- Conversation title and description
- Created and updated timestamps
- Message count and statistics

### Conversation Features

#### Conversation Actions
Users can perform various actions on conversations to manage their communication flow.

**Available Actions:**
- **Mute/Unmute**: Temporarily disable notifications for specific conversations
- **Archive**: Remove conversations from active list while preserving history
- **Pin**: Keep important conversations at the top of the list
- **Leave**: Exit from group conversations (when appropriate)
- **Delete**: Permanently remove conversations (with confirmation)
- **Mark as Read**: Manually mark all messages in conversation as read

**Implementation Example:**
\`\`\`typescript
interface Conversation {
  id: string;
  type: 'direct' | 'group' | 'application' | 'interview' | 'system';
  title: string;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  metadata: {
    jobId?: string;
    applicationId?: string;
    interviewId?: string;
    tags?: string[];
    priority?: 'low' | 'normal' | 'high' | 'urgent';
  };
}

interface ConversationActions {
  mute: (conversationId: string, duration?: number) => Promise<void>;
  unmute: (conversationId: string) => Promise<void>;
  pin: (conversationId: string) => Promise<void>;
  unpin: (conversationId: string) => Promise<void>;
  archive: (conversationId: string) => Promise<void>;
  unarchive: (conversationId: string) => Promise<void>;
  leave: (conversationId: string) => Promise<void>;
  delete: (conversationId: string) => Promise<void>;
  markAsRead: (conversationId: string) => Promise<void>;
}

class ConversationManager {
  private actions: ConversationActions;

  async muteConversation(conversationId: string, duration?: number): Promise<void> {
    try {
      await this.actions.mute(conversationId, duration);
      
      // Update local state
      this.updateConversation(conversationId, { isMuted: true });
      
      // Show confirmation
      this.showNotification('Conversation muted', 'info');
      
    } catch (error) {
      console.error('Failed to mute conversation:', error);
      this.showNotification('Failed to mute conversation', 'error');
    }
  }

  async archiveConversation(conversationId: string): Promise<void> {
    try {
      // Confirm archival action
      const confirmed = await this.showConfirmationDialog(
        'Archive Conversation',
        'Are you sure you want to archive this conversation? It will be moved to the archived section.'
      );
      
      if (!confirmed) return;
      
      await this.actions.archive(conversationId);
      this.updateConversation(conversationId, { isArchived: true });
      
      this.showNotification('Conversation archived', 'success');
      
    } catch (error) {
      console.error('Failed to archive conversation:', error);
      this.showNotification('Failed to archive conversation', 'error');
    }
  }
}
\`\`\`

#### Conversation Search & Filtering
Advanced search and filtering capabilities help users find specific conversations quickly.

**Search Features:**
- **Text Search**: Search across conversation titles, participant names, and message content
- **Filter by Type**: Filter conversations by type (direct, group, application, etc.)
- **Filter by Status**: Show only unread, pinned, or archived conversations
- **Date Range**: Filter conversations by date range
- **Participant Filter**: Find conversations with specific participants
- **Tag-based Filtering**: Filter conversations by custom tags

#### Conversation Analytics
Track conversation metrics to improve communication effectiveness.

**Analytics Metrics:**
- **Response Time**: Average response time for conversations
- **Message Volume**: Number of messages per conversation
- **Participant Activity**: Activity levels of conversation participants
- **Conversation Duration**: How long conversations remain active
- **Resolution Rate**: Percentage of conversations that reach resolution

### Conversation Synchronization

#### Cross-device Sync
Ensure conversation state is synchronized across all user devices.

**Sync Features:**
- **Real-time Updates**: Instant synchronization of new messages
- **State Sync**: Synchronize conversation status (read/unread, pinned, muted)
- **Draft Sync**: Synchronize message drafts across devices
- **Conflict Resolution**: Handle concurrent updates gracefully

#### Offline Support
Provide full functionality even when users are offline.

**Offline Features:**
- **Message Queue**: Queue outgoing messages for delivery when online
- **Local Storage**: Store recent conversations locally for offline access
- **Sync on Reconnect**: Automatically sync when connection is restored
- **Conflict Resolution**: Merge local and server changes when reconnecting
      `
    },
    {
      id: "push-notifications",
      title: "Push Notifications",
      content: `
The push notification system delivers timely alerts to users across devices, ensuring important messages and updates are never missed.

### Notification Delivery

#### Web Push Notifications
Browser-based push notifications that work even when the web application is not actively open.

**Implementation Features:**
- Service worker registration and management
- Subscription management with user consent
- Notification payload handling and display
- Action button support for quick responses
- Notification grouping and history

**Service Worker Setup:**
\`\`\`typescript
// service-worker.js
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/notification-icon.png',
    badge: '/icons/badge-icon.png',
    image: data.image,
    data: data.data,
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false,
    tag: data.tag || 'careerforge-notification',
    renotify: data.renotify || false,
    timestamp: Date.now()
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data;
  const action = event.action;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Focus existing window if available
      for (const client of clientList) {
        if (client.url.includes('/messages') && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window if no existing window
      if (clients.openWindow) {
        const url = action ? data.actionUrls[action] : data.url || '/messages';
        return clients.openWindow(url);
      }
    })
  );
});
\`\`\`

#### Mobile Push Notifications
Native mobile push notifications through platform-specific services (APNs for iOS, FCM for Android).

**Features:**
- Platform-specific notification styling
- Rich notifications with images and action buttons
- Background notification handling
- Notification grouping and stacking
- Silent notifications for data updates

### Notification Content

#### Message Notifications
Alert users about new messages with relevant context.

**Content Elements:**
- Sender name and avatar
- Message preview (first line or truncated)
- Conversation context
- Timestamp
- Quick reply actions
- Mark as read action

#### System Notifications
Notify users about important platform updates and activities.

**Types:**
- **Application Updates**: Status changes in job applications
- **Interview Reminders**: Upcoming interview notifications
- **Job Recommendations**: New job opportunities
- **Profile Suggestions**: Recommendations for profile improvements
- **System Announcements**: Important platform updates

### Notification Preferences

#### Granular Control
Users have detailed control over what notifications they receive and how they're delivered.

**Preference Categories:**
- **Message Notifications**: Direct messages, group messages, mentions
- **Application Notifications**: Status updates, interview scheduling
- **Recommendation Notifications**: Job alerts, profile suggestions
- **System Notifications**: Feature updates, maintenance announcements
- **Marketing Communications**: Promotional content and newsletters

**Implementation:**
\`\`\`typescript
interface PushNotificationPreferences {
  enabled: boolean;
  categories: {
    messages: {
      directMessages: boolean;
      groupMessages: boolean;
      mentions: boolean;
      replies: boolean;
    };
    applications: {
      statusUpdates: boolean;
      interviewReminders: boolean;
      interviewUpdates: boolean;
    };
    recommendations: {
      jobAlerts: boolean;
      profileSuggestions: boolean;
      marketInsights: boolean;
    };
    system: {
      featureUpdates: boolean;
      maintenanceAlerts: boolean;
      securityAlerts: boolean;
    };
    marketing: {
      newsletters: boolean;
      promotions: boolean;
      surveys: boolean;
    };
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  deliveryMethods: {
    push: boolean;
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
}

class PushNotificationManager {
  async updatePreferences(preferences: PushNotificationPreferences): Promise<void> {
    try {
      // Validate preferences
      this.validatePreferences(preferences);
      
      // Update server-side preferences
      await this.api.updateNotificationPreferences(preferences);
      
      // Update client-side settings
      this.updateClientPreferences(preferences);
      
      // Update push subscription with new preferences
      if (preferences.enabled) {
        await this.updatePushSubscription();
      } else {
        await this.unsubscribeFromPush();
      }
      
      this.showNotification('Notification preferences updated', 'success');
      
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      this.showNotification('Failed to update preferences', 'error');
    }
  }

  private async updatePushSubscription(): Promise<void> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push messaging is not supported');
    }

    const registration = await navigator.serviceWorker.ready;
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_KEY!)
    });

    // Send subscription to server
    await this.api.updatePushSubscription(subscription);
  }
}
\`\`\`

### Notification Analytics

#### Performance Tracking
Monitor notification delivery and engagement to optimize the notification system.

**Metrics Tracked:**
- **Delivery Rate**: Percentage of notifications successfully delivered
- **Open Rate**: Percentage of notifications that users interact with
- **Click-through Rate**: Percentage of users who take action on notifications
- **Unsubscribe Rate**: Rate of users disabling specific notification types
- **Optimal Timing**: Best times to send notifications for maximum engagement

#### A/B Testing
Test different notification strategies to improve engagement and reduce notification fatigue.

**Testing Areas:**
- **Content Variations**: Different message formats and content
- **Timing Strategies**: Optimal send times for different user segments
- **Frequency Patterns**: Notification frequency and batching strategies
- **Action Buttons**: Different call-to-action button configurations
      `
    },
    {
      id: "message-threading",
      title: "Message Threading",
      content: `
Message threading enables organized, contextual conversations by allowing users to reply to specific messages and maintain conversation context.

### Thread Structure

#### Reply Relationships
Messages can be replies to other messages, creating a threaded conversation structure.

**Thread Features:**
- **Reply Chains**: Visual connection between original messages and replies
- **Thread Context**: Show original message when viewing replies
- **Nested Replies**: Support for multiple levels of threading
- **Thread Indicators**: Visual indicators for threaded conversations
- **Jump to Original**: Quick navigation to the original message

**Implementation Structure:**
\`\`\`typescript
interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  replyToId?: string; // ID of message being replied to
  threadId?: string;  // ID of the root message in the thread
  reactions: MessageReaction[];
  attachments: MessageAttachment[];
}

interface MessageThread {
  id: string;
  rootMessageId: string;
  messages: Message[];
  participantCount: number;
  messageCount: number;
  lastActivity: string;
  isActive: boolean;
}

class MessageThreadingManager {
  async createReply(originalMessageId: string, content: string, senderId: string): Promise<Message> {
    try {
      const originalMessage = await this.getMessage(originalMessageId);
      
      const replyMessage: Message = {
        id: this.generateId(),
        content,
        senderId,
        timestamp: new Date().toISOString(),
        replyToId: originalMessageId,
        threadId: originalMessage.threadId || originalMessageId,
        reactions: [],
        attachments: []
      };

      // Send reply message
      await this.sendMessage(replyMessage);
      
      // Update thread activity
      await this.updateThreadActivity(replyMessage.threadId!);
      
      return replyMessage;
      
    } catch (error) {
      console.error('Failed to create reply:', error);
      throw error;
    }
  }

  async getThreadMessages(threadId: string): Promise<Message[]> {
    try {
      const response = await this.api.getThreadMessages(threadId);
      return response.messages;
    } catch (error) {
      console.error('Failed to get thread messages:', error);
      throw error;
    }
  }
}
\`\`\`

#### Thread Visualization
Visual representation of message threads with clear hierarchy and navigation.

**Visual Elements:**
- **Thread Lines**: Connecting lines showing reply relationships
- **Indentation**: Proper indentation for nested replies
- **Collapsible Threads**: Option to collapse/expand lengthy discussions
- **Thread Summary**: Show reply count and last activity
- **Breadcrumb Navigation**: Easy navigation through thread hierarchy

### Thread Management

#### Thread Actions
Users can perform various actions on message threads to manage their conversations.

**Available Actions:**
- **Reply to Thread**: Add new messages to existing threads
- **Reply to Message**: Reply directly to specific messages
- **View Thread Context**: Show full thread for any message
- **Collapse/Expand**: Hide/show lengthy thread discussions
- **Mute Thread**: Disable notifications for specific threads
- **Leave Thread**: Exit from thread discussions (when appropriate)

#### Thread Search
Search functionality specifically for threaded conversations.

**Search Features:**
- **Thread-aware Search**: Search within thread context
- **Reply Search**: Find specific replies in thread history
- **Participant Search**: Find messages by specific thread participants
- **Date Range Search**: Search threads within specific date ranges
- **Keyword Highlighting**: Highlight search terms in thread results

### Thread Notifications

#### Thread-aware Notifications
Notifications that provide context about which thread the message belongs to.

**Notification Features:**
- **Thread Context**: Include thread information in notifications
- **Reply Indicators**: Special notification styling for reply messages
- **Thread Activity Summary**: Notifications about thread activity changes
- **Mention in Thread**: Specific notifications for mentions within threads
- **Thread Priority**: Higher priority notifications for active threads

#### Thread Subscription Model
Users can choose to follow or mute specific threads.

**Subscription Options:**
- **Follow Thread**: Receive all notifications for thread activity
- **Mentions Only**: Only receive notifications for mentions in the thread
- **Mute Thread**: No notifications for thread activity
- **Custom Notification**: Custom notification rules per thread

### Performance Considerations

#### Thread Loading
Optimize loading and rendering of threaded conversations for better performance.

**Optimization Strategies:**
- **Lazy Loading**: Load thread messages on demand
- **Virtual Scrolling**: Efficient rendering of large thread discussions
- **Thread Summaries**: Show thread previews instead of full content
- **Progressive Loading**: Load newer messages first, older messages on demand
- **Caching**: Cache frequently accessed thread data

#### Memory Management
Efficient memory usage for complex threaded conversations.

**Memory Optimizations:**
- **Message Pooling**: Reuse message objects to reduce garbage collection
- **Lazy Thread Rendering**: Only render visible portions of long threads
- **Message Archiving**: Archive old thread messages to reduce memory usage
- **Cleanup Strategies**: Automatic cleanup of closed or archived threads
      `
    },
    {
      id: "file-sharing",
      title: "File Sharing",
      content: `
The file sharing system enables users to securely share documents, images, and other files within conversations while maintaining security and performance standards.

### File Upload & Management

#### Supported File Types
The system supports various file types commonly used in recruitment and professional communication.

**Document Types:**
- **Resumes**: PDF, DOC, DOCX formats
- **Portfolios**: PDF, ZIP archives
- **Certificates**: PDF, image formats
- **Cover Letters**: PDF, DOC, DOCX, TXT formats
- **Work Samples**: Various formats depending on type

**Image Types:**
- **Profile Photos**: JPEG, PNG, WebP formats
- **Screenshots**: PNG, JPEG formats
- **Portfolio Images**: JPEG, PNG, WebP formats

**Size Limits:**
- **Documents**: Up to 10MB per file
- **Images**: Up to 5MB per file
- **Archives**: Up to 50MB per file
- **Total per Message**: Up to 100MB per message

**Implementation:**
\`\`\`typescript
interface FileUpload {
  id: string;
  file: File;
  conversationId: string;
  uploaderId: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  url?: string;
  metadata: {
    name: string;
    size: number;
    type: string;
    lastModified: number;
  };
  security: {
    isScanned: boolean;
    scanResult: 'clean' | 'suspicious' | 'infected';
    encryptionEnabled: boolean;
  };
}

class FileShareManager {
  async uploadFile(file: File, conversationId: string): Promise<FileUpload> {
    try {
      // Validate file
      this.validateFile(file);
      
      // Create upload record
      const upload: FileUpload = {
        id: this.generateId(),
        file,
        conversationId,
        uploaderId: this.currentUserId,
        status: 'uploading',
        progress: 0,
        metadata: {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        },
        security: {
          isScanned: false,
          scanResult: 'pending',
          encryptionEnabled: true
        }
      };

      // Start upload with progress tracking
      const formData = new FormData();
      formData.append('file', file);
      formData.append('conversationId', conversationId);
      formData.append('uploadId', upload.id);

      const xhr = new XMLHttpRequest();
      
      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            upload.progress = progress;
            this.onUploadProgress(upload);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            upload.status = 'completed';
            upload.url = response.url;
            this.onUploadComplete(upload);
            resolve(upload);
          } else {
            upload.status = 'failed';
            this.onUploadError(upload, xhr.statusText);
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          upload.status = 'failed';
          this.onUploadError(upload, 'Network error');
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', '/api/files/upload');
        xhr.setRequestHeader('Authorization', \`Bearer \${this.getAuthToken()}\`);
        xhr.send(formData);
      });

    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  private validateFile(file: File): void {
    // File size validation
    const maxSize = this.getMaxFileSize(file.type);
    if (file.size > maxSize) {
      throw new Error(\`File size exceeds limit of \${maxSize} bytes\`);
    }

    // File type validation
    const allowedTypes = this.getAllowedFileTypes();
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not supported');
    }

    // File name validation
    if (file.name.length > 255) {
      throw new Error('File name too long');
    }

    // Security validation
    if (this.containsSuspiciousContent(file)) {
      throw new Error('File contains potentially harmful content');
    }
  }
}
\`\`\`

#### File Security
Comprehensive security measures to protect users and the platform from malicious files.

**Security Features:**
- **Virus Scanning**: Real-time virus scanning for all uploaded files
- **Content Validation**: Validation of file content vs declared type
- **Access Controls**: Restricted access to shared files
- **Encryption**: End-to-end encryption for sensitive documents
- **Audit Logging**: Complete audit trail for file access

### File Preview & Display

#### Image Previews
Automatic generation of image previews for quick viewing.

**Preview Features:**
- **Thumbnail Generation**: Automatic thumbnail creation
- **Multiple Sizes**: Different preview sizes for various contexts
- **Lazy Loading**: Load previews only when needed
- **Zoom Functionality**: Zoom in/out for detailed viewing
- **Full-screen Mode**: Full-screen image viewing

#### Document Previews
In-browser preview for common document formats.

**Supported Previews:**
- **PDF Documents**: In-browser PDF viewing
- **Text Files**: Syntax-highlighted text preview
- **Images**: Native image display
- **Office Documents**: Basic preview (when possible)

#### Download Management
Secure file download with access controls and logging.

**Download Features:**
- **Access Validation**: Verify user permissions before download
- **Secure URLs**: Time-limited, signed download URLs
- **Download Tracking**: Log all file downloads for security
- **Bandwidth Management**: Control download speeds and concurrency
- **Resume Support**: Resume interrupted downloads

### File Organization

#### File Management in Conversations
Organize and manage files shared within conversations.

**Organization Features:**
- **File List View**: Organized view of all shared files
- **File Categorization**: Automatic categorization by file type
- **File Search**: Search files by name, type, or content
- **File Sorting**: Sort by date, size, type, or uploader
- **File Actions**: Download, delete, or share files

#### File Sharing Controls
Granular control over who can access shared files.

**Sharing Controls:**
- **Permission Levels**: View-only, download, or full access
- **Expiration Dates**: Set expiration dates for file access
- **Password Protection**: Optional password protection for sensitive files
- **Download Limits**: Limit number of downloads per file
- **Access Logging**: Track who accessed which files and when
      `
    },
    {
      id: "message-search",
      title: "Message Search",
      content: `
The message search system provides powerful full-text search capabilities across all conversations and message history, helping users quickly find relevant communications.

### Search Functionality

#### Full-text Search
Comprehensive search across message content, sender names, and conversation titles.

**Search Features:**
- **Keyword Search**: Search across all message content
- **Phrase Matching**: Exact phrase matching with quotes
- **Fuzzy Matching**: Handle typos and spelling variations
- **Stemming**: Search for different forms of words (run, running, ran)
- **Relevance Scoring**: Rank results by relevance and recency

**Implementation:**
\`\`\`typescript
interface SearchQuery {
  query: string;
  filters: {
    conversationIds?: string[];
    senderIds?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
    messageTypes?: ('text' | 'file' | 'image' | 'system')[];
    hasAttachments?: boolean;
  };
  sortBy: 'relevance' | 'date' | 'sender';
  sortOrder: 'asc' | 'desc';
  limit: number;
  offset: number;
}

interface SearchResult {
  message: Message;
  score: number;
  highlights: {
    content?: string;
    senderName?: string;
  };
  context: {
    conversationId: string;
    conversationTitle: string;
    surroundingMessages: Message[];
  };
}

class MessageSearchManager {
  async searchMessages(query: SearchQuery): Promise<SearchResult[]> {
    try {
      // Build search query
      const searchQuery = this.buildSearchQuery(query);
      
      // Perform search
      const response = await this.api.searchMessages(searchQuery);
      
      // Process results
      return response.results.map((result: any) => ({
        message: result.message,
        score: result.score,
        highlights: result.highlights,
        context: result.context
      }));
      
    } catch (error) {
      console.error('Message search failed:', error);
      throw error;
    }
  }

  private buildSearchQuery(query: SearchQuery): any {
    const searchQuery: any = {
      query: {
        bool: {
          must: [],
          filter: []
        }
      }
    };

    // Add text search
    if (query.query) {
      searchQuery.query.bool.must.push({
        multi_match: {
          query: query.query,
          fields: [
            'content^2',
            'senderName^1.5',
            'conversationTitle^0.5'
          ],
          fuzziness: 'AUTO',
          type: 'best_fields'
        }
      });
    }

    // Add filters
    if (query.filters.conversationIds?.length) {
      searchQuery.query.bool.filter.push({
        terms: { conversationId: query.filters.conversationIds }
      });
    }

    if (query.filters.senderIds?.length) {
      searchQuery.query.bool.filter.push({
        terms: { senderId: query.filters.senderIds }
      });
    }

    if (query.filters.dateRange) {
      searchQuery.query.bool.filter.push({
        range: {
          timestamp: {
            gte: query.filters.dateRange.start,
            lte: query.filters.dateRange.end
          }
        }
      });
    }

    if (query.filters.messageTypes?.length) {
      searchQuery.query.bool.filter.push({
        terms: { messageType: query.filters.messageTypes }
      });
    }

    if (query.filters.hasAttachments) {
      searchQuery.query.bool.filter.push({
        exists: { field: 'attachments' }
      });
    }

    // Add sorting
    switch (query.sortBy) {
      case 'date':
        searchQuery.sort = [{ timestamp: { order: query.sortOrder } }];
        break;
      case 'sender':
        searchQuery.sort = [{ senderName: { order: query.sortOrder } }];
        break;
      default:
        searchQuery.sort = [{ _score: { order: 'desc' } }];
    }

    // Add pagination
    searchQuery.from = query.offset;
    searchQuery.size = query.limit;

    return searchQuery;
  }
}
\`\`\`

#### Search Filters
Advanced filtering options to narrow down search results.

**Available Filters:**
- **Date Range**: Search messages within specific time periods
- **Conversation Filter**: Search within specific conversations
- **Participant Filter**: Find messages by specific senders
- **Message Type**: Filter by message types (text, file, image, system)
- **Attachment Filter**: Find messages with or without attachments
- **Read Status**: Filter by read/unread messages

#### Search Suggestions
Intelligent search suggestions to help users find what they're looking for.

**Suggestion Types:**
- **Query Suggestions**: Suggest alternative search terms
- **Autocomplete**: Real-time search suggestions as user types
- **Recent Searches**: Quick access to recently used search terms
- **Popular Searches**: Show popular search terms across the platform
- **Smart Suggestions**: AI-powered search term suggestions

### Search Results

#### Result Display
Organized, readable display of search results with context and highlighting.

**Display Features:**
- **Result Grouping**: Group results by conversation
- **Context Preview**: Show surrounding messages for context
- **Term Highlighting**: Highlight search terms in results
- **Result Actions**: Quick actions on search results
- **Pagination**: Navigate through large result sets

#### Result Actions
Quick actions available directly from search results.

**Available Actions:**
- **Jump to Message**: Navigate directly to message in conversation
- **View Conversation**: Open the full conversation thread
- **Reply to Message**: Quick reply from search results
- **Share Message**: Share search results or specific messages
- **Bookmark Results**: Save search results for later reference

### Search Analytics

#### Search Performance
Monitor and optimize search performance for better user experience.

**Performance Metrics:**
- **Search Response Time**: Average time to return search results
- **Result Relevance**: User satisfaction with search results
- **Zero Result Queries**: Queries that return no results
- **Popular Search Terms**: Most frequently searched terms
- **Search Success Rate**: Percentage of successful searches

#### Search Optimization
Continuous improvement of search functionality based on usage patterns.

**Optimization Areas:**
- **Query Processing**: Improve search query parsing and processing
- **Result Ranking**: Enhance relevance scoring algorithms
- **Index Optimization**: Optimize search indexes for better performance
- **Caching Strategy**: Cache frequent search results
- **User Feedback**: Incorporate user feedback into search improvements

#### Search Intelligence
AI-powered features to make search more intelligent and user-friendly.

**Intelligence Features:**
- **Query Understanding**: Understand user intent behind search queries
- **Context Awareness**: Consider user context when ranking results
- **Learning from Behavior**: Learn from user search patterns and preferences
- **Automatic Suggestions**: Proactive suggestions based on user activity
- **Query Expansion**: Automatically expand queries with related terms
      `
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      content: `
The messaging system implements comprehensive privacy and security measures to protect user communications and ensure compliance with data protection regulations.

### Data Encryption

#### End-to-end Encryption
All messages are encrypted end-to-end to ensure only intended recipients can read them.

**Encryption Implementation:**
- **Message Encryption**: AES-256 encryption for all message content
- **Key Management**: Secure key generation and distribution
- **Forward Secrecy**: New keys for each conversation session
- **Device Encryption**: Encrypted storage on user devices
- **Transport Security**: TLS 1.3 for all data transmission

**Implementation:**
\`\`\`typescript
interface EncryptedMessage {
  id: string;
  conversationId: string;
  senderId: string;
  encryptedContent: string;
  encryptionMetadata: {
    algorithm: 'AES-256-GCM';
    keyId: string;
    iv: string;
    authTag: string;
  };
  timestamp: string;
  signature: string;
}

class EncryptionManager {
  private keyStore: Map<string, CryptoKey> = new Map();

  async generateConversationKey(conversationId: string): Promise<CryptoKey> {
    const key = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );

    this.keyStore.set(conversationId, key);
    return key;
  }

  async encryptMessage(message: string, conversationId: string): Promise<EncryptedMessage> {
    const key = this.keyStore.get(conversationId);
    if (!key) {
      throw new Error('No encryption key found for conversation');
    }

    // Generate initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt message
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );

    // Create encrypted message object
    const encryptedMessage: EncryptedMessage = {
      id: this.generateId(),
      conversationId,
      senderId: this.currentUserId,
      encryptedContent: this.arrayBufferToBase64(encrypted),
      encryptionMetadata: {
        algorithm: 'AES-256-GCM',
        keyId: conversationId,
        iv: this.arrayBufferToBase64(iv),
        authTag: '' // Will be extracted from encrypted data
      },
      timestamp: new Date().toISOString(),
      signature: '' // Will be added by message signing
    };

    return encryptedMessage;
  }

  async decryptMessage(encryptedMessage: EncryptedMessage): Promise<string> {
    const key = this.keyStore.get(encryptedMessage.conversationId);
    if (!key) {
      throw new Error('No decryption key found for conversation');
    }

    try {
      // Convert base64 to array buffers
      const encryptedData = this.base64ToArrayBuffer(encryptedMessage.encryptedContent);
      const iv = this.base64ToArrayBuffer(encryptedMessage.encryptionMetadata.iv);

      // Decrypt message
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        encryptedData
      );

      // Convert back to string
      const decoder = new TextDecoder();
      return decoder.decode(decrypted);

    } catch (error) {
      console.error('Failed to decrypt message:', error);
      throw new Error('Failed to decrypt message');
    }
  }
}
\`\`\`

#### Key Management
Secure generation, distribution, and rotation of encryption keys.

**Key Management Features:**
- **Key Generation**: Cryptographically secure key generation
- **Key Distribution**: Secure key sharing between participants
- **Key Rotation**: Regular key rotation for enhanced security
- **Key Backup**: Secure backup and recovery of encryption keys
- **Key Destruction**: Secure deletion of keys when no longer needed

### Access Control

#### User Permissions
Granular permissions system to control access to conversations and messages.

**Permission Levels:**
- **Conversation Owner**: Full control over conversation settings and participants
- **Moderators**: Manage conversation participants and moderate content
- **Participants**: Standard conversation participants with message rights
- **Viewers**: Read-only access to conversation content
- **Blocked Users**: Completely blocked from accessing conversations

**Implementation:**
\`\`\`typescript
interface ConversationPermissions {
  conversationId: string;
  ownerId: string;
  permissions: {
    [userId: string]: {
      role: 'owner' | 'moderator' | 'participant' | 'viewer';
      canSendMessages: boolean;
      canAddParticipants: boolean;
      canRemoveParticipants: boolean;
      canModifySettings: boolean;
      canDeleteMessages: boolean;
      canExportMessages: boolean;
    };
  };
  accessRules: {
    allowGuestAccess: boolean;
    requireApproval: boolean;
    expirationDate?: string;
  };
}

class PermissionManager {
  async checkPermission(
    userId: string, 
    conversationId: string, 
    action: string
  ): Promise<boolean> {
    try {
      const permissions = await this.getConversationPermissions(conversationId);
      const userPermission = permissions.permissions[userId];

      if (!userPermission) {
        return false;
      }

      switch (action) {
        case 'send_message':
          return userPermission.canSendMessages;
        case 'add_participant':
          return userPermission.canAddParticipants || userPermission.role === 'owner';
        case 'remove_participant':
          return userPermission.canRemoveParticipants || userPermission.role === 'owner';
        case 'modify_settings':
          return userPermission.canModifySettings || userPermission.role === 'owner';
        case 'delete_message':
          return userPermission.canDeleteMessages;
        case 'export_messages':
          return userPermission.canExportMessages;
        default:
          return false;
      }

    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  }

  async updatePermissions(
    conversationId: string, 
    updates: Partial<ConversationPermissions['permissions']>
  ): Promise<void> {
    const permissions = await this.getConversationPermissions(conversationId);
    
    // Validate permission changes
    this.validatePermissionUpdates(updates);
    
    // Update permissions
    Object.assign(permissions.permissions, updates);
    
    // Save to database
    await this.saveConversationPermissions(conversationId, permissions);
    
    // Notify participants of permission changes
    await this.notifyPermissionChanges(conversationId, updates);
  }
}
\`\`\`

### Data Protection

#### Data Minimization
Collect and store only necessary information to protect user privacy.

**Minimization Strategies:**
- **Minimal Metadata**: Store only essential message metadata
- **Automatic Purging**: Automatically delete old messages based on retention policies
- **Selective Storage**: Allow users to choose what data to store
- **Anonymization**: Anonymize data for analytics and reporting
- **Data Portability**: Provide tools for users to export their data

#### Compliance Measures
Ensure compliance with data protection regulations and privacy laws.

**Compliance Features:**
- **GDPR Compliance**: Full compliance with EU data protection regulations
- **CCPA Compliance**: California Consumer Privacy Act compliance
- **Data Subject Rights**: Support for data access, correction, and deletion requests
- **Privacy by Design**: Privacy considerations built into system architecture
- **Regular Audits**: Regular privacy and security audits

### Security Monitoring

#### Threat Detection
Monitor for suspicious activities and potential security threats.

**Monitoring Areas:**
- **Access Patterns**: Unusual access patterns and login attempts
- **Message Content**: Automated scanning for malicious content
- **File Uploads**: Virus scanning and malware detection
- **Network Security**: Monitoring for network-based attacks
- **User Behavior**: Anomaly detection in user behavior

#### Incident Response
Rapid response to security incidents and data breaches.

**Response Procedures:**
- **Detection**: Automated detection of security incidents
- **Assessment**: Rapid assessment of incident severity and impact
- **Containment**: Immediate containment of security threats
- **Recovery**: System recovery and data restoration procedures
- **Communication**: Notification of affected users and authorities
- **Post-Incident**: Post-incident analysis and prevention measures

### Privacy Controls

#### User Privacy Settings
Comprehensive privacy controls for users to manage their data and communications.

**Privacy Options:**
- **Message Retention**: User-controlled message retention periods
- **Read Receipts**: Control visibility of read receipts
- **Typing Indicators**: Control visibility of typing indicators
- **Last Seen**: Control visibility of last seen status
- **Contact Discovery**: Control how users can be discovered and contacted
- **Data Export**: Tools for users to export their data

#### Anonymous Communication
Options for anonymous or pseudonymous communication when appropriate.

**Anonymous Features:**
- **Temporary Accounts**: Temporary accounts for sensitive communications
- **Pseudonymous Messaging**: Messaging with pseudonyms instead of real identities
- **Message Forwarding**: Secure message forwarding without exposing sender identity
- **Encrypted Storage**: Additional encryption for highly sensitive communications
      `
    },
    {
      id: "performance-optimization",
      title: "Performance Optimization",
      content: `
The messaging system employs comprehensive performance optimization strategies to ensure fast, responsive communication even with large message volumes and concurrent users.

### Real-time Performance

#### Connection Optimization
Optimize WebSocket connections for minimal latency and maximum reliability.

**Optimization Techniques:**
- **Connection Pooling**: Maintain pool of optimized connections
- **Load Balancing**: Distribute connection load across servers
- **CDN Integration**: Use CDN for static assets and geographic optimization
- **Connection Health**: Continuous monitoring and optimization of connection health
- **Fallback Protocols**: Automatic fallback to optimal protocols

**Implementation:**
\`\`\`typescript
interface ConnectionMetrics {
  connectionId: string;
  latency: number;
  throughput: number;
  errorRate: number;
  packetLoss: number;
  bandwidth: number;
  lastActivity: string;
}

class PerformanceOptimizer {
  private connectionMetrics: Map<string, ConnectionMetrics> = new Map();
  private performanceThreshold = {
    maxLatency: 100, // milliseconds
    minThroughput: 1000, // messages per second
    maxErrorRate: 0.01, // 1%
    maxPacketLoss: 0.001 // 0.1%
  };

  async optimizeConnection(connectionId: string): Promise<void> {
    const metrics = this.connectionMetrics.get(connectionId);
    if (!metrics) return;

    // Analyze performance metrics
    const issues = this.analyzePerformance(metrics);
    
    // Apply optimizations based on identified issues
    for (const issue of issues) {
      await this.applyOptimization(connectionId, issue);
    }

    // Update metrics after optimization
    await this.updateConnectionMetrics(connectionId);
  }

  private analyzePerformance(metrics: ConnectionMetrics): PerformanceIssue[] {
    const issues: PerformanceIssue[] = [];

    if (metrics.latency > this.performanceThreshold.maxLatency) {
      issues.push({
        type: 'high_latency',
        severity: 'high',
        recommendation: 'switch_server'
      });
    }

    if (metrics.throughput < this.performanceThreshold.minThroughput) {
      issues.push({
        type: 'low_throughput',
        severity: 'medium',
        recommendation: 'increase_buffer'
      });
    }

    if (metrics.errorRate > this.performanceThreshold.maxErrorRate) {
      issues.push({
        type: 'high_error_rate',
        severity: 'high',
        recommendation: 'retry_connection'
      });
    }

    if (metrics.packetLoss > this.performanceThreshold.maxPacketLoss) {
      issues.push({
        type: 'high_packet_loss',
        severity: 'high',
        recommendation: 'switch_protocol'
      });
    }

    return issues;
  }

  private async applyOptimization(connectionId: string, issue: PerformanceIssue): Promise<void> {
    switch (issue.recommendation) {
      case 'switch_server':
        await this.switchToOptimalServer(connectionId);
        break;
      case 'increase_buffer':
        await this.increaseBufferSize(connectionId);
        break;
      case 'retry_connection':
        await this.retryConnection(connectionId);
        break;
      case 'switch_protocol':
        await this.switchProtocol(connectionId);
        break;
    }
  }
}
\`\`\`

#### Message Processing Optimization
Efficient processing and delivery of messages to handle high message volumes.

**Optimization Strategies:**
- **Message Batching**: Batch multiple messages for efficient processing
- **Priority Queuing**: Prioritize messages based on importance and urgency
- **Asynchronous Processing**: Process messages asynchronously to prevent blocking
- **Message Compression**: Compress large messages to reduce bandwidth usage
- **Load Distribution**: Distribute message processing across multiple servers

### Memory Management

#### Efficient Data Structures
Use optimized data structures for message storage and retrieval.

**Data Structure Optimizations:**
- **Immutable Messages**: Use immutable message objects to reduce memory churn
- **Message Pooling**: Reuse message objects to reduce garbage collection
- **Lazy Loading**: Load message data only when needed
- **Efficient Indexing**: Use efficient indexes for fast message retrieval
- **Memory Monitoring**: Continuous monitoring of memory usage

#### Garbage Collection Optimization
Minimize garbage collection impact on application performance.

**GC Optimization:**
- **Object Pooling**: Reuse objects to reduce allocation pressure
- **Weak References**: Use weak references for cache management
- **Memory Leaks**: Prevent and detect memory leaks
- **GC Tuning**: Tune garbage collection parameters for optimal performance
- **Memory Profiling**: Regular memory profiling and optimization

### Caching Strategies

#### Multi-level Caching
Implement caching at multiple levels for optimal performance.

**Cache Levels:**
- **Browser Cache**: Cache static assets and message metadata
- **Application Cache**: Cache frequently accessed conversations and messages
- **Database Cache**: Cache database query results
- **CDN Cache**: Cache static content and message attachments
- **Server Cache**: Cache session data and user preferences

**Implementation:**
\`\`\`typescript
interface CacheConfig {
  ttl: number; // Time to live in seconds
  maxSize: number; // Maximum cache size
  strategy: 'lru' | 'lfu' | 'ttl'; // Cache eviction strategy
  compression: boolean;
}

class CacheManager {
  private caches: Map<string, LRUCache> = new Map();

  configureCache(name: string, config: CacheConfig): void {
    const cache = new LRUCache({
      max: config.maxSize,
      ttl: config.ttl * 1000, // Convert to milliseconds
      updateAgeOnGet: true,
      updateAgeOnHas: true
    });

    this.caches.set(name, cache);
  }

  async get<T>(cacheName: string, key: string): Promise<T | null> {
    const cache = this.caches.get(cacheName);
    if (!cache) return null;

    return cache.get(key) as T;
  }

  async set<T>(cacheName: string, key: string, value: T, ttl?: number): Promise<void> {
    const cache = this.caches.get(cacheName);
    if (!cache) return;

    cache.set(key, value, { ttl });
  }

  async invalidate(cacheName: string, pattern?: string): Promise<void> {
    const cache = this.caches.get(cacheName);
    if (!cache) return;

    if (pattern) {
      // Invalidate keys matching pattern
      const keys = Array.from(cache.keys());
      for (const key of keys) {
        if (key.includes(pattern)) {
          cache.delete(key);
        }
      }
    } else {
      // Clear entire cache
      cache.clear();
    }
  }
}
\`\`\`

#### Cache Invalidation
Smart cache invalidation strategies to ensure data consistency.

**Invalidation Strategies:**
- **Time-based**: Automatic invalidation after TTL expiration
- **Event-based**: Invalidate cache on data changes
- **Pattern-based**: Invalidate cache based on key patterns
- **Dependency-based**: Invalidate dependent caches when source data changes
- **Manual**: Manual cache invalidation for critical updates

### Database Optimization

#### Query Optimization
Optimize database queries for fast message retrieval and storage.

**Query Optimizations:**
- **Indexed Queries**: Use proper indexes for fast lookups
- **Query Caching**: Cache frequently executed queries
- **Batch Operations**: Batch database operations for efficiency
- **Connection Pooling**: Maintain pool of database connections
- **Query Analysis**: Regular analysis and optimization of slow queries

#### Message Archiving
Archive old messages to maintain performance as message volume grows.

**Archiving Strategy:**
- **Automatic Archiving**: Archive messages older than specified threshold
- **Selective Archiving**: Archive based on conversation importance
- **Compression**: Compress archived messages to save storage
- **Index Optimization**: Optimize indexes for archived data
- **Retrieval Optimization**: Fast retrieval of archived messages when needed

### Network Optimization

#### Bandwidth Management
Optimize network usage to reduce bandwidth consumption and improve performance.

**Bandwidth Optimizations:**
- **Message Compression**: Compress messages to reduce data transfer
- **Delta Sync**: Sync only changed message data
- **Progressive Loading**: Load message content progressively
- **Image Optimization**: Optimize image sizes and formats
- **CDN Usage**: Use CDN for static content delivery

#### Network Monitoring
Continuous monitoring of network performance and automatic optimization.

**Monitoring Features:**
- **Latency Tracking**: Track network latency to different regions
- **Bandwidth Monitoring**: Monitor bandwidth usage and optimize accordingly
- **Error Tracking**: Track network errors and automatically retry
- **Performance Metrics**: Collect comprehensive network performance metrics
- **Automatic Optimization**: Automatically optimize based on network conditions

### Scalability Considerations

#### Horizontal Scaling
Design the system to scale horizontally to handle increased load.

**Scaling Strategies:**
- **Microservices**: Break down monolithic services into microservices
- **Load Balancing**: Distribute load across multiple servers
- **Database Sharding**: Shard database to distribute data across servers
- **Message Queuing**: Use message queues for asynchronous processing
- **Auto-scaling**: Automatically scale resources based on load

#### Performance Monitoring
Comprehensive performance monitoring to identify and resolve bottlenecks.

**Monitoring Areas:**
- **Response Times**: Monitor API response times and message delivery times
- **Throughput**: Monitor message processing throughput
- **Resource Usage**: Monitor CPU, memory, and network resource usage
- **Error Rates**: Monitor error rates and failure patterns
- **User Experience**: Monitor actual user experience metrics

#### Performance Testing
Regular performance testing to ensure the system meets performance requirements.

**Testing Approaches:**
- **Load Testing**: Test system under expected load conditions
- **Stress Testing**: Test system beyond normal load to find breaking points
- **Endurance Testing**: Test system performance over extended periods
- **Spike Testing**: Test system response to sudden load spikes
- **Performance Regression Testing**: Ensure performance doesn't degrade over time
      `
    }
  ],
  bestPractices: [
    "Implement real-time messaging using WebSocket technology for instant communication",
    "Use comprehensive notification system with smart filtering to prevent notification overload",
    "Implement end-to-end encryption for all sensitive communications",
    "Use efficient data structures and caching for optimal performance",
    "Implement proper error handling and connection management for real-time features",
    "Use message threading to organize complex conversations effectively",
    "Implement secure file sharing with virus scanning and access controls",
    "Use search indexing and full-text search for efficient message retrieval",
    "Implement proper access controls and user permissions for conversations",
    "Use performance monitoring and optimization for scalability",
    "Implement proper data retention and privacy controls",
    "Use comprehensive testing strategies for real-time messaging features"
  ],
  troubleshooting: [
    {
      title: "Common Messaging System Issues",
      problems: [
        {
          issue: "Messages not delivering in real-time or WebSocket connection drops",
          solution: "Check WebSocket connection stability, verify network connectivity, and implement proper reconnection logic with exponential backoff.",
          severity: "high"
        },
        {
          issue: "Push notifications not working on mobile devices",
          solution: "Verify push notification permissions, check service worker registration, and ensure proper VAPID key configuration.",
          severity: "medium"
        },
        {
          issue: "Message search returning slow results or timing out",
          solution: "Optimize search indexes, implement proper caching strategies, and consider using dedicated search services like Elasticsearch.",
          severity: "medium"
        },
        {
          issue: "File uploads failing or timing out for large files",
          solution: "Check file size limits, implement chunked uploads for large files, and verify server timeout configurations.",
          severity: "high"
        },
        {
          issue: "High memory usage with large message threads",
          solution: "Implement virtual scrolling for large lists, use message pooling, and implement proper cleanup for old messages.",
          severity: "medium"
        }
      ]
    }
  ]
};