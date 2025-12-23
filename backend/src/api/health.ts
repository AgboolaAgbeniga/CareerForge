import express from 'express';
import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import aiService from '../services/aiService';

const router = express.Router();

const startTime = Date.now();

/**
 * Basic health check - Fast, no dependencies
 */
router.get('/', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - startTime) / 1000)
    });
});

/**
 * Detailed health check - Checks all external dependencies
 */
router.get('/detailed', async (req, res) => {
    const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - startTime) / 1000),
        services: {
            database: 'unknown',
            aiService: 'unknown',
        },
    };

    // Check database connectivity
    try {
        await db.execute(sql`SELECT 1`);
        health.services.database = 'healthy';
    } catch (error) {
        health.services.database = 'unhealthy';
        health.status = 'degraded';
    }

    // Check AI service (optional, don't fail if unavailable)
    try {
        const aiHealthy = await aiService.healthCheck();
        health.services.aiService = aiHealthy ? 'healthy' : 'unhealthy';
    } catch (error) {
        health.services.aiService = 'not_configured';
    }

    // Overall status
    if (health.services.database === 'unhealthy') {
        health.status = 'unhealthy';
        return res.status(503).json(health);
    }

    res.json(health);
});

/**
 * Kubernetes readiness probe
 * Returns 200 if the app is ready to accept traffic
 */
router.get('/ready', async (req, res) => {
    try {
        // Check if database is accessible
        await db.execute(sql`SELECT 1`);
        res.status(200).json({ ready: true });
    } catch (error) {
        res.status(503).json({ ready: false, reason: 'Database not accessible' });
    }
});

/**
 * Kubernetes liveness probe
 * Returns 200 if the app is alive (doesn't check dependencies)
 */
router.get('/live', (req, res) => {
    res.status(200).json({ alive: true });
});

export default router;
