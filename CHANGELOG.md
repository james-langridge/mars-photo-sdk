# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [1.2.0] - 2025-10-06

### Added

- Optional API key configuration - defaults to NASA's DEMO_KEY for instant usage
- Zero-config quick start support for testing and development
- Documentation for Heroku community mirror (CORS-enabled alternative)
- Rate limit information in README (50/hour for DEMO_KEY, 1000/hour for personal keys)

### Changed

- Made `apiKey` parameter optional in `ClientConfig` interface
- Updated `MarsPhotosClient` constructor to accept optional config
- Enhanced README with clearer quick start examples
- Improved API key documentation with usage recommendations

### Technical

- Added `DEFAULT_API_KEY` constant
- Updated `normalizeConfig()` to provide DEMO_KEY as default
- Added comprehensive tests for zero-config scenarios
- Updated all JSDoc comments to reflect optional API key

## [1.1.0] - 2025-10-05

### Added

- Comprehensive test suite with 92 tests (unit and integration)
- GitHub Actions CI workflow for automated testing
- Test coverage for all API endpoints, validators, and utilities
- Integration tests for Photos API, Manifests API, and main client

### Changed

- Removed test requirement from `prepublishOnly` script
- Improved package reliability with automated testing

## [1.0.0] - 2025-10-04

### Added

- Initial release of TypeScript SDK for NASA Mars Rover Photos API
- Type-safe client for fetching Mars rover photos
- Support for all four rovers: Curiosity, Perseverance, Opportunity, Spirit
- Photos API: get photos by date (sol or earth date), get latest photos
- Manifests API: get mission manifests with photo inventory
- Comprehensive TypeScript type definitions
- Custom error types: `ApiError`, `NetworkError`, `ParseError`, `ValidationError`, `ConfigurationError`
- Pure function validators with `Result<T>` type
- Framework-agnostic design (Node.js, browsers, edge runtimes)
- Zero runtime dependencies
- Dual ESM/CommonJS support
- Full documentation with usage examples

### Features

- Camera filtering support for all rover-specific cameras
- Pagination support for large photo sets
- Date validation (sol numbers and earth dates in YYYY-MM-DD format)
- Rover name validation (case-insensitive)
- Custom fetch implementation support for testing
- Custom base URL support for alternative endpoints

[Unreleased]: https://github.com/james-langridge/mars-photo-sdk/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/james-langridge/mars-photo-sdk/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/james-langridge/mars-photo-sdk/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/james-langridge/mars-photo-sdk/releases/tag/v1.0.0
