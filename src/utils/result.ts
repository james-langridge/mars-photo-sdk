/**
 * Result type for pure functions that can fail
 *
 * Represents the outcome of an operation that might fail.
 * Success contains a value, Failure contains an error message.
 */
export type Result<T> =
  | { readonly success: true; readonly value: T }
  | { readonly success: false; readonly error: string }

/**
 * Create a successful Result
 */
export function success<T>(value: T): Result<T> {
  return { success: true, value }
}

/**
 * Create a failed Result
 */
export function failure<T>(error: string): Result<T> {
  return { success: false, error }
}

/**
 * Check if a Result is successful
 */
export function isSuccess<T>(result: Result<T>): result is { success: true; value: T } {
  return result.success
}

/**
 * Check if a Result is a failure
 */
export function isFailure<T>(result: Result<T>): result is { success: false; error: string } {
  return !result.success
}
