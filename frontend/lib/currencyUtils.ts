/**
 * Format a salary range with currency
 */
export function formatSalaryRange(min: number, max: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(min)} - ${formatter.format(max)}`;
}