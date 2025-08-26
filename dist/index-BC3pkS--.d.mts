import { a as Config, b as CreateClientRequest, U as UpdateClientRequest, P as ProcessOutput, c as UpdateClientIdentifierRequest, C as Command } from './client-DhU5QMWd.mjs';
import * as z from 'zod';
import { z as z$1 } from 'zod';

declare const PaymentFilterKeySchema: z$1.ZodEnum<["originatorName", "originatorAccount", "originatorBankRoutingCode", "recipientName", "recipientAccount", "recipientBankRoutingCode", "reference", "traceNumber", "externalId", "clientId", "dateFormat", "locale", "originatedBy", "paymentRail", "paymentType", "fromValueDate", "toValueDate", "fromExecuteDate", "toExecuteDate", "status", "fromReturnDate", "toReturnDate", "isSettlement", "orderBy", "sortOrder"]>;
declare const PaymentStatusSchema: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
declare const PaymentRailSchema: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
declare const PaymentTypeSchema: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
declare const SortOrderSchema: z$1.ZodEnum<["ASC", "DESC"]>;
type PaymentStatus = z$1.infer<typeof PaymentStatusSchema>;
type PaymentRailType = z$1.infer<typeof PaymentRailSchema>;
type PaymentType = z$1.infer<typeof PaymentTypeSchema>;
declare const PaymentFilterShape: {
    originatorName: z$1.ZodOptional<z$1.ZodString>;
    originatorAccount: z$1.ZodOptional<z$1.ZodString>;
    originatorBankRoutingCode: z$1.ZodOptional<z$1.ZodString>;
    recipientName: z$1.ZodOptional<z$1.ZodString>;
    recipientAccount: z$1.ZodOptional<z$1.ZodString>;
    recipientBankRoutingCode: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodString>;
    traceNumber: z$1.ZodOptional<z$1.ZodString>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    clientId: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
    locale: z$1.ZodOptional<z$1.ZodString>;
    originatedBy: z$1.ZodOptional<z$1.ZodString>;
    paymentRail: z$1.ZodOptional<z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>;
    paymentType: z$1.ZodOptional<z$1.ZodEnum<["CREDIT", "DEBIT"]>>;
    fromValueDate: z$1.ZodOptional<z$1.ZodString>;
    toValueDate: z$1.ZodOptional<z$1.ZodString>;
    fromExecuteDate: z$1.ZodOptional<z$1.ZodString>;
    toExecuteDate: z$1.ZodOptional<z$1.ZodString>;
    status: z$1.ZodOptional<z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
    fromReturnDate: z$1.ZodOptional<z$1.ZodString>;
    toReturnDate: z$1.ZodOptional<z$1.ZodString>;
    isSettlement: z$1.ZodOptional<z$1.ZodBoolean>;
    orderBy: z$1.ZodOptional<z$1.ZodString>;
    sortOrder: z$1.ZodOptional<z$1.ZodEnum<["ASC", "DESC"]>>;
    limit: z$1.ZodOptional<z$1.ZodNumber>;
    offset: z$1.ZodOptional<z$1.ZodNumber>;
};
declare const PaymentFiltersSchema: z$1.ZodObject<{
    originatorName: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    originatorAccount: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    originatorBankRoutingCode: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    recipientName: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    recipientAccount: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    recipientBankRoutingCode: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    reference: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    traceNumber: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    externalId: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    clientId: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>>>;
    dateFormat: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    locale: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    originatedBy: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    paymentRail: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>>;
    paymentType: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodEnum<["CREDIT", "DEBIT"]>>>;
    fromValueDate: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    toValueDate: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    fromExecuteDate: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    toExecuteDate: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    status: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>>;
    fromReturnDate: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    toReturnDate: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    isSettlement: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    orderBy: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodString>>;
    sortOrder: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodEnum<["ASC", "DESC"]>>>;
    limit: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodNumber>>;
    offset: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodNumber>>;
}, "strip", z$1.ZodTypeAny, {
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
type PaymentFilters = z$1.infer<typeof PaymentFiltersSchema>;
declare const PaymentShape: {
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    amount: z$1.ZodNumber;
    correlationId: z$1.ZodString;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z$1.ZodObject<{
        cardId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    originator: z$1.ZodObject<{
        accountId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    executedAt: z$1.ZodString;
    createdAt: z$1.ZodString;
    externalId: z$1.ZodString;
    status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    currencyData: z$1.ZodObject<{
        code: z$1.ZodString;
        name: z$1.ZodString;
        decimalPlaces: z$1.ZodNumber;
        displaySymbol: z$1.ZodString;
        nameCode: z$1.ZodString;
        currencyCodeInDigit: z$1.ZodNumber;
        isBaseCurrency: z$1.ZodBoolean;
    }, "strip", z$1.ZodTypeAny, {
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
    currency: z$1.ZodString;
};
declare const PaymentSchema: z$1.ZodObject<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    amount: z$1.ZodNumber;
    correlationId: z$1.ZodString;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z$1.ZodObject<{
        cardId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    originator: z$1.ZodObject<{
        accountId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    executedAt: z$1.ZodString;
    createdAt: z$1.ZodString;
    externalId: z$1.ZodString;
    status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    currencyData: z$1.ZodObject<{
        code: z$1.ZodString;
        name: z$1.ZodString;
        decimalPlaces: z$1.ZodNumber;
        displaySymbol: z$1.ZodString;
        nameCode: z$1.ZodString;
        currencyCodeInDigit: z$1.ZodNumber;
        isBaseCurrency: z$1.ZodBoolean;
    }, "strip", z$1.ZodTypeAny, {
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
    currency: z$1.ZodString;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    amount: z$1.ZodNumber;
    correlationId: z$1.ZodString;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z$1.ZodObject<{
        cardId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    originator: z$1.ZodObject<{
        accountId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    executedAt: z$1.ZodString;
    createdAt: z$1.ZodString;
    externalId: z$1.ZodString;
    status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    currencyData: z$1.ZodObject<{
        code: z$1.ZodString;
        name: z$1.ZodString;
        decimalPlaces: z$1.ZodNumber;
        displaySymbol: z$1.ZodString;
        nameCode: z$1.ZodString;
        currencyCodeInDigit: z$1.ZodNumber;
        isBaseCurrency: z$1.ZodBoolean;
    }, "strip", z$1.ZodTypeAny, {
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
    currency: z$1.ZodString;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    amount: z$1.ZodNumber;
    correlationId: z$1.ZodString;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z$1.ZodObject<{
        cardId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    originator: z$1.ZodObject<{
        accountId: z$1.ZodOptional<z$1.ZodString>;
        recipientType: z$1.ZodString;
        address: z$1.ZodObject<{
            line1: z$1.ZodOptional<z$1.ZodString>;
            line2: z$1.ZodOptional<z$1.ZodString>;
            stateCode: z$1.ZodOptional<z$1.ZodString>;
            countryCode: z$1.ZodString;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
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
    executedAt: z$1.ZodString;
    createdAt: z$1.ZodString;
    externalId: z$1.ZodString;
    status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    currencyData: z$1.ZodObject<{
        code: z$1.ZodString;
        name: z$1.ZodString;
        decimalPlaces: z$1.ZodNumber;
        displaySymbol: z$1.ZodString;
        nameCode: z$1.ZodString;
        currencyCodeInDigit: z$1.ZodNumber;
        isBaseCurrency: z$1.ZodBoolean;
    }, "strip", z$1.ZodTypeAny, {
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
    currency: z$1.ZodString;
}, z$1.ZodAny, "strip">>;
declare const CreatePaymentInputShape: {
    amount: z$1.ZodNumber;
    currency: z$1.ZodString;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    creditor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    clientId: z$1.ZodOptional<z$1.ZodString>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    chargeBearer: z$1.ZodOptional<z$1.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z$1.ZodOptional<z$1.ZodString>;
    valueDate: z$1.ZodOptional<z$1.ZodString>;
    executionDate: z$1.ZodOptional<z$1.ZodString>;
};
declare const CreatePaymentInputSchema: z$1.ZodEffects<z$1.ZodObject<{
    amount: z$1.ZodNumber;
    currency: z$1.ZodString;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    creditor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    clientId: z$1.ZodOptional<z$1.ZodString>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    chargeBearer: z$1.ZodOptional<z$1.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z$1.ZodOptional<z$1.ZodString>;
    valueDate: z$1.ZodOptional<z$1.ZodString>;
    executionDate: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    amount: z$1.ZodNumber;
    currency: z$1.ZodString;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    creditor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    clientId: z$1.ZodOptional<z$1.ZodString>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    chargeBearer: z$1.ZodOptional<z$1.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z$1.ZodOptional<z$1.ZodString>;
    valueDate: z$1.ZodOptional<z$1.ZodString>;
    executionDate: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    amount: z$1.ZodNumber;
    currency: z$1.ZodString;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    creditor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    clientId: z$1.ZodOptional<z$1.ZodString>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    chargeBearer: z$1.ZodOptional<z$1.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z$1.ZodOptional<z$1.ZodString>;
    valueDate: z$1.ZodOptional<z$1.ZodString>;
    executionDate: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">>, z$1.objectOutputType<{
    amount: z$1.ZodNumber;
    currency: z$1.ZodString;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    creditor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    clientId: z$1.ZodOptional<z$1.ZodString>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    chargeBearer: z$1.ZodOptional<z$1.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z$1.ZodOptional<z$1.ZodString>;
    valueDate: z$1.ZodOptional<z$1.ZodString>;
    executionDate: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    amount: z$1.ZodNumber;
    currency: z$1.ZodString;
    paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    creditor: z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    clientId: z$1.ZodOptional<z$1.ZodString>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodString;
        identifier: z$1.ZodString;
        accountType: z$1.ZodOptional<z$1.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z$1.ZodOptional<z$1.ZodObject<{
            streetAddress: z$1.ZodOptional<z$1.ZodString>;
            city: z$1.ZodOptional<z$1.ZodString>;
            state: z$1.ZodOptional<z$1.ZodString>;
            country: z$1.ZodOptional<z$1.ZodString>;
            postalCode: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
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
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
            address: z$1.ZodOptional<z$1.ZodObject<{
                streetAddress: z$1.ZodOptional<z$1.ZodString>;
                city: z$1.ZodOptional<z$1.ZodString>;
                state: z$1.ZodOptional<z$1.ZodString>;
                country: z$1.ZodOptional<z$1.ZodString>;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
        }, "strip", z$1.ZodTypeAny, {
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
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    chargeBearer: z$1.ZodOptional<z$1.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z$1.ZodOptional<z$1.ZodString>;
    valueDate: z$1.ZodOptional<z$1.ZodString>;
    executionDate: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">>;
declare const UpdatePaymentInputShape: {
    amount: z$1.ZodOptional<z$1.ZodNumber>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    debtor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    errorCode: z$1.ZodOptional<z$1.ZodString>;
    errorMessage: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    status: z$1.ZodOptional<z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
};
declare const UpdatePaymentInputSchema: z$1.ZodObject<{
    amount: z$1.ZodOptional<z$1.ZodNumber>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    debtor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    errorCode: z$1.ZodOptional<z$1.ZodString>;
    errorMessage: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    status: z$1.ZodOptional<z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    amount: z$1.ZodOptional<z$1.ZodNumber>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    debtor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    errorCode: z$1.ZodOptional<z$1.ZodString>;
    errorMessage: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    status: z$1.ZodOptional<z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    amount: z$1.ZodOptional<z$1.ZodNumber>;
    correspondent: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    debtor: z$1.ZodOptional<z$1.ZodObject<{
        name: z$1.ZodOptional<z$1.ZodString>;
        identifier: z$1.ZodOptional<z$1.ZodString>;
        accountType: z$1.ZodOptional<z$1.ZodString>;
        agent: z$1.ZodOptional<z$1.ZodObject<{
            name: z$1.ZodOptional<z$1.ZodString>;
            identifier: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
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
    exchangeRate: z$1.ZodOptional<z$1.ZodNumber>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    errorCode: z$1.ZodOptional<z$1.ZodString>;
    errorMessage: z$1.ZodOptional<z$1.ZodString>;
    reference: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodString, "many">]>>;
    paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
    status: z$1.ZodOptional<z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, z$1.ZodAny, "strip">>;
declare const PaymentResponseSchema: z$1.ZodObject<{
    totalFilteredRecords: z$1.ZodNumber;
    pageItems: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        amount: z$1.ZodNumber;
        correlationId: z$1.ZodString;
        paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z$1.ZodObject<{
            cardId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        originator: z$1.ZodObject<{
            accountId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        executedAt: z$1.ZodString;
        createdAt: z$1.ZodString;
        externalId: z$1.ZodString;
        status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
        currencyData: z$1.ZodObject<{
            code: z$1.ZodString;
            name: z$1.ZodString;
            decimalPlaces: z$1.ZodNumber;
            displaySymbol: z$1.ZodString;
            nameCode: z$1.ZodString;
            currencyCodeInDigit: z$1.ZodNumber;
            isBaseCurrency: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
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
        currency: z$1.ZodString;
    }, "strip", z$1.ZodAny, z$1.objectOutputType<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        amount: z$1.ZodNumber;
        correlationId: z$1.ZodString;
        paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z$1.ZodObject<{
            cardId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        originator: z$1.ZodObject<{
            accountId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        executedAt: z$1.ZodString;
        createdAt: z$1.ZodString;
        externalId: z$1.ZodString;
        status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
        currencyData: z$1.ZodObject<{
            code: z$1.ZodString;
            name: z$1.ZodString;
            decimalPlaces: z$1.ZodNumber;
            displaySymbol: z$1.ZodString;
            nameCode: z$1.ZodString;
            currencyCodeInDigit: z$1.ZodNumber;
            isBaseCurrency: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
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
        currency: z$1.ZodString;
    }, z$1.ZodAny, "strip">, z$1.objectInputType<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        amount: z$1.ZodNumber;
        correlationId: z$1.ZodString;
        paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z$1.ZodObject<{
            cardId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        originator: z$1.ZodObject<{
            accountId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        executedAt: z$1.ZodString;
        createdAt: z$1.ZodString;
        externalId: z$1.ZodString;
        status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
        currencyData: z$1.ZodObject<{
            code: z$1.ZodString;
            name: z$1.ZodString;
            decimalPlaces: z$1.ZodNumber;
            displaySymbol: z$1.ZodString;
            nameCode: z$1.ZodString;
            currencyCodeInDigit: z$1.ZodNumber;
            isBaseCurrency: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
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
        currency: z$1.ZodString;
    }, z$1.ZodAny, "strip">>, "many">;
}, "strip", z$1.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: z$1.objectOutputType<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        amount: z$1.ZodNumber;
        correlationId: z$1.ZodString;
        paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z$1.ZodObject<{
            cardId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        originator: z$1.ZodObject<{
            accountId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        executedAt: z$1.ZodString;
        createdAt: z$1.ZodString;
        externalId: z$1.ZodString;
        status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
        currencyData: z$1.ZodObject<{
            code: z$1.ZodString;
            name: z$1.ZodString;
            decimalPlaces: z$1.ZodNumber;
            displaySymbol: z$1.ZodString;
            nameCode: z$1.ZodString;
            currencyCodeInDigit: z$1.ZodNumber;
            isBaseCurrency: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
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
        currency: z$1.ZodString;
    }, z$1.ZodAny, "strip">[];
}, {
    totalFilteredRecords: number;
    pageItems: z$1.objectInputType<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        amount: z$1.ZodNumber;
        correlationId: z$1.ZodString;
        paymentType: z$1.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z$1.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z$1.ZodObject<{
            cardId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        originator: z$1.ZodObject<{
            accountId: z$1.ZodOptional<z$1.ZodString>;
            recipientType: z$1.ZodString;
            address: z$1.ZodObject<{
                line1: z$1.ZodOptional<z$1.ZodString>;
                line2: z$1.ZodOptional<z$1.ZodString>;
                stateCode: z$1.ZodOptional<z$1.ZodString>;
                countryCode: z$1.ZodString;
                postalCode: z$1.ZodOptional<z$1.ZodString>;
            }, "strip", z$1.ZodTypeAny, {
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
            name: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
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
        executedAt: z$1.ZodString;
        createdAt: z$1.ZodString;
        externalId: z$1.ZodString;
        status: z$1.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z$1.ZodOptional<z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>>;
        currencyData: z$1.ZodObject<{
            code: z$1.ZodString;
            name: z$1.ZodString;
            decimalPlaces: z$1.ZodNumber;
            displaySymbol: z$1.ZodString;
            nameCode: z$1.ZodString;
            currencyCodeInDigit: z$1.ZodNumber;
            isBaseCurrency: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
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
        currency: z$1.ZodString;
    }, z$1.ZodAny, "strip">[];
}>;
type Payment = z$1.infer<typeof PaymentSchema>;
type CreatePaymentInput = z$1.infer<typeof CreatePaymentInputSchema>;
type UpdatePaymentInput = z$1.infer<typeof UpdatePaymentInputSchema>;
type PaymentResponse = z$1.infer<typeof PaymentResponseSchema>;

declare const createClient: (initialConfig: Config) => {
    payment: {
        create: (data: CreatePaymentInput) => {
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
            }, z.ZodAny, "strip"> | undefined>;
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
        payment: {
            create: (data: CreatePaymentInput) => {
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
                }, z.ZodAny, "strip"> | undefined>;
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

export { type CreatePaymentInput as C, type Payment as P, SortOrderSchema as S, type UpdatePaymentInput as U, type PaymentFilters as a, type PaymentResponse as b, createClient as c, type PaymentStatus as d, type PaymentRailType as e, type PaymentType as f, PaymentStatusSchema as g, PaymentFilterKeySchema as h, PaymentRailSchema as i, PaymentTypeSchema as j, CreatePaymentInputSchema as k, UpdatePaymentInputSchema as l, PaymentResponseSchema as m, PaymentFiltersSchema as n, PaymentFilterShape as o, PaymentShape as p, CreatePaymentInputShape as q, UpdatePaymentInputShape as r };
