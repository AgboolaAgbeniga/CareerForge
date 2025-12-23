/**
 * Format a date as a relative time string (e.g., "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const isPast = diffInMs > 0;

  if (diffInSeconds < 60) {
    return isPast ? 'just now' : 'in a moment';
  } else if (diffInMinutes < 60) {
    return isPast ? `${diffInMinutes}m ago` : `in ${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return isPast ? `${diffInHours}h ago` : `in ${diffInHours}h`;
  } else if (diffInDays < 7) {
    return isPast ? `${diffInDays}d ago` : `in ${diffInDays}d`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return isPast ? `${weeks}w ago` : `in ${weeks}w`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return isPast ? `${months}mo ago` : `in ${months}mo`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return isPast ? `${years}y ago` : `in ${years}y`;
  }
}