import { describe, it, expect } from "vitest";
import {
  validateRoverName,
  validateCameraName,
  validateCamera,
  validateDate,
  validatePage,
} from "../../src";

describe("validators", () => {
  describe("validateRoverName", () => {
    it("accepts valid rover names", () => {
      const result1 = validateRoverName("curiosity");
      expect(result1.success).toBe(true);
      if (result1.success) {
        expect(result1.value).toBe("curiosity");
      }

      const result2 = validateRoverName("Curiosity");
      expect(result2.success).toBe(true);
      if (result2.success) {
        expect(result2.value).toBe("curiosity");
      }

      const result3 = validateRoverName("PERSEVERANCE");
      expect(result3.success).toBe(true);
      if (result3.success) {
        expect(result3.value).toBe("perseverance");
      }
    });

    it("rejects invalid rover names", () => {
      const result1 = validateRoverName("invalid");
      expect(result1.success).toBe(false);
      if (!result1.success) {
        expect(result1.error).toContain("Invalid rover name");
      }

      const result2 = validateRoverName("");
      expect(result2.success).toBe(false);
    });

    it("normalizes to lowercase", () => {
      const rovers = ["Curiosity", "OPPORTUNITY", "PeRsEvErAnCe", "spirit"];
      rovers.forEach((rover) => {
        const result = validateRoverName(rover);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.value).toBe(rover.toLowerCase());
        }
      });
    });
  });

  describe("validateCameraName", () => {
    it("accepts valid cameras for curiosity", () => {
      const cameras = [
        "NAVCAM",
        "FHAZ",
        "RHAZ",
        "MAST",
        "CHEMCAM",
        "MAHLI",
        "MARDI",
      ];
      cameras.forEach((camera) => {
        const result = validateCameraName(camera, "curiosity");
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.value).toBe(camera);
        }
      });
    });

    it("accepts valid cameras for perseverance", () => {
      const cameras = ["NAVCAM_LEFT", "MCZ_RIGHT", "FRONT_HAZCAM_LEFT_A"];
      cameras.forEach((camera) => {
        const result = validateCameraName(camera, "perseverance");
        expect(result.success).toBe(true);
      });
    });

    it("rejects invalid cameras for rover", () => {
      // PANCAM is not valid for Curiosity
      const result = validateCameraName("PANCAM", "curiosity");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid camera");
      }
    });

    it("normalizes to uppercase", () => {
      const result = validateCameraName("navcam", "curiosity");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toBe("NAVCAM");
      }
    });
  });

  describe("validateCamera", () => {
    it("accepts any valid camera abbreviation", () => {
      const cameras = ["NAVCAM", "FHAZ", "PANCAM", "MCZ_LEFT"];
      cameras.forEach((camera) => {
        const result = validateCamera(camera);
        expect(result.success).toBe(true);
      });
    });

    it("rejects invalid camera abbreviations", () => {
      const result = validateCamera("INVALID");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid camera name");
      }
    });
  });

  describe("validateDate", () => {
    it("accepts valid sol dates", () => {
      const result1 = validateDate("0");
      expect(result1.success).toBe(true);
      if (result1.success) {
        expect(result1.value).toBe("0");
      }

      const result2 = validateDate("1000");
      expect(result2.success).toBe(true);
      if (result2.success) {
        expect(result2.value).toBe("1000");
      }
    });

    it("accepts valid earth dates", () => {
      const result = validateDate("2024-01-15");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toBe("2024-01-15");
      }
    });

    it("rejects negative sol dates", () => {
      const result = validateDate("-1");
      expect(result.success).toBe(false);
    });

    it("rejects invalid date formats", () => {
      const result1 = validateDate("2024/01/15");
      expect(result1.success).toBe(false);

      const result2 = validateDate("abc");
      expect(result2.success).toBe(false);

      const result3 = validateDate("");
      expect(result3.success).toBe(false);
    });
  });

  describe("validatePage", () => {
    it("accepts valid page numbers", () => {
      const result1 = validatePage(1);
      expect(result1.success).toBe(true);

      const result2 = validatePage(100);
      expect(result2.success).toBe(true);
    });

    it("rejects zero and negative numbers", () => {
      const result1 = validatePage(0);
      expect(result1.success).toBe(false);

      const result2 = validatePage(-1);
      expect(result2.success).toBe(false);
    });

    it("rejects non-integers", () => {
      const result1 = validatePage(1.5);
      expect(result1.success).toBe(false);

      const result2 = validatePage(NaN);
      expect(result2.success).toBe(false);
    });
  });
});
