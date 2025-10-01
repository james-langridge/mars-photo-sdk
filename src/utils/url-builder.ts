import type { CameraName, RoverName } from '../types/rover'
import { isSolDate } from './date'

/**
 * Parameters for building photo query URLs
 */
export interface PhotoQueryParams {
  readonly rover: RoverName
  readonly date: string
  readonly camera?: CameraName
  readonly page?: number
  readonly apiKey: string
}

/**
 * Build URL for photos endpoint
 *
 * Pure function that constructs the complete URL with query parameters
 * for fetching rover photos. Automatically detects sol vs earth_date.
 *
 * @param baseUrl - Base API URL
 * @param params - Query parameters
 * @returns Complete URL string
 *
 * @example
 * buildPhotosUrl("https://api.nasa.gov", {
 *   rover: "curiosity",
 *   date: "1000",
 *   camera: "NAVCAM",
 *   apiKey: "key"
 * })
 * // => "https://api.nasa.gov/rovers/curiosity/photos?sol=1000&camera=NAVCAM&api_key=key"
 */
export function buildPhotosUrl(
  baseUrl: string,
  params: PhotoQueryParams
): string {
  const { rover, date, camera, page, apiKey } = params
  const searchParams = new URLSearchParams()

  // Automatically detect sol vs earth_date
  if (isSolDate(date)) {
    searchParams.set('sol', date)
  } else {
    searchParams.set('earth_date', date)
  }

  if (camera) {
    searchParams.set('camera', camera)
  }

  if (page !== undefined) {
    searchParams.set('page', page.toString())
  }

  searchParams.set('api_key', apiKey)

  return `${baseUrl}/rovers/${rover}/photos?${searchParams.toString()}`
}

/**
 * Build URL for latest photos endpoint
 *
 * Pure function that constructs the URL for fetching latest photos.
 *
 * @param baseUrl - Base API URL
 * @param rover - Rover name
 * @param apiKey - NASA API key
 * @returns Complete URL string
 */
export function buildLatestPhotosUrl(
  baseUrl: string,
  rover: RoverName,
  apiKey: string
): string {
  const searchParams = new URLSearchParams()
  searchParams.set('api_key', apiKey)

  return `${baseUrl}/rovers/${rover}/latest_photos?${searchParams.toString()}`
}

/**
 * Build URL for mission manifest endpoint
 *
 * Pure function that constructs the URL for fetching mission manifest.
 *
 * @param baseUrl - Base API URL
 * @param rover - Rover name
 * @param apiKey - NASA API key
 * @returns Complete URL string
 */
export function buildManifestUrl(
  baseUrl: string,
  rover: RoverName,
  apiKey: string
): string {
  const searchParams = new URLSearchParams()
  searchParams.set('api_key', apiKey)

  return `${baseUrl}/manifests/${rover}?${searchParams.toString()}`
}
