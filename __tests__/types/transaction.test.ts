import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import {
    GetPendingTransactionsResponseSchema,
    GetPendingTransactionsRequestSchema,
    GetPendingTransactionsResponse,
    GetPendingTransactionsRequest,
    PendingTransaction
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
});
