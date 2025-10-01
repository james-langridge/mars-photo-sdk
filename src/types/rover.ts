/**
 * Mars rover names supported by the NASA API
 */
export const ROVER_NAMES = ['curiosity', 'opportunity', 'perseverance', 'spirit'] as const

export type RoverName = typeof ROVER_NAMES[number]

/**
 * Mission status values
 */
export const ROVER_STATUS = ['active', 'complete'] as const

export type RoverStatus = typeof ROVER_STATUS[number]

/**
 * Camera abbreviations for Curiosity rover
 */
export const CURIOSITY_CAMERAS = [
  'FHAZ',
  'RHAZ',
  'MAST',
  'CHEMCAM',
  'MAHLI',
  'MARDI',
  'NAVCAM',
] as const

/**
 * Camera abbreviations for Opportunity and Spirit rovers
 */
export const OPPORTUNITY_SPIRIT_CAMERAS = [
  'FHAZ',
  'RHAZ',
  'NAVCAM',
  'PANCAM',
  'MINITES',
] as const

/**
 * Camera abbreviations for Perseverance rover
 */
export const PERSEVERANCE_CAMERAS = [
  'EDL_RUCAM',
  'EDL_RDCAM',
  'EDL_DDCAM',
  'EDL_PUCAM1',
  'EDL_PUCAM2',
  'NAVCAM_LEFT',
  'NAVCAM_RIGHT',
  'MCZ_RIGHT',
  'MCZ_LEFT',
  'FRONT_HAZCAM_LEFT_A',
  'FRONT_HAZCAM_RIGHT_A',
  'REAR_HAZCAM_LEFT',
  'REAR_HAZCAM_RIGHT',
  'SKYCAM',
  'SHERLOC_WATSON',
] as const

/**
 * All camera abbreviations across all rovers
 */
export const ALL_CAMERAS = [
  ...CURIOSITY_CAMERAS,
  ...OPPORTUNITY_SPIRIT_CAMERAS,
  ...PERSEVERANCE_CAMERAS,
] as const

export type CuriosityCamera = typeof CURIOSITY_CAMERAS[number]
export type OpportunitySpiritCamera = typeof OPPORTUNITY_SPIRIT_CAMERAS[number]
export type PerseveranceCamera = typeof PERSEVERANCE_CAMERAS[number]
export type CameraName = typeof ALL_CAMERAS[number]

/**
 * Map of rover names to their valid camera abbreviations
 */
export const ROVER_CAMERAS: Record<RoverName, readonly CameraName[]> = {
  curiosity: CURIOSITY_CAMERAS,
  opportunity: OPPORTUNITY_SPIRIT_CAMERAS,
  spirit: OPPORTUNITY_SPIRIT_CAMERAS,
  perseverance: PERSEVERANCE_CAMERAS,
}

/**
 * Full camera names for common cameras
 */
export const CAMERA_FULL_NAMES: Record<string, string> = {
  FHAZ: 'Front Hazard Avoidance Camera',
  RHAZ: 'Rear Hazard Avoidance Camera',
  MAST: 'Mast Camera',
  CHEMCAM: 'Chemistry and Camera Complex',
  MAHLI: 'Mars Hand Lens Imager',
  MARDI: 'Mars Descent Imager',
  NAVCAM: 'Navigation Camera',
  PANCAM: 'Panoramic Camera',
  MINITES: 'Miniature Thermal Emission Spectrometer',
}

/**
 * Rover metadata from API
 */
export interface Rover {
  readonly id: number
  readonly name: RoverName
  readonly landingDate?: string
  readonly landing_date?: string
  readonly launchDate?: string
  readonly launch_date?: string
  readonly status: RoverStatus
}

/**
 * Camera metadata from API
 */
export interface Camera {
  readonly id: number
  readonly name: CameraName
  readonly roverId?: number
  readonly rover_id?: number
  readonly fullName?: string
  readonly full_name?: string
}
