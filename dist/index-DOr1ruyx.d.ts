import { a as Config, C as Command } from './config.d-CyK6ZM6s.js';
import * as zod from 'zod';
import { z } from 'zod';

declare const PaymentFilterKeySchema: z.ZodEnum<["originatorName", "originatorAccount", "originatorBankRoutingCode", "recipientName", "recipientAccount", "recipientBankRoutingCode", "reference", "traceNumber", "externalId", "clientId", "dateFormat", "locale", "originatedBy", "paymentRail", "paymentType", "fromValueDate", "toValueDate", "fromExecuteDate", "toExecuteDate", "status", "fromReturnDate", "toReturnDate", "isSettlement", "orderBy", "sortOrder"]>;
declare const PaymentStatusSchema: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
declare const PaymentRailSchema: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
declare const PaymentTypeSchema: z.ZodEnum<["CREDIT", "DEBIT"]>;
declare const SortOrderSchema: z.ZodEnum<["ASC", "DESC"]>;
type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
type PaymentRailType = z.infer<typeof PaymentRailSchema>;
type PaymentType = z.infer<typeof PaymentTypeSchema>;
declare const PaymentSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    clientId: z.ZodString;
    currency: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    id: z.ZodString;
    amount: z.ZodNumber;
    clientId: z.ZodString;
    currency: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    id: z.ZodString;
    amount: z.ZodNumber;
    clientId: z.ZodString;
    currency: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
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
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
            address?: {
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
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
        id: z.ZodString;
        amount: z.ZodNumber;
        clientId: z.ZodString;
        currency: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodAny, z.objectOutputType<{
        id: z.ZodString;
        amount: z.ZodNumber;
        clientId: z.ZodString;
        currency: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">, z.objectInputType<{
        id: z.ZodString;
        amount: z.ZodNumber;
        clientId: z.ZodString;
        currency: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">>, "many">;
}, "strip", z.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: z.objectOutputType<{
        id: z.ZodString;
        amount: z.ZodNumber;
        clientId: z.ZodString;
        currency: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">[];
}, {
    totalFilteredRecords: number;
    pageItems: z.objectInputType<{
        id: z.ZodString;
        amount: z.ZodNumber;
        clientId: z.ZodString;
        currency: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">[];
}>;
type Payment = z.infer<typeof PaymentSchema>;
type CreatePaymentInput = z.infer<typeof CreatePaymentInputSchema>;
type UpdatePaymentInput = z.infer<typeof UpdatePaymentInputSchema>;
type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

declare const createClient: (initialConfig: Config) => {
    payment: {
        create: (data: CreatePaymentInput) => Promise<{
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodString;
                amount: zod.ZodNumber;
                clientId: zod.ZodString;
                currency: zod.ZodString;
                status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                createdAt: zod.ZodOptional<zod.ZodString>;
                updatedAt: zod.ZodOptional<zod.ZodString>;
            }, zod.ZodAny, "strip"> | undefined>;
        }>;
        get: (id: string) => Promise<{
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodString;
                amount: zod.ZodNumber;
                clientId: zod.ZodString;
                currency: zod.ZodString;
                status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                createdAt: zod.ZodOptional<zod.ZodString>;
                updatedAt: zod.ZodOptional<zod.ZodString>;
            }, zod.ZodAny, "strip"> | undefined>;
        }>;
        update: (id: string, data: UpdatePaymentInput) => Promise<{
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodString;
                amount: zod.ZodNumber;
                clientId: zod.ZodString;
                currency: zod.ZodString;
                status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                createdAt: zod.ZodOptional<zod.ZodString>;
                updatedAt: zod.ZodOptional<zod.ZodString>;
            }, zod.ZodAny, "strip"> | undefined>;
        }>;
        delete: (id: string) => Promise<{
            execute: () => Promise<void | undefined>;
        }>;
        list: () => {
            where: (field: string) => {
                eq: (value: any) => {
                    where: /*elided*/ any;
                    limit: (value: number) => /*elided*/ any;
                    offset: (value: number) => /*elided*/ any;
                    execute: () => Command<any, Array<Payment>>;
                };
            };
            limit: (value: number) => {
                where: (field: string) => {
                    eq: (value: any) => /*elided*/ any;
                };
                limit: /*elided*/ any;
                offset: (value: number) => /*elided*/ any;
                execute: () => Command<any, Array<Payment>>;
            };
            offset: (value: number) => {
                where: (field: string) => {
                    eq: (value: any) => /*elided*/ any;
                };
                limit: (value: number) => /*elided*/ any;
                offset: /*elided*/ any;
                execute: () => Command<any, Array<Payment>>;
            };
            execute: () => Promise<zod.objectOutputType<{
                id: zod.ZodString;
                amount: zod.ZodNumber;
                clientId: zod.ZodString;
                currency: zod.ZodString;
                status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                createdAt: zod.ZodOptional<zod.ZodString>;
                updatedAt: zod.ZodOptional<zod.ZodString>;
            }, zod.ZodAny, "strip">[] | undefined>;
        };
    };
    setConfig: (config: Config) => void;
    updateConfig: (config: Partial<Config>) => void;
    resetConfig: () => void;
    request: <TOutput>(command: Command<any, TOutput>) => Promise<TOutput | undefined>;
    tenant: (tenantId: string) => {
        payment: {
            create: (data: CreatePaymentInput) => Promise<{
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodString;
                    amount: zod.ZodNumber;
                    clientId: zod.ZodString;
                    currency: zod.ZodString;
                    status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                    createdAt: zod.ZodOptional<zod.ZodString>;
                    updatedAt: zod.ZodOptional<zod.ZodString>;
                }, zod.ZodAny, "strip"> | undefined>;
            }>;
            get: (id: string) => Promise<{
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodString;
                    amount: zod.ZodNumber;
                    clientId: zod.ZodString;
                    currency: zod.ZodString;
                    status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                    createdAt: zod.ZodOptional<zod.ZodString>;
                    updatedAt: zod.ZodOptional<zod.ZodString>;
                }, zod.ZodAny, "strip"> | undefined>;
            }>;
            update: (id: string, data: UpdatePaymentInput) => Promise<{
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodString;
                    amount: zod.ZodNumber;
                    clientId: zod.ZodString;
                    currency: zod.ZodString;
                    status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                    createdAt: zod.ZodOptional<zod.ZodString>;
                    updatedAt: zod.ZodOptional<zod.ZodString>;
                }, zod.ZodAny, "strip"> | undefined>;
            }>;
            delete: (id: string) => Promise<{
                execute: () => Promise<void | undefined>;
            }>;
            list: () => {
                where: (field: string) => {
                    eq: (value: any) => {
                        where: /*elided*/ any;
                        limit: (value: number) => /*elided*/ any;
                        offset: (value: number) => /*elided*/ any;
                        execute: () => Command<any, Array<Payment>>;
                    };
                };
                limit: (value: number) => {
                    where: (field: string) => {
                        eq: (value: any) => /*elided*/ any;
                    };
                    limit: /*elided*/ any;
                    offset: (value: number) => /*elided*/ any;
                    execute: () => Command<any, Array<Payment>>;
                };
                offset: (value: number) => {
                    where: (field: string) => {
                        eq: (value: any) => /*elided*/ any;
                    };
                    limit: (value: number) => /*elided*/ any;
                    offset: /*elided*/ any;
                    execute: () => Command<any, Array<Payment>>;
                };
                execute: () => Promise<zod.objectOutputType<{
                    id: zod.ZodString;
                    amount: zod.ZodNumber;
                    clientId: zod.ZodString;
                    currency: zod.ZodString;
                    status: zod.ZodOptional<zod.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
                    createdAt: zod.ZodOptional<zod.ZodString>;
                    updatedAt: zod.ZodOptional<zod.ZodString>;
                }, zod.ZodAny, "strip">[] | undefined>;
            };
        };
    };
};

export { type CreatePaymentInput as C, type Payment as P, SortOrderSchema as S, type UpdatePaymentInput as U, type PaymentResponse as a, type PaymentStatus as b, createClient as c, type PaymentRailType as d, type PaymentType as e, PaymentStatusSchema as f, PaymentFilterKeySchema as g, PaymentRailSchema as h, PaymentTypeSchema as i, CreatePaymentInputSchema as j, UpdatePaymentInputSchema as k, PaymentResponseSchema as l };
