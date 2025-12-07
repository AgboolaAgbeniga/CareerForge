/**
 * Formats a currency amount using the browser's Intl API.
 * @param amount - The numeric amount to format
 * @param currency - The currency code (e.g., 'USD', 'EUR', 'GBP')
 * @param locale - Optional locale string (defaults to browser locale)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string, locale?: string): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(amount);
  } catch (error) {
    // Fallback if currency is invalid
    console.warn(`Invalid currency code: ${currency}. Using USD as fallback.`);
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount);
  }
}

/**
 * Formats a salary range using the browser's Intl API.
 * @param min - The minimum salary amount
 * @param max - The maximum salary amount
 * @param currency - The currency code (e.g., 'USD', 'EUR', 'GBP')
 * @param locale - Optional locale string (defaults to browser locale)
 * @returns Formatted salary range string (e.g., "$50,000 - $70,000")
 */
export function formatSalaryRange(min: number, max: number, currency: string, locale?: string): string {
  const formattedMin = formatCurrency(min, currency, locale);
  const formattedMax = formatCurrency(max, currency, locale);
  return `${formattedMin} - ${formattedMax}`;
}

/**
 * Gets the user's preferred locale from the browser.
 * @returns Locale string or undefined
 */
export function getUserLocale(): string | undefined {
  if (typeof window !== 'undefined') {
    return navigator.language;
  }
  return undefined;
}