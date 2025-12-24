import { Response } from 'express';
import { Router } from 'express';
import { authenticateToken, AuthRequest, requireRole } from '../middleware/auth';
import { AuthService } from '../modules/auth/auth.service';
import { catchAsync } from '../utils/catchAsync';
import { z } from 'zod';

const router = Router();
const authService = new AuthService();

const userIdParamsSchema = z.object({
    userId: z.string().uuid(),
});

/**
 * @swagger
 * /api/admin/users/{userId}/disable-2fa:
 *   post:
 *     summary: Admin override to disable 2FA for a user
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: 2FA disabled for user
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 */
router.post(
    '/users/:userId/disable-2fa',
    authenticateToken,
    requireRole(['admin']),
    catchAsync(async (req: AuthRequest, res: Response) => {
        const { userId } = userIdParamsSchema.parse(req.params);
        const result = await authService.adminDisable2FA(req.user!.id, userId);
        res.json({ success: true, data: result });
    })
);

export default router;
