'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else if (allowedRoles && !allowedRoles.includes(user.role)) {
                // Redirect to their appropriate dashboard if they try to access unauthorized route
                if (user.role === 'job_seeker') {
                    router.push('/job-seeker/dashboard');
                } else if (user.role === 'recruiter') {
                    router.push('/recruiter/dashboard');
                } else {
                    router.push('/');
                }
            }
        }
    }, [user, loading, router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null; // Will redirect
    }

    return <>{children}</>;
}
