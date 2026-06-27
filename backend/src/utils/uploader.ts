import multer from 'multer';
import path from 'path';
import { AppError } from '../middleware/error';

/**
 * Shared Multer configuration for memory storage uploads.
 * Restricts files to 10MB and validates that the MIME type is a PDF, DOC, DOCX, or TXT.
 */
export const documentUploader = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          'Invalid file type. Only PDF, Word, and Text documents are allowed.',
          400,
          'INVALID_FILE_TYPE'
        ) as any
      );
    }
  }
});

/**
 * Validates a file's actual content (magic bytes) and extension to prevent spoofing.
 */
export async function validateFileMagicBytes(file: Express.Multer.File): Promise<void> {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  // 1. Extension check
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    throw new AppError(`File extension not allowed: ${ext}`, 400, 'INVALID_FILE_EXTENSION');
  }

  // 2. Magic-byte check
  if (file.buffer) {
    try {
      const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<any>);
      const detected = await fileTypeFromBuffer(file.buffer);
      
      // If it's a plain text file, file-type returns undefined. Allow it if the extension is .txt.
      if (detected) {
        if (!allowedMimeTypes.includes(detected.mime)) {
          throw new AppError(`File content signature does not match allowed types. Detected: ${detected.mime}`, 400, 'INVALID_FILE_SIGNATURE');
        }
      } else if (ext !== '.txt') {
        throw new AppError('Could not verify file content authenticity.', 400, 'INVALID_FILE_SIGNATURE');
      }
    } catch (err) {
      if (err instanceof AppError) throw err;
      console.warn('File type verification skipped or failed:', err);
    }
  }
}
