import { describe, it, expect } from 'vitest'
import {
  MarsPhotosError,
  ApiError,
  ParseError,
  NetworkError,
  ValidationError,
  ConfigurationError,
} from '../../src/client/errors'

describe('error classes', () => {
  describe('MarsPhotosError', () => {
    it('creates base error with message', () => {
      const error = new MarsPhotosError('Base error')

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(MarsPhotosError)
      expect(error.message).toBe('Base error')
      expect(error.name).toBe('MarsPhotosError')
    })
  })

  describe('ApiError', () => {
    it('creates error with status and statusText', () => {
      const error = new ApiError('Not found', 404, 'Not Found')

      expect(error).toBeInstanceOf(MarsPhotosError)
      expect(error).toBeInstanceOf(ApiError)
      expect(error.message).toBe('Not found')
      expect(error.status).toBe(404)
      expect(error.statusText).toBe('Not Found')
      expect(error.name).toBe('ApiError')
    })

    it('handles different HTTP status codes', () => {
      const error400 = new ApiError('Bad request', 400, 'Bad Request')
      const error500 = new ApiError('Server error', 500, 'Internal Server Error')

      expect(error400.status).toBe(400)
      expect(error500.status).toBe(500)
    })
  })

  describe('ParseError', () => {
    it('creates error with message', () => {
      const error = new ParseError('Failed to parse JSON')

      expect(error).toBeInstanceOf(MarsPhotosError)
      expect(error).toBeInstanceOf(ParseError)
      expect(error.message).toBe('Failed to parse JSON')
      expect(error.name).toBe('ParseError')
    })

    it('includes cause when provided', () => {
      const cause = new SyntaxError('Unexpected token')
      const error = new ParseError('Parse failed', cause)

      expect(error.cause).toBe(cause)
    })
  })

  describe('NetworkError', () => {
    it('creates error with message', () => {
      const error = new NetworkError('Connection failed')

      expect(error).toBeInstanceOf(MarsPhotosError)
      expect(error).toBeInstanceOf(NetworkError)
      expect(error.message).toBe('Connection failed')
      expect(error.name).toBe('NetworkError')
    })

    it('includes cause when provided', () => {
      const cause = new TypeError('fetch failed')
      const error = new NetworkError('Network request failed', cause)

      expect(error.cause).toBe(cause)
    })
  })

  describe('ValidationError', () => {
    it('creates error with message', () => {
      const error = new ValidationError('Invalid rover name')

      expect(error).toBeInstanceOf(MarsPhotosError)
      expect(error).toBeInstanceOf(ValidationError)
      expect(error.message).toBe('Invalid rover name')
      expect(error.name).toBe('ValidationError')
    })
  })

  describe('ConfigurationError', () => {
    it('creates error with message', () => {
      const error = new ConfigurationError('API key required')

      expect(error).toBeInstanceOf(MarsPhotosError)
      expect(error).toBeInstanceOf(ConfigurationError)
      expect(error.message).toBe('API key required')
      expect(error.name).toBe('ConfigurationError')
    })
  })

  describe('error instanceof checks', () => {
    it('allows checking specific error types', () => {
      const apiError = new ApiError('test', 404, 'Not Found')
      const validationError = new ValidationError('test')

      expect(apiError instanceof ApiError).toBe(true)
      expect(apiError instanceof MarsPhotosError).toBe(true)
      expect(apiError instanceof ValidationError).toBe(false)

      expect(validationError instanceof ValidationError).toBe(true)
      expect(validationError instanceof MarsPhotosError).toBe(true)
      expect(validationError instanceof ApiError).toBe(false)
    })
  })
})
