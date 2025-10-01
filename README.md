# NASA Mars Rover Photos SDK

Type-safe TypeScript client for NASA's Mars Rover Photos API.

## Features

- **Type-safe** - Full TypeScript support with comprehensive type definitions
- **Simple API** - Clean, intuitive interface following functional design principles
- **Framework-agnostic** - Works in Node.js, Deno, browsers, and edge runtimes
- **Error handling** - Custom error types for different failure scenarios
- **Tree-shakeable** - Only bundle what you use
- **Well-tested** - Comprehensive unit and integration tests
- **Zero dependencies** - Minimal footprint (dev dependencies only)

## Installation

```bash
npm install mars-photo-sdk
```

## Quick Start

```typescript
import { MarsPhotosClient } from 'mars-photo-sdk'

const client = new MarsPhotosClient({
  apiKey: 'YOUR_NASA_API_KEY'
})

// Get photos by earth date
const photos = await client.photos.get({
  rover: 'curiosity',
  date: '2024-01-15',
  camera: 'NAVCAM'
})

console.log(`Found ${photos.length} photos`)
```

## Getting an API Key

Get your free NASA API key at [https://api.nasa.gov/#signUp](https://api.nasa.gov/#signUp)

## API Reference

### Client Configuration

```typescript
const client = new MarsPhotosClient({
  apiKey: 'YOUR_NASA_API_KEY',           // Required
  baseUrl: 'https://api.nasa.gov/...',   // Optional, custom API URL
  fetch: customFetch                      // Optional, custom fetch implementation
})
```

### Photos API

#### Get Photos

Fetch photos by rover, date, and optionally camera. Date can be either a sol number (Martian day) or an Earth date.

```typescript
// By Earth date
const photos = await client.photos.get({
  rover: 'curiosity',
  date: '2024-01-15',
  camera: 'NAVCAM',  // Optional
  page: 1            // Optional, default 1
})

// By sol (Martian day)
const photos = await client.photos.get({
  rover: 'perseverance',
  date: '1000',  // Sol 1000
  camera: 'MCZ_RIGHT'
})
```

**Parameters:**
- `rover` (string, required) - Rover name (case-insensitive): `'curiosity'`, `'opportunity'`, `'perseverance'`, or `'spirit'`
- `date` (string, required) - Either sol number (e.g., `'1000'`) or earth date in `YYYY-MM-DD` format
- `camera` (string, optional) - Camera abbreviation (rover-specific, see below)
- `page` (number, optional) - Page number for pagination (default: 1)

**Returns:** `Promise<Photo[]>`

#### Get Latest Photos

Fetch the most recent photos from a rover.

```typescript
const photos = await client.photos.getLatest('curiosity')
```

**Parameters:**
- `rover` (string, required) - Rover name (case-insensitive)

**Returns:** `Promise<Photo[]>`

### Manifests API

#### Get Mission Manifest

Fetch complete mission manifest including metadata and photo inventory.

```typescript
const manifest = await client.manifests.get('curiosity')

console.log(`Mission: ${manifest.name}`)
console.log(`Status: ${manifest.status}`)
console.log(`Total photos: ${manifest.totalPhotos}`)
console.log(`Latest sol: ${manifest.maxSol}`)

// Iterate through photo counts by sol
manifest.photos.forEach(entry => {
  console.log(`Sol ${entry.sol}: ${entry.totalPhotos} photos`)
})
```

**Parameters:**
- `rover` (string, required) - Rover name (case-insensitive)

**Returns:** `Promise<Manifest>`

## Rovers and Cameras

### Available Rovers

- **Curiosity** - Active (landed 2012-08-06)
- **Perseverance** - Active (landed 2021-02-18)
- **Opportunity** - Complete (landed 2004-01-25, mission ended 2019)
- **Spirit** - Complete (landed 2004-01-04, mission ended 2010)

### Camera Abbreviations

**Curiosity:**
- `FHAZ` - Front Hazard Avoidance Camera
- `RHAZ` - Rear Hazard Avoidance Camera
- `MAST` - Mast Camera
- `CHEMCAM` - Chemistry and Camera Complex
- `MAHLI` - Mars Hand Lens Imager
- `MARDI` - Mars Descent Imager
- `NAVCAM` - Navigation Camera

**Opportunity & Spirit:**
- `FHAZ` - Front Hazard Avoidance Camera
- `RHAZ` - Rear Hazard Avoidance Camera
- `NAVCAM` - Navigation Camera
- `PANCAM` - Panoramic Camera
- `MINITES` - Miniature Thermal Emission Spectrometer

**Perseverance:**
- `EDL_RUCAM` - Rover Up-Look Camera
- `EDL_RDCAM` - Rover Down-Look Camera
- `EDL_DDCAM` - Descent Stage Down-Look Camera
- `EDL_PUCAM1` - Parachute Up-Look Camera A
- `EDL_PUCAM2` - Parachute Up-Look Camera B
- `NAVCAM_LEFT` - Navigation Camera - Left
- `NAVCAM_RIGHT` - Navigation Camera - Right
- `MCZ_RIGHT` - Mast Camera Zoom - Right
- `MCZ_LEFT` - Mast Camera Zoom - Left
- `FRONT_HAZCAM_LEFT_A` - Front Hazard Avoidance Camera - Left
- `FRONT_HAZCAM_RIGHT_A` - Front Hazard Avoidance Camera - Right
- `REAR_HAZCAM_LEFT` - Rear Hazard Avoidance Camera - Left
- `REAR_HAZCAM_RIGHT` - Rear Hazard Avoidance Camera - Right
- `SKYCAM` - MEDA Skycam
- `SHERLOC_WATSON` - SHERLOC WATSON Camera

## Error Handling

The SDK provides custom error types for different failure scenarios:

```typescript
import {
  MarsPhotosClient,
  ValidationError,
  ApiError,
  NetworkError,
  ConfigurationError
} from 'mars-photo-sdk'

try {
  const photos = await client.photos.get({
    rover: 'curiosity',
    date: '2024-01-15'
  })
} catch (error) {
  if (error instanceof ValidationError) {
    // Invalid input parameters
    console.error('Validation error:', error.message)
  } else if (error instanceof ApiError) {
    // API returned error status
    console.error('API error:', error.status, error.message)
  } else if (error instanceof NetworkError) {
    // Network request failed
    console.error('Network error:', error.message)
  } else if (error instanceof ConfigurationError) {
    // Client misconfigured
    console.error('Config error:', error.message)
  }
}
```

## Type Definitions

The SDK exports comprehensive TypeScript types:

```typescript
import type {
  Photo,
  Manifest,
  ManifestPhoto,
  RoverName,
  CameraName,
  ClientConfig
} from 'mars-photo-sdk'
```

## Advanced Usage

### Custom Fetch Implementation

Provide a custom fetch implementation for testing or special requirements:

```typescript
const client = new MarsPhotosClient({
  apiKey: 'YOUR_NASA_API_KEY',
  fetch: customFetch
})
```

### Validation Utilities

The SDK exports validation utilities for advanced use:

```typescript
import {
  validateRoverName,
  validateCameraName,
  validateDate,
  isSolDate
} from '@jamesrwilliams/mars-photos-sdk'

const result = validateRoverName('curiosity')
if (result.success) {
  console.log('Valid rover:', result.value)
} else {
  console.error('Error:', result.error)
}

// Check if a date string is a sol number
if (isSolDate('1000')) {
  console.log('This is a sol date')
}
```

### Constants

Access rover and camera constants:

```typescript
import {
  ROVER_NAMES,
  CURIOSITY_CAMERAS,
  ROVER_CAMERAS
} from '@jamesrwilliams/mars-photos-sdk'

console.log('Available rovers:', ROVER_NAMES)
console.log('Curiosity cameras:', CURIOSITY_CAMERAS)
console.log('Valid cameras for Curiosity:', ROVER_CAMERAS.curiosity)
```

## Design Philosophy

This SDK follows functional programming principles:

- **Pure functions** - Calculations have no side effects
- **Immutable data** - All types use readonly properties
- **Separation of concerns** - Clear distinction between calculations and actions
- **Deep modules** - Simple public API hiding complex implementation
- **Explicit errors** - Result types for pure functions, exceptions for I/O failures

## Contributing

Contributions welcome! Please open an issue or PR on GitHub.

## License

MIT

## Links

- [GitHub Repository](https://github.com/jameslangridge/mars-photos-sdk)
- [NASA Mars Rover Photos API](https://api.nasa.gov/#mars-rover-photos)
- [Mars Photos API GitHub](https://github.com/corincerami/mars-photo-api)
