'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Bell,
  ChevronDown,
  Sparkles,
  FileText,
  FileType,
  File,
  CheckCircle,
  X,
  ShieldCheck,
  Bot,
  ArrowRight,
  Command,
} from 'lucide-react';

export default function UploadResume() {
  const [uploadState, setUploadState] = useState<
    'idle' | 'uploading' | 'success'
  >('idle');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (
      file &&
      (file.type === 'application/pdf' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'text/plain')
    ) {
      setSelectedFile(file);
      setUploadState('uploading');
      simulateUpload();
    } else {
      alert('Please select a valid file (PDF, DOCX, or TXT)');
    }
  };

  const simulateUpload = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setUploadState('success'), 500);
      }
      setProgress(currentProgress);
    }, 200);
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
    <div
      className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-['Rethink_Sans'] antialiased selection:bg-indigo-500/30 selection:text-indigo-200"
      style={{
        backgroundImage:
          'radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.05), transparent 40%), radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.05), transparent 40%)',
      }}
    >
      {/* Top decorative line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Upload Interface */}
        <main className="lg:col-span-8 flex flex-col justify-center animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-medium tracking-tight text-white mb-2">
              Upload Your Resume
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              Bring your career journey into the platform. We'll securely
              analyze your document and optimize it for Applicant Tracking
              Systems (ATS) instantly.
            </p>
          </div>

          {/* UPLOAD CONTAINER */}
          <div className="glass-card rounded-2xl p-1 relative overflow-hidden transition-all duration-300 group hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.1)]">
            {/* Background decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>

            {/* STATE 1: DRAG & DROP ZONE */}
            {uploadState === 'idle' && (
              <div
                className={`relative rounded-xl border border-dashed border-white/10 bg-slate-950/30 p-10 sm:p-14 text-center transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5 cursor-pointer flex flex-col items-center justify-center min-h-[320px] ${isDragOver ? 'upload-zone-active' : ''}`}
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

                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/5 shadow-lg shadow-indigo-500/5 animate-float pointer-events-none">
                  <UploadCloud className="w-8 h-8 text-indigo-400" />
                </div>

                <h3 className="text-lg font-medium text-white mb-2 pointer-events-none">
                  Drag & drop your resume here
                </h3>
                <p className="text-xs text-slate-400 mb-8 pointer-events-none">
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
                  <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                  <span className="flex items-center gap-1">
                    <File className="w-3 h-3" /> TXT
                  </span>
                </div>
              </div>
            )}

            {/* STATE 2: LOADING / UPLOADING */}
            {uploadState === 'uploading' && (
              <div className="min-h-[320px] flex flex-col items-center justify-center p-10">
                <div className="w-full max-w-sm">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white font-medium">
                      Analyzing structure...
                    </span>
                    <span className="text-indigo-400">{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 progress-stripe transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-4 text-center">
                    Encrypting and parsing document data securely.
                  </p>
                </div>
              </div>
            )}

            {/* STATE 3: SUCCESS / PREVIEW */}
            {uploadState === 'success' && selectedFile && (
              <div className="min-h-[320px] flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
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

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group/btn">
                    <Sparkles className="w-4 h-4 group-hover/btn:animate-pulse" />
                    Analyze & Optimize
                  </button>
                  <button
                    onClick={resetUpload}
                    className="px-6 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-all"
                  >
                    Replace File
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 mt-6 flex items-center gap-1.5 opacity-70">
                  <ShieldCheck className="w-3 h-3" />
                  Secure upload via 256-bit encryption.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-center mt-6 px-2">
            <button className="text-sm text-slate-500 hover:text-slate-300 font-medium transition-colors">
              Cancel
            </button>
            <div className="text-[10px] text-slate-600">
              Supported: PDF, DOCX, TXT (Max 5MB)
            </div>
          </div>
        </main>

        {/* Right Column: AI Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* AI Assistant Panel */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden border-t border-t-white/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-teal-400" />
                </div>
              </div>
              <h2 className="text-sm font-medium text-white">AI Assistant</h2>
            </div>

            <div className="space-y-4">
              <div className="relative pl-4 border-l border-indigo-500/30">
                <h3 className="text-xs font-medium text-indigo-300 mb-1">
                  Did you know?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Resumes with quantifiable metrics (e.g., "Increased revenue by
                  20%") score 40% higher in our AI parsing engine.
                </p>
              </div>

              <div className="relative pl-4 border-l border-teal-500/30">
                <h3 className="text-xs font-medium text-teal-300 mb-1">
                  Privacy First
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your personal data is anonymized before analysis. You control
                  who sees your profile.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <button className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white group transition-colors">
                <span>How our analysis works</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="rounded-xl border border-dashed border-white/5 p-4 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs text-slate-300 font-medium">
                SOC2 Compliant
              </p>
              <p className="text-[10px] text-slate-500">
                Your data is safe with us.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
