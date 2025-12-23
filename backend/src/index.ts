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

// Load environment variables
dotenv.config();

// Validate environment variables before starting server
import './config/env';

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
  },
  apis: ['./src/index.ts', './src/api/*.ts', './src/api/**/*.ts'], // Path to the API docs
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
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
import { globalLimiter, apiLimiter } from './middleware/rateLimiter';
app.use('/api/', apiLimiter); // Apply to all API routes

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  logger.info(`Incoming request: ${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Request completed: ${req.method} ${req.url} ${res.statusCode} in ${duration}ms`);
  });

  next();
});

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

app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', require('./api/dashboard').default);
app.use('/api/resume', require('./api/resume').default);
app.use('/api/matching', require('./api/matching').default);
app.use('/api/messages', require('./api/messages').default);
app.use('/api/notifications', require('./api/notifications').default);
app.use('/api/analytics', require('./api/analytics').default);
app.use('/api/experiments', require('./api/experiments').default);
// Add other routes as implemented

app.use('/api/ai', require('./api/ai').default);

// Messages routes already included above

// Notifications routes
// app.use('/api/notifications', require('./api/notifications').default);

// Analytics routes
// app.use('/api/analytics', require('./api/analytics').default);

// Experiments routes
// app.use('/api/experiments', require('./api/experiments').default);

// Socket.io for real-time messaging
io.on('connection', (socket) => {
  logger.info('User connected:', { socketId: socket.id });

  socket.on('join', (userId) => {
    socket.join(userId);
    logger.info('User joined room:', { userId, socketId: socket.id });
  });

  socket.on('sendMessage', (data) => {
    // Handle message sending
    io.to(data.recipientId).emit('newMessage', data);
    logger.info('Message sent:', { from: data.senderId, to: data.recipientId });
  });

  socket.on('disconnect', () => {
    logger.info('User disconnected:', { socketId: socket.id });
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