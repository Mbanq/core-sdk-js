import { a as Config, C as Command } from './config.d-CyK6ZM6s.js';
import { z } from 'zod';

declare const PaymentFilterKeySchema: z.ZodEnum<{
    originatorName: "originatorName";
    originatorAccount: "originatorAccount";
    originatorBankRoutingCode: "originatorBankRoutingCode";
    recipientName: "recipientName";
    recipientAccount: "recipientAccount";
    recipientBankRoutingCode: "recipientBankRoutingCode";
    reference: "reference";
    traceNumber: "traceNumber";
    externalId: "externalId";
    clientId: "clientId";
    dateFormat: "dateFormat";
    locale: "locale";
    originatedBy: "originatedBy";
    paymentRail: "paymentRail";
    paymentType: "paymentType";
    fromValueDate: "fromValueDate";
    toValueDate: "toValueDate";
    fromExecuteDate: "fromExecuteDate";
    toExecuteDate: "toExecuteDate";
    status: "status";
    fromReturnDate: "fromReturnDate";
    toReturnDate: "toReturnDate";
    isSettlement: "isSettlement";
    orderBy: "orderBy";
    sortOrder: "sortOrder";
}>;
declare const PaymentStatusSchema: z.ZodEnum<{
    DRAFT: "DRAFT";
    AML_SCREENING: "AML_SCREENING";
    AML_REJECTED: "AML_REJECTED";
    EXECUTION_SCHEDULED: "EXECUTION_SCHEDULED";
    EXECUTION_PROCESSING: "EXECUTION_PROCESSING";
    EXECUTION_SUCCESS: "EXECUTION_SUCCESS";
    EXECUTION_FAILURE: "EXECUTION_FAILURE";
    RETURNED: "RETURNED";
    CANCELLED: "CANCELLED";
    COMPLIANCE_FAILURE: "COMPLIANCE_FAILURE";
    DELETED: "DELETED";
    UNKNOWN: "UNKNOWN";
}>;
declare const PaymentRailSchema: z.ZodEnum<{
    ACH: "ACH";
    SAMEDAYACH: "SAMEDAYACH";
    WIRE: "WIRE";
    SWIFT: "SWIFT";
    INTERNAL: "INTERNAL";
    FXPAY: "FXPAY";
    CARD: "CARD";
}>;
declare const PaymentTypeSchema: z.ZodEnum<{
    CREDIT: "CREDIT";
    DEBIT: "DEBIT";
}>;
declare const SortOrderSchema: z.ZodEnum<{
    ASC: "ASC";
    DESC: "DESC";
}>;
type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
type PaymentRailType = z.infer<typeof PaymentRailSchema>;
type PaymentType = z.infer<typeof PaymentTypeSchema>;
declare const PaymentSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    clientId: z.ZodString;
    currency: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        AML_SCREENING: "AML_SCREENING";
        AML_REJECTED: "AML_REJECTED";
        EXECUTION_SCHEDULED: "EXECUTION_SCHEDULED";
        EXECUTION_PROCESSING: "EXECUTION_PROCESSING";
        EXECUTION_SUCCESS: "EXECUTION_SUCCESS";
        EXECUTION_FAILURE: "EXECUTION_FAILURE";
        RETURNED: "RETURNED";
        CANCELLED: "CANCELLED";
        COMPLIANCE_FAILURE: "COMPLIANCE_FAILURE";
        DELETED: "DELETED";
        UNKNOWN: "UNKNOWN";
    }>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$catchall<z.ZodAny>>;
declare const CreatePaymentInputSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<{
        ACH: "ACH";
        SAMEDAYACH: "SAMEDAYACH";
        WIRE: "WIRE";
        SWIFT: "SWIFT";
        INTERNAL: "INTERNAL";
        FXPAY: "FXPAY";
        CARD: "CARD";
    }>;
    paymentType: z.ZodEnum<{
        CREDIT: "CREDIT";
        DEBIT: "DEBIT";
    }>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<{
            CHECKING: "CHECKING";
            SAVINGS: "SAVINGS";
        }>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<{
            CHECKING: "CHECKING";
            SAVINGS: "SAVINGS";
        }>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<{
            CHECKING: "CHECKING";
            SAVINGS: "SAVINGS";
        }>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<{
        OUR: "OUR";
        BEN: "BEN";
        SHA: "SHA";
    }>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.core.$catchall<z.ZodAny>>;
