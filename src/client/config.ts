import { ConfigurationError } from "./errors";

/**
 * Default NASA API base URL
 */
export const DEFAULT_BASE_URL = "https://api.nasa.gov/mars-photos/api/v1";

/**
 * Client configuration options
 */
export interface ClientConfig {
  /**
   * NASA API key - required
   * Get one at https://api.nasa.gov/#signUp
   */
  readonly apiKey: string;

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
export function normalizeConfig(config: ClientConfig): NormalizedConfig {
  if (!config.apiKey || config.apiKey.trim() === "") {
    throw new ConfigurationError(
      "API key is required. Get one at https://api.nasa.gov/#signUp",
    );
  }

  const fetchImpl = config.fetch ?? fetch;

  if (typeof fetchImpl !== "function") {
    throw new ConfigurationError("fetch must be a function");
  }

  return {
    apiKey: config.apiKey.trim(),
    baseUrl: config.baseUrl?.trim() ?? DEFAULT_BASE_URL,
    fetch: fetchImpl,
  };
}
