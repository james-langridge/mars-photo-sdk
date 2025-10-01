import { ManifestsApi, PhotosApi } from './api'
import type { ClientConfig } from './client'
import { HttpClient, normalizeConfig } from './client'

/**
 * Main SDK client for NASA Mars Rover Photos API
 *
 * Deep module with simple interface: photos.get(), manifests.get()
 * Complex validation, URL building, and HTTP handling hidden inside.
 *
 * @example
 * ```typescript
 * const client = new MarsPhotosClient({
 *   apiKey: 'YOUR_NASA_API_KEY'
 * })
 *
 * // Get photos by earth date
 * const photos = await client.photos.get({
 *   rover: 'curiosity',
 *   date: '2024-01-15',
 *   camera: 'NAVCAM'
 * })
 *
 * // Get latest photos
 * const latest = await client.photos.getLatest('perseverance')
 *
 * // Get mission manifest
 * const manifest = await client.manifests.get('curiosity')
 * ```
 */
export class MarsPhotosClient {
  /** Photos API endpoints */
  public readonly photos: PhotosApi

  /** Manifests API endpoints */
  public readonly manifests: ManifestsApi

  /**
   * Create a new Mars Photos API client
   *
   * @param config - Client configuration with API key
   * @throws {ConfigurationError} If configuration is invalid
   *
   * @example
   * ```typescript
   * const client = new MarsPhotosClient({
   *   apiKey: 'YOUR_NASA_API_KEY',
   *   baseUrl: 'https://api.nasa.gov/mars-photos/api/v1' // optional
   * })
   * ```
   */
  constructor(config: ClientConfig) {
    // Validate and normalize config (calculation)
    const normalizedConfig = normalizeConfig(config)

    // Create HTTP client (action layer)
    const httpClient = new HttpClient(normalizedConfig)

    // Create API modules (orchestration)
    this.photos = new PhotosApi(
      httpClient,
      normalizedConfig.baseUrl,
      normalizedConfig.apiKey
    )

    this.manifests = new ManifestsApi(
      httpClient,
      normalizedConfig.baseUrl,
      normalizedConfig.apiKey
    )
  }
}
