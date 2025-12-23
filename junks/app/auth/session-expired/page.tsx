'use client';

import Link from 'next/link';
import { Clock, Info } from 'lucide-react';

export default function SessionExpiredPage() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6" />
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
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
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
        <div className="px-6 pb-6 pt-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={() => window.history.back()}
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
