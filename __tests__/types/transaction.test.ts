import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import {
  GetPendingTransactionsResponseSchema,
  GetPendingTransactionsRequestSchema,
  GetPendingTransactionsResponse,
  GetCompletedTransactionsResponseSchema,
  GetCompletedTransactionsRequestSchema,
  GetCompletedTransactionsResponse,
  GetCompletedTransactionsRequest,
  SubTransactionType,
  TransactionType
} from '../../src/types/transaction';

describe('Transaction Type Validations', () => {
  describe('GetPendingTransactionsRequest', () => {
    it('should validate valid request with all fields', () => {
      const validRequest = {
        offset: 0,
        limit: 200,
        orderBy: 'createdAt',
        sortOrder: 'DESC'
      };

      expect(() => GetPendingTransactionsRequestSchema.parse(validRequest)).not.toThrow();
      const result = GetPendingTransactionsRequestSchema.parse(validRequest);
      expect(result.offset).toBe(0);
      expect(result.limit).toBe(200);
    });

    it('should validate request with partial fields', () => {
      const partialRequest = {
        limit: 50
      };

      expect(() => GetPendingTransactionsRequestSchema.parse(partialRequest)).not.toThrow();
    });

    it('should validate empty request object', () => {
      expect(() => GetPendingTransactionsRequestSchema.parse({})).not.toThrow();
    });

    it('should throw ZodError for invalid field types', () => {
      const invalidRequest = {
        offset: 'invalid',
        limit: 'invalid'
      };

      expect(() => GetPendingTransactionsRequestSchema.parse(invalidRequest)).toThrow(ZodError);
    });
  });

  describe('GetPendingTransactionsResponse', () => {
    it('should validate valid response with complete data', () => {
      const validResponse: GetPendingTransactionsResponse = {
        totalFilteredRecords: 2,
        pageItems: [
          {
            id: 212214,
            transfer: {
              id: 65869,
              amount: 20005,
              correlationId: 'ab639913-6791-482a-9c55-750537c3fbc5',
              creditor: {
                identifier: 'SWIFT://CITILULX/1221212',
                name: 'P Rash',
                postalCode: '122122',
                country: 'US',
                stateOrProvince: 'AL',
                agent: {
                  identifier: 'CITILULX',
                  name: 'nametest',
                  country: 'US',
                  address: ['add', 'addd', 'cittty AK 545455 US']
                },
                address: ['addr1', 'addr2', 'AL 122122 US']
              },
              debtor: {
                identifier: 'ACCOUNT:000000315',
                name: 'yashas bank',
                city: 'bangalore',
                postalCode: '23222',
                country: 'US',
                stateOrProvince: 'ME',
                agent: {
                  country: 'US'
                },
                address: ['India', 'India', 'Cambodia123ww bangalore ME 23222 US']
              },
              createdAt: '2024-02-14T11:22:14.572966',
              executedAt: '2024-02-14T11:22:38.708364',
              externalId: '17079061345616f',
              reference: [],
              status: 'AML_SCREENING',
              transactionId: 'ab639913-6791-482a-9c55-750537c3fbc5',
              type: 'CREDIT',
              valueDate: '2024-02-14',
              paymentType: 'SWIFT',
              debtorAccountNumber: '000000315',
              debtorAccountId: 315,
              creditorAccountNumber: '1221212',
              paymentRailMetaData: {
                businessFunctionCode: {
                  businessFunctionCode: 'CTR',
                  transactionTypeCode: ''
                },
                receiverDepositoryInstitution: {
                  receiverABANumber: '021000018',
                  receiverShortName: 'Prakash'
                },
                originator: {
                  personal: {
                    identificationCode: 'D'
                  }
                },
                beneficiary: {
                  personal: {
                    identificationCode: 'D'
                  }
                },
                beneficiaryFI: {
                  financialInstitution: {
                    identificationCode: 'B'
                  }
                },
                beneficiaryIntermediaryFI: {
                  financialInstitution: {}
                },
                typeSubType: {
                  typeCode: '10',
                  subTypeCode: '00'
                },
                fiPaymentMethodToBeneficiary: {}
              },
              statementDescription: 'Wire out nametest P Rash',
              stopFutureDebit: false,
              createdBySystem: false
            },
            typeOf: 'HOLD_AMOUNT',
            valueDate: '2024-02-14',
            amount: 20010,
            pendingAmount: 20010,
            createdAt: '2024-02-14 11:22:38',
            manual: false,
            active: true,
            type: 'TRANSFER'
          },
          {
            id: 212211,
            transfer: {
              id: 65866,
              amount: 20008,
              correlationId: '2aa9c014-92f1-4e26-9106-d47b1a095f53',
              creditor: {
                identifier: 'ACH://321070007/12122121212',
                name: 'Yashas R',
                city: 'test',
                postalCode: '12345',
                country: 'US',
                stateOrProvince: 'AL',
                agent: {
                  identifier: '321070007',
                  country: 'US',
                  address: []
                },
                address: ['test', 'ACH', 'test,AL,12345,US'],
                accountType: 'SAVINGS'
              },
              debtor: {
                identifier: 'id:315',
                name: 'yashas bank',
                city: 'bangalore',
                postalCode: '23222',
                country: 'US',
                stateOrProvince: 'ME',
                agent: {
                  country: 'US'
                },
                address: ['India', 'India', 'Cambodia123ww bangalore ME 23222 US'],
                accountType: 'SAVINGS'
              },
              createdAt: '2024-02-14T11:11:56.810987',
              executedAt: '2024-02-14T11:11:56.870642',
              externalId: '1707905516788iq',
              reference: ['test ACH outgoing fail'],
              status: 'AML_SCREENING',
              transactionId: '2aa9c014-92f1-4e26-9106-d47b1a095f53',
              type: 'CREDIT',
              valueDate: '2024-02-14',
              paymentType: 'ACH',
              debtorAccountNumber: '000000315',
              debtorAccountId: 315,
              creditorAccountNumber: '12122121212',
              traceNumbers: {},
              statementDescription: 'ACH out Yashas R 1212 test ACH outgoing fail',
              stopFutureDebit: false,
              createdBySystem: false
            },
            typeOf: 'HOLD_AMOUNT',
            valueDate: '2024-02-14',
            amount: 20012,
            pendingAmount: 20012,
            createdAt: '2024-02-14 11:11:56',
            manual: false,
            active: true,
            type: 'TRANSFER'
          }
        ]
      };

      expect(() => GetPendingTransactionsResponseSchema.parse(validResponse)).not.toThrow();
      const result = GetPendingTransactionsResponseSchema.parse(validResponse);
      expect(result.totalFilteredRecords).toBe(2);
      expect(result.pageItems).toHaveLength(2);
      expect(result.pageItems[0].transfer.status).toBe('AML_SCREENING');
    });

    it('should validate empty response', () => {
      const emptyResponse = {
        totalFilteredRecords: 0,
        pageItems: []
      };

      expect(() => GetPendingTransactionsResponseSchema.parse(emptyResponse)).not.toThrow();
    });

    it('should throw ZodError for invalid response structure', () => {
      expect(() => GetPendingTransactionsResponseSchema.parse({})).toThrow(ZodError);
      expect(() => GetPendingTransactionsResponseSchema.parse({
        totalFilteredRecords: 'invalid'
      })).toThrow(ZodError);
      expect(() => GetPendingTransactionsResponseSchema.parse({
        totalFilteredRecords: 1,
        pageItems: 'not-array'
      })).toThrow(ZodError);
    });

    it('should throw ZodError for missing required transfer fields', () => {
      const invalidResponse = {
        totalFilteredRecords: 1,
        pageItems: [
          {
            id: 212214,
            transfer: {
              id: 65869,
              amount: 20005
              // Missing required fields
            },
            typeOf: 'HOLD_AMOUNT',
            valueDate: '2024-02-14',
            amount: 20010,
            pendingAmount: 20010,
            createdAt: '2024-02-14 11:22:38',
            manual: false,
            active: true,
            type: 'TRANSFER'
          }
        ]
      };

      expect(() => GetPendingTransactionsResponseSchema.parse(invalidResponse)).toThrow(ZodError);
    });
  });

  describe('GetCompletedTransactionsRequest', () => {
    it('should validate valid request with all fields', () => {
      const validRequest: GetCompletedTransactionsRequest = {
        offset: 0,
        limit: 15,
        showEnrichedTransactions: true,
        subTransactionType: SubTransactionType.CARD_TRANSACTION,
        statusType: 'PROCESSED',
        transactionType: TransactionType.INTEREST_POSTING,
        startDate: '24 March 2023',
        endDate: '24 July 2023',
        reference: 'For donation',
        paymentType: 'CASH',
        fromAmount: 20.5,
        toAmount: 100,
        isCardTransaction: true,
        showInterestAccruals: false,
        orderBy: 'id',
        sortOrder: 'ASC',
        getCardData: false
      };

      expect(() => GetCompletedTransactionsRequestSchema.parse(validRequest)).not.toThrow();
      const result = GetCompletedTransactionsRequestSchema.parse(validRequest);
      expect(result.offset).toBe(0);
      expect(result.limit).toBe(15);
      expect(result.showEnrichedTransactions).toBe(true);
      expect(result.statusType).toBe('PROCESSED');
    });

    it('should validate request with partial fields', () => {
      const partialRequest = {
        limit: 50,
        orderBy: 'id'
      };

      expect(() => GetCompletedTransactionsRequestSchema.parse(partialRequest)).not.toThrow();
    });

    it('should validate empty request object', () => {
      expect(() => GetCompletedTransactionsRequestSchema.parse({})).not.toThrow();
    });

    it('should throw ZodError for invalid field types', () => {
      const invalidRequest = {
        offset: 'invalid',
        limit: 'invalid',
        showEnrichedTransactions: 'not-boolean'
      };

      expect(() => GetCompletedTransactionsRequestSchema.parse(invalidRequest)).toThrow(ZodError);
    });
  });

  describe('GetCompletedTransactionsResponse', () => {
    it('should validate valid response with enriched transaction data', () => {
      const validResponse: GetCompletedTransactionsResponse = {
        totalFilteredRecords: 2,
        pageItems: [
          {
            id: 353478,
            transactionType: {
              id: 3,
              code: 'savingsAccountTransactionType.interestPosting',
              value: 'Interest posting',
              deposit: false,
              dividendPayout: false,
              withdrawal: false,
              interestPosting: true,
              feeDeduction: false,
              initiateTransfer: false,
              approveTransfer: false,
              withdrawTransfer: false,
              rejectTransfer: false,
              overdraftInterest: false,
              writtenoff: false,
              overdraftFee: true,
              withholdTax: false,
              escheat: false,
              amountHold: false,
              amountRelease: false,
              interestpayableAccrued: false,
              overdraftInterestReceivableAccrued: false,
              isDebit: false,
              chargeBack: false,
              isFeeReversal: false
            },
            accountId: 10422,
            accountNo: '000010422',
            enrichedTransactionData: {
              id: '3123244',
              merchantLogoUrl: 'https://plaid-merchant-logos.plaid.com/walmart_1100.png',
              merchantWebsite: 'walmart.com',
              merchantName: 'Walmart',
              paymentChannel: 'in store',
              personalFinanceCategoryIconUrl: 'https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png',
              personalFinanceCategory: 'GENERAL_MERCHANDISE',
              personalFinanceSubCategory: 'GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES',
              isRecurring: true,
              merchantPhoneNumber: '+18003222726',
              location: {
                address: '13425 Community Rd',
                city: 'Poway',
                region: 'CA',
                postal_code: '92064',
                country: 'US',
                store_number: '1700',
                lat: 32.959068,
                lon: -117.037666
              }
            },
            date: [2024, 1, 31],
            dateTime: '2024-01-31 00:43:27',
            currency: {
              code: 'USD',
              name: 'US Dollar',
              decimalPlaces: 2,
              inMultiplesOf: 1,
              displaySymbol: '$',
              nameCode: 'currency.USD',
              displayLabel: 'US Dollar ($)',
              currencyCodeInDigit: 0,
              isBaseCurrency: false
            },
            paymentDetailData: {
              id: 387833,
              reference: 'Interest Posting For January Month'
            },
            amount: 1.92,
            runningBalance: 1.92,
            accrualRunningBalance: 0,
            interestPayableDerived: 0,
            reversed: false,
            submittedOnDate: [2024, 1, 31],
            interestedPostedAsOn: false,
            bookingDate: [2024, 1, 31],
            subTransactionType: 'NONE',
            status: 'PROCESSED',
            isAlreadyChargeBack: false,
            initiatedAt: '2024-01-31 00:43:27',
            transactionReferenceId: 'daf2d996-56d3-49ed-ba57-8cffb66e6fcc',
            createdBySystem: false
          }
        ]
      };

      expect(() => GetCompletedTransactionsResponseSchema.parse(validResponse)).not.toThrow();
      const result = GetCompletedTransactionsResponseSchema.parse(validResponse);
      expect(result.totalFilteredRecords).toBe(2);
      expect(result.pageItems).toHaveLength(1);
      expect(result.pageItems[0].transactionType.code).toBe('savingsAccountTransactionType.interestPosting');
      expect(result.pageItems[0].enrichedTransactionData?.merchantName).toBe('Walmart');
      expect(result.pageItems[0].enrichedTransactionData?.location?.city).toBe('Poway');
    });

    it('should validate response without enriched data', () => {
      const responseWithoutEnrichedData: GetCompletedTransactionsResponse = {
        totalFilteredRecords: 1,
        pageItems: [
          {
            id: 353479,
            transactionType: {
              id: 1,
              code: 'savingsAccountTransactionType.deposit',
              value: 'Deposit',
              deposit: true
            },
            date: '2024-01-31',
            currency: {
              code: 'USD',
              name: 'US Dollar',
              decimalPlaces: 2,
              inMultiplesOf: 1,
              displaySymbol: '$',
              nameCode: 'currency.USD',
              displayLabel: 'US Dollar ($)'
            },
            amount: 100.00,
            runningBalance: 100.00,
            reversed: false,
            submittedOnDate: '2024-01-31',
            interestedPostedAsOn: false
          }
        ]
      };

      expect(() => GetCompletedTransactionsResponseSchema.parse(responseWithoutEnrichedData)).not.toThrow();
    });

    it('should validate empty response', () => {
      const emptyResponse = {
        totalFilteredRecords: 0,
        pageItems: []
      };

      expect(() => GetCompletedTransactionsResponseSchema.parse(emptyResponse)).not.toThrow();
    });

    it('should throw ZodError for invalid response structure', () => {
      expect(() => GetCompletedTransactionsResponseSchema.parse({})).toThrow(ZodError);
      expect(() => GetCompletedTransactionsResponseSchema.parse({
        totalFilteredRecords: 'invalid'
      })).toThrow(ZodError);
      expect(() => GetCompletedTransactionsResponseSchema.parse({
        totalFilteredRecords: 1,
        pageItems: 'not-array'
      })).toThrow(ZodError);
    });

    it('should throw ZodError for missing required transaction fields', () => {
      const invalidResponse = {
        totalFilteredRecords: 1,
        pageItems: [
          {
            id: 353478,
            transactionType: {
              id: 3,
              code: 'savingsAccountTransactionType.interestPosting'
              // Missing required 'value' field
            },
            date: [2024, 1, 31],
            amount: 1.92,
            runningBalance: 1.92,
            reversed: false,
            submittedOnDate: [2024, 1, 31],
            interestedPostedAsOn: false
          }
        ]
      };

      expect(() => GetCompletedTransactionsResponseSchema.parse(invalidResponse)).toThrow(ZodError);
    });
  });
});
