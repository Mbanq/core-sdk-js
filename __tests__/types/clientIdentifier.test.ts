import { describe, it, expect } from 'vitest';
import {
  validateClientIdentifierRequest,
  validateClientIdentifierResponse,
  validateDocumentUploadRequest
} from '../../src/types/clientIdentifier';

describe('types/clientIdentifier', () => {
  describe('validateClientIdentifierRequest', () => {
    it('should validate a valid client identifier request with required fields', () => {
      const validRequest = {
        documentTypeId: '636',
        documentKey: '123456789',
        status: 'ACTIVE',
      };

      const result = validateClientIdentifierRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should validate a valid client identifier request with all optional fields', () => {
      const validRequest = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE',
        description: 'Valid passport document',
        issuedBy: 'US Department of State',
        locale: 'en_US',
        dateFormat: 'yyyy-MM-dd',
        expiryDate: '2030-12-31',
        nationality: 1,
        issuedDate: '2020-01-01'
      };

      const result = validateClientIdentifierRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should throw error for invalid documentTypeId type', () => {
      const invalidRequest = {
        documentTypeId: 636,
        documentKey: '123456789',
        status: 'ACTIVE',
      };

      expect(() => validateClientIdentifierRequest(invalidRequest)).toThrow();
    });

    it('should throw error for missing required documentKey', () => {
      const invalidRequest = {
        documentTypeId: '636',
        status: 'ACTIVE',
      };

      expect(() => validateClientIdentifierRequest(invalidRequest)).toThrow();
    });

    it('should throw error for missing required status', () => {
      const invalidRequest = {
        documentTypeId: '636',
        documentKey: '123456789',
      };

      expect(() => validateClientIdentifierRequest(invalidRequest)).toThrow();
    });

    it('should accept empty object with catchall behavior', () => {
      const requestWithExtraFields = {
        documentTypeId: '636',
        documentKey: '123456789',
        status: 'ACTIVE',
        extraField: 'extra value',
        anotherField: 123
      };

      expect(() => validateClientIdentifierRequest(requestWithExtraFields)).not.toThrow();
    });
  });

  describe('validateClientIdentifierResponse', () => {
    it('should validate a valid client identifier response', () => {
      const validResponse = {
        id: 123,
        officeId: 1,
        clientId: 456,
        resourceId: 789,
        changes: { status: 'ACTIVE', documentKey: 'NEW123' },
        isScheduledTransfer: false,
        isSkipNotification: true
      };

      const result = validateClientIdentifierResponse(validResponse);
      expect(result).toEqual(validResponse);
    });

    it('should throw error for invalid id type', () => {
      const invalidResponse = {
        id: 'string-id',
        officeId: 1,
        clientId: 456,
        resourceId: 789,
        changes: {},
        isScheduledTransfer: false,
        isSkipNotification: true
      };

      expect(() => validateClientIdentifierResponse(invalidResponse)).toThrow();
    });

    it('should throw error for missing required fields', () => {
      const invalidResponse = {
        id: 123,
        officeId: 1
        // Missing required clientId, resourceId, changes, etc.
      };

      expect(() => validateClientIdentifierResponse(invalidResponse)).toThrow();
    });

    it('should accept additional fields with catchall behavior', () => {
      const responseWithExtraFields = {
        id: 123,
        officeId: 1,
        clientId: 456,
        resourceId: 789,
        changes: {},
        isScheduledTransfer: false,
        isSkipNotification: true,
        extraField: 'extra value',
        timestamp: '2024-01-01T00:00:00Z'
      };

      expect(() => validateClientIdentifierResponse(responseWithExtraFields)).not.toThrow();
    });
  });

  describe('validateDocumentUploadRequest', () => {
    it('should validate a valid document upload request with required fields', () => {
      const buffer = Buffer.from('test file content');
      const validRequest = {
        name: 'passport.pdf',
        file: buffer
      };

      const result = validateDocumentUploadRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should validate a valid document upload request with all fields', () => {
      const blob = new Blob(['test content'], { type: 'application/pdf' });
      const validRequest = {
        name: 'identity-document.jpg',
        file: blob,
        type: 'image/jpeg',
        description: 'Client identity document'
      };

      const result = validateDocumentUploadRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should validate with File object', () => {
      const file = new File(['test content'], 'document.pdf', { type: 'application/pdf' });
      const validRequest = {
        name: 'document.pdf',
        file: file,
        description: 'PDF document'
      };

      const result = validateDocumentUploadRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should throw error for missing required name field', () => {
      const buffer = Buffer.from('test content');
      const invalidRequest = {
        file: buffer
      };

      expect(() => validateDocumentUploadRequest(invalidRequest)).toThrow();
    });

    it('should throw error for missing required file field', () => {
      const invalidRequest = {
        name: 'document.pdf'
      };

      expect(() => validateDocumentUploadRequest(invalidRequest)).toThrow();
    });

    it('should throw error for invalid file type', () => {
      const invalidRequest = {
        name: 'document.pdf',
        file: 'string file content'
      };

      expect(() => validateDocumentUploadRequest(invalidRequest)).toThrow();
    });

    it('should throw error for invalid name type', () => {
      const buffer = Buffer.from('test content');
      const invalidRequest = {
        name: 123,
        file: buffer
      };

      expect(() => validateDocumentUploadRequest(invalidRequest)).toThrow();
    });

    it('should accept empty name string (as per current schema definition)', () => {
      const buffer = Buffer.from('test content');
      const requestWithEmptyName = {
        name: '',
        file: buffer
      };

      expect(() => validateDocumentUploadRequest(requestWithEmptyName)).not.toThrow();
    });
  });
});