/**
 * Base error class for all SDK errors
 */
export class MarsPhotosError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MarsPhotosError";
    Object.setPrototypeOf(this, MarsPhotosError.prototype);
  }
}

/**
 * Error thrown when API request fails with HTTP error status
 */
export class ApiError extends MarsPhotosError {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Error thrown when API response cannot be parsed
 */
export class ParseError extends MarsPhotosError {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ParseError";
    Object.setPrototypeOf(this, ParseError.prototype);
  }
}

/**
 * Error thrown when network request fails
 */
export class NetworkError extends MarsPhotosError {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Error thrown when input validation fails
 */
export class ValidationError extends MarsPhotosError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error thrown when client is misconfigured
 */
export class ConfigurationError extends MarsPhotosError {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}
