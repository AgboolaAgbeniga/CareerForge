'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SessionExpiredPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/job-seeker/dashboard-job_seekers');
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-width-400 w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold">Session Expired</h2>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 text-center mb-4">
            For your security, please log in again to continue.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Your changes are saved automatically when possible.
                </p>
                <p className="text-sm text-blue-700">
                  Don't worry, you won't lose your work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <Link
              href="/auth/login"
              className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