declare const UpdatePaymentInputSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        AML_SCREENING: "AML_SCREENING";
        AML_REJECTED: "AML_REJECTED";
        EXECUTION_SCHEDULED: "EXECUTION_SCHEDULED";
        EXECUTION_PROCESSING: "EXECUTION_PROCESSING";
        EXECUTION_SUCCESS: "EXECUTION_SUCCESS";
        EXECUTION_FAILURE: "EXECUTION_FAILURE";
        RETURNED: "RETURNED";
        CANCELLED: "CANCELLED";
        COMPLIANCE_FAILURE: "COMPLIANCE_FAILURE";
        DELETED: "DELETED";
        UNKNOWN: "UNKNOWN";
    }>>;
}, z.core.$catchall<z.ZodAny>>;
declare const PaymentResponseSchema: z.ZodObject<{
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        clientId: z.ZodString;
        currency: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<{
            DRAFT: "DRAFT";
            AML_SCREENING: "AML_SCREENING";
            AML_REJECTED: "AML_REJECTED";
            EXECUTION_SCHEDULED: "EXECUTION_SCHEDULED";
            EXECUTION_PROCESSING: "EXECUTION_PROCESSING";
            EXECUTION_SUCCESS: "EXECUTION_SUCCESS";
            EXECUTION_FAILURE: "EXECUTION_FAILURE";
            RETURNED: "RETURNED";
            CANCELLED: "CANCELLED";
            COMPLIANCE_FAILURE: "COMPLIANCE_FAILURE";
            DELETED: "DELETED";
            UNKNOWN: "UNKNOWN";
        }>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.core.$catchall<z.ZodAny>>>;
}, z.core.$strip>;
type Payment = z.infer<typeof PaymentSchema>;
type CreatePaymentInput = z.infer<typeof CreatePaymentInputSchema>;
type UpdatePaymentInput = z.infer<typeof UpdatePaymentInputSchema>;
type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

declare const createClient: (initialConfig: Config) => {
    payment: {
        create: (data: CreatePaymentInput) => Promise<{
            execute: () => Promise<{
                [x: string]: any;
                id: string;
                amount: number;
                clientId: string;
                currency: string;
                status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                createdAt?: string | undefined;
                updatedAt?: string | undefined;
            } | undefined>;
        }>;
        get: (id: string) => Promise<{
            execute: () => Promise<{
                [x: string]: any;
                id: string;
                amount: number;
                clientId: string;
                currency: string;
                status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                createdAt?: string | undefined;
                updatedAt?: string | undefined;
            } | undefined>;
        }>;
        update: (id: string, data: UpdatePaymentInput) => Promise<{
            execute: () => Promise<{
                [x: string]: any;
                id: string;
                amount: number;
                clientId: string;
                currency: string;
                status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                createdAt?: string | undefined;
                updatedAt?: string | undefined;
            } | undefined>;
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
            execute: () => Promise<{
                [x: string]: any;
                id: string;
                amount: number;
                clientId: string;
                currency: string;
                status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                createdAt?: string | undefined;
                updatedAt?: string | undefined;
            }[] | undefined>;
        };
    };
    setConfig: (config: Config) => void;
    updateConfig: (config: Partial<Config>) => void;
    resetConfig: () => void;
    request: <TOutput>(command: Command<any, TOutput>) => Promise<TOutput | undefined>;
    tenant: (tenantId: string) => {
        payment: {
            create: (data: CreatePaymentInput) => Promise<{
                execute: () => Promise<{
                    [x: string]: any;
                    id: string;
                    amount: number;
                    clientId: string;
                    currency: string;
                    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                    createdAt?: string | undefined;
                    updatedAt?: string | undefined;
                } | undefined>;
            }>;
            get: (id: string) => Promise<{
                execute: () => Promise<{
                    [x: string]: any;
                    id: string;
                    amount: number;
                    clientId: string;
                    currency: string;
                    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                    createdAt?: string | undefined;
                    updatedAt?: string | undefined;
                } | undefined>;
            }>;
            update: (id: string, data: UpdatePaymentInput) => Promise<{
                execute: () => Promise<{
                    [x: string]: any;
                    id: string;
                    amount: number;
                    clientId: string;
                    currency: string;
                    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                    createdAt?: string | undefined;
                    updatedAt?: string | undefined;
                } | undefined>;
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
                execute: () => Promise<{
                    [x: string]: any;
                    id: string;
                    amount: number;
                    clientId: string;
                    currency: string;
                    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
                    createdAt?: string | undefined;
                    updatedAt?: string | undefined;
                }[] | undefined>;
            };
        };
    };
};

export { type CreatePaymentInput as C, type Payment as P, SortOrderSchema as S, type UpdatePaymentInput as U, type PaymentResponse as a, type PaymentStatus as b, createClient as c, type PaymentRailType as d, type PaymentType as e, PaymentStatusSchema as f, PaymentFilterKeySchema as g, PaymentRailSchema as h, PaymentTypeSchema as i, CreatePaymentInputSchema as j, UpdatePaymentInputSchema as k, PaymentResponseSchema as l };
