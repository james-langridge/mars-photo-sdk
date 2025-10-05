import type { CameraName, RoverName } from "../types";
import { ALL_CAMERAS, ROVER_CAMERAS, ROVER_NAMES } from "../types";
import type { Result } from "./result";
import { failure, success } from "./result";
import { isValidEarthDateFormat, isSolDate } from "./date";

/**
 * Validate and normalize rover name
 *
 * Pure function that checks if a rover name is valid and returns
 * the normalized lowercase version.
 *
 * @param name - Rover name to validate (case-insensitive)
 * @returns Result containing validated rover name or error
 *
 * @example
 * validateRoverName("Curiosity") // success("curiosity")
 * validateRoverName("invalid") // failure("...")
 */
export function validateRoverName(name: string): Result<RoverName> {
  const normalized = name.toLowerCase() as RoverName;

  if (ROVER_NAMES.includes(normalized)) {
    return success(normalized);
  }

  return failure(
    `Invalid rover name: "${name}". Valid rovers: ${ROVER_NAMES.join(", ")}`,
  );
}

/**
 * Validate camera name for a specific rover
 *
 * Pure function that checks if a camera is valid for the given rover.
 *
 * @param camera - Camera abbreviation to validate (case-insensitive)
 * @param rover - Rover name to validate camera against
 * @returns Result containing validated camera name or error
 *
 * @example
 * validateCameraName("NAVCAM", "curiosity") // success("NAVCAM")
 * validateCameraName("PANCAM", "curiosity") // failure("...")
 */
export function validateCameraName(
  camera: string,
  rover: RoverName,
): Result<CameraName> {
  const normalized = camera.toUpperCase() as CameraName;
  const validCameras = ROVER_CAMERAS[rover];

  if (validCameras.includes(normalized)) {
    return success(normalized);
  }

  return failure(
    `Invalid camera "${camera}" for rover "${rover}". Valid cameras: ${validCameras.join(", ")}`,
  );
}

/**
 * Validate camera name without rover context
 *
 * Pure function that checks if a camera name is valid for any rover.
 *
 * @param camera - Camera abbreviation to validate
 * @returns Result containing validated camera name or error
 */
export function validateCamera(camera: string): Result<CameraName> {
  const normalized = camera.toUpperCase() as CameraName;

  if (ALL_CAMERAS.includes(normalized)) {
    return success(normalized);
  }

  return failure(`Invalid camera name: "${camera}"`);
}

/**
 * Validate date parameter (sol or earth date)
 *
 * Pure function that validates date is either a valid sol number
 * or a valid earth date format.
 *
 * @param date - Date string to validate
 * @returns Result containing validated date or error
 *
 * @example
 * validateDate("1000") // success("1000")
 * validateDate("2024-01-15") // success("2024-01-15")
 * validateDate("invalid") // failure("...")
 */
export function validateDate(date: string): Result<string> {
  if (isSolDate(date)) {
    const sol = parseInt(date, 10);
    if (sol >= 0) {
      return success(date);
    }
    return failure("Sol date must be a non-negative integer");
  }

  if (isValidEarthDateFormat(date)) {
    return success(date);
  }

  return failure(
    `Invalid date format: "${date}". Use sol number (e.g., "1000") or earth date (YYYY-MM-DD)`,
  );
}

/**
 * Validate page number
 *
 * Pure function that checks if a page number is valid (positive integer).
 *
 * @param page - Page number to validate
 * @returns Result containing validated page or error
 */
export function validatePage(page: number): Result<number> {
  if (Number.isInteger(page) && page >= 1) {
    return success(page);
  }

  return failure("Page must be a positive integer");
}
