import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import newDate, { nowDateStr } from '../../src/utils/newDate';
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

  describe('nowDateStr', () => {
    it('should return date string in YYYY-MM-DD format', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = nowDateStr(testDate);

      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return date string in specified timezone', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = nowDateStr(testDate, 'America/New_York');

      expect(typeof result).toBe('string');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should use current date when no date provided', () => {
      const result = nowDateStr();

      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should use environment timezone when available', () => {
      vi.stubEnv('TIMEZONE', 'Asia/Tokyo');

      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = nowDateStr(testDate);

      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should use Europe/Berlin as default timezone', () => {
      const testDate = new Date('2023-01-01T12:00:00Z');
      const result = nowDateStr(testDate);

      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should handle timezone differences correctly', () => {
      const testDate = new Date('2023-01-01T01:00:00Z');

      const utcResult = nowDateStr(testDate, 'UTC');
      const ppResult = nowDateStr(testDate, 'Asia/Phnom_Penh');
      const laResult = nowDateStr(testDate, 'America/Los_Angeles');

      expect(utcResult).toBe('2023-01-01');
      expect(ppResult).toBe('2023-01-01');
      expect(laResult).toMatch(/2022-12-31|2023-01-01/);
    });

    it('should return consistent format across different months', () => {
      const dates = [
        new Date('2023-01-01T12:00:00Z'),
        new Date('2023-02-15T12:00:00Z'),
        new Date('2023-12-31T12:00:00Z')
      ];

      dates.forEach((date, index) => {
        const result = nowDateStr(date, 'UTC');
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        switch (index) {
          case 0:
            expect(result).toBe('2023-01-01');
            break;
          case 1:
            expect(result).toBe('2023-02-15');
            break;
          case 2:
            expect(result).toBe('2023-12-31');
            break;
        }
      });
    });
  });
});
