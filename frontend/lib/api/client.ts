const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class APIError extends Error {
    status: number;
    code?: string;
    details?: any;

    constructor(message: string, status: number, code?: string, details?: any) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

class APIClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const config: RequestInit = {
            ...options,
            credentials: 'include', // Always include cookies
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({ message: 'Request failed' }));
                throw new APIError(
                    errorBody.message || `HTTP ${response.status}`,
                    response.status,
                    errorBody.code,
                    errorBody.details
                );
            }

            const result = await response.json();
            // Automatically unwrap the 'data' key if it exists in our standard format
            if (result && result.success === true && result.data !== undefined) {
                return result.data;
            }
            return result;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            if (error instanceof Error) {
                throw new APIError(error.message, 0);
            }
            throw new APIError('An unknown error occurred', 0);
        }
    }

    // Auth APIs
    auth = {
        register: (data: {
            email: string;
            password: string;
            role: 'job_seeker' | 'recruiter';
            firstName: string;
            lastName: string;
        }) => this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

        login: (data: { email: string; password: string }) =>
            this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        logout: () =>
            this.request('/auth/logout', {
                method: 'POST',
            }),

        refresh: () =>
            this.request('/auth/refresh', {
                method: 'POST',
            }),

        forgotPassword: (email: string) =>
            this.request('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            }),

        resetPassword: (token: string, newPassword: string) =>
            this.request('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, newPassword }),
            }),

        verifyEmail: (token: string) =>
            this.request('/auth/verify-email', {
                method: 'POST',
                body: JSON.stringify({ token }),
            }),

        setup2FA: () =>
            this.request('/auth/setup-2fa', {
                method: 'POST',
            }),

        verify2FA: (code: string) =>
            this.request('/auth/verify-2fa', {
                method: 'POST',
                body: JSON.stringify({ code }),
            }),

        disable2FA: (data: { password: string; code?: string }) =>
            this.request('/auth/disable-2fa', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        regenerateBackupCodes: (data: { password: string }) =>
            this.request('/auth/backup-codes/regenerate', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        getProfile: () => this.request('/auth/profile', { method: 'GET' }),

        updateProfile: (data: any) =>
            this.request('/auth/profile', {
                method: 'PUT',
                body: JSON.stringify(data),
            }),
    };

    // Dashboard APIs
    dashboard = {
        getJobSeekerDashboard: () =>
            this.request('/dashboard/job-seeker', { method: 'GET' }),

        getRecruiterDashboard: () =>
            this.request('/dashboard/recruiter', { method: 'GET' }),
    };

    // Add more API groups as needed (jobs, applications, etc.)
}

export const apiClient = new APIClient(API_BASE_URL);
export default apiClient;
