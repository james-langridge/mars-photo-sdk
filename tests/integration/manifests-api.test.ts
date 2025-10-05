import { describe, it, expect, vi } from "vitest";
import { ManifestsApi } from "../../src/api";
import { HttpClient } from "../../src/client";
import { ValidationError } from "../../src";

describe("ManifestsApi integration", () => {
  const mockFetch = vi.fn();
  const httpClient = new HttpClient({
    apiKey: "test-key",
    baseUrl: "https://api.nasa.gov/mars-photos/api/v1",
    fetch: mockFetch as unknown as typeof fetch,
  });
  const manifestsApi = new ManifestsApi(
    httpClient,
    "https://api.nasa.gov/mars-photos/api/v1",
    "test-key",
  );

  const mockManifestResponse = {
    photo_manifest: {
      name: "curiosity",
      landing_date: "2012-08-06",
      launch_date: "2011-11-26",
      status: "active",
      max_sol: 4000,
      max_date: "2024-01-15",
      total_photos: 500000,
      photos: [
        {
          sol: 0,
          earth_date: "2012-08-06",
          total_photos: 100,
          cameras: ["NAVCAM", "FHAZ"],
        },
        {
          sol: 1,
          earth_date: "2012-08-07",
          total_photos: 150,
          cameras: ["NAVCAM", "FHAZ", "MAST"],
        },
      ],
    },
  };

  describe("get", () => {
    it("fetches manifest for rover", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockManifestResponse,
      });

      const manifest = await manifestsApi.get("curiosity");

      expect(manifest.name).toBe("curiosity");
      expect(manifest.photos).toHaveLength(2);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/manifests/curiosity"),
      );
    });

    it("transforms snake_case to camelCase", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockManifestResponse,
      });

      const manifest = await manifestsApi.get("curiosity");

      expect(manifest.landingDate).toBe("2012-08-06");
      expect(manifest.launchDate).toBe("2011-11-26");
      expect(manifest.maxSol).toBe(4000);
      expect(manifest.maxDate).toBe("2024-01-15");
      expect(manifest.totalPhotos).toBe(500000);
      expect(manifest.photos[0].earthDate).toBe("2012-08-06");
      expect(manifest.photos[0].totalPhotos).toBe(100);
    });

    it("includes API key in request", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockManifestResponse,
      });

      await manifestsApi.get("curiosity");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("api_key=test-key"),
      );
    });

    it("throws ValidationError for invalid rover", async () => {
      await expect(manifestsApi.get("invalid")).rejects.toThrow(
        ValidationError,
      );
    });

    it("normalizes rover name case", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockManifestResponse,
      });

      await manifestsApi.get("CURIOSITY");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/manifests/curiosity"),
      );
    });
  });
});
