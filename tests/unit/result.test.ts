import { describe, it, expect } from 'vitest'
import { success, failure, isSuccess, isFailure } from '../../src/utils/result'

describe('Result type', () => {
  describe('success', () => {
    it('creates successful result with value', () => {
      const result = success(42)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.value).toBe(42)
      }
    })

    it('works with different types', () => {
      const stringResult = success('hello')
      const objectResult = success({ foo: 'bar' })
      const arrayResult = success([1, 2, 3])

      expect(stringResult.success).toBe(true)
      expect(objectResult.success).toBe(true)
      expect(arrayResult.success).toBe(true)
    })
  })

  describe('failure', () => {
    it('creates failed result with error message', () => {
      const result = failure<number>('Something went wrong')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('Something went wrong')
      }
    })

    it('preserves error message', () => {
      const error = 'Invalid input'
      const result = failure(error)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe(error)
      }
    })
  })

  describe('isSuccess', () => {
    it('returns true for successful results', () => {
      const result = success(123)
      expect(isSuccess(result)).toBe(true)
    })

    it('returns false for failed results', () => {
      const result = failure('error')
      expect(isSuccess(result)).toBe(false)
    })

    it('narrows type correctly', () => {
      const result = success(42)
      if (isSuccess(result)) {
        // TypeScript should know result has value property
        const value: number = result.value
        expect(value).toBe(42)
      }
    })
  })

  describe('isFailure', () => {
    it('returns false for successful results', () => {
      const result = success(123)
      expect(isFailure(result)).toBe(false)
    })

    it('returns true for failed results', () => {
      const result = failure('error')
      expect(isFailure(result)).toBe(true)
    })

    it('narrows type correctly', () => {
      const result = failure<number>('test error')
      if (isFailure(result)) {
        // TypeScript should know result has error property
        const error: string = result.error
        expect(error).toBe('test error')
      }
    })
  })

  describe('type safety', () => {
    it('ensures success and failure are mutually exclusive', () => {
      const successResult = success(10)
      const failureResult = failure<number>('error')

      // Success result has value, not error
      if (successResult.success) {
        expect(successResult.value).toBeDefined()
        // @ts-expect-error - success result should not have error property
        expect(successResult.error).toBeUndefined()
      }

      // Failure result has error, not value
      if (!failureResult.success) {
        expect(failureResult.error).toBeDefined()
        // @ts-expect-error - failure result should not have value property
        expect(failureResult.value).toBeUndefined()
      }
    })
  })
})
