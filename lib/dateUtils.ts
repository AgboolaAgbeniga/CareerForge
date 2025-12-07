// Date formatting utilities using Intl API

/**
 * Formats a date in short style (e.g., "12/7/25")
 */
export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'short' }).format(date);
}

/**
 * Formats a date in long style (e.g., "December 7, 2025")
 */
export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(date);
}

/**
 * Formats a date as relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

  if (diffInDays > 0) {
    return rtf.format(-diffInDays, 'day');
  } else if (diffInHours > 0) {
    return rtf.format(-diffInHours, 'hour');
  } else if (diffInMinutes > 0) {
    return rtf.format(-diffInMinutes, 'minute');
  } else {
    return rtf.format(-diffInSeconds, 'second');
  }
}