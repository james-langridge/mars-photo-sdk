import { describe, it, expect, vi } from "vitest";
import { PhotosApi } from "../../src/api";
import { HttpClient } from "../../src/client";
import { ValidationError } from "../../src";

describe("PhotosApi integration", () => {
  const mockFetch = vi.fn();
  const httpClient = new HttpClient({
    apiKey: "test-key",
    baseUrl: "https://api.nasa.gov/mars-photos/api/v1",
    fetch: mockFetch as unknown as typeof fetch,
  });
  const photosApi = new PhotosApi(
    httpClient,
    "https://api.nasa.gov/mars-photos/api/v1",
    "test-key",
  );

  const mockPhotoResponse = {
    photos: [
      {
        id: 123,
        sol: 1000,
        camera: {
          id: 1,
          name: "NAVCAM",
          rover_id: 5,
          full_name: "Navigation Camera",
        },
        img_src: "https://mars.nasa.gov/photo.jpg",
        earth_date: "2024-01-15",
        rover: {
          id: 5,
          name: "curiosity",
          landing_date: "2012-08-06",
          launch_date: "2011-11-26",
          status: "active",
        },
      },
    ],
  };

  describe("get", () => {
    it("fetches photos by sol date", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotoResponse,
      });

      const photos = await photosApi.get({
        rover: "curiosity",
        date: "1000",
      });

      expect(photos).toHaveLength(1);
      expect(photos[0].id).toBe(123);
      expect(photos[0].sol).toBe(1000);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("sol=1000"),
      );
    });

    it("fetches photos by earth date", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotoResponse,
      });

      const photos = await photosApi.get({
        rover: "curiosity",
        date: "2024-01-15",
      });

      expect(photos).toHaveLength(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("earth_date=2024-01-15"),
      );
    });

    it("includes camera parameter", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotoResponse,
      });

      await photosApi.get({
        rover: "curiosity",
        date: "1000",
        camera: "NAVCAM",
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("camera=NAVCAM"),
      );
    });

    it("includes page parameter", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotoResponse,
      });

      await photosApi.get({
        rover: "curiosity",
        date: "1000",
        page: 2,
      });

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("page=2"));
    });

    it("transforms snake_case to camelCase", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotoResponse,
      });

      const photos = await photosApi.get({
        rover: "curiosity",
        date: "1000",
      });

      expect(photos[0].imgSrc).toBe("https://mars.nasa.gov/photo.jpg");
      expect(photos[0].earthDate).toBe("2024-01-15");
      expect(photos[0].camera.roverId).toBe(5);
      expect(photos[0].camera.fullName).toBe("Navigation Camera");
      expect(photos[0].rover.landingDate).toBe("2012-08-06");
    });

    it("throws ValidationError for invalid rover", async () => {
      await expect(
        photosApi.get({
          rover: "invalid",
          date: "1000",
        }),
      ).rejects.toThrow(ValidationError);
    });

    it("throws ValidationError for invalid date", async () => {
      await expect(
        photosApi.get({
          rover: "curiosity",
          date: "invalid",
        }),
      ).rejects.toThrow(ValidationError);
    });

    it("throws ValidationError for invalid camera", async () => {
      await expect(
        photosApi.get({
          rover: "curiosity",
          date: "1000",
          camera: "PANCAM", // Not valid for Curiosity
        }),
      ).rejects.toThrow(ValidationError);
    });
  });

  describe("getLatest", () => {
    it("fetches latest photos", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ latest_photos: mockPhotoResponse.photos }),
      });

      const photos = await photosApi.getLatest("curiosity");

      expect(photos).toHaveLength(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/rovers/curiosity/latest_photos"),
      );
    });

    it("throws ValidationError for invalid rover", async () => {
      await expect(photosApi.getLatest("invalid")).rejects.toThrow(
        ValidationError,
      );
    });
  });
});
