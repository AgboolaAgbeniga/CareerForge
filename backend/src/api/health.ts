import express, { Response } from 'express';
import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import { aiService } from '../services/aiService';
import { catchAsync } from '../utils/catchAsync';

const router = express.Router();

const startTime = Date.now();

/**
 * Basic health check - Fast, no dependencies
 */
router.get('/', (req, res: Response) => {
    res.json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - startTime) / 1000)
    });
});

/**
 * Detailed health check - Checks all external dependencies
 */
router.get('/detailed', catchAsync(async (req, res: Response) => {
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
 * Kubernetes readiness probe
 */
router.get('/ready', async (req, res: Response) => {
    try {
        await db.execute(sql`SELECT 1`);
        res.status(200).json({ ready: true });
    } catch (error) {
        res.status(503).json({ ready: false, reason: 'Database not accessible' });
    }
});

/**
 * Kubernetes liveness probe
 */
router.get('/live', (req, res: Response) => {
    res.status(200).json({ alive: true });
});

export default router;
