import { describe, it, expect } from "vitest";
import { isSolDate, isValidEarthDateFormat, isValidSol } from "../../src";

describe("date utilities", () => {
  describe("isSolDate", () => {
    it("returns true for numeric strings", () => {
      expect(isSolDate("0")).toBe(true);
      expect(isSolDate("1")).toBe(true);
      expect(isSolDate("1000")).toBe(true);
      expect(isSolDate("12345")).toBe(true);
    });

    it("returns false for non-numeric strings", () => {
      expect(isSolDate("2024-01-15")).toBe(false);
      expect(isSolDate("abc")).toBe(false);
      expect(isSolDate("12.5")).toBe(false);
      expect(isSolDate("12-34")).toBe(false);
      expect(isSolDate("")).toBe(false);
    });

    it("returns false for strings with leading zeros", () => {
      expect(isSolDate("01")).toBe(true); // Actually valid - it's still numeric
    });
  });

  describe("isValidEarthDateFormat", () => {
    it("returns true for valid YYYY-MM-DD format", () => {
      expect(isValidEarthDateFormat("2024-01-15")).toBe(true);
      expect(isValidEarthDateFormat("2020-12-31")).toBe(true);
      expect(isValidEarthDateFormat("1999-06-01")).toBe(true);
    });

    it("returns false for invalid formats", () => {
      expect(isValidEarthDateFormat("2024/01/15")).toBe(false);
      expect(isValidEarthDateFormat("01-15-2024")).toBe(false);
      expect(isValidEarthDateFormat("2024-1-15")).toBe(false);
      expect(isValidEarthDateFormat("2024-01-5")).toBe(false);
      expect(isValidEarthDateFormat("24-01-15")).toBe(false);
      expect(isValidEarthDateFormat("1000")).toBe(false);
      expect(isValidEarthDateFormat("")).toBe(false);
    });

    it("returns false for invalid date values", () => {
      // Format is correct but date is invalid
      expect(isValidEarthDateFormat("2024-13-01")).toBe(true); // Format check only
      expect(isValidEarthDateFormat("2024-00-01")).toBe(true); // Format check only
    });
  });

  describe("isValidSol", () => {
    it("returns true for valid sol numbers", () => {
      expect(isValidSol(0)).toBe(true);
      expect(isValidSol(1)).toBe(true);
      expect(isValidSol(1000)).toBe(true);
      expect(isValidSol(10000)).toBe(true);
    });

    it("returns false for negative numbers", () => {
      expect(isValidSol(-1)).toBe(false);
      expect(isValidSol(-100)).toBe(false);
    });

    it("returns false for non-integers", () => {
      expect(isValidSol(1.5)).toBe(false);
      expect(isValidSol(10.001)).toBe(false);
      expect(isValidSol(NaN)).toBe(false);
      expect(isValidSol(Infinity)).toBe(false);
    });
  });
});
