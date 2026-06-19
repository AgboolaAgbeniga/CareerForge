import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { supabase } from './supabase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/** Set / clear the accessToken cookie that the backend reads */
function syncCookie(token: string | null) {
  if (typeof document === 'undefined') return;
  if (token) {
    document.cookie = `accessToken=${token}; path=/; max-age=${15 * 60}; SameSite=Lax`;
  } else {
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

let isRefreshing = false;
// Queue of resolvers waiting on the in-flight refresh
let refreshQueue: Array<(token: string | null) => void> = [];

function processQueue(token: string | null) {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true, // Send cookies alongside headers
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ── Request interceptor ──────────────────────────────────────────────
    // Attach the current Supabase access token to every outgoing request.
    // This keeps the Authorization header and the cookie in sync.
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          config.headers.set('Authorization', `Bearer ${session.access_token}`);
          syncCookie(session.access_token);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ── Response interceptor ─────────────────────────────────────────────
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Automatically unwrap { success: true, data: ... } envelope
        if (response.data && response.data.success === true && response.data.data !== undefined) {
          return response.data.data;
        }
        return response.data;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 or 403 "Invalid or expired token" — attempt a token refresh
        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          if (isRefreshing) {
            // Another refresh is already in flight — queue this request
            return new Promise((resolve, reject) => {
              refreshQueue.push((token) => {
                if (token) {
                  originalRequest.headers.set('Authorization', `Bearer ${token}`);
                  resolve(this.axiosInstance(originalRequest));
                } else {
                  reject(error);
                }
              });
            });
          }

          isRefreshing = true;

          try {
            const { data, error: refreshError } = await supabase.auth.refreshSession();

            if (refreshError || !data.session) {
              // Refresh failed — log out
              processQueue(null);
              syncCookie(null);
              if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
              }
              return Promise.reject(error);
            }

            const newToken = data.session.access_token;
            syncCookie(newToken);
            processQueue(newToken);

            // Retry the original request with the fresh token
            originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
            return this.axiosInstance(originalRequest);
          } catch (refreshErr) {
            processQueue(null);
            syncCookie(null);
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
            return Promise.reject(refreshErr);
          } finally {
            isRefreshing = false;
          }
        }

        // 500+ errors
        if (error.response && error.response.status >= 500) {
          console.error('Server error:', error.response.data);
        }

        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }

  patch<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, data, config);
  }
}

const apiClient = new ApiClient();
export default apiClient;