import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ''; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

if (!ENCRYPTION_KEY) {
    console.warn('ENCRYPTION_KEY not set. Encryption will fail.');
}

export function encrypt(text: string): string {
    if (!ENCRYPTION_KEY) throw new Error('ENCRYPTION_KEY not set');
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
    if (!ENCRYPTION_KEY) throw new Error('ENCRYPTION_KEY not set');
    if (!text) return '';
    const textParts = text.split(':');
    if (textParts.length < 2) return text; // Return as is if not encrypted format

    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
