import express, { Request, Response } from 'express';
import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import { aiService } from '../services/aiService';
import { catchAsync } from '../utils/catchAsync';

const router = express.Router();

const startTime = Date.now();

/**
 * @swagger
 * components:
 *   schemas:
 *     HealthStatus:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the service is healthy
 *         status:
 *           type: string
 *           enum: [healthy, degraded, unhealthy]
 *           description: Overall service health status
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Server timestamp of health check
 *         uptime:
 *           type: integer
 *           description: Server uptime in seconds
 *     DetailedHealthStatus:
 *       allOf:
 *         - $ref: '#/components/schemas/HealthStatus'
 *         - type: object
 *           properties:
 *             services:
 *               type: object
 *               properties:
 *                 database:
 *                   type: string
 *                   enum: [healthy, unhealthy]
 *                   description: Database connection health
 *                 aiService:
 *                   type: string
 *                   enum: [healthy, degraded, not_available]
 *                   description: AI service health status
 *     ReadinessStatus:
 *       type: object
 *       properties:
 *         ready:
 *           type: boolean
 *           description: Indicates if the service is ready to receive traffic
 *         reason:
 *           type: string
 *           description: Reason for unready state (if applicable)
 *     LivenessStatus:
 *       type: object
 *       properties:
 *         alive:
 *           type: boolean
 *           description: Indicates if the service is alive

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Basic health check endpoint
 *     description: Fast health check that returns server status without checking external dependencies
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 *             example:
 *               success: true
 *               status: "OK"
 *               timestamp: "2025-12-25T22:08:00.000Z"
 *               uptime: 3600
 */
router.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - startTime) / 1000)
    });
});

/**
 * @swagger
 * /health/detailed:
 *   get:
 *     summary: Detailed health check endpoint
 *     description: Comprehensive health check that validates all external dependencies including database and AI services
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: All services are healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetailedHealthStatus'
 *             example:
 *               success: true
 *               status: "healthy"
 *               timestamp: "2025-12-25T22:08:00.000Z"
 *               uptime: 3600
 *               services:
 *                 database: "healthy"
 *                 aiService: "healthy"
 *       503:
 *         description: One or more services are unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetailedHealthStatus'
 *             example:
 *               success: false
 *               status: "unhealthy"
 *               timestamp: "2025-12-25T22:08:00.000Z"
 *               uptime: 3600
 *               services:
 *                 database: "unhealthy"
 *                 aiService: "not_available"
 */
router.get('/detailed', catchAsync(async (req: Request, res: Response) => {
    const services = {
        database: 'healthy',
        aiService: 'healthy',
    };

    let status = 'healthy';

    // Check database connectivity
    try {
        await db.execute(sql`SELECT 1`);
    } catch (error) {
        services.database = 'unhealthy';
        status = 'unhealthy';
    }

    // Check AI service
    try {
        const aiHealth = await aiService.healthCheck();
        const aiHealthy = Object.values(aiHealth).every(s => s);
        services.aiService = aiHealthy ? 'healthy' : 'degraded';
        if (!aiHealthy) status = (status === 'unhealthy' ? 'unhealthy' : 'degraded');
    } catch (error) {
        services.aiService = 'not_available';
    }

    res.status(status === 'unhealthy' ? 503 : 200).json({
        success: status !== 'unhealthy',
        status,
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - startTime) / 1000),
        services,
    });
}));

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Kubernetes readiness probe
 *     description: Determines if the service is ready to receive traffic. Used by Kubernetes for deployment decisions
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready to receive traffic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReadinessStatus'
 *             example:
 *               ready: true
 *       503:
 *         description: Service is not ready to receive traffic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReadinessStatus'
 *             example:
 *               ready: false
 *               reason: "Database not accessible"
 */
router.get('/ready', async (req: Request, res: Response) => {
    try {
        await db.execute(sql`SELECT 1`);
        res.status(200).json({ ready: true });
    } catch (error) {
        res.status(503).json({ ready: false, reason: 'Database not accessible' });
    }
});

/**
 * @swagger
 * /health/live:
 *   get:
 *     summary: Kubernetes liveness probe
 *     description: Determines if the service is alive. Used by Kubernetes to detect and restart unhealthy containers
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive and responding
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LivenessStatus'
 *             example:
 *               alive: true
 */
router.get('/live', (req: Request, res: Response) => {
    res.status(200).json({ alive: true });
});

export default router;
