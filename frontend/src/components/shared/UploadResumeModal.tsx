import React, { useState, useRef } from 'react';
import { useUploadResume } from '@/hooks/queries/useProfile';
import {
  UploadCloud,
  FileText,
  FileType,
  CheckCircle,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface UploadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (parsedData: any, fileUrl?: string) => void;
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
  const uploadResumeMutation = useUploadResume();

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
    
    let fakeProgressInterval: NodeJS.Timeout | null = null;
    
    try {
      const response = await uploadResumeMutation.mutateAsync({
        formData,
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 50) / progressEvent.total);
            setProgress(percentCompleted);
            
            // Start asymptotic progress when network upload finishes (hits 50%)
            if (percentCompleted >= 50 && !fakeProgressInterval) {
              fakeProgressInterval = setInterval(() => {
                setProgress((prev) => {
                  if (prev >= 95) {
                    if (fakeProgressInterval) clearInterval(fakeProgressInterval);
                    return prev;
                  }
                  // Asymptotic step: close 15% of the remaining gap to 95% each tick
                  const diff = 95 - prev;
                  const step = Math.max(1, Math.floor(diff * 0.15));
                  return prev + step;
                });
              }, 600);
            }
          }
        },
      });
      
      if (fakeProgressInterval) clearInterval(fakeProgressInterval);
      setProgress(100);
      
      if (response && response.success) {
        onSuccess(response.parsedData, response.fileUrl);
      } else {
        setUploadState('error');
        setErrorMessage('Failed to parse resume. Please try again.');
      }
    } catch (error: any) {
      if (fakeProgressInterval) clearInterval(fakeProgressInterval);
      console.error('Upload failed:', error);
      setUploadState('error');
      setErrorMessage(error.response?.data?.message || error.message || 'An error occurred during upload. Please try again.');
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

  const handleClose = () => {
    if (uploadState !== 'uploading') {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Resume"
      size="md"
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            {errorMessage && uploadState === 'idle' && (
              <span className="type-caption text-red-600">{errorMessage}</span>
            )}
            {uploadState === 'idle' && (
              <div className="type-caption text-body">
                Max 5MB • PDF, DOCX, TXT
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <p className="type-body-md text-body">
          Bring your career journey into the platform instantly.
        </p>
      </div>

      {/* STATE 1: DRAG & DROP ZONE */}
      {uploadState === 'idle' && (
        <div
          className={`relative border border-hairline border-dashed rounded-sm p-8 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[280px] ${
            isDragOver ? 'bg-hairline' : 'bg-canvas hover:bg-hairline/50'
          }`}
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

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-sm border border-hairline bg-canvas">
            <UploadCloud className="w-6 h-6 text-ink" />
          </div>

          <h3 className="type-body-lg text-ink mb-2 pointer-events-none">
            Drag & drop your resume here
          </h3>
          <p className="type-body-md text-body mb-6 pointer-events-none">
            or click to browse your files
          </p>

          <div className="flex items-center gap-4 type-mono-caps-eyebrow text-body pointer-events-none">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" /> PDF
            </span>
            <span className="w-1 h-1 rounded-sm bg-body"></span>
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
            <div className="flex justify-between type-body-md mb-2">
              <span className="text-ink font-medium">
                {progress < 50 ? 'Uploading document securely...' : 'AI is analyzing structure and entities...'}
              </span>
              <span className="text-ink">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-hairline rounded-sm overflow-hidden relative">
              <div
                className="h-full bg-ink transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="type-caption text-body mt-4 text-center animate-pulse">
              This may take up to 30 seconds depending on resume length.
            </p>
          </div>
        </div>
      )}
      
      {/* STATE 3: ERROR */}
      {uploadState === 'error' && (
        <div className="min-h-[280px] flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 mb-4 rounded-sm bg-red-50 flex items-center justify-center border border-red-200 text-red-600">
            <X className="w-6 h-6" />
          </div>
          <h3 className="type-display-md text-ink mb-2">Upload Failed</h3>
          <p className="type-body-md text-red-600 mb-6 max-w-xs">{errorMessage}</p>
          <Button variant="outline" onClick={resetUpload}>
            Try Again
          </Button>
        </div>
      )}

      {/* STATE 4: STAGED / PREVIEW */}
      {uploadState === 'staged' && selectedFile && (
        <div className="min-h-[280px] flex flex-col items-center justify-center py-4">
          <div className="w-full cf-card p-4 flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-sm bg-hairline flex items-center justify-center text-ink">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="type-body-lg text-ink truncate">
                {selectedFile.name}
              </h4>
              <p className="type-body-md text-body flex items-center gap-2 mt-1">
                <span>{formatFileSize(selectedFile.size)}</span>
                <span className="w-1 h-1 bg-body rounded-sm"></span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Ready
                </span>
              </p>
            </div>
            <button
              onClick={resetUpload}
              className="p-2 text-body hover:text-ink hover:bg-hairline rounded-sm transition-colors"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              variant="primary"
              onClick={handleUploadAndAnalyze}
              className="flex-1 w-full flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              Analyze & Optimize
            </Button>
          </div>

          <p className="type-caption text-body mt-6 flex items-center gap-1.5 opacity-70">
            <ShieldCheck className="w-3 h-3" />
            Secure upload via 256-bit encryption.
          </p>
        </div>
      )}
    </Modal>
  );
}
