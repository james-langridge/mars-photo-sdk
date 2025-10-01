import type { CameraName, RoverName, RoverStatus } from './rover'

/**
 * Photo count information for a specific sol (Martian day)
 */
export interface ManifestPhoto {
  readonly sol: number
  readonly earthDate: string
  readonly totalPhotos: number
  readonly cameras: CameraName[]
}

/**
 * Mission manifest containing rover metadata and photo inventory
 */
export interface Manifest {
  readonly name: RoverName
  readonly landingDate: string
  readonly launchDate: string
  readonly status: RoverStatus
  readonly maxSol: number
  readonly maxDate: string
  readonly totalPhotos: number
  readonly photos: ManifestPhoto[]
}

/**
 * API response for manifest endpoint
 */
export interface ManifestResponse {
  readonly photo_manifest: Manifest
}
