import { describe, it, expect, vi } from "vitest";
import { MarsPhotosClient, ConfigurationError } from "../../src";

describe("MarsPhotosClient integration", () => {
  describe("constructor", () => {
    it("creates client with valid config", () => {
      const client = new MarsPhotosClient({
        apiKey: "test-key",
      });

      expect(client.photos).toBeDefined();
      expect(client.manifests).toBeDefined();
    });

    it("accepts custom baseUrl", () => {
      const client = new MarsPhotosClient({
        apiKey: "test-key",
        baseUrl: "https://custom.api.com",
      });

      expect(client).toBeDefined();
    });

    it("accepts custom fetch", () => {
      const customFetch = vi.fn();
      const client = new MarsPhotosClient({
        apiKey: "test-key",
        fetch: customFetch as unknown as typeof fetch,
      });

      expect(client).toBeDefined();
    });

    it("throws ConfigurationError for missing apiKey", () => {
      expect(() => {
        new MarsPhotosClient({
          apiKey: "",
        });
      }).toThrow(ConfigurationError);
    });
  });

  describe("photos API", () => {
    it("provides photos.get method", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ photos: [] }),
      });

      const client = new MarsPhotosClient({
        apiKey: "test-key",
        fetch: mockFetch as unknown as typeof fetch,
      });

      const photos = await client.photos.get({
        rover: "curiosity",
        date: "1000",
      });

      expect(Array.isArray(photos)).toBe(true);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("provides photos.getLatest method", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ latest_photos: [] }),
      });

      const client = new MarsPhotosClient({
        apiKey: "test-key",
        fetch: mockFetch as unknown as typeof fetch,
      });

      const photos = await client.photos.getLatest("curiosity");

      expect(Array.isArray(photos)).toBe(true);
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("manifests API", () => {
    it("provides manifests.get method", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          photo_manifest: {
            name: "curiosity",
            landing_date: "2012-08-06",
            launch_date: "2011-11-26",
            status: "active",
            max_sol: 4000,
            max_date: "2024-01-15",
            total_photos: 500000,
            photos: [],
          },
        }),
      });

      const client = new MarsPhotosClient({
        apiKey: "test-key",
        fetch: mockFetch as unknown as typeof fetch,
      });

      const manifest = await client.manifests.get("curiosity");

      expect(manifest.name).toBe("curiosity");
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe("end-to-end flow", () => {
    it("successfully calls photos API with all parameters", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          photos: [
            {
              id: 1,
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
        }),
      });

      const client = new MarsPhotosClient({
        apiKey: "my-api-key",
        fetch: mockFetch as unknown as typeof fetch,
      });

      const photos = await client.photos.get({
        rover: "Curiosity", // Case insensitive
        date: "1000",
        camera: "navcam", // Case insensitive
        page: 2,
      });

      expect(photos).toHaveLength(1);
      expect(photos[0].id).toBe(1);
      expect(photos[0].imgSrc).toBe("https://mars.nasa.gov/photo.jpg");

      // Verify URL was built correctly
      const callUrl = mockFetch.mock.calls[0][0] as string;
      expect(callUrl).toContain("curiosity");
      expect(callUrl).toContain("sol=1000");
      expect(callUrl).toContain("camera=NAVCAM");
      expect(callUrl).toContain("page=2");
      expect(callUrl).toContain("api_key=my-api-key");
    });
  });
});
