'use client';

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import apiClient from '@/lib/apiClient';

interface DownloadDocumentButtonProps {
  documentType: 'cover_letter' | 'optimized_resume';
  jobId?: string;
  resumeId?: string;
  targetJobId?: string;
  defaultFileName?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export const DownloadDocumentButton: React.FC<DownloadDocumentButtonProps> = ({
  documentType,
  jobId,
  resumeId,
  targetJobId,
  defaultFileName,
  variant = 'primary',
  className = '',
  children,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloading(true);
    setError(null);

    try {
      let url = '';
      let fallbackName = '';

      if (documentType === 'cover_letter') {
        if (!jobId) throw new Error('Job ID is required to download cover letter.');
        url = `/api/ai/cover-letter/${jobId}/download`;
        fallbackName = `CoverLetter_${jobId}.docx`;
      } else {
        if (!resumeId) throw new Error('Resume ID is required to download resume.');
        url = `/api/ai/resume/${resumeId}/download`;
        if (targetJobId) {
          url += `?targetJobId=${targetJobId}`;
        }
        fallbackName = `OptimizedResume_${resumeId}.docx`;
      }

      const responseData = await apiClient.get(url, {
        responseType: 'blob',
      }) as any;

      const fileName = defaultFileName || fallbackName;
      const blob = new Blob([responseData], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(blob, fileName);
    } catch (err: any) {
      console.error('Error downloading document:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to download document.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getButtonStyles = () => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (variant) {
      case 'primary':
        return `${base} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg focus:ring-blue-500 py-2.5 px-4`;
      case 'secondary':
        return `${base} bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 focus:ring-slate-500 py-2.5 px-4`;
      case 'outline':
        return `${base} bg-transparent hover:bg-slate-900 text-blue-400 border border-blue-500/30 hover:border-blue-400 focus:ring-blue-500 py-2.5 px-4`;
      case 'icon':
        return `${base} p-2 text-slate-400 hover:text-white hover:bg-slate-800 focus:ring-slate-500`;
      default:
        return base;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`${getButtonStyles()} ${className}`}
        title={error || undefined}
      >
        {isDownloading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </>
        ) : (
          children || (
            <>
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download DOCX
            </>
          )
        )}
      </button>

      {error && (
        <p className="absolute left-0 mt-1 text-xs text-red-500 font-medium whitespace-nowrap bg-slate-900 border border-red-500/20 px-2 py-1 rounded shadow-lg z-10 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};
