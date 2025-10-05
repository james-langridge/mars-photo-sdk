import type { HttpClient } from "../client";
import { ValidationError } from "../client";
import type { Manifest, ManifestResponse } from "../types";
import { validateRoverName, buildManifestUrl } from "../utils";

/**
 * Manifests API module
 *
 * Handles mission manifest endpoint. This is an orchestration layer
 * that validates inputs (calculations), builds URLs (calculations),
 * and performs HTTP requests (actions).
 */
export class ManifestsApi {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  /**
   * Get mission manifest for a specific rover
   *
   * The manifest contains metadata about the rover's mission including
   * landing date, launch date, mission status, and a complete inventory
   * of photos by sol.
   *
   * @param rover - Rover name (case-insensitive)
   * @returns Mission manifest
   * @throws {ValidationError} If rover name is invalid
   * @throws {ApiError} If API request fails
   * @throws {NetworkError} If network request fails
   *
   * @example
   * const manifest = await api.get("curiosity")
   * console.log(manifest.totalPhotos) // Total photos taken
   * console.log(manifest.maxSol) // Latest sol with photos
   */
  async get(rover: string): Promise<Manifest> {
    // Validate rover (calculation)
    const roverResult = validateRoverName(rover);
    if (!roverResult.success) {
      throw new ValidationError(roverResult.error);
    }

    // Build URL (calculation)
    const url = buildManifestUrl(this.baseUrl, roverResult.value, this.apiKey);

    // Perform HTTP request (action)
    const response = await this.httpClient.get<ManifestResponse>(url);

    // Transform to camelCase (calculation)
    return this.transformManifest(response.photo_manifest);
  }

  /**
   * Transform API response to camelCase
   *
   * Pure function that converts snake_case API responses to camelCase.
   */
  private transformManifest(manifest: Manifest): Manifest {
    return {
      name: manifest.name,
      landingDate: manifest.landing_date ?? manifest.landingDate,
      launchDate: manifest.launch_date ?? manifest.launchDate,
      status: manifest.status,
      maxSol: manifest.max_sol ?? manifest.maxSol,
      maxDate: manifest.max_date ?? manifest.maxDate,
      totalPhotos: manifest.total_photos ?? manifest.totalPhotos,
      photos: manifest.photos.map((photo) => ({
        sol: photo.sol,
        earthDate: photo.earth_date ?? photo.earthDate,
        totalPhotos: photo.total_photos ?? photo.totalPhotos,
        cameras: photo.cameras,
      })),
    };
  }
}
