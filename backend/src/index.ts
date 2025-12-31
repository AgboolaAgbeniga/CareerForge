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
import { handleCareerCoachEvents } from './sockets/careerCoach';

// Load environment variables
dotenv.config();

// Validate environment variables before starting server (build-time safe)
try {
  import('./config/env').then(({ buildTimeEnv }) => {
    console.log('✅ Environment loaded successfully');
  });
} catch (error) {
  console.warn('⚠️ Environment validation failed during build:', error);
  // In production, we might not have all env vars during Docker build
}

// Swagger configuration
const getSwaggerServers = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const port = process.env.PORT || 5000;

  if (isDevelopment) {
    return [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ];
  } else {
    // In production, we don't know the exact Render URL at build time
    // but we can provide a placeholder and documentation
    return [
      {
        url: 'https://your-backend.onrender.com',
        description: 'Production server (Render)',
      },
    ];
  }
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CareerForge API',
      version: '1.0.0',
      description: 'Comprehensive API for CareerForge AI-powered job matching platform',
      contact: {
        name: 'CareerForge API Support',
        email: 'api-support@careerforge.com',
        url: 'https://github.com/your-username/careerforge',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: getSwaggerServers(),
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

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
import authRoutes from './modules/auth/auth.routes';
import healthRoutes from './api/health';
import applicationsRoutes from './api/applications';
import jobsRoutes from './api/jobs';
import dashboardRoutes from './api/dashboard';
import resumeRoutes from './api/resume';
import matchingRoutes from './api/matching';
import messagesRoutes from './api/messages';
import notificationsRoutes from './api/notifications';
import analyticsRoutes from './api/analytics';
import experimentsRoutes from './api/experiments';
import adminRoutes from './api/admin';
import aiRoutes from './api/ai';

app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/experiments', experimentsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

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

  // Initialize Career Coach events
  handleCareerCoachEvents(socket, io);
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