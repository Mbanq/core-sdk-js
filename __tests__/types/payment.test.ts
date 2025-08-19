import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import {
  validatePaymentFilterKey,
  validatePaymentStatus,
  validatePaymentRail,
  validatePaymentType,
  validateSortOrder,
  validatePayment,
  validateCreatePaymentInput,
  validateUpdatePaymentInput,
  validatePaymentResponse,
  VALID_PAYMENT_FILTER_KEYS,
  VALID_STATUS_VALUES,
  VALID_PAYMENT_RAIL_VALUES,
  VALID_PAYMENT_TYPE_VALUES,
  VALID_SORT_ORDER_VALUES
} from '../../src/types/payment';

describe('Payment Type Validations', () => {
  describe('validatePaymentFilterKey', () => {
    it('should validate valid filter keys', () => {
      expect(() => validatePaymentFilterKey('originatorName')).not.toThrow();
      expect(() => validatePaymentFilterKey('status')).not.toThrow();
      expect(() => validatePaymentFilterKey('paymentRail')).not.toThrow();
      expect(() => validatePaymentFilterKey('sortOrder')).not.toThrow();
    });

    it('should throw ZodError for invalid filter keys', () => {
      expect(() => validatePaymentFilterKey('invalidKey')).toThrow(ZodError);
      expect(() => validatePaymentFilterKey('')).toThrow(ZodError);
      expect(() => validatePaymentFilterKey('unknown')).toThrow(ZodError);
    });

    it('should return the validated filter key', () => {
      const result = validatePaymentFilterKey('status');
      expect(result).toBe('status');
    });
  });

  describe('validatePaymentStatus', () => {
    it('should validate valid payment statuses', () => {
      expect(() => validatePaymentStatus('DRAFT')).not.toThrow();
      expect(() => validatePaymentStatus('AML_SCREENING')).not.toThrow();
      expect(() => validatePaymentStatus('EXECUTION_SUCCESS')).not.toThrow();
      expect(() => validatePaymentStatus('CANCELLED')).not.toThrow();
    });

    it('should throw ZodError for invalid payment statuses', () => {
      expect(() => validatePaymentStatus('INVALID_STATUS')).toThrow(ZodError);
      expect(() => validatePaymentStatus('')).toThrow(ZodError);
      expect(() => validatePaymentStatus('pending')).toThrow(ZodError);
    });

    it('should return the validated status', () => {
      const result = validatePaymentStatus('DRAFT');
      expect(result).toBe('DRAFT');
    });
  });

  describe('validatePaymentRail', () => {
    it('should validate valid payment rails', () => {
      expect(() => validatePaymentRail('ACH')).not.toThrow();
      expect(() => validatePaymentRail('WIRE')).not.toThrow();
      expect(() => validatePaymentRail('SWIFT')).not.toThrow();
      expect(() => validatePaymentRail('INTERNAL')).not.toThrow();
    });

    it('should throw ZodError for invalid payment rails', () => {
      expect(() => validatePaymentRail('INVALID_RAIL')).toThrow(ZodError);
      expect(() => validatePaymentRail('')).toThrow(ZodError);
      expect(() => validatePaymentRail('ach')).toThrow(ZodError);
    });

    it('should return the validated payment rail', () => {
      const result = validatePaymentRail('ACH');
      expect(result).toBe('ACH');
    });
  });

  describe('validatePaymentType', () => {
    it('should validate valid payment types', () => {
      expect(() => validatePaymentType('CREDIT')).not.toThrow();
      expect(() => validatePaymentType('DEBIT')).not.toThrow();
    });

    it('should throw ZodError for invalid payment types', () => {
      expect(() => validatePaymentType('INVALID_TYPE')).toThrow(ZodError);
      expect(() => validatePaymentType('')).toThrow(ZodError);
      expect(() => validatePaymentType('credit')).toThrow(ZodError);
    });

    it('should return the validated payment type', () => {
      const result = validatePaymentType('CREDIT');
      expect(result).toBe('CREDIT');
    });
  });

  describe('validateSortOrder', () => {
    it('should validate valid sort orders', () => {
      expect(() => validateSortOrder('ASC')).not.toThrow();
      expect(() => validateSortOrder('DESC')).not.toThrow();
    });

    it('should throw ZodError for invalid sort orders', () => {
      expect(() => validateSortOrder('INVALID_ORDER')).toThrow(ZodError);
      expect(() => validateSortOrder('')).toThrow(ZodError);
      expect(() => validateSortOrder('asc')).toThrow(ZodError);
    });

    it('should return the validated sort order', () => {
      const result = validateSortOrder('ASC');
      expect(result).toBe('ASC');
    });
  });
});

