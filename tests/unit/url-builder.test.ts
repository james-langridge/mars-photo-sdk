import { describe, it, expect } from 'vitest'
import {
  buildPhotosUrl,
  buildLatestPhotosUrl,
  buildManifestUrl,
} from '../../src/utils/url-builder'

describe('URL builders', () => {
  const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1'
  const apiKey = 'TEST_API_KEY'

  describe('buildPhotosUrl', () => {
    it('builds URL with sol date', () => {
      const url = buildPhotosUrl(baseUrl, {
        rover: 'curiosity',
        date: '1000',
        apiKey,
      })

      expect(url).toContain('/rovers/curiosity/photos')
      expect(url).toContain('sol=1000')
      expect(url).toContain('api_key=TEST_API_KEY')
      expect(url).not.toContain('earth_date')
    })

    it('builds URL with earth date', () => {
      const url = buildPhotosUrl(baseUrl, {
        rover: 'perseverance',
        date: '2024-01-15',
        apiKey,
      })

      expect(url).toContain('/rovers/perseverance/photos')
      expect(url).toContain('earth_date=2024-01-15')
      expect(url).toContain('api_key=TEST_API_KEY')
      expect(url).not.toContain('sol=')
    })

    it('includes camera parameter when provided', () => {
      const url = buildPhotosUrl(baseUrl, {
        rover: 'curiosity',
        date: '1000',
        camera: 'NAVCAM',
        apiKey,
      })

      expect(url).toContain('camera=NAVCAM')
    })

    it('includes page parameter when provided', () => {
      const url = buildPhotosUrl(baseUrl, {
        rover: 'curiosity',
        date: '1000',
        page: 2,
        apiKey,
      })

      expect(url).toContain('page=2')
    })

    it('builds complete URL with all parameters', () => {
      const url = buildPhotosUrl(baseUrl, {
        rover: 'curiosity',
        date: '2024-01-15',
        camera: 'NAVCAM',
        page: 3,
        apiKey,
      })

      expect(url).toContain('/rovers/curiosity/photos')
      expect(url).toContain('earth_date=2024-01-15')
      expect(url).toContain('camera=NAVCAM')
      expect(url).toContain('page=3')
      expect(url).toContain('api_key=TEST_API_KEY')
    })

    it('correctly detects sol vs earth date', () => {
      const solUrl = buildPhotosUrl(baseUrl, {
        rover: 'curiosity',
        date: '0',
        apiKey,
      })
      expect(solUrl).toContain('sol=0')

      const earthUrl = buildPhotosUrl(baseUrl, {
        rover: 'curiosity',
        date: '2024-01-01',
        apiKey,
      })
      expect(earthUrl).toContain('earth_date=2024-01-01')
    })
  })

  describe('buildLatestPhotosUrl', () => {
    it('builds correct URL for latest photos', () => {
      const url = buildLatestPhotosUrl(baseUrl, 'curiosity', apiKey)

      expect(url).toBe(
        `${baseUrl}/rovers/curiosity/latest_photos?api_key=${apiKey}`
      )
    })

    it('works with different rovers', () => {
      const url = buildLatestPhotosUrl(baseUrl, 'perseverance', apiKey)

      expect(url).toContain('/rovers/perseverance/latest_photos')
      expect(url).toContain('api_key=TEST_API_KEY')
    })
  })

  describe('buildManifestUrl', () => {
    it('builds correct URL for manifest', () => {
      const url = buildManifestUrl(baseUrl, 'curiosity', apiKey)

      expect(url).toBe(`${baseUrl}/manifests/curiosity?api_key=${apiKey}`)
    })

    it('works with different rovers', () => {
      const url = buildManifestUrl(baseUrl, 'opportunity', apiKey)

      expect(url).toContain('/manifests/opportunity')
      expect(url).toContain('api_key=TEST_API_KEY')
    })
  })
})
