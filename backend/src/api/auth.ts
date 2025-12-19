import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { db } from '../utils/database';
import { users, jobSeekers, recruiters } from '../models/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['job_seeker', 'recruiter']),
  firstName: z.string(),
  lastName: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});

const verifyEmailSchema = z.object({
  token: z.string(),
});

const setup2FASchema = z.object({
  code: z.string(),
});

const verify2FASchema = z.object({
  code: z.string(),
});

// Database operations will be handled by Drizzle ORM

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               role:
 *                 type: string
 *                 enum: [job_seeker, recruiter]
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, firstName, lastName } = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.insert(users).values({
      email,
      passwordHash: hashedPassword,
      role,
      firstName,
      lastName,
    }).returning();

    if (newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    const user = newUser[0]!;

    // TODO: Create role-specific profile
    // if (role === 'job_seeker') {
    //   await db.insert(jobSeekers).values({
    //     id: user.id,
    //   });
    // } else if (role === 'recruiter') {
    //   await db.insert(recruiters).values({
    //     id: user.id,
    //   });
    // }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: { id: user.id, email, role, firstName, lastName },
      accessToken,
      refreshToken,
    });
    return;
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUsers.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = existingUsers[0] as any;
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash || '');
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );

    res.json({
      user: { id: user.id, email, role: user.role, firstName: user.firstName, lastName: user.lastName },
      accessToken,
      refreshToken,
    });
    return;
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as any;

    // Verify user still exists
    const existingUsers = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (existingUsers.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
    return;
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Initiate password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset link sent if email exists
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);

    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUsers.length === 0) {
      return res.json({ message: 'If the email exists, a reset link has been sent' });
    }

    const user = existingUsers[0] as any;
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    // TODO: Store reset token in database
    // For now, just send the email

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
    });

    res.json({ message: 'Reset link sent' });
    return;
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or input
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = resetPasswordSchema.parse(req.body);

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    const existingUsers = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);

    if (existingUsers.length === 0) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({ passwordHash: hashedPassword }).where(eq(users.id, decoded.userId));

    res.json({ message: 'Password reset successful' });
    return;
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({ error: 'Invalid token or input' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify email with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = verifyEmailSchema.parse(req.body);

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    const existingUsers = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);

    if (existingUsers.length === 0) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    await db.update(users).set({ isVerified: true }).where(eq(users.id, decoded.userId));

    res.json({ message: 'Email verified' });
    return;
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(400).json({ error: 'Invalid token' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/setup-2fa:
 *   post:
 *     summary: Setup two-factor authentication
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA setup successful
 *       400:
 *         description: Invalid input
 */
router.post('/setup-2fa', async (req, res) => {
  try {
    const { code } = setup2FASchema.parse(req.body);

    // Assume user is authenticated, get from middleware
    const userId = 'placeholder-user-id'; // TODO: Get from auth middleware
    const existingUsers = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (existingUsers.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const secret = speakeasy.generateSecret({ name: 'CareerForge', issuer: 'CareerForge' });
    await db.update(users).set({ twoFactorSecret: secret.base32 }).where(eq(users.id, userId));

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);

    res.json({ secret: secret.base32, qrCode: qrCodeUrl });
    return;
  } catch (error) {
    console.error('Setup 2FA error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

/**
 * @swagger
 * /api/auth/verify-2fa:
 *   post:
 *     summary: Verify 2FA code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA verified successfully
 *       400:
 *         description: Invalid code
 */
router.post('/verify-2fa', async (req, res) => {
  try {
    const { code } = verify2FASchema.parse(req.body);

    // Assume user is authenticated
    const userId = 'placeholder-user-id'; // TODO: Get from auth middleware
    const existingUsers = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (existingUsers.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = existingUsers[0] as any;
    if (!user.twoFactorSecret) {
      return res.status(401).json({ error: '2FA not set up' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret!,
      encoding: 'base32',
      token: code,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Invalid code' });
    }

    await db.update(users).set({ twoFactorEnabled: true }).where(eq(users.id, userId));
    res.json({ message: '2FA enabled' });
    return;
  } catch (error) {
    console.error('Verify 2FA error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

export default router;