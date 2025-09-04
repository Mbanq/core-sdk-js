import { C as Config, b as CreatePaymentInput, U as UpdatePaymentInput, D as CreateClientRequest, E as UpdateClientRequest, F as ProcessOutput, G as UpdateClientIdentifierRequest, z as UpdateAccountRequest, H as CreateRecipientRequest, I as UpdateRecipientRequest, R as Recipient, a as Command } from '../client-CHyhpYj2.js';
import * as z from 'zod';
import 'graphql';
import 'axios';

declare const createClient: (initialConfig: Config) => {
    user: {
        getDetail: () => {
            execute: () => Promise<{
                officeId: number;
                officeName: string;
                username: string;
                userId: number;
                accessToken: string;
                authenticated: boolean;
                roles: {
                    name: string;
                    id: number;
                    description: string;
                    disabled: boolean;
                    isSelfService: boolean;
                    position: number;
                }[];
                permissions: string[];
                shouldRenewPassword: boolean;
                isTwoFactorAuthenticationRequired: boolean;
                isSelfServiceUser: boolean;
            } | undefined>;
        };
    };
    payment: {
        create: (data: CreatePaymentInput) => {
            execute: () => Promise<{
                clientId: number;
                id: string;
                resourceId: number;
                resourceIdentifier: string;
            } | undefined>;
        };
        get: (id: number) => {
            execute: () => Promise<z.objectOutputType<{
                id: z.ZodNumber;
                clientId: z.ZodNumber;
                amount: z.ZodNumber;
                correlationId: z.ZodString;
                paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
                paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                recipient: z.ZodObject<{
                    cardId: z.ZodOptional<z.ZodString>;
                    recipientType: z.ZodString;
                    address: z.ZodObject<{
                        line1: z.ZodOptional<z.ZodString>;
                        line2: z.ZodOptional<z.ZodString>;
                        stateCode: z.ZodOptional<z.ZodString>;
                        countryCode: z.ZodString;
                        postalCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    cardId?: string | undefined;
                }, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    cardId?: string | undefined;
                }>;
                originator: z.ZodObject<{
                    accountId: z.ZodOptional<z.ZodString>;
                    recipientType: z.ZodString;
                    address: z.ZodObject<{
                        line1: z.ZodOptional<z.ZodString>;
                        line2: z.ZodOptional<z.ZodString>;
                        stateCode: z.ZodOptional<z.ZodString>;
                        countryCode: z.ZodString;
                        postalCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    accountId?: string | undefined;
                }, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    accountId?: string | undefined;
                }>;
                executedAt: z.ZodString;
                createdAt: z.ZodString;
                externalId: z.ZodString;
                status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                currencyData: z.ZodObject<{
                    code: z.ZodString;
                    name: z.ZodString;
                    decimalPlaces: z.ZodNumber;
                    displaySymbol: z.ZodString;
                    nameCode: z.ZodString;
                    currencyCodeInDigit: z.ZodNumber;
                    isBaseCurrency: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    code: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }, {
                    name: string;
                    code: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }>;
                currency: z.ZodString;
            }, z.ZodAny, "strip"> | undefined>;
        };
        update: (id: number, data: UpdatePaymentInput) => {
            execute: () => Promise<z.objectOutputType<{
                id: z.ZodNumber;
                clientId: z.ZodNumber;
                amount: z.ZodNumber;
                correlationId: z.ZodString;
                paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
                paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                recipient: z.ZodObject<{
                    cardId: z.ZodOptional<z.ZodString>;
                    recipientType: z.ZodString;
                    address: z.ZodObject<{
                        line1: z.ZodOptional<z.ZodString>;
                        line2: z.ZodOptional<z.ZodString>;
                        stateCode: z.ZodOptional<z.ZodString>;
                        countryCode: z.ZodString;
                        postalCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    cardId?: string | undefined;
                }, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    cardId?: string | undefined;
                }>;
                originator: z.ZodObject<{
                    accountId: z.ZodOptional<z.ZodString>;
                    recipientType: z.ZodString;
                    address: z.ZodObject<{
                        line1: z.ZodOptional<z.ZodString>;
                        line2: z.ZodOptional<z.ZodString>;
                        stateCode: z.ZodOptional<z.ZodString>;
                        countryCode: z.ZodString;
                        postalCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }, {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    }>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    accountId?: string | undefined;
                }, {
                    name: string;
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    accountId?: string | undefined;
                }>;
                executedAt: z.ZodString;
                createdAt: z.ZodString;
                externalId: z.ZodString;
                status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                currencyData: z.ZodObject<{
                    code: z.ZodString;
                    name: z.ZodString;
                    decimalPlaces: z.ZodNumber;
                    displaySymbol: z.ZodString;
                    nameCode: z.ZodString;
                    currencyCodeInDigit: z.ZodNumber;
                    isBaseCurrency: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    code: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }, {
                    name: string;
                    code: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }>;
                currency: z.ZodString;
            }, z.ZodAny, "strip"> | undefined>;
        };
        delete: (id: number) => {
            execute: () => Promise<void | undefined>;
        };
        list: () => {
            where: any;
            limit: (value: number) => /*elided*/ any;
            offset: (value: number) => /*elided*/ any;
            all: () => /*elided*/ any;
            execute: () => Promise<unknown>;
        };
    };
    client: {
        create: (data: CreateClientRequest) => {
            execute: () => Promise<z.objectOutputType<{
                clientId: z.ZodNumber;
                status: z.ZodString;
            }, z.ZodAny, "strip"> | undefined>;
        };
        get: (id: number) => {
            execute: () => Promise<any>;
        };
        update: (id: number, data: UpdateClientRequest) => {
            execute: () => Promise<ProcessOutput | undefined>;
        };
        updateDocumentRecord: (id: number, data: UpdateClientIdentifierRequest) => {
            execute: () => Promise<z.objectOutputType<{
                id: z.ZodNumber;
                officeId: z.ZodNumber;
                clientId: z.ZodNumber;
                resourceId: z.ZodNumber;
                changes: z.ZodRecord<z.ZodString, z.ZodAny>;
                isScheduledTransfer: z.ZodBoolean;
                isSkipNotification: z.ZodBoolean;
            }, z.ZodAny, "strip"> | undefined>;
        };
        delete: (id: number) => {
            execute: () => Promise<ProcessOutput | undefined>;
        };
        for: (clientId: string) => {
            accounts: {
                get: (accountId: number) => {
                    readonly execute: () => Promise<{
                        status: {
                            code: string;
                            value: string;
                            id: number;
                            submittedAndPendingApproval: boolean;
                            approved: boolean;
                            rejected: boolean;
                            withdrawnByApplicant: boolean;
                            active: boolean;
                            closed: boolean;
                            prematureClosed: boolean;
                            transferInProgress: boolean;
                            transferOnHold: boolean;
                            matured: boolean;
                        };
                        clientId: number;
                        id: number;
                        currency: {
                            name: string;
                            code: string;
                            decimalPlaces: number;
                            displaySymbol: string;
                            nameCode: string;
                            inMultiplesOf: number;
                            displayLabel: string;
                            currencyCodeInDigit?: number | undefined;
                            isBaseCurrency?: boolean | undefined;
                        };
                        accountNo: string;
                        timeline: {
                            submittedOnDate: number[];
                            submittedByUsername: string;
                            submittedByFirstname: string;
                            submittedByLastname: string;
                            approvedOnDate?: number[] | undefined;
                            approvedByUsername?: string | undefined;
                            approvedByFirstname?: string | undefined;
                            approvedByLastname?: string | undefined;
                            activatedOnDate?: number[] | undefined;
                            activatedByUsername?: string | undefined;
                            activatedByFirstname?: string | undefined;
                            activatedByLastname?: string | undefined;
                        };
                        subStatus: {
                            code: string;
                            value: string;
                            id: number;
                            none: boolean;
                            inactive: boolean;
                            dormant: boolean;
                            escheat: boolean;
                            block: boolean;
                            blockCredit: boolean;
                            blockDebit: boolean;
                        };
                        lastActiveTransactionDate: number[];
                        depositType: {
                            code: string;
                            value: string;
                            id: number;
                        };
                        allowPrepaidCard: boolean;
                        withdrawalFeeForTransfers: boolean;
                        allowOverdraft: boolean;
                        enforceMinRequiredBalance: boolean;
                        withHoldTax: boolean;
                        isDormancyTrackingActive: boolean;
                        isLinkedToFloatingInterestRates: boolean;
                        isBaseLendingRate: boolean;
                        skipCollectTransferCharge: boolean;
                        cardRestricted: boolean;
                        prepaidAccount: boolean;
                        clientName: string;
                        savingsProductId: number;
                        savingsProductName: string;
                        fieldOfficerId: number;
                        nominalAnnualInterestRate: number;
                        interestCompoundingPeriodType: {
                            code: string;
                            value: string;
                            id: number;
                        };
                        interestPostingPeriodType: {
                            code: string;
                            value: string;
                            id: number;
                        };
                        interestCalculationType: {
                            code: string;
                            value: string;
                            id: number;
                        };
                        interestCalculationDaysInYearType: {
                            code: string;
                            value: string;
                            id: number;
                        };
                        lockinPeriodFrequency: number;
                        lockinPeriodFrequencyType: {
                            code: string;
                            value: string;
                            id: number;
                        };
                        onHoldFunds: number;
                        savingsAmountOnHold: number;
                        summary: {
                            currency: {
                                name: string;
                                code: string;
                                decimalPlaces: number;
                                displaySymbol: string;
                                nameCode: string;
                                inMultiplesOf: number;
                                displayLabel: string;
                                currencyCodeInDigit?: number | undefined;
                                isBaseCurrency?: boolean | undefined;
                            };
                            accountBalance: number;
                            availableBalance: number;
                            totalDeposits: number;
                            totalInterestEarned: number;
                            totalInterestPosted: number;
                            totalOverdraftInterestDerived: number;
                            interestNotPosted: number;
                            lastInterestCalculationDate: number[];
                        };
                        interestRateDifferential: number;
                        overdraftInterestRateDifferential: number;
                        floatingRateId: number;
                        isFloatingInterestRateCalculationAllowed: boolean;
                        bankDetails: {
                            name: string;
                            address: string;
                            city: string;
                            routingNumber: string;
                            swiftCode: string;
                            postcode: string;
                        };
                        overdraftLimit: number;
                        minRequiredBalance: number;
                        minBalanceForInterestCalculation: number;
                        minOverdraftForInterestCalculation: number;
                        overdraftMinimumDue: number;
                        currentFloatingInterestPeriod: {
                            fromDate: number[];
                            interestRate: number;
                            isDifferentialToBLR: boolean;
                        };
                        floatingRateName: string;
                        floatingRateDifferential: number;
                        parentAccount: {
                            allowPrepaidCard: boolean;
                            withdrawalFeeForTransfers: boolean;
                            allowOverdraft: boolean;
                            enforceMinRequiredBalance: boolean;
                            withHoldTax: boolean;
                            isDormancyTrackingActive: boolean;
                            isLinkedToFloatingInterestRates: boolean;
                            isBaseLendingRate: boolean;
                            skipCollectTransferCharge: boolean;
                            cardRestricted: boolean;
                            prepaidAccount: boolean;
                        };
                        prepaidLimitAmount: number;
                    } | undefined>;
                };
                getFromList: (accountId: number) => {
                    readonly execute: () => Promise<any>;
                };
                update: (accountId: number, updates: UpdateAccountRequest) => {
                    execute: () => Promise<any>;
                };
                delete: (accountId: number) => {
                    execute: () => Promise<ProcessOutput | undefined>;
                };
                where: (field: string) => {
                    eq: (value: any) => {
                        where: (nextField: string) => /*elided*/ any;
                        list: () => {
                            where: (field: string) => /*elided*/ any;
                            execute: () => Promise<unknown>;
                        };
                    };
                };
                list: () => {
                    where: (field: string) => {
                        eq: (value: any) => {
                            where: (nextField: string) => /*elided*/ any;
                            list: () => /*elided*/ any;
                        };
                    };
                    execute: () => Promise<unknown>;
                };
            };
            recipients: {
                create: (data: CreateRecipientRequest) => {
                    execute: () => Promise<{
                        clientId: number;
                        paymentRail: string;
                        recipientType: string;
                        address: {
                            line1: string;
                            line2: string;
                            stateCode: string;
                            countryCode: string;
                            postalCode: string;
                            city: string;
                        };
                        id: number;
                        emailAddress: string;
                        nickName: string;
                        firstName: string;
                        lastName: string;
                        businessName: string;
                        phoneNumber: string;
                        isOwnAccount: boolean;
                        accountDetailsData: {
                            accountNumber: string;
                            bankInformation: {
                                routingNumber: string;
                                swiftCode: string;
                            };
                        };
                    } | undefined>;
                };
                get: (recipientId: number) => {
                    readonly execute: () => Promise<{
                        clientId: number;
                        paymentRail: string;
                        recipientType: string;
                        address: {
                            line1: string;
                            line2: string;
                            stateCode: string;
                            countryCode: string;
                            postalCode: string;
                            city: string;
                        };
                        id: number;
                        emailAddress: string;
                        nickName: string;
                        firstName: string;
                        lastName: string;
                        businessName: string;
                        phoneNumber: string;
                        isOwnAccount: boolean;
                        accountDetailsData: {
                            accountNumber: string;
                            bankInformation: {
                                routingNumber: string;
                                swiftCode: string;
                            };
                        };
                    } | undefined>;
                };
                update: (recipientId: number, updates: UpdateRecipientRequest) => {
                    execute: () => Promise<{
                        updateRecipient: Recipient;
                    } | undefined>;
                };
                delete: (recipientId: number) => {
                    execute: () => Promise<ProcessOutput | undefined>;
                };
                where: (field: string) => {
                    eq: (value: any) => {
                        where: (nextField: string) => /*elided*/ any;
                        list: () => {
                            where: (field: string) => /*elided*/ any;
                            execute: () => Promise<unknown>;
                        };
                    };
                };
                list: () => {
                    where: (field: string) => {
                        eq: (value: any) => {
                            where: (nextField: string) => /*elided*/ any;
                            list: () => /*elided*/ any;
                        };
                    };
                    execute: () => Promise<unknown>;
                };
            };
        };
        list: () => {
            where: any;
            limit: (value: number) => /*elided*/ any;
            offset: (value: number) => /*elided*/ any;
            all: () => /*elided*/ any;
            execute: () => Promise<unknown>;
        };
    };
    setConfig: (config: Config) => void;
    updateConfig: (config: Partial<Config>) => void;
    resetConfig: () => void;
    request: <TOutput>(command: Command<any, TOutput>) => Promise<TOutput | undefined>;
    tenant: (tenantId: string) => {
        user: {
            getDetail: () => {
                execute: () => Promise<{
                    officeId: number;
                    officeName: string;
                    username: string;
                    userId: number;
                    accessToken: string;
                    authenticated: boolean;
                    roles: {
                        name: string;
                        id: number;
                        description: string;
                        disabled: boolean;
                        isSelfService: boolean;
                        position: number;
                    }[];
                    permissions: string[];
                    shouldRenewPassword: boolean;
                    isTwoFactorAuthenticationRequired: boolean;
                    isSelfServiceUser: boolean;
                } | undefined>;
            };
        };
        payment: {
            create: (data: CreatePaymentInput) => {
                execute: () => Promise<{
                    clientId: number;
                    id: string;
                    resourceId: number;
                    resourceIdentifier: string;
                } | undefined>;
            };
            get: (id: number) => {
                execute: () => Promise<z.objectOutputType<{
                    id: z.ZodNumber;
                    clientId: z.ZodNumber;
                    amount: z.ZodNumber;
                    correlationId: z.ZodString;
                    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
                    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                    recipient: z.ZodObject<{
                        cardId: z.ZodOptional<z.ZodString>;
                        recipientType: z.ZodString;
                        address: z.ZodObject<{
                            line1: z.ZodOptional<z.ZodString>;
                            line2: z.ZodOptional<z.ZodString>;
                            stateCode: z.ZodOptional<z.ZodString>;
                            countryCode: z.ZodString;
                            postalCode: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }>;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        cardId?: string | undefined;
                    }, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        cardId?: string | undefined;
                    }>;
                    originator: z.ZodObject<{
                        accountId: z.ZodOptional<z.ZodString>;
                        recipientType: z.ZodString;
                        address: z.ZodObject<{
                            line1: z.ZodOptional<z.ZodString>;
                            line2: z.ZodOptional<z.ZodString>;
                            stateCode: z.ZodOptional<z.ZodString>;
                            countryCode: z.ZodString;
                            postalCode: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }>;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        accountId?: string | undefined;
                    }, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        accountId?: string | undefined;
                    }>;
                    executedAt: z.ZodString;
                    createdAt: z.ZodString;
                    externalId: z.ZodString;
                    status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    currencyData: z.ZodObject<{
                        code: z.ZodString;
                        name: z.ZodString;
                        decimalPlaces: z.ZodNumber;
                        displaySymbol: z.ZodString;
                        nameCode: z.ZodString;
                        currencyCodeInDigit: z.ZodNumber;
                        isBaseCurrency: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        code: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }, {
                        name: string;
                        code: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }>;
                    currency: z.ZodString;
                }, z.ZodAny, "strip"> | undefined>;
            };
            update: (id: number, data: UpdatePaymentInput) => {
                execute: () => Promise<z.objectOutputType<{
                    id: z.ZodNumber;
                    clientId: z.ZodNumber;
                    amount: z.ZodNumber;
                    correlationId: z.ZodString;
                    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
                    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                    recipient: z.ZodObject<{
                        cardId: z.ZodOptional<z.ZodString>;
                        recipientType: z.ZodString;
                        address: z.ZodObject<{
                            line1: z.ZodOptional<z.ZodString>;
                            line2: z.ZodOptional<z.ZodString>;
                            stateCode: z.ZodOptional<z.ZodString>;
                            countryCode: z.ZodString;
                            postalCode: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }>;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        cardId?: string | undefined;
                    }, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        cardId?: string | undefined;
                    }>;
                    originator: z.ZodObject<{
                        accountId: z.ZodOptional<z.ZodString>;
                        recipientType: z.ZodString;
                        address: z.ZodObject<{
                            line1: z.ZodOptional<z.ZodString>;
                            line2: z.ZodOptional<z.ZodString>;
                            stateCode: z.ZodOptional<z.ZodString>;
                            countryCode: z.ZodString;
                            postalCode: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }, {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        }>;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        accountId?: string | undefined;
                    }, {
                        name: string;
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        accountId?: string | undefined;
                    }>;
                    executedAt: z.ZodString;
                    createdAt: z.ZodString;
                    externalId: z.ZodString;
                    status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    currencyData: z.ZodObject<{
                        code: z.ZodString;
                        name: z.ZodString;
                        decimalPlaces: z.ZodNumber;
                        displaySymbol: z.ZodString;
                        nameCode: z.ZodString;
                        currencyCodeInDigit: z.ZodNumber;
                        isBaseCurrency: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        code: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }, {
                        name: string;
                        code: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }>;
                    currency: z.ZodString;
                }, z.ZodAny, "strip"> | undefined>;
            };
            delete: (id: number) => {
                execute: () => Promise<void | undefined>;
            };
            list: () => {
                where: any;
                limit: (value: number) => /*elided*/ any;
                offset: (value: number) => /*elided*/ any;
                all: () => /*elided*/ any;
                execute: () => Promise<unknown>;
            };
        };
        client: {
            create: (data: CreateClientRequest) => {
                execute: () => Promise<z.objectOutputType<{
                    clientId: z.ZodNumber;
                    status: z.ZodString;
                }, z.ZodAny, "strip"> | undefined>;
            };
            get: (id: number) => {
                execute: () => Promise<any>;
            };
            update: (id: number, data: UpdateClientRequest) => {
                execute: () => Promise<ProcessOutput | undefined>;
            };
            updateDocumentRecord: (id: number, data: UpdateClientIdentifierRequest) => {
                execute: () => Promise<z.objectOutputType<{
                    id: z.ZodNumber;
                    officeId: z.ZodNumber;
                    clientId: z.ZodNumber;
                    resourceId: z.ZodNumber;
                    changes: z.ZodRecord<z.ZodString, z.ZodAny>;
                    isScheduledTransfer: z.ZodBoolean;
                    isSkipNotification: z.ZodBoolean;
                }, z.ZodAny, "strip"> | undefined>;
            };
            delete: (id: number) => {
                execute: () => Promise<ProcessOutput | undefined>;
            };
            for: (clientId: string) => {
                accounts: {
                    get: (accountId: number) => {
                        readonly execute: () => Promise<{
                            status: {
                                code: string;
                                value: string;
                                id: number;
                                submittedAndPendingApproval: boolean;
                                approved: boolean;
                                rejected: boolean;
                                withdrawnByApplicant: boolean;
                                active: boolean;
                                closed: boolean;
                                prematureClosed: boolean;
                                transferInProgress: boolean;
                                transferOnHold: boolean;
                                matured: boolean;
                            };
                            clientId: number;
                            id: number;
                            currency: {
                                name: string;
                                code: string;
                                decimalPlaces: number;
                                displaySymbol: string;
                                nameCode: string;
                                inMultiplesOf: number;
                                displayLabel: string;
                                currencyCodeInDigit?: number | undefined;
                                isBaseCurrency?: boolean | undefined;
                            };
                            accountNo: string;
                            timeline: {
                                submittedOnDate: number[];
                                submittedByUsername: string;
                                submittedByFirstname: string;
                                submittedByLastname: string;
                                approvedOnDate?: number[] | undefined;
                                approvedByUsername?: string | undefined;
                                approvedByFirstname?: string | undefined;
                                approvedByLastname?: string | undefined;
                                activatedOnDate?: number[] | undefined;
                                activatedByUsername?: string | undefined;
                                activatedByFirstname?: string | undefined;
                                activatedByLastname?: string | undefined;
                            };
                            subStatus: {
                                code: string;
                                value: string;
                                id: number;
                                none: boolean;
                                inactive: boolean;
                                dormant: boolean;
                                escheat: boolean;
                                block: boolean;
                                blockCredit: boolean;
                                blockDebit: boolean;
                            };
                            lastActiveTransactionDate: number[];
                            depositType: {
                                code: string;
                                value: string;
                                id: number;
                            };
                            allowPrepaidCard: boolean;
                            withdrawalFeeForTransfers: boolean;
                            allowOverdraft: boolean;
                            enforceMinRequiredBalance: boolean;
                            withHoldTax: boolean;
                            isDormancyTrackingActive: boolean;
                            isLinkedToFloatingInterestRates: boolean;
                            isBaseLendingRate: boolean;
                            skipCollectTransferCharge: boolean;
                            cardRestricted: boolean;
                            prepaidAccount: boolean;
                            clientName: string;
                            savingsProductId: number;
                            savingsProductName: string;
                            fieldOfficerId: number;
                            nominalAnnualInterestRate: number;
                            interestCompoundingPeriodType: {
                                code: string;
                                value: string;
                                id: number;
                            };
                            interestPostingPeriodType: {
                                code: string;
                                value: string;
                                id: number;
                            };
                            interestCalculationType: {
                                code: string;
                                value: string;
                                id: number;
                            };
                            interestCalculationDaysInYearType: {
                                code: string;
                                value: string;
                                id: number;
                            };
                            lockinPeriodFrequency: number;
                            lockinPeriodFrequencyType: {
                                code: string;
                                value: string;
                                id: number;
                            };
                            onHoldFunds: number;
                            savingsAmountOnHold: number;
                            summary: {
                                currency: {
                                    name: string;
                                    code: string;
                                    decimalPlaces: number;
                                    displaySymbol: string;
                                    nameCode: string;
                                    inMultiplesOf: number;
                                    displayLabel: string;
                                    currencyCodeInDigit?: number | undefined;
                                    isBaseCurrency?: boolean | undefined;
                                };
                                accountBalance: number;
                                availableBalance: number;
                                totalDeposits: number;
                                totalInterestEarned: number;
                                totalInterestPosted: number;
                                totalOverdraftInterestDerived: number;
                                interestNotPosted: number;
                                lastInterestCalculationDate: number[];
                            };
                            interestRateDifferential: number;
                            overdraftInterestRateDifferential: number;
                            floatingRateId: number;
                            isFloatingInterestRateCalculationAllowed: boolean;
                            bankDetails: {
                                name: string;
                                address: string;
                                city: string;
                                routingNumber: string;
                                swiftCode: string;
                                postcode: string;
                            };
                            overdraftLimit: number;
                            minRequiredBalance: number;
                            minBalanceForInterestCalculation: number;
                            minOverdraftForInterestCalculation: number;
                            overdraftMinimumDue: number;
                            currentFloatingInterestPeriod: {
                                fromDate: number[];
                                interestRate: number;
                                isDifferentialToBLR: boolean;
                            };
                            floatingRateName: string;
                            floatingRateDifferential: number;
                            parentAccount: {
                                allowPrepaidCard: boolean;
                                withdrawalFeeForTransfers: boolean;
                                allowOverdraft: boolean;
                                enforceMinRequiredBalance: boolean;
                                withHoldTax: boolean;
                                isDormancyTrackingActive: boolean;
                                isLinkedToFloatingInterestRates: boolean;
                                isBaseLendingRate: boolean;
                                skipCollectTransferCharge: boolean;
                                cardRestricted: boolean;
                                prepaidAccount: boolean;
                            };
                            prepaidLimitAmount: number;
                        } | undefined>;
                    };
                    getFromList: (accountId: number) => {
                        readonly execute: () => Promise<any>;
                    };
                    update: (accountId: number, updates: UpdateAccountRequest) => {
                        execute: () => Promise<any>;
                    };
                    delete: (accountId: number) => {
                        execute: () => Promise<ProcessOutput | undefined>;
                    };
                    where: (field: string) => {
                        eq: (value: any) => {
                            where: (nextField: string) => /*elided*/ any;
                            list: () => {
                                where: (field: string) => /*elided*/ any;
                                execute: () => Promise<unknown>;
                            };
                        };
                    };
                    list: () => {
                        where: (field: string) => {
                            eq: (value: any) => {
                                where: (nextField: string) => /*elided*/ any;
                                list: () => /*elided*/ any;
                            };
                        };
                        execute: () => Promise<unknown>;
                    };
                };
                recipients: {
                    create: (data: CreateRecipientRequest) => {
                        execute: () => Promise<{
                            clientId: number;
                            paymentRail: string;
                            recipientType: string;
                            address: {
                                line1: string;
                                line2: string;
                                stateCode: string;
                                countryCode: string;
                                postalCode: string;
                                city: string;
                            };
                            id: number;
                            emailAddress: string;
                            nickName: string;
                            firstName: string;
                            lastName: string;
                            businessName: string;
                            phoneNumber: string;
                            isOwnAccount: boolean;
                            accountDetailsData: {
                                accountNumber: string;
                                bankInformation: {
                                    routingNumber: string;
                                    swiftCode: string;
                                };
                            };
                        } | undefined>;
                    };
                    get: (recipientId: number) => {
                        readonly execute: () => Promise<{
                            clientId: number;
                            paymentRail: string;
                            recipientType: string;
                            address: {
                                line1: string;
                                line2: string;
                                stateCode: string;
                                countryCode: string;
                                postalCode: string;
                                city: string;
                            };
                            id: number;
                            emailAddress: string;
                            nickName: string;
                            firstName: string;
                            lastName: string;
                            businessName: string;
                            phoneNumber: string;
                            isOwnAccount: boolean;
                            accountDetailsData: {
                                accountNumber: string;
                                bankInformation: {
                                    routingNumber: string;
                                    swiftCode: string;
                                };
                            };
                        } | undefined>;
                    };
                    update: (recipientId: number, updates: UpdateRecipientRequest) => {
                        execute: () => Promise<{
                            updateRecipient: Recipient;
                        } | undefined>;
                    };
                    delete: (recipientId: number) => {
                        execute: () => Promise<ProcessOutput | undefined>;
                    };
                    where: (field: string) => {
                        eq: (value: any) => {
                            where: (nextField: string) => /*elided*/ any;
                            list: () => {
                                where: (field: string) => /*elided*/ any;
                                execute: () => Promise<unknown>;
                            };
                        };
                    };
                    list: () => {
                        where: (field: string) => {
                            eq: (value: any) => {
                                where: (nextField: string) => /*elided*/ any;
                                list: () => /*elided*/ any;
                            };
                        };
                        execute: () => Promise<unknown>;
                    };
                };
            };
            list: () => {
                where: any;
                limit: (value: number) => /*elided*/ any;
                offset: (value: number) => /*elided*/ any;
                all: () => /*elided*/ any;
                execute: () => Promise<unknown>;
            };
        };
    };
};

export { createClient };
