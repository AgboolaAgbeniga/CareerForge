'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import { DownloadDocumentButton } from './DownloadDocumentButton';

interface DocumentRecord {
  id: string;
  userId: string;
  documentType: 'cover_letter' | 'optimized_resume' | 'match_report' | 'career_pitch_deck' | 'talent_pipeline_report';
  fileName: string;
  fileUrl: string;
  fileSizeBytes: number | null;
  relatedJobId: string | null;
  relatedResumeId: string | null;
  metadata: any;
  createdAt: string;
}

export const DocumentHistory: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get('/api/ai/documents/my') as any;
      setDocuments(data || []);
    } catch (err: any) {
      console.error('Error fetching document history:', err);
      setError('Could not load your document history.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const formatBytes = (bytes: number | null | undefined): string => {
    if (bytes === null || bytes === undefined || bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getDocTypeLabel = (type: string) => {
    switch (type) {
      case 'cover_letter':
        return 'Cover Letter';
      case 'optimized_resume':
        return 'Resume (Optimized)';
      case 'match_report':
        return 'Recruiter Match Report';
      case 'career_pitch_deck':
        return 'Career Pitch Deck';
      case 'talent_pipeline_report':
        return 'Talent Pipeline Report';
      default:
        return 'Document';
    }
  };

  const getDocTypeIcon = (type: string) => {
    switch (type) {
      case 'cover_letter':
        return (
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5M12 14v6" />
            </svg>
          </div>
        );
      case 'optimized_resume':
        return (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex justify-between items-center py-3 border-b border-slate-800/50">
              <div className="flex items-center space-x-3 w-3/4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                </div>
              </div>
              <div className="w-24 h-9 bg-slate-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-md border border-red-500/15 rounded-xl p-6 shadow-xl text-center">
        <svg className="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-sm font-medium text-slate-300">{error}</p>
        <button
          onClick={fetchDocuments}
          className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Document Downloads</h2>
          <p className="text-xs text-slate-400 mt-0.5">Access and re-download cover letters and optimized resumes you generated.</p>
        </div>
        <span className="text-xs text-slate-500 font-semibold px-2 py-0.5 bg-slate-800/60 rounded-full border border-slate-700/30">
          {documents.length} {documents.length === 1 ? 'file' : 'files'}
        </span>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-800 rounded-lg">
          <svg className="w-10 h-10 text-slate-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-slate-400">No documents generated yet.</p>
          <p className="text-xs text-slate-500 mt-1">Generate cover letters or optimize resumes via the AI Coach to see history.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800/50 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {documents.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 hover:bg-slate-800/10 px-2 rounded-lg transition-colors group">
              <div className="flex items-center space-x-4 min-w-0 mr-4">
                {getDocTypeIcon(doc.documentType)}
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
                    {doc.fileName}
                  </h4>
                  <div className="flex flex-wrap gap-x-2 text-xs text-slate-400 mt-1">
                    <span className="text-blue-400 font-medium">
                      {getDocTypeLabel(doc.documentType)}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span>{formatBytes(doc.fileSizeBytes)}</span>
                    <span className="text-slate-600">•</span>
                    <span>
                      {new Date(doc.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <DownloadDocumentButton
                documentType={
                  doc.documentType === 'cover_letter'
                    ? 'cover_letter'
                    : 'optimized_resume'
                }
                jobId={doc.relatedJobId || undefined}
                resumeId={doc.relatedResumeId || undefined}
                defaultFileName={doc.fileName}
                variant="outline"
                className="shrink-0 scale-95 opacity-90 group-hover:opacity-100 hover:scale-100 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </DownloadDocumentButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
