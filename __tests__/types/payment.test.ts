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
  validateOriginatorName,
  validateOriginatorAccount,
  validateOriginatorBankRoutingCode,
  validateRecipientName,
  validateRecipientAccount,
  validateRecipientBankRoutingCode,
  validateReference,
  validateTraceNumber,
  validateExternalId,
  validateClientId,
  validateDateFormat,
  validateLocale,
  validateOriginatedBy,
  validateValueDate,
  validateExecuteDate,
  validateReturnDate,
  validateIsSettlement,
  validateOrderBy,
  validatePaymentFilters,
  validateFilterKey,
  validateFilterValue,
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

  describe('Filter Value Validations', () => {
    describe('validateOriginatorName', () => {
      it('should validate valid originator names', () => {
        expect(() => validateOriginatorName('John Doe')).not.toThrow();
        expect(validateOriginatorName('Test Company')).toBe('Test Company');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateOriginatorName('')).toThrow(ZodError);
      });
    });

    describe('validateOriginatorAccount', () => {
      it('should validate valid account numbers', () => {
        expect(() => validateOriginatorAccount('123456789')).not.toThrow();
        expect(validateOriginatorAccount('987654321')).toBe('987654321');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateOriginatorAccount('')).toThrow(ZodError);
      });
    });

    describe('validateOriginatorBankRoutingCode', () => {
      it('should validate valid routing codes', () => {
        expect(() => validateOriginatorBankRoutingCode('021000021')).not.toThrow();
        expect(validateOriginatorBankRoutingCode('111000025')).toBe('111000025');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateOriginatorBankRoutingCode('')).toThrow(ZodError);
      });
    });

    describe('validateRecipientName', () => {
      it('should validate valid recipient names', () => {
        expect(() => validateRecipientName('Jane Smith')).not.toThrow();
        expect(validateRecipientName('Recipient Corp')).toBe('Recipient Corp');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateRecipientName('')).toThrow(ZodError);
      });
    });

    describe('validateRecipientAccount', () => {
      it('should validate valid recipient accounts', () => {
        expect(() => validateRecipientAccount('555666777')).not.toThrow();
        expect(validateRecipientAccount('111222333')).toBe('111222333');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateRecipientAccount('')).toThrow(ZodError);
      });
    });

    describe('validateRecipientBankRoutingCode', () => {
      it('should validate valid recipient routing codes', () => {
        expect(() => validateRecipientBankRoutingCode('321070007')).not.toThrow();
        expect(validateRecipientBankRoutingCode('021000021')).toBe('021000021');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateRecipientBankRoutingCode('')).toThrow(ZodError);
      });
    });

    describe('validateReference', () => {
      it('should validate valid references', () => {
        expect(() => validateReference('REF123456')).not.toThrow();
        expect(validateReference('PAYMENT-REF')).toBe('PAYMENT-REF');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateReference('')).toThrow(ZodError);
      });
    });

    describe('validateTraceNumber', () => {
      it('should validate valid trace numbers', () => {
        expect(() => validateTraceNumber('TRACE123')).not.toThrow();
        expect(validateTraceNumber('987654321')).toBe('987654321');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateTraceNumber('')).toThrow(ZodError);
      });
    });

    describe('validateExternalId', () => {
      it('should validate valid external IDs', () => {
        expect(() => validateExternalId('EXT123456')).not.toThrow();
        expect(validateExternalId('1755660740713zV')).toBe('1755660740713zV');
      });

      it('should throw ZodError for empty strings', () => {
        expect(() => validateExternalId('')).toThrow(ZodError);
      });
    });

    describe('validateClientId', () => {
      it('should validate valid client IDs as strings', () => {
        expect(() => validateClientId('client-123')).not.toThrow();
        expect(validateClientId('client-456')).toBe('client-456');
      });

      it('should validate valid client IDs as numbers', () => {
        expect(() => validateClientId(4742)).not.toThrow();
        expect(validateClientId(1234)).toBe(1234);
      });
    });

    describe('validateDateFormat', () => {
      it('should validate valid date formats', () => {
        expect(() => validateDateFormat('YYYY-MM-DD')).not.toThrow();
        expect(validateDateFormat('MM/DD/YYYY')).toBe('MM/DD/YYYY');
      });
    });

    describe('validateLocale', () => {
      it('should validate valid locales', () => {
        expect(() => validateLocale('en-US')).not.toThrow();
        expect(validateLocale('fr-FR')).toBe('fr-FR');
      });
    });

    describe('validateOriginatedBy', () => {
      it('should validate valid originated by values', () => {
        expect(() => validateOriginatedBy('SYSTEM')).not.toThrow();
        expect(validateOriginatedBy('USER')).toBe('USER');
      });
    });

    describe('validateValueDate', () => {
      it('should validate valid value dates', () => {
        expect(() => validateValueDate('2023-01-01')).not.toThrow();
        expect(validateValueDate('2023-12-31')).toBe('2023-12-31');
      });
    });

    describe('validateExecuteDate', () => {
      it('should validate valid execute dates', () => {
        expect(() => validateExecuteDate('2023-01-01')).not.toThrow();
        expect(validateExecuteDate('2023-12-31')).toBe('2023-12-31');
      });
    });

    describe('validateReturnDate', () => {
      it('should validate valid return dates', () => {
        expect(() => validateReturnDate('2023-01-01')).not.toThrow();
        expect(validateReturnDate('2023-12-31')).toBe('2023-12-31');
      });
    });

    describe('validateIsSettlement', () => {
      it('should validate valid settlement flags', () => {
        expect(() => validateIsSettlement(true)).not.toThrow();
        expect(() => validateIsSettlement(false)).not.toThrow();
        expect(validateIsSettlement(true)).toBe(true);
        expect(validateIsSettlement(false)).toBe(false);
      });

      it('should throw ZodError for non-boolean values', () => {
        expect(() => validateIsSettlement('true' as any)).toThrow(ZodError);
        expect(() => validateIsSettlement(1 as any)).toThrow(ZodError);
      });
    });

    describe('validateOrderBy', () => {
      it('should validate valid order by values', () => {
        expect(() => validateOrderBy('createdAt')).not.toThrow();
        expect(validateOrderBy('amount')).toBe('amount');
      });
    });

    describe('validatePaymentFilters', () => {
      it('should validate valid payment filters', () => {
        const validFilters = {
          status: 'DRAFT',
          paymentRail: 'ACH',
          originatorName: 'John Doe',
          limit: 10,
          offset: 0
        };

        expect(() => validatePaymentFilters(validFilters)).not.toThrow();
        const result = validatePaymentFilters(validFilters);
        expect(result.status).toBe('DRAFT');
        expect(result.limit).toBe(10);
      });

      it('should validate empty filters object', () => {
        expect(() => validatePaymentFilters({})).not.toThrow();
      });

      it('should validate partial filters', () => {
        const partialFilters = {
          status: 'EXECUTION_SUCCESS'
        };

        expect(() => validatePaymentFilters(partialFilters)).not.toThrow();
        const result = validatePaymentFilters(partialFilters);
        expect(result.status).toBe('EXECUTION_SUCCESS');
      });
    });
  });
});

