import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';
import { sanitizeText } from './utils/sanitizer';
import loggingMiddleware from './middleware/logging';

// Load environment variables
dotenv.config();

// Validate environment variables before starting server (build-time safe)
try {
  const { buildTimeEnv } = await import('./config/env');
  console.log('✅ Environment loaded successfully');
} catch (error) {
  console.warn('⚠️ Environment validation failed during build:', error);
  // In production, we might not have all env vars during Docker build
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CareerForge API',
      version: '1.0.0',
      description: 'API for CareerForge job matching platform',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
      schemas: {
        JobUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'string' },
            responsibilities: { type: 'string' },
            location: { type: 'string' },
            type: { type: 'string', enum: ['full_time', 'part_time', 'contract', 'remote'] },
            experienceLevel: { type: 'string', enum: ['entry', 'mid', 'senior', 'executive'] },
            salaryMin: { type: 'integer' },
            salaryMax: { type: 'integer' },
            skillsRequired: { type: 'array', items: { type: 'string' } },
            expiresAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/index.ts', './src/api/*.ts', './src/api/**/*.ts', './src/modules/**/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "https://i.pravatar.cc"],
      connectSrc: ["'self'", "ws:", "wss:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
import { globalLimiter, apiLimiter, aiLimiter } from './middleware/rateLimiter';
app.use('/api/', apiLimiter); // Apply to all API routes
app.use('/api/ai', aiLimiter); // Stricter limit for AI endpoints

// Request logging middleware
app.use(loggingMiddleware);

// Routes
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
import authRoutes from './modules/auth/auth.routes';
import healthRoutes from './api/health';
import applicationsRoutes from './api/applications';
import jobsRoutes from './api/jobs';

app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/dashboard', require('./api/dashboard').default);
app.use('/api/resume', require('./api/resume').default);
app.use('/api/matching', require('./api/matching').default);
app.use('/api/messages',

  require('./api/messages').default);
app.use('/api/notifications', require('./api/notifications').default);
app.use('/api/analytics', require('./api/analytics').default);
app.use('/api/experiments', require('./api/experiments').default);
app.use('/api/admin', require('./api/admin').default);
// Add other routes as implemented

app.use('/api/ai', require('./api/ai').default);

// Messages routes already included above

// Notifications routes
// app.use('/api/notifications', require('./api/notifications').default);

// Analytics routes
// app.use('/api/analytics', require('./api/analytics').default);

// Experiments routes
// app.use('/api/experiments', require('./api/experiments').default);

// Socket.io setup with authentication
import { socketAuthMiddleware, validateUserRoom, socketRateLimiter } from './middleware/socketAuth';
import { messages, notifications } from './models/schema';
import { db } from './utils/database';

// Apply authentication middleware to all socket connections
io.use(socketAuthMiddleware as any);

io.on('connection', (socket: any) => {
  const userId = socket.userId!;

  logger.info('User connected via Socket.io', {
    socketId: socket.id,
    userId,
    role: socket.userRole
  });

  // Handle room joining with validation
  socket.on('join', (roomId: string) => {
    // Validate user can join this room
    if (!validateUserRoom(socket, roomId)) {
      socket.emit('error', { message: 'Unauthorized: Cannot join this room' });
      logger.warn('Unauthorized room join attempt', { userId, requestedRoom: roomId });
      return;
    }

    socket.join(roomId);
    logger.info('User joined room', { userId, roomId, socketId: socket.id });
    socket.emit('joined', { roomId });
  });

  // Handle sending messages with authentication and persistence
  socket.on('sendMessage', async (data: { recipientId: string; message: string; conversationId?: string }) => {
    try {
      // Rate limiting check
      if (!socketRateLimiter.isAllowed(userId)) {
        socket.emit('error', { message: 'Rate limit exceeded. Please slow down.' });
        return;
      }

      // Validate input
      if (!data.recipientId || !data.message || data.message.trim().length === 0) {
        socket.emit('error', { message: 'Invalid message data' });
        return;
      }

      // Sanitize message
      const sanitizedMessage = sanitizeText(data.message.trim()).substring(0, 5000);

      // Save message to database
      const [savedMessage] = await db.insert(messages).values({
        senderId: userId,
        recipientId: data.recipientId,
        content: sanitizedMessage,
        subject: 'Chat Message', // Required by schema if not null
        messageType: 'general',
        isRead: false,
        sentAt: new Date(),
      }).returning();

      if (!savedMessage) {
        throw new Error('Failed to save message');
      }

      // Prepare message payload
      const messagePayload = {
        id: savedMessage.id,
        senderId: userId,
        recipientId: data.recipientId,
        message: sanitizedMessage,
        timestamp: savedMessage.sentAt,
        conversationId: data.conversationId || `${userId}-${data.recipientId}`,
      };

      // Emit to recipient
      io.to(data.recipientId).emit('newMessage', messagePayload);

      // Emit back to sender (confirmation)
      socket.emit('messageSent', messagePayload);

      // Create notification for recipient
      await db.insert(notifications).values({
        userId: data.recipientId,
        type: 'new_message',
        title: 'New Message',
        content: `You have a new message`,
        data: { messageId: savedMessage.id },
        isRead: false,
        createdAt: new Date(),
      });

      logger.info('Message sent and saved', { from: userId, to: data.recipientId, messageId: savedMessage.id });
    } catch (error) {
      logger.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle typing indicators
  socket.on('typing', (data: { recipientId: string }) => {
    if (data.recipientId) {
      io.to(data.recipientId).emit('userTyping', { userId });
    }
  });

  socket.on('stopTyping', (data: { recipientId: string }) => {
    if (data.recipientId) {
      io.to(data.recipientId).emit('userStoppedTyping', { userId });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    logger.info('User disconnected', { socketId: socket.id, userId });
  });

  // Handle errors
  socket.on('error', (error: Error) => {
    logger.error('Socket error', { socketId: socket.id, userId, error: error.message });
  });
});

import { errorHandler } from './middleware/error';

// ... (other imports)

// Global error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  logger.warn('404 Not Found:', { url: req.url, method: req.method });
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;