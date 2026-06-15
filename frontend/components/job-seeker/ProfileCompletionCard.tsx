'use client';

import React, { useState } from 'react';
import { Zap, Check, UploadCloud, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileCompletionCardProps {
  profileCompletion: number;
}

export function ProfileCompletionCard({ profileCompletion }: ProfileCompletionCardProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/resume/parse-file`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      toast.success("Resume parsed successfully!");
      console.log("Parsed Data:", data);
      // Trigger dashboard refresh here if context available
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to parse resume.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Profile Strength
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {profileCompletion}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Intermediate
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900 flex items-center justify-center border border-yellow-100 dark:border-yellow-700">
          <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        </div>
      </div>

      {/* Upload Action */}
      <div className="mb-4">
        <label className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          {isUploading ? 'Parsing...' : 'Upload Resume'}
          <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} disabled={isUploading} />
        </label>
      </div>

      {/* Animated Checklist */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm opacity-50">
          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
            Add Experience
          </span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-600 transition-colors cursor-pointer group">
          <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900 group-hover:border-indigo-200 dark:group-hover:border-indigo-600">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 group-hover:bg-indigo-600"></div>
          </div>
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
              Add Certifications
            </span>
          </div>
          <div className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-indigo-400" />
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-3 border border-blue-100 dark:border-blue-800 flex gap-3 items-start">
        <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-800 dark:text-blue-200 leading-snug">
          <span className="font-semibold">AI Tip:</span> Completing
          your profile increases match accuracy by ~20%.
        </p>
      </div>
    </div>
  );
}
