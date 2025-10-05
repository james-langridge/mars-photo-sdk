import { describe, it, expect } from "vitest";
import { normalizeConfig, DEFAULT_BASE_URL } from "../../src/client";
import { ConfigurationError } from "../../src";

describe("config normalization", () => {
  describe("normalizeConfig", () => {
    it("accepts valid configuration", () => {
      const config = normalizeConfig({
        apiKey: "test-key",
      });

      expect(config.apiKey).toBe("test-key");
      expect(config.baseUrl).toBe(DEFAULT_BASE_URL);
      expect(typeof config.fetch).toBe("function");
    });

    it("uses custom baseUrl when provided", () => {
      const customUrl = "https://custom.api.com";
      const config = normalizeConfig({
        apiKey: "test-key",
        baseUrl: customUrl,
      });

      expect(config.baseUrl).toBe(customUrl);
    });

    it("uses custom fetch when provided", () => {
      const customFetch = async () => new Response();
      const config = normalizeConfig({
        apiKey: "test-key",
        fetch: customFetch as typeof fetch,
      });

      expect(config.fetch).toBe(customFetch);
    });

    it("trims whitespace from apiKey", () => {
      const config = normalizeConfig({
        apiKey: "  test-key  ",
      });

      expect(config.apiKey).toBe("test-key");
    });

    it("trims whitespace from baseUrl", () => {
      const config = normalizeConfig({
        apiKey: "test-key",
        baseUrl: "  https://api.com  ",
      });

      expect(config.baseUrl).toBe("https://api.com");
    });

    it("throws ConfigurationError for empty apiKey", () => {
      expect(() => {
        normalizeConfig({
          apiKey: "",
        });
      }).toThrow(ConfigurationError);

      expect(() => {
        normalizeConfig({
          apiKey: "",
        });
      }).toThrow("API key is required");
    });

    it("throws ConfigurationError for whitespace-only apiKey", () => {
      expect(() => {
        normalizeConfig({
          apiKey: "   ",
        });
      }).toThrow(ConfigurationError);
    });

    it("throws ConfigurationError for non-function fetch", () => {
      expect(() => {
        normalizeConfig({
          apiKey: "test-key",
          fetch: "not a function" as unknown as typeof fetch,
        });
      }).toThrow(ConfigurationError);

      expect(() => {
        normalizeConfig({
          apiKey: "test-key",
          fetch: "not a function" as unknown as typeof fetch,
        });
      }).toThrow("fetch must be a function");
    });

    it("uses global fetch by default", () => {
      const config = normalizeConfig({
        apiKey: "test-key",
      });

      expect(config.fetch).toBe(fetch);
    });
  });

  describe("DEFAULT_BASE_URL", () => {
    it("points to NASA API", () => {
      expect(DEFAULT_BASE_URL).toBe("https://api.nasa.gov/mars-photos/api/v1");
    });
  });
});
