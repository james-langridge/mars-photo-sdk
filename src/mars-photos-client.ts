import { ManifestsApi, PhotosApi } from "./api";
import type { ClientConfig } from "./client";
import { HttpClient, normalizeConfig } from "./client";

/**
 * Main SDK client for NASA Mars Rover Photos API
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
  public readonly photos: PhotosApi;

  /** Manifests API endpoints */
  public readonly manifests: ManifestsApi;

  /**
   * Create a new Mars Photos API client
   *
   * @param config - Client configuration (optional, defaults to DEMO_KEY)
   * @throws {ConfigurationError} If configuration is invalid
   *
   * @example
   * ```typescript
   * // Use DEMO_KEY (for testing/development)
   * const client = new MarsPhotosClient()
   *
   * // Use your own API key (recommended for production)
   * const client = new MarsPhotosClient({
   *   apiKey: 'YOUR_NASA_API_KEY'
   * })
   * ```
   */
  constructor(config?: ClientConfig) {
    const normalizedConfig = normalizeConfig(config);

    const httpClient = new HttpClient(normalizedConfig);

    this.photos = new PhotosApi(
      httpClient,
      normalizedConfig.baseUrl,
      normalizedConfig.apiKey,
    );

    this.manifests = new ManifestsApi(
      httpClient,
      normalizedConfig.baseUrl,
      normalizedConfig.apiKey,
    );
  }
}
