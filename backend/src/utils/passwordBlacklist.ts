/**
 * A collection of common passwords that should be blocked for security.
 */
export const commonPasswords = new Set([
    'password',
    'password123',
    '12345678',
    '1234567890',
    'qwertyuiop',
    'admin123',
    'welcome123',
    'careerforge2024',
    'careerforge',
    'letmein123',
]);

/**
 * Checks if a password is in the common passwords list.
 * @param password The password to check
 * @returns true if the password is common/blocked
 */
export const isCommonPassword = (password: string): boolean => {
    const normalized = password.toLowerCase().trim();
    // Check exact matches
    if (commonPasswords.has(normalized)) return true;

    // Check if it contains very common variations
    return false;
};
