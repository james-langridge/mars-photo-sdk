/**
 * Check if a date string represents a Martian sol (numeric day count)
 *
 * Pure function that detects sol dates vs earth dates.
 * Sol dates are integers representing Martian days since landing.
 *
 * @param date - Date string to check
 * @returns true if the date is a sol number (e.g., "1000"), false otherwise
 *
 * @example
 * isSolDate("1000") // true
 * isSolDate("2024-01-15") // false
 */
export function isSolDate(date: string): boolean {
  return /^\d+$/.test(date)
}

/**
 * Validate earth date format (YYYY-MM-DD)
 *
 * Pure function that checks if a string matches the earth date format
 * expected by the NASA API.
 *
 * @param date - Date string to validate
 * @returns true if format is YYYY-MM-DD, false otherwise
 *
 * @example
 * isValidEarthDateFormat("2024-01-15") // true
 * isValidEarthDateFormat("01/15/2024") // false
 * isValidEarthDateFormat("1000") // false
 */
export function isValidEarthDateFormat(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

/**
 * Validate that a sol number is non-negative
 *
 * @param sol - Sol number to validate
 * @returns true if sol is 0 or positive, false otherwise
 */
export function isValidSol(sol: number): boolean {
  return Number.isInteger(sol) && sol >= 0
}
