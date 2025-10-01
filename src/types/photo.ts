import type { Camera, Rover } from './rover'

/**
 * Individual photo from Mars rover
 */
export interface Photo {
  readonly id: number
  readonly sol: number
  readonly camera: Camera
  readonly imgSrc: string
  readonly earthDate: string
  readonly rover: Rover
}

/**
 * API response for photos endpoint
 */
export interface PhotosResponse {
  readonly photos: Photo[]
}

/**
 * API response for latest photos endpoint
 */
export interface LatestPhotosResponse {
  readonly latest_photos: Photo[]
}
