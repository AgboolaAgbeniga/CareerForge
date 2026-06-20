'use client';

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import apiClient from '@/lib/apiClient';

interface ExportReportButtonProps {
  jobId: string;
  jobTitle?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const ExportReportButton: React.FC<ExportReportButtonProps> = ({
  jobId,
  jobTitle = 'Job',
  variant = 'primary',
  className = '',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [anonymize, setAnonymize] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloading(true);
    setError(null);

    try {
      const url = `/api/matching/${jobId}/report/download?anonymize=${anonymize}`;
      
      const responseData = await apiClient.get(url, {
        responseType: 'blob',
      }) as any;

      const sanitizedTitle = jobTitle.replace(/[^a-zA-Z0-9]/g, '_');
      const anonSuffix = anonymize ? '_Anonymized' : '';
      const fileName = `MatchReport_${sanitizedTitle}${anonSuffix}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      
      const blob = new Blob([responseData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      
      saveAs(blob, fileName);
    } catch (err: any) {
      console.error('Error downloading report:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to download report.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getButtonStyles = () => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (variant) {
      case 'primary':
        return `${base} bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg focus:ring-emerald-500 py-2.5 px-4`;
      case 'secondary':
        return `${base} bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 focus:ring-slate-500 py-2.5 px-4`;
      case 'outline':
        return `${base} bg-transparent hover:bg-emerald-950/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 focus:ring-emerald-500 py-2.5 px-4`;
      default:
        return base;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
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
              Generating Report...
            </>
          ) : (
            <>
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export Match Report (XLSX)
            </>
          )}
        </button>

        {error && (
          <p className="absolute left-0 mt-1 text-xs text-red-500 font-medium whitespace-nowrap bg-slate-900 border border-red-500/20 px-2 py-1 rounded shadow-lg z-10 animate-fade-in">
            {error}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={anonymize}
          onChange={(e) => setAnonymize(e.target.checked)}
          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-900 focus:ring-2"
        />
        <span className="text-sm text-slate-300 font-medium">Anonymize Profiles</span>
      </label>
    </div>
  );
};
