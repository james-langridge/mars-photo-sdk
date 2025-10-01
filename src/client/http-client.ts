import type { NormalizedConfig } from './config'
import { ApiError, NetworkError, ParseError } from './errors'

/**
 * HTTP client for NASA API requests
 *
 * Thin wrapper around fetch that handles errors and JSON parsing.
 * This is the action layer - all side effects happen here.
 */
export class HttpClient {
  constructor(private readonly config: NormalizedConfig) {}

  /**
   * Perform GET request and parse JSON response
   *
   * @param url - Complete URL to fetch
   * @returns Parsed JSON response
   * @throws {NetworkError} If network request fails
   * @throws {ApiError} If API returns error status
   * @throws {ParseError} If JSON parsing fails
   */
  async get<T>(url: string): Promise<T> {
    let response: Response

    try {
      response = await this.config.fetch(url)
    } catch (error) {
      throw new NetworkError(
        `Network request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      )
    }

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    try {
      return await response.json() as T
    } catch (error) {
      throw new ParseError(
        `Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      )
    }
  }
}
