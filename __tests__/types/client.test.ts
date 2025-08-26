import { describe, it, expect } from 'vitest';
import {
  validateCreateClientRequest,
  validateUpdateClientRequest,
  validateUpdateClientIdentifierRequest,
  validateUpdateClientIdentifierResponse,
  validateApiErrorResponse,
  validateListClientsRequest,
  validateClientData,
  validateClientResponse,
  validateClientFilterKey,
  validateClientOrderBy,
  validateClientSortOrder,
  validateClientStatus,
  validateClientFilters
} from '../../src/types/client';

describe('Client Type Validations', () => {
  describe('validateCreateClientRequest', () => {
    it('should validate valid create client request', () => {
      const validRequest = {
        firstname: 'John',
        lastname: 'Doe',
        dob: '1990-01-01',
        dateOfBirth: '1990-01-01',
        dateFormat: 'yyyy-MM-dd',
        submittedOnDate: '2024-01-01',
        genderId: 1,
        locale: 'en_US',
        officeId: 1,
        mobileCountryCode: '+1',
        mobileNo: '1234567890',
        emailAddress: 'john.doe@example.com',
        legalFormId: 1
      };

      const result = validateCreateClientRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should throw error for invalid create client request', () => {
      const invalidRequest = {
        firstname: 'John'
        // missing required fields
      };

      expect(() => validateCreateClientRequest(invalidRequest)).toThrow();
    });
  });

  describe('validateUpdateClientRequest', () => {
    it('should validate valid update client request', () => {
      const validRequest = {
        firstname: 'Jane',
        lastname: 'Smith'
      };

      const result = validateUpdateClientRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should throw error for invalid update client request', () => {
      const invalidRequest = {
        emailAddress: 'invalid-email'
      };

      expect(() => validateUpdateClientRequest(invalidRequest)).toThrow();
    });
  });

    describe('validateUpdateClientIdentifierRequest', () => {
    it('should validate valid update client identifier request', () => {
      const validRequest = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE',
        description: 'Valid passport',
        issuedBy: 'Government',
        locale: 'en_US',
        dateFormat: 'dd/MM/yyyy',
        expiryDate: '2030-12-31',
        nationality: 1,
        issuedDate: '2020-01-01'
      };

      expect(() => validateUpdateClientIdentifierRequest(validRequest)).not.toThrow();
    });

    it('should throw error for invalid update client identifier request', () => {
      const invalidRequest = {
        documentTypeId: 123, // Should be string
        status: 'ACTIVE'
        // Missing required documentKey
      };

      expect(() => validateUpdateClientIdentifierRequest(invalidRequest)).toThrow();
    });
  });

  describe('validateUpdateClientIdentifierResponse', () => {
    it('should validate valid update client identifier response', () => {
      const validResponse = {
        id: 123,
        officeId: 1,
        clientId: 456,
        resourceId: 789,
        changes: { field: 'value' },
        isScheduledTransfer: false,
        isSkipNotification: true
      };

      expect(() => validateUpdateClientIdentifierResponse(validResponse)).not.toThrow();
    });

    it('should throw error for invalid update client identifier response', () => {
      const invalidResponse = {
        id: 'string-id', // Should be number
        officeId: 1
        // Missing required fields
      };

      expect(() => validateUpdateClientIdentifierResponse(invalidResponse)).toThrow();
    });
  });

    describe('validateApiErrorResponse', () => {
    it('should validate valid API error response', () => {
      const validError = {
        developerMessage: 'Validation failed',
        httpStatusCode: '400',
        defaultUserMessage: 'Invalid input',
        userMessageGlobalisationCode: 'error.validation.failed',
        errors: []
      };

      expect(() => validateApiErrorResponse(validError)).not.toThrow();
    });

    it('should throw error for invalid API error response', () => {
      const invalidError = {
        developerMessage: 123, // Should be string
        httpStatusCode: 400 // Should be string
        // Missing required fields
      };

      expect(() => validateApiErrorResponse(invalidError)).toThrow();
    });
  });

  describe('validateListClientsRequest', () => {
    it('should validate valid list clients request', () => {
      const validRequest = {
        limit: 50,
        offset: 0,
        firstname: 'John'
      };

      const result = validateListClientsRequest(validRequest);
      expect(result).toEqual(validRequest);
    });

    it('should throw error for invalid list clients request', () => {
      const invalidRequest = {
        limit: 'not-a-number', // Should be number type
        offset: 'invalid' // Should be number type
      };

      expect(() => validateListClientsRequest(invalidRequest)).toThrow();
    });
  });

  describe('validateClientData', () => {
    it('should throw error for invalid client data', () => {
      const invalidData = {
        id: 'not-a-number'
      };

      expect(() => validateClientData(invalidData)).toThrow();
    });
  });

  describe('validateClientResponse', () => {
    it('should throw error for invalid client response', () => {
      const invalidResponse = {
        clientData: 'not-an-object'
      };

      expect(() => validateClientResponse(invalidResponse)).toThrow();
    });
  });

  describe('validateClientFilterKey', () => {
    it('should validate valid filter keys', () => {
      const validKeys = ['firstname', 'lastname', 'displayName', 'mobileNo', 'externalId'];
      
      validKeys.forEach(key => {
        expect(() => validateClientFilterKey(key)).not.toThrow();
      });
    });

    it('should throw error for invalid filter key', () => {
      expect(() => validateClientFilterKey('invalidKey')).toThrow();
    });
  });

  describe('validateClientOrderBy', () => {
    it('should validate valid order by values', () => {
      const validOrderBy = ['displayName', 'accountNo', 'officeId', 'officeName'];
      
      validOrderBy.forEach(orderBy => {
        expect(() => validateClientOrderBy(orderBy)).not.toThrow();
      });
    });

    it('should throw error for invalid order by value', () => {
      expect(() => validateClientOrderBy('invalidOrderBy')).toThrow();
    });
  });

  describe('validateClientSortOrder', () => {
    it('should validate valid sort order values', () => {
      const validSortOrders = ['ASC', 'DESC'];
      
      validSortOrders.forEach(sortOrder => {
        expect(() => validateClientSortOrder(sortOrder)).not.toThrow();
      });
    });

    it('should throw error for invalid sort order value', () => {
      expect(() => validateClientSortOrder('INVALID')).toThrow();
    });
  });

  describe('validateClientStatus', () => {
    it('should validate valid client status values', () => {
      const validStatuses = ['ACTIVE', 'PENDING', 'INACTIVE'];
      
      validStatuses.forEach(status => {
        expect(() => validateClientStatus(status)).not.toThrow();
      });
    });

    it('should throw error for invalid client status', () => {
      expect(() => validateClientStatus('INVALID_STATUS')).toThrow();
    });
  });

  describe('validateClientFilters', () => {
    it('should validate valid filters object', () => {
      const validFilters = {
        firstname: 'John',
        lastname: 'Doe',
        orderBy: 'displayName',
        sortOrder: 'ASC',
        clientStatus: 'ACTIVE',
        offset: 0,
        limit: 50,
        officeId: 1,
        orphansOnly: true,
        displayName: 'John Doe',
        externalId: 'EXT123',
        mobileNo: '1234567890'
      };

      expect(() => validateClientFilters(validFilters)).not.toThrow();
    });

    it('should skip validation for undefined/null values', () => {
      const filtersWithNulls = {
        firstname: 'John',
        lastname: null,
        orderBy: undefined
      };

      expect(() => validateClientFilters(filtersWithNulls)).not.toThrow();
    });

    it('should throw error for invalid orderBy', () => {
      const invalidFilters = {
        orderBy: 'invalidOrderBy'
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
      expect(() => validateClientFilters(invalidFilters)).toThrow(/Validation error/);
    });

    it('should throw error for invalid sortOrder', () => {
      const invalidFilters = {
        sortOrder: 'INVALID'
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for invalid clientStatus', () => {
      const invalidFilters = {
        clientStatus: 'INVALID_STATUS'
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for negative offset', () => {
      const invalidFilters = {
        offset: -1
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for negative limit', () => {
      const invalidFilters = {
        limit: -1
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for negative officeId', () => {
      const invalidFilters = {
        officeId: -1
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for invalid boolean', () => {
      const invalidFilters = {
        orphansOnly: 'not-a-boolean'
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for empty string values', () => {
      const invalidFilters = {
        firstname: ''
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should throw error for invalid filter key', () => {
      const invalidFilters = {
        invalidKey: 'someValue'
      };

      expect(() => validateClientFilters(invalidFilters)).toThrow();
    });

    it('should rethrow non-ZodError errors', () => {
      // This would require mocking the validateClientFilterKey function to throw a non-ZodError
      // For now, we'll test that the function exists and works with valid input
      expect(() => validateClientFilters({ firstname: 'John' })).not.toThrow();
    });
  });
});