describe('Payment Entity Validations', () => {
  describe('validatePayment', () => {
    it('should validate valid payment object', () => {
      const validPayment = {
        id: 123,
        clientId: 4742,
        amount: 100.50,
        correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
        paymentType: 'DEBIT',
        paymentRail: 'CARD',
        recipient: {
          cardId: '437',
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Recipient'
        },
        originator: {
          accountId: '4193',
          recipientType: 'INDIVIDUAL',
          address: {
            line1: 'Test Address',
            stateCode: 'NY',
            countryCode: 'US',
            postalCode: '12345'
          },
          name: 'Test Originator'
        },
        executedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        externalId: '1755660740713zV',
        status: 'DRAFT',
        paymentRailMetaData: { externalCardName: 'Test Card', externalCardLastDigit: '1234' },
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar',
          currencyCodeInDigit: 0,
          isBaseCurrency: false
        },
        currency: 'USD'
      };

      expect(() => validatePayment(validPayment)).not.toThrow();
      const result = validatePayment(validPayment);
      expect(result).toEqual(validPayment);
    });

    it('should validate payment with minimum required fields', () => {
      const minimalPayment = {
        id: 123,
        clientId: 4742,
        amount: 100.50,
        correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
        paymentType: 'DEBIT',
        paymentRail: 'CARD',
        recipient: {
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Recipient'
        },
        originator: {
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Originator'
        },
        executedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        externalId: '1755660740713zV',
        status: 'DRAFT',
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar',
          currencyCodeInDigit: 0,
          isBaseCurrency: false
        },
        currency: 'USD'
      };

      expect(() => validatePayment(minimalPayment)).not.toThrow();
    });

    it('should allow additional properties with catchall', () => {
      const paymentWithExtra = {
        id: 123,
        clientId: 4742,
        amount: 100.50,
        correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
        paymentType: 'DEBIT',
        paymentRail: 'CARD',
        recipient: {
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Recipient'
        },
        originator: {
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Originator'
        },
        executedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        externalId: '1755660740713zV',
        status: 'DRAFT',
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar',
          currencyCodeInDigit: 0,
          isBaseCurrency: false
        },
        currency: 'USD',
        customField: 'custom-value',
        metadata: { key: 'value' }
      };

      expect(() => validatePayment(paymentWithExtra)).not.toThrow();
    });

    it('should throw ZodError for invalid payment objects', () => {
      expect(() => validatePayment({})).toThrow(ZodError);
      expect(() => validatePayment({ id: 123 })).toThrow(ZodError);
      expect(() => validatePayment({
        id: 123,
        amount: -100,
        clientId: 4742,
        currency: 'USD'
      })).toThrow(ZodError);
      expect(() => validatePayment({
        id: 123,
        amount: 100,
        clientId: 4742,
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
      originator: {
        accountId: '123456789'
      },
      recipient: {
        name: 'Jane Smith',
        accountNumber: '987654321',
        accountType: 'SAVINGS',
        recipientType: 'INDIVIDUAL',
        address: {
          line1: '789 Oak Ave',
          city: 'Another Town',
          stateCode: 'CA',
          countryCode: 'US',
          postalCode: '54321'
        },
        bankInformation: {
          routingNumber: '321070007'
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
        recipient: {
          ...validCreateInput.recipient,
          address: {
            line1: '789 Oak Ave',
            city: 'Another Town'
            // Missing stateCode and countryCode required for WIRE
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

    it('should validate INTERNAL transfers with required accountIds', () => {
      const internalInput = {
        ...validCreateInput,
        paymentRail: 'INTERNAL',
        recipient: {
          ...validCreateInput.recipient,
          accountId: 'recipient-account-123'
        }
      };

      expect(() => validateCreatePaymentInput(internalInput)).not.toThrow();
    });

    it('should throw ZodError for INTERNAL transfers without recipient accountId', () => {
      const internalInputInvalid = {
        ...validCreateInput,
        paymentRail: 'INTERNAL'
        // Missing recipient.accountId
      };

      expect(() => validateCreatePaymentInput(internalInputInvalid)).toThrow(ZodError);
    });

    it('should validate CARD payments with required cardId', () => {
      const cardInput = {
        ...validCreateInput,
        paymentRail: 'CARD',
        recipient: {
          ...validCreateInput.recipient,
          cardId: 'card-123'
        }
      };

      expect(() => validateCreatePaymentInput(cardInput)).not.toThrow();
    });

    it('should throw ZodError for CARD payments without cardId', () => {
      const cardInputInvalid = {
        ...validCreateInput,
        paymentRail: 'CARD'
        // Missing recipient.cardId
      };

      expect(() => validateCreatePaymentInput(cardInputInvalid)).toThrow(ZodError);
    });

    it('should validate FXPAY transfers with all required fields', () => {
      const fxpayInput = {
        ...validCreateInput,
        paymentRail: 'FXPAY',
        recipient: {
          ...validCreateInput.recipient,
          recipientId: 'recipient-123',
          accountEntity: 'PERSONAL'
        },
        paymentRailMetaData: { fxRate: 1.25 }
      };

      expect(() => validateCreatePaymentInput(fxpayInput)).not.toThrow();
    });

    it('should throw ZodError for FXPAY transfers without required fields', () => {
      const fxpayInputInvalid = {
        ...validCreateInput,
        paymentRail: 'FXPAY'
        // Missing recipientId, accountEntity, and paymentRailMetaData
      };

      expect(() => validateCreatePaymentInput(fxpayInputInvalid)).toThrow(ZodError);
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
            id: 1,
            clientId: 4742,
            amount: 100,
            correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
            paymentType: 'DEBIT',
            paymentRail: 'CARD',
            recipient: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Test Recipient'
            },
            originator: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Test Originator'
            },
            executedAt: '2023-01-01T00:00:00Z',
            createdAt: '2023-01-01T00:00:00Z',
            externalId: '1755660740713zV',
            status: 'DRAFT',
            currencyData: {
              code: 'USD',
              name: 'US Dollar',
              decimalPlaces: 2,
              displaySymbol: '$',
              nameCode: 'US Dollar',
              currencyCodeInDigit: 0,
              isBaseCurrency: false
            },
            currency: 'USD'
          },
          {
            id: 2,
            clientId: 4743,
            amount: 200,
            correlationId: '46005ded-a9e8-41fe-b26e-831e02c79716',
            paymentType: 'CREDIT',
            paymentRail: 'ACH',
            recipient: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Test Recipient 2'
            },
            originator: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Test Originator 2'
            },
            executedAt: '2023-01-02T00:00:00Z',
            createdAt: '2023-01-02T00:00:00Z',
            externalId: '1755660740713zW',
            status: 'EXECUTION_SUCCESS',
            currencyData: {
              code: 'EUR',
              name: 'Euro',
              decimalPlaces: 2,
              displaySymbol: '€',
              nameCode: 'Euro',
              currencyCodeInDigit: 1,
              isBaseCurrency: false
            },
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

describe('Filter Validation Functions', () => {
  describe('validateFilterKey', () => {
    it('should validate valid filter keys', () => {
      expect(() => validateFilterKey('status')).not.toThrow();
      expect(() => validateFilterKey('paymentRail')).not.toThrow();
      expect(() => validateFilterKey('originatorName')).not.toThrow();
    });

    it('should throw CommandError for invalid filter keys', () => {
      expect(() => validateFilterKey('invalidKey')).toThrow();
    });

  });

  describe('validateFilterValue', () => {
    it('should validate valid filter values for status', () => {
      expect(() => validateFilterValue('status', 'DRAFT')).not.toThrow();
      expect(() => validateFilterValue('status', 'EXECUTION_SUCCESS')).not.toThrow();
    });

    it('should validate valid filter values for paymentRail', () => {
      expect(() => validateFilterValue('paymentRail', 'ACH')).not.toThrow();
      expect(() => validateFilterValue('paymentRail', 'WIRE')).not.toThrow();
    });

    it('should validate valid filter values for other fields', () => {
      expect(() => validateFilterValue('originatorName', 'John Doe')).not.toThrow();
      expect(() => validateFilterValue('clientId', 12345)).not.toThrow();
      expect(() => validateFilterValue('isSettlement', true)).not.toThrow();
    });

    it('should handle unknown filter keys without throwing (default case)', () => {
      expect(() => validateFilterValue('unknownKey', 'anyValue')).not.toThrow();
    });

    it('should throw CommandError for invalid filter values', () => {
      expect(() => validateFilterValue('status', 'INVALID_STATUS')).toThrow();
      expect(() => validateFilterValue('paymentRail', 'INVALID_RAIL')).toThrow();
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
