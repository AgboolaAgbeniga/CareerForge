import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/setup-2fa', ...authController.setup2FA);
router.post('/verify-2fa', ...authController.verify2FA);
router.post('/disable-2fa', ...authController.disable2FA);
router.post('/change-password', ...authController.changePassword);
router.post('/backup-codes/regenerate', ...authController.regenerateBackupCodes);
router.get('/profile', ...authController.getProfile);
router.put('/profile', ...authController.updateProfile);

export default router;
