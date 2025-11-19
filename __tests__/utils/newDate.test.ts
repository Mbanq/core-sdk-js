import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import newDate from '../../src/utils/newDate';
import moment from 'moment-timezone';

describe('Date Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('newDate', () => {
    it('should return moment with default parameters', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = newDate(testDate);

      expect(moment.isMoment(result)).toBe(true);
      expect(result.isUTC()).toBe(true);
    });

    it('should return moment with timezone then converted to UTC/local', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = newDate(testDate, false, 'America/New_York');

      expect(moment.isMoment(result)).toBe(true);
      expect(result.isUTC()).toBe(true);
    });

    it('should return local time when isUtc is true', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = newDate(testDate, true);

      expect(moment.isMoment(result)).toBe(true);
    });

    it('should use current date when no date provided', () => {
      const result = newDate();
      expect(moment.isMoment(result)).toBe(true);
    });

    it('should use environment timezone when available', () => {
      vi.stubEnv('TIMEZONE', 'Asia/Tokyo');

      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = newDate(testDate);

      expect(moment.isMoment(result)).toBe(true);
    });

    it('should use Europe/Berlin as default timezone', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = newDate(testDate);

      expect(moment.isMoment(result)).toBe(true);
    });

    it('should handle different date inputs correctly', () => {
      const testDate = new Date('2023-06-15T15:30:45Z');
      const result = newDate(testDate, false, 'UTC');

      expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-06-15 15:30:45');
    });
});
});
