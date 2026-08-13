import { describe, it, expect } from "vitest";
import {
  formatTimeMsToHMS,
  formatDifferenceTimeMsToHMS,
} from "@/utils/formatTime";

describe("formatTime utilities", () => {
  describe("formatTimeMsToHMS", () => {
    it("should format 0 milliseconds to 00:00:00", () => {
      expect(formatTimeMsToHMS(0)).toBe("00:00:00");
    });

    it("should format milliseconds to seconds only", () => {
      expect(formatTimeMsToHMS(5000)).toBe("00:00:05");
      expect(formatTimeMsToHMS(45000)).toBe("00:00:45");
    });

    it("should format milliseconds to minutes and seconds", () => {
      expect(formatTimeMsToHMS(60000)).toBe("00:01:00");
      expect(formatTimeMsToHMS(90000)).toBe("00:01:30");
      expect(formatTimeMsToHMS(600000)).toBe("00:10:00");
    });

    it("should format milliseconds to hours, minutes and seconds", () => {
      expect(formatTimeMsToHMS(3600000)).toBe("01:00:00");
      expect(formatTimeMsToHMS(3661000)).toBe("01:01:01");
      expect(formatTimeMsToHMS(7322000)).toBe("02:02:02");
    });

    it("should pad single digits with leading zeros", () => {
      expect(formatTimeMsToHMS(1000)).toBe("00:00:01");
      expect(formatTimeMsToHMS(61000)).toBe("00:01:01");
      expect(formatTimeMsToHMS(3661000)).toBe("01:01:01");
    });

    it("should handle large time values", () => {
      // 10 hours, 30 minutes, 45 seconds
      const time = 10 * 3600000 + 30 * 60000 + 45 * 1000;
      expect(formatTimeMsToHMS(time)).toBe("10:30:45");
    });

    it("should truncate decimal seconds", () => {
      expect(formatTimeMsToHMS(1500)).toBe("00:00:01");
      expect(formatTimeMsToHMS(1900)).toBe("00:00:01");
    });
  });

  describe("formatDifferenceTimeMsToHMS", () => {
    it("should format time difference of 0 seconds", () => {
      const date = new Date("2026-08-13T12:00:00");
      expect(formatDifferenceTimeMsToHMS(date, date)).toBe("00:00:00");
    });

    it("should format time difference of seconds only", () => {
      const startTime = new Date("2026-08-13T12:00:00");
      const endTime = new Date("2026-08-13T12:00:05");
      expect(formatDifferenceTimeMsToHMS(endTime, startTime)).toBe("00:00:05");
    });

    it("should format time difference of minutes and seconds", () => {
      const startTime = new Date("2026-08-13T12:00:00");
      const endTime = new Date("2026-08-13T12:01:30");
      expect(formatDifferenceTimeMsToHMS(endTime, startTime)).toBe("00:01:30");
    });

    it("should format time difference of hours, minutes and seconds", () => {
      const startTime = new Date("2026-08-13T12:00:00");
      const endTime = new Date("2026-08-13T13:15:45");
      expect(formatDifferenceTimeMsToHMS(endTime, startTime)).toBe("01:15:45");
    });

    it("should handle time difference across days", () => {
      const startTime = new Date("2026-08-13T10:00:00");
      const endTime = new Date("2026-08-14T12:30:15");
      // 26 hours, 30 minutes, 15 seconds
      expect(formatDifferenceTimeMsToHMS(endTime, startTime)).toBe("26:30:15");
    });

    it("should throw error when end time is before start time (negative difference)", () => {
      const startTime = new Date("2026-08-13T13:00:00");
      const endTime = new Date("2026-08-13T12:00:00");
      // Negative difference, but Math.floor will handle this
      expect(() => formatDifferenceTimeMsToHMS(endTime, startTime)).toThrow("Time values cannot be negative");
    });
  });
});