describe('Payment Entity Validations', () => {
  describe('validatePayment', () => {
    it('should validate valid payment object', () => {
      const validPayment = {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD',
        status: 'DRAFT',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
      };

      expect(() => validatePayment(validPayment)).not.toThrow();
      const result = validatePayment(validPayment);
      expect(result).toEqual(validPayment);
    });

    it('should validate payment with minimum required fields', () => {
      const minimalPayment = {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD'
      };

      expect(() => validatePayment(minimalPayment)).not.toThrow();
    });

    it('should allow additional properties with catchall', () => {
      const paymentWithExtra = {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD',
        customField: 'custom-value',
        metadata: { key: 'value' }
      };

      expect(() => validatePayment(paymentWithExtra)).not.toThrow();
    });

    it('should throw ZodError for invalid payment objects', () => {
      expect(() => validatePayment({})).toThrow(ZodError);
      expect(() => validatePayment({ id: '123' })).toThrow(ZodError);
      expect(() => validatePayment({
        id: '123',
        amount: -100,
        clientId: 'client-123',
        currency: 'USD'
      })).toThrow(ZodError);
      expect(() => validatePayment({
        id: '123',
        amount: 100,
        clientId: 'client-123',
        currency: 'INVALID'
      })).toThrow(ZodError);
    });
  });

  describe('validateCreatePaymentInput', () => {
    const validCreateInput = {
      amount: 100.50,
      currency: 'USD',
      paymentRail: 'ACH',
      paymentType: 'CREDIT',
      debtor: {
        name: 'John Doe',
        identifier: '123456789',
        accountType: 'CHECKING',
        address: {
          streetAddress: '123 Main St',
          city: 'Anytown',
          state: 'NY',
          country: 'US',
          postalCode: '12345'
        },
        agent: {
          name: 'Bank of Example',
          identifier: '021000021',
          address: {
            streetAddress: '456 Bank St',
            city: 'Banking City',
            state: 'NY',
            country: 'US'
          }
        }
      },
      creditor: {
        name: 'Jane Smith',
        identifier: '987654321',
        accountType: 'SAVINGS',
        address: {
          streetAddress: '789 Oak Ave',
          city: 'Another Town',
          state: 'CA',
          country: 'US',
          postalCode: '54321'
        },
        agent: {
          name: 'Credit Union',
          identifier: '321070007',
          address: {
            streetAddress: '321 Credit Ave',
            city: 'Credit City',
            state: 'CA',
            country: 'US'
          }
        }
      }
    };

    it('should validate valid create payment input', () => {
      expect(() => validateCreatePaymentInput(validCreateInput)).not.toThrow();
      const result = validateCreatePaymentInput(validCreateInput);
      expect(result.amount).toBe(100.50);
      expect(result.currency).toBe('USD');
    });

    it('should validate with optional fields', () => {
      const inputWithOptionals = {
        ...validCreateInput,
        clientId: 'client-123',
        externalId: 'ext-123',
        reference: ['payment-ref-1', 'payment-ref-2'],
        valueDate: '2023-01-01',
        executionDate: '2023-01-02',
        chargeBearer: 'OUR',
        purposeCode: 'SALARY'
      };

      expect(() => validateCreatePaymentInput(inputWithOptionals)).not.toThrow();
    });

    it('should validate WIRE transfers with required address fields', () => {
      const wireInput = {
        ...validCreateInput,
        paymentRail: 'WIRE'
      };

      expect(() => validateCreatePaymentInput(wireInput)).not.toThrow();
    });

    it('should throw ZodError for WIRE transfers without required address', () => {
      const wireInputInvalid = {
        ...validCreateInput,
        paymentRail: 'WIRE',
        creditor: {
          ...validCreateInput.creditor,
          address: {
            streetAddress: '789 Oak Ave',
            city: 'Another Town'
          }
        }
      };

      expect(() => validateCreatePaymentInput(wireInputInvalid)).toThrow(ZodError);
    });

    it('should throw ZodError for missing required fields', () => {
      expect(() => validateCreatePaymentInput({})).toThrow(ZodError);
      expect(() => validateCreatePaymentInput({ amount: 100 })).toThrow(ZodError);
      expect(() => validateCreatePaymentInput({
        amount: -100,
        currency: 'USD'
      })).toThrow(ZodError);
    });
  });

  describe('validateUpdatePaymentInput', () => {
    it('should validate valid update payment input', () => {
      const validUpdateInput = {
        amount: 150.75,
        status: 'EXECUTION_SCHEDULED',
        reference: ['updated-ref']
      };

      expect(() => validateUpdatePaymentInput(validUpdateInput)).not.toThrow();
      const result = validateUpdatePaymentInput(validUpdateInput);
      expect(result.amount).toBe(150.75);
    });

    it('should validate with partial updates', () => {
      const partialUpdate = {
        status: 'CANCELLED'
      };

      expect(() => validateUpdatePaymentInput(partialUpdate)).not.toThrow();
    });

    it('should validate empty update object', () => {
      expect(() => validateUpdatePaymentInput({})).not.toThrow();
    });

    it('should allow additional properties with catchall', () => {
      const updateWithExtra = {
        amount: 200,
        customField: 'custom-value'
      };

      expect(() => validateUpdatePaymentInput(updateWithExtra)).not.toThrow();
    });

    it('should throw ZodError for invalid values', () => {
      expect(() => validateUpdatePaymentInput({
        amount: -100
      })).toThrow(ZodError);
      expect(() => validateUpdatePaymentInput({
        status: 'INVALID_STATUS'
      })).toThrow(ZodError);
    });
  });

  describe('validatePaymentResponse', () => {
    it('should validate valid payment response', () => {
      const validResponse = {
        totalFilteredRecords: 2,
        pageItems: [
          {
            id: '1',
            amount: 100,
            clientId: 'client-1',
            currency: 'USD'
          },
          {
            id: '2',
            amount: 200,
            clientId: 'client-2',
            currency: 'EUR'
          }
        ]
      };

      expect(() => validatePaymentResponse(validResponse)).not.toThrow();
      const result = validatePaymentResponse(validResponse);
      expect(result.totalFilteredRecords).toBe(2);
      expect(result.pageItems).toHaveLength(2);
    });

    it('should validate empty payment response', () => {
      const emptyResponse = {
        totalFilteredRecords: 0,
        pageItems: []
      };

      expect(() => validatePaymentResponse(emptyResponse)).not.toThrow();
    });

    it('should throw ZodError for invalid response structure', () => {
      expect(() => validatePaymentResponse({})).toThrow(ZodError);
      expect(() => validatePaymentResponse({
        totalFilteredRecords: '2'
      })).toThrow(ZodError);
      expect(() => validatePaymentResponse({
        totalFilteredRecords: 2,
        pageItems: 'not-array'
      })).toThrow(ZodError);
    });
  });
});

