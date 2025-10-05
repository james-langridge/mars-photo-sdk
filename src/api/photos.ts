import type { HttpClient } from "../client";
import { ValidationError } from "../client";
import type {
  CameraName,
  LatestPhotosResponse,
  Photo,
  PhotosResponse,
} from "../types";
import {
  validateCameraName,
  validateDate,
  validatePage,
  validateRoverName,
  buildLatestPhotosUrl,
  buildPhotosUrl,
} from "../utils";

/**
 * Parameters for fetching photos
 */
export interface GetPhotosParams {
  /**
   * Rover name (case-insensitive)
   */
  readonly rover: string;

  /**
   * Date - either sol number (e.g., "1000") or earth date (YYYY-MM-DD)
   */
  readonly date: string;

  /**
   * Camera abbreviation (optional, case-insensitive)
   */
  readonly camera?: string;

  /**
   * Page number for pagination (default: 1)
   */
  readonly page?: number;
}

/**
 * Photos API module
 *
 * Handles all photo-related endpoints. This is an orchestration layer
 * that validates inputs (calculations), builds URLs (calculations),
 * and performs HTTP requests (actions).
 */
export class PhotosApi {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  /**
   * Get photos for a specific rover, date, and optionally camera
   *
   * @param params - Query parameters
   * @returns Array of photos
   * @throws {ValidationError} If parameters are invalid
   * @throws {ApiError} If API request fails
   * @throws {NetworkError} If network request fails
   *
   * @example
   * const photos = await api.get({
   *   rover: "curiosity",
   *   date: "2024-01-15",
   *   camera: "NAVCAM",
   *   page: 1
   * })
   */
  async get(params: GetPhotosParams): Promise<Photo[]> {
    // Validate rover (calculation)
    const roverResult = validateRoverName(params.rover);
    if (!roverResult.success) {
      throw new ValidationError(roverResult.error);
    }

    // Validate date (calculation)
    const dateResult = validateDate(params.date);
    if (!dateResult.success) {
      throw new ValidationError(dateResult.error);
    }

    // Validate camera if provided (calculation)
    let camera: CameraName | undefined;
    if (params.camera) {
      const cameraResult = validateCameraName(params.camera, roverResult.value);
      if (!cameraResult.success) {
        throw new ValidationError(cameraResult.error);
      }
      camera = cameraResult.value;
    }

    // Validate page if provided (calculation)
    const page = params.page ?? 1;
    const pageResult = validatePage(page);
    if (!pageResult.success) {
      throw new ValidationError(pageResult.error);
    }

    // Build URL (calculation)
    const url = buildPhotosUrl(this.baseUrl, {
      rover: roverResult.value,
      date: dateResult.value,
      camera,
      page,
      apiKey: this.apiKey,
    });

    // Perform HTTP request (action)
    const response = await this.httpClient.get<PhotosResponse>(url);

    // Transform to camelCase (calculation)
    return this.transformPhotos(response.photos);
  }

  /**
   * Get latest photos for a specific rover
   *
   * @param rover - Rover name (case-insensitive)
   * @returns Array of latest photos
   * @throws {ValidationError} If rover name is invalid
   * @throws {ApiError} If API request fails
   * @throws {NetworkError} If network request fails
   *
   * @example
   * const photos = await api.getLatest("curiosity")
   */
  async getLatest(rover: string): Promise<Photo[]> {
    // Validate rover (calculation)
    const roverResult = validateRoverName(rover);
    if (!roverResult.success) {
      throw new ValidationError(roverResult.error);
    }

    // Build URL (calculation)
    const url = buildLatestPhotosUrl(
      this.baseUrl,
      roverResult.value,
      this.apiKey,
    );

    // Perform HTTP request (action)
    const response = await this.httpClient.get<LatestPhotosResponse>(url);

    // Transform to camelCase (calculation)
    return this.transformPhotos(response.latest_photos);
  }

  /**
   * Transform API response to camelCase
   *
   * Pure function that converts snake_case API responses to camelCase.
   */
  private transformPhotos(photos: readonly Photo[]): Photo[] {
    return photos.map((photo) => ({
      id: photo.id,
      sol: photo.sol,
      camera: {
        id: photo.camera.id,
        name: photo.camera.name,
        roverId: photo.camera.rover_id ?? photo.camera.roverId,
        fullName: photo.camera.full_name ?? photo.camera.fullName,
      },
      imgSrc: photo.img_src ?? photo.imgSrc,
      earthDate: photo.earth_date ?? photo.earthDate,
      rover: {
        id: photo.rover.id,
        name: photo.rover.name,
        landingDate: photo.rover.landing_date ?? photo.rover.landingDate,
        launchDate: photo.rover.launch_date ?? photo.rover.launchDate,
        status: photo.rover.status,
      },
    }));
  }
}
