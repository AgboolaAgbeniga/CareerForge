// API Endpoints Configuration

const API_BASE = '/api';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE}/auth/register`,
    LOGIN: `${API_BASE}/auth/login`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
    SETUP_2FA: `${API_BASE}/auth/setup-2fa`,
    VERIFY_2FA: `${API_BASE}/auth/verify-2fa`,
    PROFILE: `${API_BASE}/auth/profile`,
  },
  DASHBOARD: `${API_BASE}/dashboard`,
  RESUME: `${API_BASE}/resume`,
  MATCHING: `${API_BASE}/matching`,
  MESSAGES: `${API_BASE}/messages`,
  NOTIFICATIONS: `${API_BASE}/notifications`,
  ANALYTICS: `${API_BASE}/analytics`,
  EXPERIMENTS: `${API_BASE}/experiments`,
  AI: `${API_BASE}/ai`,
} as const;