describe('Payment Constants', () => {
  it('should have correct valid filter keys', () => {
    expect(VALID_PAYMENT_FILTER_KEYS).toContain('originatorName');
    expect(VALID_PAYMENT_FILTER_KEYS).toContain('status');
    expect(VALID_PAYMENT_FILTER_KEYS).toContain('paymentRail');
    expect(VALID_PAYMENT_FILTER_KEYS).toContain('sortOrder');
  });

  it('should have correct valid status values', () => {
    expect(VALID_STATUS_VALUES).toContain('DRAFT');
    expect(VALID_STATUS_VALUES).toContain('EXECUTION_SUCCESS');
    expect(VALID_STATUS_VALUES).toContain('CANCELLED');
  });

  it('should have correct valid payment rail values', () => {
    expect(VALID_PAYMENT_RAIL_VALUES).toContain('ACH');
    expect(VALID_PAYMENT_RAIL_VALUES).toContain('WIRE');
    expect(VALID_PAYMENT_RAIL_VALUES).toContain('SWIFT');
  });

  it('should have correct valid payment type values', () => {
    expect(VALID_PAYMENT_TYPE_VALUES).toContain('CREDIT');
    expect(VALID_PAYMENT_TYPE_VALUES).toContain('DEBIT');
  });

  it('should have correct valid sort order values', () => {
    expect(VALID_SORT_ORDER_VALUES).toContain('ASC');
    expect(VALID_SORT_ORDER_VALUES).toContain('DESC');
  });
});
