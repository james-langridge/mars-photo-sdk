import { ConfigurationError } from "./errors";

/**
 * Default NASA API base URL
 */
export const DEFAULT_BASE_URL = "https://api.nasa.gov/mars-photos/api/v1";

/**
 * Default NASA API key for testing/development
 * Get your own key at https://api.nasa.gov/#signUp for production use
 */
export const DEFAULT_API_KEY = "DEMO_KEY";

/**
 * Client configuration options
 */
export interface ClientConfig {
  /**
   * NASA API key
   * Defaults to DEMO_KEY if not provided
   * Get your own at https://api.nasa.gov/#signUp for production use
   */
  readonly apiKey?: string;

  /**
   * Base URL for NASA API
   * @default "https://api.nasa.gov/mars-photos/api/v1"
   */
  readonly baseUrl?: string;

  /**
   * Custom fetch implementation
   * Useful for testing or custom request handling
   * @default global fetch
   */
  readonly fetch?: typeof fetch;
}

/**
 * Internal normalized configuration
 */
export interface NormalizedConfig {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly fetch: typeof fetch;
}

/**
 * Validate and normalize client configuration
 *
 * Pure function that checks required fields and applies defaults.
 *
 * @param config - User-provided configuration
 * @returns Normalized configuration with defaults applied
 * @throws {ConfigurationError} If configuration is invalid
 */
export function normalizeConfig(config: ClientConfig = {}): NormalizedConfig {
  const apiKey = config.apiKey?.trim() ?? DEFAULT_API_KEY;

  if (apiKey === "") {
    throw new ConfigurationError(
      "API key cannot be empty. Get one at https://api.nasa.gov/#signUp",
    );
  }

  const fetchImpl = config.fetch ?? fetch;

  if (typeof fetchImpl !== "function") {
    throw new ConfigurationError("fetch must be a function");
  }

  return {
    apiKey,
    baseUrl: config.baseUrl?.trim() ?? DEFAULT_BASE_URL,
    fetch: fetchImpl,
  };
}
