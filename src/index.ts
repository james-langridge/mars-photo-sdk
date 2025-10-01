/**
 * NASA Mars Rover Photos SDK
 *
 * Type-safe TypeScript client for the NASA Mars Rover Photos API.
 *
 * @example
 * ```typescript
 * import { MarsPhotosClient } from '@jamesrwilliams/mars-photos-sdk'
 *
 * const client = new MarsPhotosClient({
 *   apiKey: 'YOUR_NASA_API_KEY'
 * })
 *
 * const photos = await client.photos.get({
 *   rover: 'curiosity',
 *   date: '2024-01-15'
 * })
 * ```
 *
 * @packageDocumentation
 */

// Main client
export { MarsPhotosClient } from './mars-photos-client'

// Types
export type {
  // Rover types
  RoverName,
  RoverStatus,
  Rover,
  Camera,
  CameraName,
  CuriosityCamera,
  OpportunitySpiritCamera,
  PerseveranceCamera,
  // Photo types
  Photo,
  PhotosResponse,
  LatestPhotosResponse,
  // Manifest types
  Manifest,
  ManifestPhoto,
  ManifestResponse,
  // Client types
  ClientConfig,
} from './types'

export {
  // Rover constants
  ROVER_NAMES,
  ROVER_STATUS,
  CURIOSITY_CAMERAS,
  OPPORTUNITY_SPIRIT_CAMERAS,
  PERSEVERANCE_CAMERAS,
  ALL_CAMERAS,
  ROVER_CAMERAS,
  CAMERA_FULL_NAMES,
} from './types'

// Error classes
export {
  MarsPhotosError,
  ApiError,
  NetworkError,
  ParseError,
  ValidationError,
  ConfigurationError,
} from './client/errors'

// Utility functions (for advanced use)
export {
  isSolDate,
  isValidEarthDateFormat,
  isValidSol,
  validateRoverName,
  validateCameraName,
  validateCamera,
  validateDate,
  validatePage,
} from './utils'

// Result type for advanced validation
export type { Result } from './utils'
export { success, failure, isSuccess, isFailure } from './utils'
