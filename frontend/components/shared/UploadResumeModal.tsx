import React, { useState, useRef } from 'react';
import apiClient from '@/lib/apiClient';
import {
  UploadCloud,
  FileText,
  FileType,
  File,
  CheckCircle,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface UploadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadResumeModal({ isOpen, onClose, onSuccess }: UploadResumeModalProps) {
  const [uploadState, setUploadState] = useState<
    'idle' | 'staged' | 'uploading' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: globalThis.File) => {
    setErrorMessage('');
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File exceeds the 5MB limit. Please upload a smaller file.');
      return;
    }

    if (
      file &&
      (file.type === 'application/pdf' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'text/plain')
    ) {
      setSelectedFile(file);
      setUploadState('staged');
    } else {
      setErrorMessage('Please select a valid file (PDF, DOCX, or TXT)');
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) return;
    
    setUploadState('uploading');
    setProgress(0);
    setErrorMessage('');
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const response = await apiClient.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            // Uploading only accounts for the first 50% of the bar, parsing takes the rest
            const percentCompleted = Math.round((progressEvent.loaded * 50) / progressEvent.total);
            setProgress(percentCompleted);
          }
        },
      });
      
      // Simulate the parsing progress crawling from 50 to 95 while waiting for the LLM response
      setProgress(100);
      
      if (response && (response as any).success) {
        onSuccess();
      } else {
        setUploadState('error');
        setErrorMessage('Failed to parse resume. Please try again.');
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadState('error');
      setErrorMessage(error.response?.data?.message || 'An error occurred during upload. Please try again.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const resetUpload = () => {
    setUploadState('idle');
    setProgress(0);
    setSelectedFile(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
        onClick={uploadState !== 'uploading' ? onClose : undefined}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold text-white">Upload Resume</h2>
            <p className="text-xs text-slate-400 mt-1">
              Bring your career journey into the platform instantly.
            </p>
          </div>
          {uploadState !== 'uploading' && (
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 relative">
          {/* Background decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>

          {/* STATE 1: DRAG & DROP ZONE */}
          {uploadState === 'idle' && (
            <div
              className={`relative rounded-xl border border-dashed border-white/10 bg-slate-950/50 p-8 text-center transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5 cursor-pointer flex flex-col items-center justify-center min-h-[280px] ${isDragOver ? 'border-indigo-500/60 bg-indigo-500/10' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileInputChange}
              />

              <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/5 shadow-lg shadow-indigo-500/5 animate-float pointer-events-none">
                <UploadCloud className="w-6 h-6 text-indigo-400" />
              </div>

              <h3 className="text-base font-medium text-white mb-2 pointer-events-none">
                Drag & drop your resume here
              </h3>
              <p className="text-xs text-slate-400 mb-6 pointer-events-none">
                or click to browse your files
              </p>

              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium uppercase tracking-widest pointer-events-none">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" /> PDF
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                <span className="flex items-center gap-1">
                  <FileType className="w-3 h-3" /> DOCX
                </span>
              </div>
            </div>
          )}

          {/* STATE 2: LOADING / UPLOADING */}
          {uploadState === 'uploading' && (
            <div className="min-h-[280px] flex flex-col items-center justify-center py-8">
              <div className="w-full max-w-sm">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white font-medium">
                    {progress < 50 ? 'Uploading document securely...' : 'AI is analyzing structure and entities...'}
                  </span>
                  <span className="text-indigo-400">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 progress-stripe transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-4 text-center animate-pulse">
                  This may take up to 30 seconds depending on resume length.
                </p>
              </div>
            </div>
          )}
          
          {/* STATE 3: ERROR */}
          {uploadState === 'error' && (
            <div className="min-h-[280px] flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 mb-4 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Upload Failed</h3>
              <p className="text-sm text-red-400 mb-6 max-w-xs">{errorMessage}</p>
              <button
                onClick={resetUpload}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* STATE 4: STAGED / PREVIEW */}
          {uploadState === 'staged' && selectedFile && (
            <div className="min-h-[280px] flex flex-col items-center justify-center py-4">
              <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">
                    {selectedFile.name}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{formatFileSize(selectedFile.size)}</span>
                    <span className="w-0.5 h-0.5 bg-slate-600 rounded-full"></span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5" />
                      Ready
                    </span>
                  </p>
                </div>
                <button
                  onClick={resetUpload}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button 
                  onClick={handleUploadAndAnalyze}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Sparkles className="w-4 h-4 group-hover/btn:animate-pulse" />
                  Analyze & Optimize
                </button>
              </div>

              <p className="text-[10px] text-slate-500 mt-6 flex items-center gap-1.5 opacity-70">
                <ShieldCheck className="w-3 h-3" />
                Secure upload via 256-bit encryption.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-white/5 bg-slate-900/50">
          <div className="flex items-center gap-4">
            {errorMessage && uploadState === 'idle' && (
              <span className="text-[10px] text-red-400 font-medium">{errorMessage}</span>
            )}
            {uploadState === 'idle' && (
              <div className="text-[10px] text-slate-500">
                Max 5MB • PDF, DOCX, TXT
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
