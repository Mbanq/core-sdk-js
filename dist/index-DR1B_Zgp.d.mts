import * as zod from 'zod';
import { z } from 'zod';
import { a as Config, C as Command } from './config.d-CyK6ZM6s.mjs';

declare const PaymentFilterKeySchema: z.ZodEnum<["originatorName", "originatorAccount", "originatorBankRoutingCode", "recipientName", "recipientAccount", "recipientBankRoutingCode", "reference", "traceNumber", "externalId", "clientId", "dateFormat", "locale", "originatedBy", "paymentRail", "paymentType", "fromValueDate", "toValueDate", "fromExecuteDate", "toExecuteDate", "status", "fromReturnDate", "toReturnDate", "isSettlement", "orderBy", "sortOrder"]>;
declare const PaymentStatusSchema: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
declare const PaymentRailSchema: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
declare const PaymentTypeSchema: z.ZodEnum<["CREDIT", "DEBIT"]>;
declare const SortOrderSchema: z.ZodEnum<["ASC", "DESC"]>;
type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
type PaymentRailType = z.infer<typeof PaymentRailSchema>;
type PaymentType = z.infer<typeof PaymentTypeSchema>;
declare const PaymentFilterShape: {
    originatorName: z.ZodOptional<z.ZodString>;
    originatorAccount: z.ZodOptional<z.ZodString>;
    originatorBankRoutingCode: z.ZodOptional<z.ZodString>;
    recipientName: z.ZodOptional<z.ZodString>;
    recipientAccount: z.ZodOptional<z.ZodString>;
    recipientBankRoutingCode: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    traceNumber: z.ZodOptional<z.ZodString>;
    externalId: z.ZodOptional<z.ZodString>;
    clientId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    dateFormat: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    originatedBy: z.ZodOptional<z.ZodString>;
    paymentRail: z.ZodOptional<z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>;
    paymentType: z.ZodOptional<z.ZodEnum<["CREDIT", "DEBIT"]>>;
    fromValueDate: z.ZodOptional<z.ZodString>;
    toValueDate: z.ZodOptional<z.ZodString>;
    fromExecuteDate: z.ZodOptional<z.ZodString>;
    toExecuteDate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
    fromReturnDate: z.ZodOptional<z.ZodString>;
    toReturnDate: z.ZodOptional<z.ZodString>;
    isSettlement: z.ZodOptional<z.ZodBoolean>;
    orderBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodEnum<["ASC", "DESC"]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
};
declare const PaymentFiltersSchema: z.ZodObject<{
    originatorName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originatorAccount: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originatorBankRoutingCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    recipientName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    recipientAccount: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    recipientBankRoutingCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    reference: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    traceNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    externalId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    clientId: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    dateFormat: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locale: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    paymentRail: z.ZodOptional<z.ZodOptional<z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>>;
    paymentType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["CREDIT", "DEBIT"]>>>;
    fromValueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    toValueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    fromExecuteDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    toExecuteDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>>;
    fromReturnDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    toReturnDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isSettlement: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    orderBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodEnum<["ASC", "DESC"]>>>;
    limit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    originatorName?: string | undefined;
    originatorAccount?: string | undefined;
    originatorBankRoutingCode?: string | undefined;
    recipientName?: string | undefined;
    recipientAccount?: string | undefined;
    recipientBankRoutingCode?: string | undefined;
    reference?: string | undefined;
    traceNumber?: string | undefined;
    externalId?: string | undefined;
    clientId?: string | number | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    originatedBy?: string | undefined;
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    paymentType?: "CREDIT" | "DEBIT" | undefined;
    fromValueDate?: string | undefined;
    toValueDate?: string | undefined;
    fromExecuteDate?: string | undefined;
    toExecuteDate?: string | undefined;
    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
    fromReturnDate?: string | undefined;
    toReturnDate?: string | undefined;
    isSettlement?: boolean | undefined;
    orderBy?: string | undefined;
    sortOrder?: "ASC" | "DESC" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}, {
    originatorName?: string | undefined;
    originatorAccount?: string | undefined;
    originatorBankRoutingCode?: string | undefined;
    recipientName?: string | undefined;
    recipientAccount?: string | undefined;
    recipientBankRoutingCode?: string | undefined;
    reference?: string | undefined;
    traceNumber?: string | undefined;
    externalId?: string | undefined;
    clientId?: string | number | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    originatedBy?: string | undefined;
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    paymentType?: "CREDIT" | "DEBIT" | undefined;
    fromValueDate?: string | undefined;
    toValueDate?: string | undefined;
    fromExecuteDate?: string | undefined;
    toExecuteDate?: string | undefined;
    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
    fromReturnDate?: string | undefined;
    toReturnDate?: string | undefined;
    isSettlement?: boolean | undefined;
    orderBy?: string | undefined;
    sortOrder?: "ASC" | "DESC" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
type PaymentFilters = z.infer<typeof PaymentFiltersSchema>;
declare const PaymentSchema: z.ZodObject<{
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
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
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
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
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
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
}, "strip", z.ZodAny, z.objectOutputType<{
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
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
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
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
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
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
}, z.ZodAny, "strip">, z.objectInputType<{
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
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
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
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
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
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
}, z.ZodAny, "strip">>;
declare const CreatePaymentInputSchema: z.ZodEffects<z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>, z.objectOutputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
declare const UpdatePaymentInputSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, "strip", z.ZodAny, z.objectOutputType<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, z.ZodAny, "strip">, z.objectInputType<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, z.ZodAny, "strip">>;
declare const PaymentResponseSchema: z.ZodObject<{
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">>, "many">;
}, "strip", z.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: z.objectOutputType<{
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">[];
}, {
    totalFilteredRecords: number;
    pageItems: z.objectInputType<{
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
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
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">[];
}>;
type Payment = z.infer<typeof PaymentSchema>;
type CreatePaymentInput = z.infer<typeof CreatePaymentInputSchema>;
type UpdatePaymentInput = z.infer<typeof UpdatePaymentInputSchema>;
type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

declare const createClient: (initialConfig: Config) => {
    payment: {
        create: (data: CreatePaymentInput) => {
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodNumber;
                clientId: zod.ZodNumber;
                amount: zod.ZodNumber;
                correlationId: zod.ZodString;
                paymentType: zod.ZodEnum<["CREDIT", "DEBIT"]>;
                paymentRail: zod.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                recipient: zod.ZodObject<{
                    cardId: zod.ZodOptional<zod.ZodString>;
                    recipientType: zod.ZodString;
                    address: zod.ZodObject<{
                        line1: zod.ZodOptional<zod.ZodString>;
                        line2: zod.ZodOptional<zod.ZodString>;
                        stateCode: zod.ZodOptional<zod.ZodString>;
                        countryCode: zod.ZodString;
                        postalCode: zod.ZodOptional<zod.ZodString>;
                    }, "strip", zod.ZodTypeAny, {
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
                    name: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    cardId?: string | undefined;
                }, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    cardId?: string | undefined;
                }>;
                originator: zod.ZodObject<{
                    accountId: zod.ZodOptional<zod.ZodString>;
                    recipientType: zod.ZodString;
                    address: zod.ZodObject<{
                        line1: zod.ZodOptional<zod.ZodString>;
                        line2: zod.ZodOptional<zod.ZodString>;
                        stateCode: zod.ZodOptional<zod.ZodString>;
                        countryCode: zod.ZodString;
                        postalCode: zod.ZodOptional<zod.ZodString>;
                    }, "strip", zod.ZodTypeAny, {
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
                    name: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    accountId?: string | undefined;
                }, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    accountId?: string | undefined;
                }>;
                executedAt: zod.ZodString;
                createdAt: zod.ZodString;
                externalId: zod.ZodString;
                status: zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                paymentRailMetaData: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                currencyData: zod.ZodObject<{
                    code: zod.ZodString;
                    name: zod.ZodString;
                    decimalPlaces: zod.ZodNumber;
                    displaySymbol: zod.ZodString;
                    nameCode: zod.ZodString;
                    currencyCodeInDigit: zod.ZodNumber;
                    isBaseCurrency: zod.ZodBoolean;
                }, "strip", zod.ZodTypeAny, {
                    code: string;
                    name: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }, {
                    code: string;
                    name: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }>;
                currency: zod.ZodString;
            }, zod.ZodAny, "strip"> | undefined>;
        };
        get: (id: number) => {
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodNumber;
                clientId: zod.ZodNumber;
                amount: zod.ZodNumber;
                correlationId: zod.ZodString;
                paymentType: zod.ZodEnum<["CREDIT", "DEBIT"]>;
                paymentRail: zod.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                recipient: zod.ZodObject<{
                    cardId: zod.ZodOptional<zod.ZodString>;
                    recipientType: zod.ZodString;
                    address: zod.ZodObject<{
                        line1: zod.ZodOptional<zod.ZodString>;
                        line2: zod.ZodOptional<zod.ZodString>;
                        stateCode: zod.ZodOptional<zod.ZodString>;
                        countryCode: zod.ZodString;
                        postalCode: zod.ZodOptional<zod.ZodString>;
                    }, "strip", zod.ZodTypeAny, {
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
                    name: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    cardId?: string | undefined;
                }, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    cardId?: string | undefined;
                }>;
                originator: zod.ZodObject<{
                    accountId: zod.ZodOptional<zod.ZodString>;
                    recipientType: zod.ZodString;
                    address: zod.ZodObject<{
                        line1: zod.ZodOptional<zod.ZodString>;
                        line2: zod.ZodOptional<zod.ZodString>;
                        stateCode: zod.ZodOptional<zod.ZodString>;
                        countryCode: zod.ZodString;
                        postalCode: zod.ZodOptional<zod.ZodString>;
                    }, "strip", zod.ZodTypeAny, {
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
                    name: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    accountId?: string | undefined;
                }, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    accountId?: string | undefined;
                }>;
                executedAt: zod.ZodString;
                createdAt: zod.ZodString;
                externalId: zod.ZodString;
                status: zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                paymentRailMetaData: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                currencyData: zod.ZodObject<{
                    code: zod.ZodString;
                    name: zod.ZodString;
                    decimalPlaces: zod.ZodNumber;
                    displaySymbol: zod.ZodString;
                    nameCode: zod.ZodString;
                    currencyCodeInDigit: zod.ZodNumber;
                    isBaseCurrency: zod.ZodBoolean;
                }, "strip", zod.ZodTypeAny, {
                    code: string;
                    name: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }, {
                    code: string;
                    name: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }>;
                currency: zod.ZodString;
            }, zod.ZodAny, "strip"> | undefined>;
        };
        update: (id: number, data: UpdatePaymentInput) => {
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodNumber;
                clientId: zod.ZodNumber;
                amount: zod.ZodNumber;
                correlationId: zod.ZodString;
                paymentType: zod.ZodEnum<["CREDIT", "DEBIT"]>;
                paymentRail: zod.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                recipient: zod.ZodObject<{
                    cardId: zod.ZodOptional<zod.ZodString>;
                    recipientType: zod.ZodString;
                    address: zod.ZodObject<{
                        line1: zod.ZodOptional<zod.ZodString>;
                        line2: zod.ZodOptional<zod.ZodString>;
                        stateCode: zod.ZodOptional<zod.ZodString>;
                        countryCode: zod.ZodString;
                        postalCode: zod.ZodOptional<zod.ZodString>;
                    }, "strip", zod.ZodTypeAny, {
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
                    name: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    cardId?: string | undefined;
                }, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    cardId?: string | undefined;
                }>;
                originator: zod.ZodObject<{
                    accountId: zod.ZodOptional<zod.ZodString>;
                    recipientType: zod.ZodString;
                    address: zod.ZodObject<{
                        line1: zod.ZodOptional<zod.ZodString>;
                        line2: zod.ZodOptional<zod.ZodString>;
                        stateCode: zod.ZodOptional<zod.ZodString>;
                        countryCode: zod.ZodString;
                        postalCode: zod.ZodOptional<zod.ZodString>;
                    }, "strip", zod.ZodTypeAny, {
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
                    name: zod.ZodString;
                }, "strip", zod.ZodTypeAny, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    accountId?: string | undefined;
                }, {
                    recipientType: string;
                    address: {
                        countryCode: string;
                        line1?: string | undefined;
                        line2?: string | undefined;
                        stateCode?: string | undefined;
                        postalCode?: string | undefined;
                    };
                    name: string;
                    accountId?: string | undefined;
                }>;
                executedAt: zod.ZodString;
                createdAt: zod.ZodString;
                externalId: zod.ZodString;
                status: zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                paymentRailMetaData: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                currencyData: zod.ZodObject<{
                    code: zod.ZodString;
                    name: zod.ZodString;
                    decimalPlaces: zod.ZodNumber;
                    displaySymbol: zod.ZodString;
                    nameCode: zod.ZodString;
                    currencyCodeInDigit: zod.ZodNumber;
                    isBaseCurrency: zod.ZodBoolean;
                }, "strip", zod.ZodTypeAny, {
                    code: string;
                    name: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }, {
                    code: string;
                    name: string;
                    decimalPlaces: number;
                    displaySymbol: string;
                    nameCode: string;
                    currencyCodeInDigit: number;
                    isBaseCurrency: boolean;
                }>;
                currency: zod.ZodString;
            }, zod.ZodAny, "strip"> | undefined>;
        };
        delete: (id: number) => {
            execute: () => Promise<void | undefined>;
        };
        list: () => {
            where: any;
            limit: (value: number) => /*elided*/ any;
            offset: (value: number) => /*elided*/ any;
            execute: () => Promise<unknown>;
        };
    };
    setConfig: (config: Config) => void;
    updateConfig: (config: Partial<Config>) => void;
    resetConfig: () => void;
    request: <TOutput>(command: Command<any, TOutput>) => Promise<TOutput | undefined>;
    tenant: (tenantId: string) => {
        payment: {
            create: (data: CreatePaymentInput) => {
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodNumber;
                    clientId: zod.ZodNumber;
                    amount: zod.ZodNumber;
                    correlationId: zod.ZodString;
                    paymentType: zod.ZodEnum<["CREDIT", "DEBIT"]>;
                    paymentRail: zod.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                    recipient: zod.ZodObject<{
                        cardId: zod.ZodOptional<zod.ZodString>;
                        recipientType: zod.ZodString;
                        address: zod.ZodObject<{
                            line1: zod.ZodOptional<zod.ZodString>;
                            line2: zod.ZodOptional<zod.ZodString>;
                            stateCode: zod.ZodOptional<zod.ZodString>;
                            countryCode: zod.ZodString;
                            postalCode: zod.ZodOptional<zod.ZodString>;
                        }, "strip", zod.ZodTypeAny, {
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
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        cardId?: string | undefined;
                    }, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        cardId?: string | undefined;
                    }>;
                    originator: zod.ZodObject<{
                        accountId: zod.ZodOptional<zod.ZodString>;
                        recipientType: zod.ZodString;
                        address: zod.ZodObject<{
                            line1: zod.ZodOptional<zod.ZodString>;
                            line2: zod.ZodOptional<zod.ZodString>;
                            stateCode: zod.ZodOptional<zod.ZodString>;
                            countryCode: zod.ZodString;
                            postalCode: zod.ZodOptional<zod.ZodString>;
                        }, "strip", zod.ZodTypeAny, {
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
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        accountId?: string | undefined;
                    }, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        accountId?: string | undefined;
                    }>;
                    executedAt: zod.ZodString;
                    createdAt: zod.ZodString;
                    externalId: zod.ZodString;
                    status: zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                    paymentRailMetaData: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                    currencyData: zod.ZodObject<{
                        code: zod.ZodString;
                        name: zod.ZodString;
                        decimalPlaces: zod.ZodNumber;
                        displaySymbol: zod.ZodString;
                        nameCode: zod.ZodString;
                        currencyCodeInDigit: zod.ZodNumber;
                        isBaseCurrency: zod.ZodBoolean;
                    }, "strip", zod.ZodTypeAny, {
                        code: string;
                        name: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }, {
                        code: string;
                        name: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }>;
                    currency: zod.ZodString;
                }, zod.ZodAny, "strip"> | undefined>;
            };
            get: (id: number) => {
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodNumber;
                    clientId: zod.ZodNumber;
                    amount: zod.ZodNumber;
                    correlationId: zod.ZodString;
                    paymentType: zod.ZodEnum<["CREDIT", "DEBIT"]>;
                    paymentRail: zod.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                    recipient: zod.ZodObject<{
                        cardId: zod.ZodOptional<zod.ZodString>;
                        recipientType: zod.ZodString;
                        address: zod.ZodObject<{
                            line1: zod.ZodOptional<zod.ZodString>;
                            line2: zod.ZodOptional<zod.ZodString>;
                            stateCode: zod.ZodOptional<zod.ZodString>;
                            countryCode: zod.ZodString;
                            postalCode: zod.ZodOptional<zod.ZodString>;
                        }, "strip", zod.ZodTypeAny, {
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
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        cardId?: string | undefined;
                    }, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        cardId?: string | undefined;
                    }>;
                    originator: zod.ZodObject<{
                        accountId: zod.ZodOptional<zod.ZodString>;
                        recipientType: zod.ZodString;
                        address: zod.ZodObject<{
                            line1: zod.ZodOptional<zod.ZodString>;
                            line2: zod.ZodOptional<zod.ZodString>;
                            stateCode: zod.ZodOptional<zod.ZodString>;
                            countryCode: zod.ZodString;
                            postalCode: zod.ZodOptional<zod.ZodString>;
                        }, "strip", zod.ZodTypeAny, {
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
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        accountId?: string | undefined;
                    }, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        accountId?: string | undefined;
                    }>;
                    executedAt: zod.ZodString;
                    createdAt: zod.ZodString;
                    externalId: zod.ZodString;
                    status: zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                    paymentRailMetaData: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                    currencyData: zod.ZodObject<{
                        code: zod.ZodString;
                        name: zod.ZodString;
                        decimalPlaces: zod.ZodNumber;
                        displaySymbol: zod.ZodString;
                        nameCode: zod.ZodString;
                        currencyCodeInDigit: zod.ZodNumber;
                        isBaseCurrency: zod.ZodBoolean;
                    }, "strip", zod.ZodTypeAny, {
                        code: string;
                        name: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }, {
                        code: string;
                        name: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }>;
                    currency: zod.ZodString;
                }, zod.ZodAny, "strip"> | undefined>;
            };
            update: (id: number, data: UpdatePaymentInput) => {
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodNumber;
                    clientId: zod.ZodNumber;
                    amount: zod.ZodNumber;
                    correlationId: zod.ZodString;
                    paymentType: zod.ZodEnum<["CREDIT", "DEBIT"]>;
                    paymentRail: zod.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
                    recipient: zod.ZodObject<{
                        cardId: zod.ZodOptional<zod.ZodString>;
                        recipientType: zod.ZodString;
                        address: zod.ZodObject<{
                            line1: zod.ZodOptional<zod.ZodString>;
                            line2: zod.ZodOptional<zod.ZodString>;
                            stateCode: zod.ZodOptional<zod.ZodString>;
                            countryCode: zod.ZodString;
                            postalCode: zod.ZodOptional<zod.ZodString>;
                        }, "strip", zod.ZodTypeAny, {
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
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        cardId?: string | undefined;
                    }, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        cardId?: string | undefined;
                    }>;
                    originator: zod.ZodObject<{
                        accountId: zod.ZodOptional<zod.ZodString>;
                        recipientType: zod.ZodString;
                        address: zod.ZodObject<{
                            line1: zod.ZodOptional<zod.ZodString>;
                            line2: zod.ZodOptional<zod.ZodString>;
                            stateCode: zod.ZodOptional<zod.ZodString>;
                            countryCode: zod.ZodString;
                            postalCode: zod.ZodOptional<zod.ZodString>;
                        }, "strip", zod.ZodTypeAny, {
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
                        name: zod.ZodString;
                    }, "strip", zod.ZodTypeAny, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        accountId?: string | undefined;
                    }, {
                        recipientType: string;
                        address: {
                            countryCode: string;
                            line1?: string | undefined;
                            line2?: string | undefined;
                            stateCode?: string | undefined;
                            postalCode?: string | undefined;
                        };
                        name: string;
                        accountId?: string | undefined;
                    }>;
                    executedAt: zod.ZodString;
                    createdAt: zod.ZodString;
                    externalId: zod.ZodString;
                    status: zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
                    paymentRailMetaData: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodAny>>;
                    currencyData: zod.ZodObject<{
                        code: zod.ZodString;
                        name: zod.ZodString;
                        decimalPlaces: zod.ZodNumber;
                        displaySymbol: zod.ZodString;
                        nameCode: zod.ZodString;
                        currencyCodeInDigit: zod.ZodNumber;
                        isBaseCurrency: zod.ZodBoolean;
                    }, "strip", zod.ZodTypeAny, {
                        code: string;
                        name: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }, {
                        code: string;
                        name: string;
                        decimalPlaces: number;
                        displaySymbol: string;
                        nameCode: string;
                        currencyCodeInDigit: number;
                        isBaseCurrency: boolean;
                    }>;
                    currency: zod.ZodString;
                }, zod.ZodAny, "strip"> | undefined>;
            };
            delete: (id: number) => {
                execute: () => Promise<void | undefined>;
            };
            list: () => {
                where: any;
                limit: (value: number) => /*elided*/ any;
                offset: (value: number) => /*elided*/ any;
                execute: () => Promise<unknown>;
            };
        };
    };
};

export { type CreatePaymentInput as C, type Payment as P, SortOrderSchema as S, type UpdatePaymentInput as U, type PaymentResponse as a, type PaymentStatus as b, createClient as c, type PaymentRailType as d, type PaymentType as e, type PaymentFilters as f, PaymentStatusSchema as g, PaymentFilterKeySchema as h, PaymentRailSchema as i, PaymentTypeSchema as j, CreatePaymentInputSchema as k, UpdatePaymentInputSchema as l, PaymentResponseSchema as m, PaymentFiltersSchema as n, PaymentFilterShape as o };
