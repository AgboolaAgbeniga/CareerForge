import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window as any);

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * @param html The potentially unsafe HTML string
 * @returns A sanitized HTML string
 */
export const sanitizeHtml = (html: string): string => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
};

/**
 * Sanitizes plain text by removing all HTML tags.
 * @param text The potentially unsafe text string
 * @returns A plain text string with no HTML
 */
export const sanitizeText = (text: string): string => {
    if (!text) return '';
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};
