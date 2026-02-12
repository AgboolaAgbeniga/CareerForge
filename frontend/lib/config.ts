/**
 * Centralized API Configuration
 * Single source of truth for all API endpoints
 */

const getEnvVar = (key: string, defaultValue: string): string => {
    if (typeof window === 'undefined') {
        // Server-side
        return process.env[key] || defaultValue;
    }
    // Client-side
    return (process.env as any)[key] || defaultValue;
};

export const API_CONFIG = {
    BASE_URL: getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:5000'),
    SOCKET_URL: getEnvVar('NEXT_PUBLIC_SOCKET_URL', 'http://localhost:5000'),
    ENVIRONMENT: getEnvVar('NEXT_PUBLIC_ENVIRONMENT', 'development'),

    // API Endpoints
    ENDPOINTS: {
        AUTH: '/api/auth',
        JOBS: '/api/jobs',
        APPLICATIONS: '/api/applications',
        DASHBOARD: '/api/dashboard',
        RESUME: '/api/resume',
        MATCHING: '/api/matching',
        MESSAGES: '/api/messages',
        NOTIFICATIONS: '/api/notifications',
        ANALYTICS: '/api/analytics',
        AI: '/api/ai',
    },

    // Timeouts
    TIMEOUT: {
        DEFAULT: 10000,
        UPLOAD: 30000,
        AI: 60000,
    },

    // Feature Flags
    FEATURES: {
        META_PIXEL_ID: getEnvVar('NEXT_PUBLIC_META_PIXEL_ID', ''),
        ANALYTICS_ID: getEnvVar('NEXT_PUBLIC_ANALYTICS_ID', ''),
    },
} as const;

export const getApiUrl = (endpoint: string = ''): string => {
    const baseUrl = API_CONFIG.BASE_URL;
    return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
};

export const getFullApiUrl = (path: string): string => {
    return `${API_CONFIG.BASE_URL}/api${path}`;
};

export default API_CONFIG;
