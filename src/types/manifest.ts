import type { CameraName, RoverName, RoverStatus } from './rover'

/**
 * Photo count information for a specific sol (Martian day)
 */
export interface ManifestPhoto {
  readonly sol: number
  readonly earthDate?: string
  readonly earth_date?: string
  readonly totalPhotos?: number
  readonly total_photos?: number
  readonly cameras: CameraName[]
}

/**
 * Mission manifest containing rover metadata and photo inventory
 */
export interface Manifest {
  readonly name: RoverName
  readonly landingDate?: string
  readonly landing_date?: string
  readonly launchDate?: string
  readonly launch_date?: string
  readonly status: RoverStatus
  readonly maxSol?: number
  readonly max_sol?: number
  readonly maxDate?: string
  readonly max_date?: string
  readonly totalPhotos?: number
  readonly total_photos?: number
  readonly photos: ManifestPhoto[]
}

/**
 * API response for manifest endpoint
 */
export interface ManifestResponse {
  readonly photo_manifest: Manifest
}
