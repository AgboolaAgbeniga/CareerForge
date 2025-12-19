import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Load environment variables
dotenv.config();

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
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/auth', require('./api/auth').default);
app.use('/api/resume', require('./api/resume').default);
app.use('/api/matching', require('./api/matching').default);
app.use('/api/messages', require('./api/messages').default);
// Add other routes as implemented

// AI routes
// app.use('/api/ai', require('./api/ai').default);

// Messages routes already included above

// Notifications routes
// app.use('/api/notifications', require('./api/notifications').default);

// Analytics routes
// app.use('/api/analytics', require('./api/analytics').default);

// Experiments routes
// app.use('/api/experiments', require('./api/experiments').default);

// Socket.io for real-time messaging
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', (data) => {
    // Handle message sending
    io.to(data.recipientId).emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;