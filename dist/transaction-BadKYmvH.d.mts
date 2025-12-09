import { a as Command, G as GraphQLRequest } from './config.d-io5V_aK4.mjs';
import z$1, { z } from 'zod';
import * as buffer from 'buffer';

declare const PaymentRailSchema$1: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
declare const PaymentTypeSchema$1: z.ZodEnum<["CREDIT", "DEBIT"]>;
declare const AccountTypeSchema: z.ZodEnum<["CHECKING", "SAVINGS"]>;
type PaymentRail = z.infer<typeof PaymentRailSchema$1>;
declare const AgentSchema: z.ZodObject<{
    name: z.ZodString;
    identifier: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    identifier: string;
}, {
    name: string;
    identifier: string;
}>;
declare const PartySchema: z.ZodObject<{
    identifier: z.ZodString;
    name: z.ZodString;
    accountType: z.ZodEnum<["CHECKING", "SAVINGS"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    identifier: string;
    accountType: "CHECKING" | "SAVINGS";
}, {
    name: string;
    identifier: string;
    accountType: "CHECKING" | "SAVINGS";
}>;
declare const ClientSchema: z.ZodObject<{
    id: z.ZodNumber;
    accountNo: z.ZodString;
    displayName: z.ZodString;
    legalForm: z.ZodObject<{
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
    }, {
        value: string;
        code: string;
    }>;
    identifiers: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: string;
    }, {
        value: string;
        type: string;
    }>, "many">;
    ofLoanCycle: z.ZodNumber;
    ofLoanActive: z.ZodNumber;
    activeDepositAccount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    accountNo: string;
    displayName: string;
    legalForm: {
        value: string;
        code: string;
    };
    identifiers: {
        value: string;
        type: string;
    }[];
    ofLoanCycle: number;
    ofLoanActive: number;
    activeDepositAccount: number;
}, {
    id: number;
    accountNo: string;
    displayName: string;
    legalForm: {
        value: string;
        code: string;
    };
    identifiers: {
        value: string;
        type: string;
    }[];
    ofLoanCycle: number;
    ofLoanActive: number;
    activeDepositAccount: number;
}>;
declare const TransferShape: {
    type: z.ZodString;
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    paymentSubType: z.ZodOptional<z.ZodString>;
    currency: z.ZodString;
    fileUrl: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    externalId: z.ZodString;
    reference: z.ZodArray<z.ZodString, "many">;
    rawPaymentDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
    statementDescription: z.ZodOptional<z.ZodString>;
    settlementDate: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    client: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        accountNo: z.ZodString;
        displayName: z.ZodString;
        legalForm: z.ZodObject<{
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
        }, {
            value: string;
            code: string;
        }>;
        identifiers: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            type: string;
        }, {
            value: string;
            type: string;
        }>, "many">;
        ofLoanCycle: z.ZodNumber;
        ofLoanActive: z.ZodNumber;
        activeDepositAccount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        accountNo: string;
        displayName: string;
        legalForm: {
            value: string;
            code: string;
        };
        identifiers: {
            value: string;
            type: string;
        }[];
        ofLoanCycle: number;
        ofLoanActive: number;
        activeDepositAccount: number;
    }, {
        id: number;
        accountNo: string;
        displayName: string;
        legalForm: {
            value: string;
            code: string;
        };
        identifiers: {
            value: string;
            type: string;
        }[];
        ofLoanCycle: number;
        ofLoanActive: number;
        activeDepositAccount: number;
    }>>;
};
declare const CreateTransferInputShape: {
    type: z.ZodEnum<["CREDIT", "DEBIT"]>;
    fileUrl: z.ZodString;
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    currency: z.ZodLiteral<"USD">;
    amount: z.ZodNumber;
    debtor: z.ZodObject<{
        identifier: z.ZodString;
        name: z.ZodString;
        accountType: z.ZodEnum<["CHECKING", "SAVINGS"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
    }, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
    }>;
    creditor: z.ZodObject<{
        identifier: z.ZodString;
        name: z.ZodString;
        accountType: z.ZodEnum<["CHECKING", "SAVINGS"]>;
    } & {
        agent: z.ZodObject<{
            name: z.ZodString;
            identifier: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            identifier: string;
        }, {
            name: string;
            identifier: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
        agent: {
            name: string;
            identifier: string;
        };
    }, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
        agent: {
            name: string;
            identifier: string;
        };
    }>;
    reference: z.ZodArray<z.ZodString, "many">;
};
declare const GetTransferInputShape: {
    transferStatus: z.ZodOptional<z.ZodString>;
    executedAt: z.ZodString;
    queryLimit: z.ZodOptional<z.ZodNumber>;
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    tenantId: z.ZodOptional<z.ZodString>;
    accountType: z.ZodOptional<z.ZodString>;
};
declare const MarkAsReturnInputShape: {
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    externalId: z.ZodString;
    returnFileUrl: z.ZodString;
    errorCode: z.ZodString;
    errorMessage: z.ZodString;
    returnDate: z.ZodOptional<z.ZodString>;
    traceNumbers: z.ZodOptional<z.ZodObject<{
        incomingReturnFile: z.ZodOptional<z.ZodString>;
        outgoingReturnFile: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        incomingReturnFile?: string | undefined;
        outgoingReturnFile?: string | undefined;
    }, {
        incomingReturnFile?: string | undefined;
        outgoingReturnFile?: string | undefined;
    }>>;
    rawReturnDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
    tenantId: z.ZodOptional<z.ZodString>;
};
declare const UpdateTraceNumbersInputShape: {
    externalId: z.ZodString;
    traceNumbers: z.ZodObject<{
        traceMapping: z.ZodString;
        CoreFileKey: z.ZodOptional<z.ZodString>;
        CoreBatch: z.ZodOptional<z.ZodNumber>;
        CoreSeq: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        traceMapping: string;
        CoreFileKey?: string | undefined;
        CoreBatch?: number | undefined;
        CoreSeq?: number | undefined;
    }, {
        traceMapping: string;
        CoreFileKey?: string | undefined;
        CoreBatch?: number | undefined;
        CoreSeq?: number | undefined;
    }>;
    tenantId: z.ZodOptional<z.ZodString>;
};
declare const ProcessOutputShape: {
    id: z.ZodString;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
    resourceIdentifier: z.ZodString;
};
declare const TransferResponseShape: {
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
        paymentSubType: z.ZodOptional<z.ZodString>;
        currency: z.ZodString;
        fileUrl: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
        externalId: z.ZodString;
        reference: z.ZodArray<z.ZodString, "many">;
        rawPaymentDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
        statementDescription: z.ZodOptional<z.ZodString>;
        settlementDate: z.ZodOptional<z.ZodString>;
        errorCode: z.ZodOptional<z.ZodString>;
        errorMessage: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        client: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            accountNo: z.ZodString;
            displayName: z.ZodString;
            legalForm: z.ZodObject<{
                code: z.ZodString;
                value: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string;
                code: string;
            }, {
                value: string;
                code: string;
            }>;
            identifiers: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                value: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string;
                type: string;
            }, {
                value: string;
                type: string;
            }>, "many">;
            ofLoanCycle: z.ZodNumber;
            ofLoanActive: z.ZodNumber;
            activeDepositAccount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        }, {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        paymentType: "ACH" | "SAMEDAYACH";
        currency: string;
        amount: number;
        externalId: string;
        reference: string[];
        paymentSubType?: string | undefined;
        fileUrl?: string | undefined;
        rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
        statementDescription?: string | undefined;
        settlementDate?: string | undefined;
        errorCode?: string | undefined;
        errorMessage?: string | undefined;
        createdAt?: string | undefined;
        client?: {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        } | undefined;
    }, {
        type: string;
        paymentType: "ACH" | "SAMEDAYACH";
        currency: string;
        amount: number;
        externalId: string;
        reference: string[];
        paymentSubType?: string | undefined;
        fileUrl?: string | undefined;
        rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
        statementDescription?: string | undefined;
        settlementDate?: string | undefined;
        errorCode?: string | undefined;
        errorMessage?: string | undefined;
        createdAt?: string | undefined;
        client?: {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        } | undefined;
    }>, "many">;
};
declare const CreateTransferOutputShape: {
    data: z.ZodObject<{
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
    }, {
        amount: number;
    }>;
    id: z.ZodString;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
    resourceIdentifier: z.ZodString;
};
declare const TransferSchema: z.ZodObject<{
    type: z.ZodString;
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    paymentSubType: z.ZodOptional<z.ZodString>;
    currency: z.ZodString;
    fileUrl: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    externalId: z.ZodString;
    reference: z.ZodArray<z.ZodString, "many">;
    rawPaymentDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
    statementDescription: z.ZodOptional<z.ZodString>;
    settlementDate: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    client: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        accountNo: z.ZodString;
        displayName: z.ZodString;
        legalForm: z.ZodObject<{
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
        }, {
            value: string;
            code: string;
        }>;
        identifiers: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            type: string;
        }, {
            value: string;
            type: string;
        }>, "many">;
        ofLoanCycle: z.ZodNumber;
        ofLoanActive: z.ZodNumber;
        activeDepositAccount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        accountNo: string;
        displayName: string;
        legalForm: {
            value: string;
            code: string;
        };
        identifiers: {
            value: string;
            type: string;
        }[];
        ofLoanCycle: number;
        ofLoanActive: number;
        activeDepositAccount: number;
    }, {
        id: number;
        accountNo: string;
        displayName: string;
        legalForm: {
            value: string;
            code: string;
        };
        identifiers: {
            value: string;
            type: string;
        }[];
        ofLoanCycle: number;
        ofLoanActive: number;
        activeDepositAccount: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    paymentType: "ACH" | "SAMEDAYACH";
    currency: string;
    amount: number;
    externalId: string;
    reference: string[];
    paymentSubType?: string | undefined;
    fileUrl?: string | undefined;
    rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
    statementDescription?: string | undefined;
    settlementDate?: string | undefined;
    errorCode?: string | undefined;
    errorMessage?: string | undefined;
    createdAt?: string | undefined;
    client?: {
        id: number;
        accountNo: string;
        displayName: string;
        legalForm: {
            value: string;
            code: string;
        };
        identifiers: {
            value: string;
            type: string;
        }[];
        ofLoanCycle: number;
        ofLoanActive: number;
        activeDepositAccount: number;
    } | undefined;
}, {
    type: string;
    paymentType: "ACH" | "SAMEDAYACH";
    currency: string;
    amount: number;
    externalId: string;
    reference: string[];
    paymentSubType?: string | undefined;
    fileUrl?: string | undefined;
    rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
    statementDescription?: string | undefined;
    settlementDate?: string | undefined;
    errorCode?: string | undefined;
    errorMessage?: string | undefined;
    createdAt?: string | undefined;
    client?: {
        id: number;
        accountNo: string;
        displayName: string;
        legalForm: {
            value: string;
            code: string;
        };
        identifiers: {
            value: string;
            type: string;
        }[];
        ofLoanCycle: number;
        ofLoanActive: number;
        activeDepositAccount: number;
    } | undefined;
}>;
declare const CreateTransferInputSchema: z.ZodObject<{
    type: z.ZodEnum<["CREDIT", "DEBIT"]>;
    fileUrl: z.ZodString;
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    currency: z.ZodLiteral<"USD">;
    amount: z.ZodNumber;
    debtor: z.ZodObject<{
        identifier: z.ZodString;
        name: z.ZodString;
        accountType: z.ZodEnum<["CHECKING", "SAVINGS"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
    }, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
    }>;
    creditor: z.ZodObject<{
        identifier: z.ZodString;
        name: z.ZodString;
        accountType: z.ZodEnum<["CHECKING", "SAVINGS"]>;
    } & {
        agent: z.ZodObject<{
            name: z.ZodString;
            identifier: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            identifier: string;
        }, {
            name: string;
            identifier: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
        agent: {
            name: string;
            identifier: string;
        };
    }, {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
        agent: {
            name: string;
            identifier: string;
        };
    }>;
    reference: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "CREDIT" | "DEBIT";
    paymentType: "ACH" | "SAMEDAYACH";
    currency: "USD";
    fileUrl: string;
    amount: number;
    reference: string[];
    debtor: {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
    };
    creditor: {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
        agent: {
            name: string;
            identifier: string;
        };
    };
}, {
    type: "CREDIT" | "DEBIT";
    paymentType: "ACH" | "SAMEDAYACH";
    currency: "USD";
    fileUrl: string;
    amount: number;
    reference: string[];
    debtor: {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
    };
    creditor: {
        name: string;
        identifier: string;
        accountType: "CHECKING" | "SAVINGS";
        agent: {
            name: string;
            identifier: string;
        };
    };
}>;
declare const GetTransferInputSchema: z.ZodObject<{
    transferStatus: z.ZodOptional<z.ZodString>;
    executedAt: z.ZodString;
    queryLimit: z.ZodOptional<z.ZodNumber>;
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    tenantId: z.ZodOptional<z.ZodString>;
    accountType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paymentType: "ACH" | "SAMEDAYACH";
    executedAt: string;
    accountType?: string | undefined;
    transferStatus?: string | undefined;
    queryLimit?: number | undefined;
    tenantId?: string | undefined;
}, {
    paymentType: "ACH" | "SAMEDAYACH";
    executedAt: string;
    accountType?: string | undefined;
    transferStatus?: string | undefined;
    queryLimit?: number | undefined;
    tenantId?: string | undefined;
}>;
declare const MarkAsReturnInputSchema: z.ZodObject<{
    paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
    externalId: z.ZodString;
    returnFileUrl: z.ZodString;
    errorCode: z.ZodString;
    errorMessage: z.ZodString;
    returnDate: z.ZodOptional<z.ZodString>;
    traceNumbers: z.ZodOptional<z.ZodObject<{
        incomingReturnFile: z.ZodOptional<z.ZodString>;
        outgoingReturnFile: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        incomingReturnFile?: string | undefined;
        outgoingReturnFile?: string | undefined;
    }, {
        incomingReturnFile?: string | undefined;
        outgoingReturnFile?: string | undefined;
    }>>;
    rawReturnDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
    tenantId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paymentType: "ACH" | "SAMEDAYACH";
    externalId: string;
    errorCode: string;
    errorMessage: string;
    returnFileUrl: string;
    tenantId?: string | undefined;
    returnDate?: string | undefined;
    traceNumbers?: {
        incomingReturnFile?: string | undefined;
        outgoingReturnFile?: string | undefined;
    } | undefined;
    rawReturnDetails?: Record<string, string | number | boolean> | undefined;
}, {
    paymentType: "ACH" | "SAMEDAYACH";
    externalId: string;
    errorCode: string;
    errorMessage: string;
    returnFileUrl: string;
    tenantId?: string | undefined;
    returnDate?: string | undefined;
    traceNumbers?: {
        incomingReturnFile?: string | undefined;
        outgoingReturnFile?: string | undefined;
    } | undefined;
    rawReturnDetails?: Record<string, string | number | boolean> | undefined;
}>;
declare const UpdateTraceNumbersInputSchema: z.ZodObject<{
    externalId: z.ZodString;
    traceNumbers: z.ZodObject<{
        traceMapping: z.ZodString;
        CoreFileKey: z.ZodOptional<z.ZodString>;
        CoreBatch: z.ZodOptional<z.ZodNumber>;
        CoreSeq: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        traceMapping: string;
        CoreFileKey?: string | undefined;
        CoreBatch?: number | undefined;
        CoreSeq?: number | undefined;
    }, {
        traceMapping: string;
        CoreFileKey?: string | undefined;
        CoreBatch?: number | undefined;
        CoreSeq?: number | undefined;
    }>;
    tenantId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    externalId: string;
    traceNumbers: {
        traceMapping: string;
        CoreFileKey?: string | undefined;
        CoreBatch?: number | undefined;
        CoreSeq?: number | undefined;
    };
    tenantId?: string | undefined;
}, {
    externalId: string;
    traceNumbers: {
        traceMapping: string;
        CoreFileKey?: string | undefined;
        CoreBatch?: number | undefined;
        CoreSeq?: number | undefined;
    };
    tenantId?: string | undefined;
}>;
declare const ProcessOutputSchema$1: z.ZodObject<{
    id: z.ZodString;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
    resourceIdentifier: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    clientId: number;
    resourceId: number;
    resourceIdentifier: string;
}, {
    id: string;
    clientId: number;
    resourceId: number;
    resourceIdentifier: string;
}>;
declare const TransferResponseSchema: z.ZodObject<{
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        paymentType: z.ZodEnum<["ACH", "SAMEDAYACH"]>;
        paymentSubType: z.ZodOptional<z.ZodString>;
        currency: z.ZodString;
        fileUrl: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
        externalId: z.ZodString;
        reference: z.ZodArray<z.ZodString, "many">;
        rawPaymentDetails: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>>;
        statementDescription: z.ZodOptional<z.ZodString>;
        settlementDate: z.ZodOptional<z.ZodString>;
        errorCode: z.ZodOptional<z.ZodString>;
        errorMessage: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        client: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            accountNo: z.ZodString;
            displayName: z.ZodString;
            legalForm: z.ZodObject<{
                code: z.ZodString;
                value: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string;
                code: string;
            }, {
                value: string;
                code: string;
            }>;
            identifiers: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                value: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string;
                type: string;
            }, {
                value: string;
                type: string;
            }>, "many">;
            ofLoanCycle: z.ZodNumber;
            ofLoanActive: z.ZodNumber;
            activeDepositAccount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        }, {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        paymentType: "ACH" | "SAMEDAYACH";
        currency: string;
        amount: number;
        externalId: string;
        reference: string[];
        paymentSubType?: string | undefined;
        fileUrl?: string | undefined;
        rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
        statementDescription?: string | undefined;
        settlementDate?: string | undefined;
        errorCode?: string | undefined;
        errorMessage?: string | undefined;
        createdAt?: string | undefined;
        client?: {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        } | undefined;
    }, {
        type: string;
        paymentType: "ACH" | "SAMEDAYACH";
        currency: string;
        amount: number;
        externalId: string;
        reference: string[];
        paymentSubType?: string | undefined;
        fileUrl?: string | undefined;
        rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
        statementDescription?: string | undefined;
        settlementDate?: string | undefined;
        errorCode?: string | undefined;
        errorMessage?: string | undefined;
        createdAt?: string | undefined;
        client?: {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: {
        type: string;
        paymentType: "ACH" | "SAMEDAYACH";
        currency: string;
        amount: number;
        externalId: string;
        reference: string[];
        paymentSubType?: string | undefined;
        fileUrl?: string | undefined;
        rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
        statementDescription?: string | undefined;
        settlementDate?: string | undefined;
        errorCode?: string | undefined;
        errorMessage?: string | undefined;
        createdAt?: string | undefined;
        client?: {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        } | undefined;
    }[];
}, {
    totalFilteredRecords: number;
    pageItems: {
        type: string;
        paymentType: "ACH" | "SAMEDAYACH";
        currency: string;
        amount: number;
        externalId: string;
        reference: string[];
        paymentSubType?: string | undefined;
        fileUrl?: string | undefined;
        rawPaymentDetails?: Record<string, string | number | boolean> | undefined;
        statementDescription?: string | undefined;
        settlementDate?: string | undefined;
        errorCode?: string | undefined;
        errorMessage?: string | undefined;
        createdAt?: string | undefined;
        client?: {
            id: number;
            accountNo: string;
            displayName: string;
            legalForm: {
                value: string;
                code: string;
            };
            identifiers: {
                value: string;
                type: string;
            }[];
            ofLoanCycle: number;
            ofLoanActive: number;
            activeDepositAccount: number;
        } | undefined;
    }[];
}>;
declare const CreateTransferOutputSchema: z.ZodObject<{
    data: z.ZodObject<{
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
    }, {
        amount: number;
    }>;
    id: z.ZodString;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
    resourceIdentifier: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    clientId: number;
    resourceId: number;
    resourceIdentifier: string;
    data: {
        amount: number;
    };
}, {
    id: string;
    clientId: number;
    resourceId: number;
    resourceIdentifier: string;
    data: {
        amount: number;
    };
}>;
type Transfer = z.infer<typeof TransferSchema>;
type CreateTransferInput = z.infer<typeof CreateTransferInputSchema>;
type GetTransferInput = z.infer<typeof GetTransferInputSchema>;
type MarkAsReturnInput = z.infer<typeof MarkAsReturnInputSchema>;
type UpdateTraceNumbersInput = z.infer<typeof UpdateTraceNumbersInputSchema>;
type ProcessOutput$1 = z.infer<typeof ProcessOutputSchema$1>;
type TransferResponse = z.infer<typeof TransferResponseSchema>;
type CreateTransferOutput = z.infer<typeof CreateTransferOutputSchema>;

declare const PaymentStatusSchema: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
declare const PaymentRailSchema: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
declare const PaymentTypeSchema: z.ZodEnum<["CREDIT", "DEBIT"]>;
declare const SortOrderSchema: z.ZodEnum<["ASC", "DESC"]>;
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
    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
    paymentType?: "CREDIT" | "DEBIT" | undefined;
    externalId?: string | undefined;
    reference?: string | undefined;
    clientId?: string | number | undefined;
    originatorName?: string | undefined;
    originatorAccount?: string | undefined;
    originatorBankRoutingCode?: string | undefined;
    recipientName?: string | undefined;
    recipientAccount?: string | undefined;
    recipientBankRoutingCode?: string | undefined;
    traceNumber?: string | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    originatedBy?: string | undefined;
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    fromValueDate?: string | undefined;
    toValueDate?: string | undefined;
    fromExecuteDate?: string | undefined;
    toExecuteDate?: string | undefined;
    fromReturnDate?: string | undefined;
    toReturnDate?: string | undefined;
    isSettlement?: boolean | undefined;
    orderBy?: string | undefined;
    sortOrder?: "ASC" | "DESC" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}, {
    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
    paymentType?: "CREDIT" | "DEBIT" | undefined;
    externalId?: string | undefined;
    reference?: string | undefined;
    clientId?: string | number | undefined;
    originatorName?: string | undefined;
    originatorAccount?: string | undefined;
    originatorBankRoutingCode?: string | undefined;
    recipientName?: string | undefined;
    recipientAccount?: string | undefined;
    recipientBankRoutingCode?: string | undefined;
    traceNumber?: string | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    originatedBy?: string | undefined;
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    fromValueDate?: string | undefined;
    toValueDate?: string | undefined;
    fromExecuteDate?: string | undefined;
    toExecuteDate?: string | undefined;
    fromReturnDate?: string | undefined;
    toReturnDate?: string | undefined;
    isSettlement?: boolean | undefined;
    orderBy?: string | undefined;
    sortOrder?: "ASC" | "DESC" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
type PaymentFilters = z.infer<typeof PaymentFiltersSchema>;
declare const PaymentShape: {
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
};
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
declare const CreatePaymentInputShape: {
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
};
declare const CreatePaymentInputSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
    originator: z.ZodObject<{
        accountId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
    }, {
        accountId: string;
    }>;
    recipient: z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        accountId: z.ZodOptional<z.ZodString>;
        recipientId: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        recipientType: z.ZodOptional<z.ZodEnum<["INDIVIDUAL", "BUSINESS"]>>;
        accountEntity: z.ZodOptional<z.ZodEnum<["PERSONAL", "BUSINESS"]>>;
        accountNumber: z.ZodOptional<z.ZodString>;
        bankInformation: z.ZodOptional<z.ZodObject<{
            routingNumber: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
        }, {
            routingNumber: string;
        }>>;
        cardId: z.ZodOptional<z.ZodString>;
        contactNumber: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }, {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
    }, {
        name: string;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        cardId?: string | undefined;
        recipientType?: "INDIVIDUAL" | "BUSINESS" | undefined;
        address?: {
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            countryCode?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
        } | undefined;
        accountId?: string | undefined;
        recipientId?: string | undefined;
        accountEntity?: "BUSINESS" | "PERSONAL" | undefined;
        accountNumber?: string | undefined;
        bankInformation?: {
            routingNumber: string;
        } | undefined;
        contactNumber?: string | undefined;
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
declare const UpdatePaymentInputShape: {
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
};
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
declare const ProcessOutputSchema: z.ZodObject<{
    id: z.ZodString;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
    resourceIdentifier: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    clientId: number;
    resourceId: number;
    resourceIdentifier: string;
}, {
    id: string;
    clientId: number;
    resourceId: number;
    resourceIdentifier: string;
}>;
type ProcessOutput = z.infer<typeof ProcessOutputSchema>;

declare const SavingAccountShape: {
    id: z.ZodNumber;
    accountNo: z.ZodString;
    depositType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    clientId: z.ZodNumber;
    clientName: z.ZodString;
    savingsProductId: z.ZodNumber;
    savingsProductName: z.ZodString;
    fieldOfficerId: z.ZodNumber;
    status: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        submittedAndPendingApproval: z.ZodBoolean;
        approved: z.ZodBoolean;
        rejected: z.ZodBoolean;
        withdrawnByApplicant: z.ZodBoolean;
        active: z.ZodBoolean;
        closed: z.ZodBoolean;
        prematureClosed: z.ZodBoolean;
        transferInProgress: z.ZodBoolean;
        transferOnHold: z.ZodBoolean;
        matured: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
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
    }, {
        value: string;
        code: string;
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
    }>;
    subStatus: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        none: z.ZodBoolean;
        inactive: z.ZodBoolean;
        dormant: z.ZodBoolean;
        escheat: z.ZodBoolean;
        block: z.ZodBoolean;
        blockCredit: z.ZodBoolean;
        blockDebit: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }>;
    timeline: z.ZodObject<{
        submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
        submittedByUsername: z.ZodString;
        submittedByFirstname: z.ZodString;
        submittedByLastname: z.ZodString;
        approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        approvedByUsername: z.ZodOptional<z.ZodString>;
        approvedByFirstname: z.ZodOptional<z.ZodString>;
        approvedByLastname: z.ZodOptional<z.ZodString>;
        activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        activatedByUsername: z.ZodOptional<z.ZodString>;
        activatedByFirstname: z.ZodOptional<z.ZodString>;
        activatedByLastname: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    currency: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        inMultiplesOf: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        displayLabel: z.ZodString;
        currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
        isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }>;
    nominalAnnualInterestRate: z.ZodNumber;
    interestCompoundingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestPostingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationDaysInYearType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    lockinPeriodFrequency: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    enforceMinRequiredBalance: z.ZodBoolean;
    onHoldFunds: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    lastActiveTransactionDate: z.ZodArray<z.ZodNumber, "many">;
    isDormancyTrackingActive: z.ZodBoolean;
    savingsAmountOnHold: z.ZodNumber;
    summary: z.ZodObject<{
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        totalDeposits: z.ZodNumber;
        totalInterestEarned: z.ZodNumber;
        totalInterestPosted: z.ZodNumber;
        accountBalance: z.ZodNumber;
        totalOverdraftInterestDerived: z.ZodNumber;
        interestNotPosted: z.ZodNumber;
        lastInterestCalculationDate: z.ZodArray<z.ZodNumber, "many">;
        availableBalance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        currency: {
            code: string;
            name: string;
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
    }, {
        currency: {
            code: string;
            name: string;
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
    }>;
    isLinkedToFloatingInterestRates: z.ZodBoolean;
    interestRateDifferential: z.ZodNumber;
    overdraftInterestRateDifferential: z.ZodNumber;
    floatingRateId: z.ZodNumber;
    isBaseLendingRate: z.ZodBoolean;
    isFloatingInterestRateCalculationAllowed: z.ZodBoolean;
    bankDetails: z.ZodObject<{
        routingNumber: z.ZodString;
        name: z.ZodString;
        swiftCode: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postcode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        address: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }, {
        name: string;
        address: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }>;
    skipCollectTransferCharge: z.ZodBoolean;
    cardRestricted: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minRequiredBalance: z.ZodNumber;
    minBalanceForInterestCalculation: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    overdraftMinimumDue: z.ZodNumber;
    currentFloatingInterestPeriod: z.ZodObject<{
        fromDate: z.ZodArray<z.ZodNumber, "many">;
        interestRate: z.ZodNumber;
        isDifferentialToBLR: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }>;
    floatingRateName: z.ZodString;
    floatingRateDifferential: z.ZodNumber;
    parentAccount: z.ZodObject<{
        withdrawalFeeForTransfers: z.ZodBoolean;
        allowOverdraft: z.ZodBoolean;
        enforceMinRequiredBalance: z.ZodBoolean;
        withHoldTax: z.ZodBoolean;
        isDormancyTrackingActive: z.ZodBoolean;
        isLinkedToFloatingInterestRates: z.ZodBoolean;
        isBaseLendingRate: z.ZodBoolean;
        skipCollectTransferCharge: z.ZodBoolean;
        cardRestricted: z.ZodBoolean;
        allowPrepaidCard: z.ZodBoolean;
        prepaidAccount: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    allowPrepaidCard: z.ZodBoolean;
    prepaidAccount: z.ZodBoolean;
    prepaidLimitAmount: z.ZodNumber;
};
declare const SavingAccountSchema: z.ZodObject<{
    id: z.ZodNumber;
    accountNo: z.ZodString;
    depositType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    clientId: z.ZodNumber;
    clientName: z.ZodString;
    savingsProductId: z.ZodNumber;
    savingsProductName: z.ZodString;
    fieldOfficerId: z.ZodNumber;
    status: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        submittedAndPendingApproval: z.ZodBoolean;
        approved: z.ZodBoolean;
        rejected: z.ZodBoolean;
        withdrawnByApplicant: z.ZodBoolean;
        active: z.ZodBoolean;
        closed: z.ZodBoolean;
        prematureClosed: z.ZodBoolean;
        transferInProgress: z.ZodBoolean;
        transferOnHold: z.ZodBoolean;
        matured: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
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
    }, {
        value: string;
        code: string;
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
    }>;
    subStatus: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        none: z.ZodBoolean;
        inactive: z.ZodBoolean;
        dormant: z.ZodBoolean;
        escheat: z.ZodBoolean;
        block: z.ZodBoolean;
        blockCredit: z.ZodBoolean;
        blockDebit: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }>;
    timeline: z.ZodObject<{
        submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
        submittedByUsername: z.ZodString;
        submittedByFirstname: z.ZodString;
        submittedByLastname: z.ZodString;
        approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        approvedByUsername: z.ZodOptional<z.ZodString>;
        approvedByFirstname: z.ZodOptional<z.ZodString>;
        approvedByLastname: z.ZodOptional<z.ZodString>;
        activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        activatedByUsername: z.ZodOptional<z.ZodString>;
        activatedByFirstname: z.ZodOptional<z.ZodString>;
        activatedByLastname: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    currency: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        inMultiplesOf: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        displayLabel: z.ZodString;
        currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
        isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }>;
    nominalAnnualInterestRate: z.ZodNumber;
    interestCompoundingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestPostingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationDaysInYearType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    lockinPeriodFrequency: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    enforceMinRequiredBalance: z.ZodBoolean;
    onHoldFunds: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    lastActiveTransactionDate: z.ZodArray<z.ZodNumber, "many">;
    isDormancyTrackingActive: z.ZodBoolean;
    savingsAmountOnHold: z.ZodNumber;
    summary: z.ZodObject<{
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        totalDeposits: z.ZodNumber;
        totalInterestEarned: z.ZodNumber;
        totalInterestPosted: z.ZodNumber;
        accountBalance: z.ZodNumber;
        totalOverdraftInterestDerived: z.ZodNumber;
        interestNotPosted: z.ZodNumber;
        lastInterestCalculationDate: z.ZodArray<z.ZodNumber, "many">;
        availableBalance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        currency: {
            code: string;
            name: string;
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
    }, {
        currency: {
            code: string;
            name: string;
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
    }>;
    isLinkedToFloatingInterestRates: z.ZodBoolean;
    interestRateDifferential: z.ZodNumber;
    overdraftInterestRateDifferential: z.ZodNumber;
    floatingRateId: z.ZodNumber;
    isBaseLendingRate: z.ZodBoolean;
    isFloatingInterestRateCalculationAllowed: z.ZodBoolean;
    bankDetails: z.ZodObject<{
        routingNumber: z.ZodString;
        name: z.ZodString;
        swiftCode: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postcode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        address: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }, {
        name: string;
        address: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }>;
    skipCollectTransferCharge: z.ZodBoolean;
    cardRestricted: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minRequiredBalance: z.ZodNumber;
    minBalanceForInterestCalculation: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    overdraftMinimumDue: z.ZodNumber;
    currentFloatingInterestPeriod: z.ZodObject<{
        fromDate: z.ZodArray<z.ZodNumber, "many">;
        interestRate: z.ZodNumber;
        isDifferentialToBLR: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }>;
    floatingRateName: z.ZodString;
    floatingRateDifferential: z.ZodNumber;
    parentAccount: z.ZodObject<{
        withdrawalFeeForTransfers: z.ZodBoolean;
        allowOverdraft: z.ZodBoolean;
        enforceMinRequiredBalance: z.ZodBoolean;
        withHoldTax: z.ZodBoolean;
        isDormancyTrackingActive: z.ZodBoolean;
        isLinkedToFloatingInterestRates: z.ZodBoolean;
        isBaseLendingRate: z.ZodBoolean;
        skipCollectTransferCharge: z.ZodBoolean;
        cardRestricted: z.ZodBoolean;
        allowPrepaidCard: z.ZodBoolean;
        prepaidAccount: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    allowPrepaidCard: z.ZodBoolean;
    prepaidAccount: z.ZodBoolean;
    prepaidLimitAmount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: {
        value: string;
        code: string;
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
    id: number;
    accountNo: string;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    };
    clientId: number;
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
        value: string;
        code: string;
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
        value: string;
        code: string;
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
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    lockinPeriodFrequency: number;
    lockinPeriodFrequencyType: {
        value: string;
        code: string;
        id: number;
    };
    onHoldFunds: number;
    savingsAmountOnHold: number;
    summary: {
        currency: {
            code: string;
            name: string;
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
}, {
    status: {
        value: string;
        code: string;
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
    id: number;
    accountNo: string;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    };
    clientId: number;
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
        value: string;
        code: string;
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
        value: string;
        code: string;
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
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    lockinPeriodFrequency: number;
    lockinPeriodFrequencyType: {
        value: string;
        code: string;
        id: number;
    };
    onHoldFunds: number;
    savingsAmountOnHold: number;
    summary: {
        currency: {
            code: string;
            name: string;
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
}>;
declare const ListAccountsOfClientResponseShape: {
    savingsAccounts: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        accountNo: z.ZodString;
        productId: z.ZodNumber;
        productName: z.ZodString;
        shortProductName: z.ZodString;
        status: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            submittedAndPendingApproval: z.ZodBoolean;
            approved: z.ZodBoolean;
            rejected: z.ZodBoolean;
            withdrawnByApplicant: z.ZodBoolean;
            active: z.ZodBoolean;
            closed: z.ZodBoolean;
            prematureClosed: z.ZodBoolean;
            transferInProgress: z.ZodBoolean;
            transferOnHold: z.ZodBoolean;
            matured: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
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
        }, {
            value: string;
            code: string;
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
        }>;
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        accountBalance: z.ZodNumber;
        accountType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        timeline: z.ZodObject<{
            submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
            submittedByUsername: z.ZodString;
            submittedByFirstname: z.ZodString;
            submittedByLastname: z.ZodString;
            approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            approvedByUsername: z.ZodOptional<z.ZodString>;
            approvedByFirstname: z.ZodOptional<z.ZodString>;
            approvedByLastname: z.ZodOptional<z.ZodString>;
            activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            activatedByUsername: z.ZodOptional<z.ZodString>;
            activatedByFirstname: z.ZodOptional<z.ZodString>;
            activatedByLastname: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>;
        subStatus: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            none: z.ZodBoolean;
            inactive: z.ZodBoolean;
            dormant: z.ZodBoolean;
            escheat: z.ZodBoolean;
            block: z.ZodBoolean;
            blockCredit: z.ZodBoolean;
            blockDebit: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }>;
        lastActiveTransactionDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        depositType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        availableBalance: z.ZodNumber;
        allowPrepaidCard: z.ZodBoolean;
        primaryAccount: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        status: {
            value: string;
            code: string;
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
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        id: number;
        accountNo: string;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
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
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }, {
        status: {
            value: string;
            code: string;
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
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        id: number;
        accountNo: string;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
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
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }>, "many">;
};
declare const ListAccountsOfClientResponseSchema: z.ZodObject<{
    savingsAccounts: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        accountNo: z.ZodString;
        productId: z.ZodNumber;
        productName: z.ZodString;
        shortProductName: z.ZodString;
        status: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            submittedAndPendingApproval: z.ZodBoolean;
            approved: z.ZodBoolean;
            rejected: z.ZodBoolean;
            withdrawnByApplicant: z.ZodBoolean;
            active: z.ZodBoolean;
            closed: z.ZodBoolean;
            prematureClosed: z.ZodBoolean;
            transferInProgress: z.ZodBoolean;
            transferOnHold: z.ZodBoolean;
            matured: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
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
        }, {
            value: string;
            code: string;
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
        }>;
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        accountBalance: z.ZodNumber;
        accountType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        timeline: z.ZodObject<{
            submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
            submittedByUsername: z.ZodString;
            submittedByFirstname: z.ZodString;
            submittedByLastname: z.ZodString;
            approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            approvedByUsername: z.ZodOptional<z.ZodString>;
            approvedByFirstname: z.ZodOptional<z.ZodString>;
            approvedByLastname: z.ZodOptional<z.ZodString>;
            activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            activatedByUsername: z.ZodOptional<z.ZodString>;
            activatedByFirstname: z.ZodOptional<z.ZodString>;
            activatedByLastname: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>;
        subStatus: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            none: z.ZodBoolean;
            inactive: z.ZodBoolean;
            dormant: z.ZodBoolean;
            escheat: z.ZodBoolean;
            block: z.ZodBoolean;
            blockCredit: z.ZodBoolean;
            blockDebit: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }>;
        lastActiveTransactionDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        depositType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        availableBalance: z.ZodNumber;
        allowPrepaidCard: z.ZodBoolean;
        primaryAccount: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        status: {
            value: string;
            code: string;
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
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        id: number;
        accountNo: string;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
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
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }, {
        status: {
            value: string;
            code: string;
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
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        id: number;
        accountNo: string;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
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
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    savingsAccounts: {
        status: {
            value: string;
            code: string;
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
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        id: number;
        accountNo: string;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
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
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }[];
}, {
    savingsAccounts: {
        status: {
            value: string;
            code: string;
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
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        id: number;
        accountNo: string;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
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
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }[];
}>;
declare const ListAccountsRequestShape: {
    tenantId: z.ZodOptional<z.ZodString>;
    showReservedAccount: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
declare const ListAccountsRequestSchema: z.ZodObject<{
    tenantId: z.ZodOptional<z.ZodString>;
    showReservedAccount: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    showReservedAccount: boolean;
    tenantId?: string | undefined;
}, {
    tenantId?: string | undefined;
    showReservedAccount?: boolean | undefined;
}>;
declare const UpdateAccountRequestShape: {
    clientId: z.ZodNumber;
    productId: z.ZodNumber;
    submittedOnDate: z.ZodString;
    nominalAnnualInterestRate: z.ZodString;
    minRequiredOpeningBalance: z.ZodString;
    lockinPeriodFrequency: z.ZodString;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    enforceMinRequiredBalance: z.ZodBoolean;
    minRequiredBalance: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    interestCompoundingPeriodType: z.ZodNumber;
    interestPostingPeriodType: z.ZodNumber;
    interestCalculationType: z.ZodNumber;
    interestCalculationDaysInYearType: z.ZodNumber;
    fieldOfficerId: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodNumber;
    locale: z.ZodString;
    dateFormat: z.ZodString;
    monthDayFormat: z.ZodString;
    charges: z.ZodArray<z.ZodAny, "many">;
};
declare const UpdateAccountRequestSchema: z.ZodObject<{
    clientId: z.ZodNumber;
    productId: z.ZodNumber;
    submittedOnDate: z.ZodString;
    nominalAnnualInterestRate: z.ZodString;
    minRequiredOpeningBalance: z.ZodString;
    lockinPeriodFrequency: z.ZodString;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    enforceMinRequiredBalance: z.ZodBoolean;
    minRequiredBalance: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    interestCompoundingPeriodType: z.ZodNumber;
    interestPostingPeriodType: z.ZodNumber;
    interestCalculationType: z.ZodNumber;
    interestCalculationDaysInYearType: z.ZodNumber;
    fieldOfficerId: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodNumber;
    locale: z.ZodString;
    dateFormat: z.ZodString;
    monthDayFormat: z.ZodString;
    charges: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    dateFormat: string;
    locale: string;
    submittedOnDate: string;
    productId: number;
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    fieldOfficerId: number;
    nominalAnnualInterestRate: string;
    interestCompoundingPeriodType: number;
    interestPostingPeriodType: number;
    interestCalculationType: number;
    interestCalculationDaysInYearType: number;
    lockinPeriodFrequency: string;
    lockinPeriodFrequencyType: number;
    overdraftLimit: number;
    minRequiredBalance: number;
    minOverdraftForInterestCalculation: number;
    minRequiredOpeningBalance: string;
    monthDayFormat: string;
    charges: any[];
}, {
    clientId: number;
    dateFormat: string;
    locale: string;
    submittedOnDate: string;
    productId: number;
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    fieldOfficerId: number;
    nominalAnnualInterestRate: string;
    interestCompoundingPeriodType: number;
    interestPostingPeriodType: number;
    interestCalculationType: number;
    interestCalculationDaysInYearType: number;
    lockinPeriodFrequency: string;
    lockinPeriodFrequencyType: number;
    overdraftLimit: number;
    minRequiredBalance: number;
    minOverdraftForInterestCalculation: number;
    minRequiredOpeningBalance: string;
    monthDayFormat: string;
    charges: any[];
}>;
type ListAccountsOfClientRequest = z.infer<typeof ListAccountsRequestSchema>;
type SavingAccount = z.infer<typeof SavingAccountSchema>;
type UpdateAccountRequest = z.infer<typeof UpdateAccountRequestSchema>;
declare const CreateAndActivateAccountRequestSchema: z.ZodObject<{
    clientId: z.ZodNumber;
    productId: z.ZodNumber;
    locale: z.ZodString;
    dateFormat: z.ZodString;
    submittedOnDate: z.ZodString;
    monthDayFormat: z.ZodString;
    nominalAnnualInterestRate: z.ZodOptional<z.ZodNumber>;
    minRequiredOpeningBalance: z.ZodOptional<z.ZodString>;
    lockinPeriodFrequency: z.ZodOptional<z.ZodNumber>;
    withdrawalFeeForTransfers: z.ZodOptional<z.ZodBoolean>;
    allowOverdraft: z.ZodOptional<z.ZodBoolean>;
    overdraftLimit: z.ZodOptional<z.ZodNumber>;
    nominalAnnualInterestRateOverdraft: z.ZodOptional<z.ZodNumber>;
    minOverdraftForInterestCalculation: z.ZodOptional<z.ZodNumber>;
    enforceMinRequiredBalance: z.ZodOptional<z.ZodBoolean>;
    minRequiredBalance: z.ZodOptional<z.ZodNumber>;
    withHoldTax: z.ZodOptional<z.ZodBoolean>;
    interestCompoundingPeriodType: z.ZodOptional<z.ZodNumber>;
    interestPostingPeriodType: z.ZodOptional<z.ZodNumber>;
    interestCalculationType: z.ZodOptional<z.ZodNumber>;
    interestCalculationDaysInYearType: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    lockinPeriodFrequencyType: z.ZodOptional<z.ZodNumber>;
    nickname: z.ZodOptional<z.ZodString>;
    charges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        chargeId: z.ZodNumber;
        amount: z.ZodOptional<z.ZodNumber>;
        dueDate: z.ZodOptional<z.ZodString>;
        feeInterval: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        chargeId: number;
        amount?: number | undefined;
        dueDate?: string | undefined;
        feeInterval?: number | undefined;
    }, {
        chargeId: number;
        amount?: number | undefined;
        dueDate?: string | undefined;
        feeInterval?: number | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    dateFormat: string;
    locale: string;
    submittedOnDate: string;
    productId: number;
    monthDayFormat: string;
    externalId?: string | undefined;
    withdrawalFeeForTransfers?: boolean | undefined;
    allowOverdraft?: boolean | undefined;
    enforceMinRequiredBalance?: boolean | undefined;
    withHoldTax?: boolean | undefined;
    nominalAnnualInterestRate?: number | undefined;
    interestCompoundingPeriodType?: number | undefined;
    interestPostingPeriodType?: number | undefined;
    interestCalculationType?: number | undefined;
    interestCalculationDaysInYearType?: number | undefined;
    lockinPeriodFrequency?: number | undefined;
    lockinPeriodFrequencyType?: number | undefined;
    overdraftLimit?: number | undefined;
    minRequiredBalance?: number | undefined;
    minOverdraftForInterestCalculation?: number | undefined;
    minRequiredOpeningBalance?: string | undefined;
    charges?: {
        chargeId: number;
        amount?: number | undefined;
        dueDate?: string | undefined;
        feeInterval?: number | undefined;
    }[] | undefined;
    nominalAnnualInterestRateOverdraft?: number | undefined;
    nickname?: string | undefined;
}, {
    clientId: number;
    dateFormat: string;
    locale: string;
    submittedOnDate: string;
    productId: number;
    monthDayFormat: string;
    externalId?: string | undefined;
    withdrawalFeeForTransfers?: boolean | undefined;
    allowOverdraft?: boolean | undefined;
    enforceMinRequiredBalance?: boolean | undefined;
    withHoldTax?: boolean | undefined;
    nominalAnnualInterestRate?: number | undefined;
    interestCompoundingPeriodType?: number | undefined;
    interestPostingPeriodType?: number | undefined;
    interestCalculationType?: number | undefined;
    interestCalculationDaysInYearType?: number | undefined;
    lockinPeriodFrequency?: number | undefined;
    lockinPeriodFrequencyType?: number | undefined;
    overdraftLimit?: number | undefined;
    minRequiredBalance?: number | undefined;
    minOverdraftForInterestCalculation?: number | undefined;
    minRequiredOpeningBalance?: string | undefined;
    charges?: {
        chargeId: number;
        amount?: number | undefined;
        dueDate?: string | undefined;
        feeInterval?: number | undefined;
    }[] | undefined;
    nominalAnnualInterestRateOverdraft?: number | undefined;
    nickname?: string | undefined;
}>;
declare const CreateAndActivateAccountResponseSchema: z.ZodObject<{
    officeId: z.ZodNumber;
    clientId: z.ZodNumber;
    savingsId: z.ZodNumber;
    resourceId: z.ZodNumber;
    changes: z.ZodObject<{
        status: z.ZodString;
        locale: z.ZodString;
        dateFormat: z.ZodString;
        activatedOnDate: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        dateFormat: string;
        locale: string;
        activatedOnDate: string;
    }, {
        status: string;
        dateFormat: string;
        locale: string;
        activatedOnDate: string;
    }>;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    resourceId: number;
    officeId: number;
    savingsId: number;
    changes: {
        status: string;
        dateFormat: string;
        locale: string;
        activatedOnDate: string;
    };
}, {
    clientId: number;
    resourceId: number;
    officeId: number;
    savingsId: number;
    changes: {
        status: string;
        dateFormat: string;
        locale: string;
        activatedOnDate: string;
    };
}>;
type CreateAndActivateAccountRequest = z.infer<typeof CreateAndActivateAccountRequestSchema>;
type CreateAndActivateAccountResponse = z.infer<typeof CreateAndActivateAccountResponseSchema>;
declare const CloseAccountRequestSchema: z.ZodObject<{
    closedOnDate: z.ZodOptional<z.ZodString>;
    dateFormat: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    withdrawBalance: z.ZodOptional<z.ZodBoolean>;
    postInterestValidationOnClosure: z.ZodOptional<z.ZodBoolean>;
    ignoreNegativeBalance: z.ZodOptional<z.ZodBoolean>;
    paymentTypeId: z.ZodOptional<z.ZodNumber>;
    closeReasonCodeId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    closeReasonCodeId: number;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    closedOnDate?: string | undefined;
    withdrawBalance?: boolean | undefined;
    postInterestValidationOnClosure?: boolean | undefined;
    ignoreNegativeBalance?: boolean | undefined;
    paymentTypeId?: number | undefined;
}, {
    closeReasonCodeId: number;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    closedOnDate?: string | undefined;
    withdrawBalance?: boolean | undefined;
    postInterestValidationOnClosure?: boolean | undefined;
    ignoreNegativeBalance?: boolean | undefined;
    paymentTypeId?: number | undefined;
}>;
declare const CloseAccountResponseSchema: z.ZodObject<{
    officeId: z.ZodNumber;
    clientId: z.ZodNumber;
    savingsId: z.ZodNumber;
    resourceId: z.ZodNumber;
    changes: z.ZodObject<{
        status: z.ZodString;
        locale: z.ZodString;
        dateFormat: z.ZodString;
        closedOnDate: z.ZodString;
        closeReason: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            codeName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            codeName: string;
        }, {
            name: string;
            id: number;
            codeName: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        dateFormat: string;
        locale: string;
        closedOnDate: string;
        closeReason: {
            name: string;
            id: number;
            codeName: string;
        };
    }, {
        status: string;
        dateFormat: string;
        locale: string;
        closedOnDate: string;
        closeReason: {
            name: string;
            id: number;
            codeName: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    resourceId: number;
    officeId: number;
    savingsId: number;
    changes: {
        status: string;
        dateFormat: string;
        locale: string;
        closedOnDate: string;
        closeReason: {
            name: string;
            id: number;
            codeName: string;
        };
    };
}, {
    clientId: number;
    resourceId: number;
    officeId: number;
    savingsId: number;
    changes: {
        status: string;
        dateFormat: string;
        locale: string;
        closedOnDate: string;
        closeReason: {
            name: string;
            id: number;
            codeName: string;
        };
    };
}>;
type CloseAccountRequest = z.infer<typeof CloseAccountRequestSchema>;
type CloseAccountResponse = z.infer<typeof CloseAccountResponseSchema>;
declare const BlockAccountRequestSchema: z.ZodObject<{
    blockReasonCodeId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    blockReasonCodeId: number;
}, {
    blockReasonCodeId: number;
}>;
declare const BlockAccountResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    officeId: z.ZodNumber;
    savingsId: z.ZodNumber;
    resourceId: z.ZodNumber;
    changes: z.ZodObject<{
        subStatus: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            none: z.ZodBoolean;
            inactive: z.ZodBoolean;
            dormant: z.ZodBoolean;
            escheat: z.ZodBoolean;
            block: z.ZodBoolean;
            blockCredit: z.ZodBoolean;
            blockDebit: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }>;
        blockReason: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            codeName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            codeName: string;
        }, {
            name: string;
            id: number;
            codeName: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        blockReason: {
            name: string;
            id: number;
            codeName: string;
        };
    }, {
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        blockReason: {
            name: string;
            id: number;
            codeName: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: number;
    clientId: number;
    resourceId: number;
    officeId: number;
    savingsId: number;
    changes: {
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        blockReason: {
            name: string;
            id: number;
            codeName: string;
        };
    };
}, {
    id: number;
    clientId: number;
    resourceId: number;
    officeId: number;
    savingsId: number;
    changes: {
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        blockReason: {
            name: string;
            id: number;
            codeName: string;
        };
    };
}>;
type BlockAccountRequest = z.infer<typeof BlockAccountRequestSchema>;
type BlockAccountResponse = z.infer<typeof BlockAccountResponseSchema>;
declare const HoldAmountRequestSchema: z.ZodObject<{
    transactionAmount: z.ZodNumber;
    holdAmountReasonCodeId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    transactionAmount: number;
    holdAmountReasonCodeId: number;
}, {
    transactionAmount: number;
    holdAmountReasonCodeId: number;
}>;
declare const HoldAmountResponseSchema: z.ZodObject<{
    id: z.ZodString;
    resourceId: z.ZodNumber;
    changes: z.ZodObject<{
        savingsAmountOnHold: z.ZodNumber;
        blockAmountReason: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            codeName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            codeName: string;
        }, {
            name: string;
            id: number;
            codeName: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        savingsAmountOnHold: number;
        blockAmountReason: {
            name: string;
            id: number;
            codeName: string;
        };
    }, {
        savingsAmountOnHold: number;
        blockAmountReason: {
            name: string;
            id: number;
            codeName: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    resourceId: number;
    changes: {
        savingsAmountOnHold: number;
        blockAmountReason: {
            name: string;
            id: number;
            codeName: string;
        };
    };
}, {
    id: string;
    resourceId: number;
    changes: {
        savingsAmountOnHold: number;
        blockAmountReason: {
            name: string;
            id: number;
            codeName: string;
        };
    };
}>;
type HoldAmountRequest = z.infer<typeof HoldAmountRequestSchema>;
type HoldAmountResponse = z.infer<typeof HoldAmountResponseSchema>;

declare const UserDetailShape: {
    username: z.ZodString;
    userId: z.ZodNumber;
    accessToken: z.ZodString;
    authenticated: z.ZodBoolean;
    officeId: z.ZodNumber;
    officeName: z.ZodString;
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodString;
        disabled: z.ZodBoolean;
        isSelfService: z.ZodBoolean;
        position: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }, {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }>, "many">;
    permissions: z.ZodArray<z.ZodString, "many">;
    shouldRenewPassword: z.ZodBoolean;
    isTwoFactorAuthenticationRequired: z.ZodBoolean;
    isSelfServiceUser: z.ZodBoolean;
};
declare const UserDetailSchema: z.ZodObject<{
    username: z.ZodString;
    userId: z.ZodNumber;
    accessToken: z.ZodString;
    authenticated: z.ZodBoolean;
    officeId: z.ZodNumber;
    officeName: z.ZodString;
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodString;
        disabled: z.ZodBoolean;
        isSelfService: z.ZodBoolean;
        position: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }, {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }>, "many">;
    permissions: z.ZodArray<z.ZodString, "many">;
    shouldRenewPassword: z.ZodBoolean;
    isTwoFactorAuthenticationRequired: z.ZodBoolean;
    isSelfServiceUser: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    officeId: number;
    username: string;
    userId: number;
    accessToken: string;
    authenticated: boolean;
    officeName: string;
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
}, {
    officeId: number;
    username: string;
    userId: number;
    accessToken: string;
    authenticated: boolean;
    officeName: string;
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
}>;
type UserDetail = z.infer<typeof UserDetailSchema>;
declare const EnableSelfServiceAccessRequestSchema: z.ZodObject<{
    username: z.ZodString;
    firstname: z.ZodString;
    lastname: z.ZodString;
    officeId: z.ZodNumber;
    roles: z.ZodArray<z.ZodNumber, "many">;
    sendPasswordToEmail: z.ZodOptional<z.ZodBoolean>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    repeatPassword: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    clients: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
    officeId: number;
    username: string;
    roles: number[];
    firstname: string;
    lastname: string;
    sendPasswordToEmail?: boolean | undefined;
    email?: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
    enabled?: boolean | undefined;
    clients?: number[] | undefined;
}, {
    officeId: number;
    username: string;
    roles: number[];
    firstname: string;
    lastname: string;
    sendPasswordToEmail?: boolean | undefined;
    email?: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
    enabled?: boolean | undefined;
    clients?: number[] | undefined;
}>;
type EnableSelfServiceAccessRequest = z.infer<typeof EnableSelfServiceAccessRequestSchema>;
declare const EnableSelfServiceAccessResponseSchema: z.ZodObject<{
    id: z.ZodString;
    officeId: z.ZodNumber;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
    data: z.ZodObject<{
        client: z.ZodObject<{
            officeName: z.ZodString;
            displayName: z.ZodString;
            accountNo: z.ZodNumber;
            id: z.ZodNumber;
            status: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: string;
            id: number;
            accountNo: number;
            displayName: string;
            officeName: string;
        }, {
            status: string;
            id: number;
            accountNo: number;
            displayName: string;
            officeName: string;
        }>;
        maker: z.ZodObject<{
            firstName: z.ZodString;
            lastName: z.ZodString;
            id: z.ZodNumber;
            email: z.ZodString;
            username: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        }, {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        }>;
        createdUser: z.ZodObject<{
            firstName: z.ZodString;
            lastName: z.ZodString;
            id: z.ZodNumber;
            email: z.ZodString;
            username: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        }, {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        client: {
            status: string;
            id: number;
            accountNo: number;
            displayName: string;
            officeName: string;
        };
        maker: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        createdUser: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    }, {
        client: {
            status: string;
            id: number;
            accountNo: number;
            displayName: string;
            officeName: string;
        };
        maker: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        createdUser: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    clientId: number;
    resourceId: number;
    data: {
        client: {
            status: string;
            id: number;
            accountNo: number;
            displayName: string;
            officeName: string;
        };
        maker: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        createdUser: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    };
    officeId: number;
}, {
    id: string;
    clientId: number;
    resourceId: number;
    data: {
        client: {
            status: string;
            id: number;
            accountNo: number;
            displayName: string;
            officeName: string;
        };
        maker: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        createdUser: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    };
    officeId: number;
}>;
type EnableSelfServiceAccessResponse = z.infer<typeof EnableSelfServiceAccessResponseSchema>;
declare const UpdateSelfServiceUserRequestSchema: z.ZodObject<{
    username: z.ZodString;
    firstname: z.ZodString;
    lastname: z.ZodString;
    officeId: z.ZodNumber;
    roles: z.ZodArray<z.ZodNumber, "many">;
    sendPasswordToEmail: z.ZodOptional<z.ZodBoolean>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    repeatPassword: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    clients: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    officeId: number;
    username: string;
    userId: number;
    roles: number[];
    firstname: string;
    lastname: string;
    sendPasswordToEmail?: boolean | undefined;
    email?: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
    enabled?: boolean | undefined;
    clients?: number[] | undefined;
}, {
    officeId: number;
    username: string;
    userId: number;
    roles: number[];
    firstname: string;
    lastname: string;
    sendPasswordToEmail?: boolean | undefined;
    email?: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
    enabled?: boolean | undefined;
    clients?: number[] | undefined;
}>;
type UpdateSelfServiceUserRequest = z.infer<typeof UpdateSelfServiceUserRequestSchema>;
declare const UpdateSelfServiceUserResponseSchema: z.ZodObject<{
    changes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    officeId: z.ZodNumber;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    resourceId: number;
    officeId: number;
    changes?: Record<string, unknown> | undefined;
}, {
    clientId: number;
    resourceId: number;
    officeId: number;
    changes?: Record<string, unknown> | undefined;
}>;
type UpdateSelfServiceUserResponse = z.infer<typeof UpdateSelfServiceUserResponseSchema>;
declare const DeleteSelfServiceUserResponseSchema: z.ZodObject<{
    officeId: z.ZodNumber;
    clientId: z.ZodNumber;
    resourceId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    resourceId: number;
    officeId: number;
}, {
    clientId: number;
    resourceId: number;
    officeId: number;
}>;
type DeleteSelfServiceUserResponse = z.infer<typeof DeleteSelfServiceUserResponseSchema>;

interface GlobalConfiguration {
    name: string;
    enabled: boolean;
    id: number;
    trapDoor: boolean;
    valueDataType: string;
}
interface GetConfigurationsResponse {
    globalConfiguration: GlobalConfiguration[];
}
interface GetConfigurationByNameResponse {
    'virtual-card-reordering-limit'?: boolean;
    value?: string;
    id?: number;
    description?: string;
    trapDoor?: boolean;
    valueDataType?: string;
}
interface UpdateConfigurationRequest {
    enabled: boolean;
}
interface UpdateConfigurationResponse {
    id?: string;
    resourceId?: number;
    changes?: {
        enabled?: boolean;
    };
}

declare const GetPendingTransactionsResponseSchema: z.ZodObject<{
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        transfer: z.ZodObject<{
            id: z.ZodNumber;
            amount: z.ZodNumber;
            correlationId: z.ZodString;
            creditor: z.ZodObject<{
                identifier: z.ZodString;
                name: z.ZodString;
                city: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
                country: z.ZodString;
                stateOrProvince: z.ZodOptional<z.ZodString>;
                agent: z.ZodOptional<z.ZodObject<{
                    identifier: z.ZodOptional<z.ZodString>;
                    name: z.ZodOptional<z.ZodString>;
                    country: z.ZodString;
                    address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }>>;
                address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                accountType: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }>;
            debtor: z.ZodObject<{
                identifier: z.ZodString;
                name: z.ZodString;
                city: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
                country: z.ZodString;
                stateOrProvince: z.ZodOptional<z.ZodString>;
                agent: z.ZodOptional<z.ZodObject<{
                    identifier: z.ZodOptional<z.ZodString>;
                    name: z.ZodOptional<z.ZodString>;
                    country: z.ZodString;
                    address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }>>;
                address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                accountType: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }>;
            createdAt: z.ZodString;
            executedAt: z.ZodString;
            externalId: z.ZodString;
            reference: z.ZodArray<z.ZodString, "many">;
            status: z.ZodString;
            transactionId: z.ZodString;
            type: z.ZodString;
            valueDate: z.ZodString;
            paymentType: z.ZodString;
            debtorAccountNumber: z.ZodString;
            debtorAccountId: z.ZodNumber;
            creditorAccountNumber: z.ZodString;
            paymentRailMetaData: z.ZodOptional<z.ZodObject<{
                businessFunctionCode: z.ZodOptional<z.ZodObject<{
                    businessFunctionCode: z.ZodString;
                    transactionTypeCode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                }, {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                }>>;
                receiverDepositoryInstitution: z.ZodOptional<z.ZodObject<{
                    receiverABANumber: z.ZodString;
                    receiverShortName: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    receiverABANumber: string;
                    receiverShortName: string;
                }, {
                    receiverABANumber: string;
                    receiverShortName: string;
                }>>;
                originator: z.ZodOptional<z.ZodObject<{
                    personal: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode: string;
                    }, {
                        identificationCode: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }>>;
                beneficiary: z.ZodOptional<z.ZodObject<{
                    personal: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode: string;
                    }, {
                        identificationCode: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }>>;
                beneficiaryFI: z.ZodOptional<z.ZodObject<{
                    financialInstitution: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode?: string | undefined;
                    }, {
                        identificationCode?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }>>;
                beneficiaryIntermediaryFI: z.ZodOptional<z.ZodObject<{
                    financialInstitution: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode?: string | undefined;
                    }, {
                        identificationCode?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }>>;
                typeSubType: z.ZodOptional<z.ZodObject<{
                    typeCode: z.ZodString;
                    subTypeCode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    typeCode: string;
                    subTypeCode: string;
                }, {
                    typeCode: string;
                    subTypeCode: string;
                }>>;
                fiPaymentMethodToBeneficiary: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            }, {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            }>>;
            traceNumbers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            statementDescription: z.ZodString;
            stopFutureDebit: z.ZodBoolean;
            createdBySystem: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        }, {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        }>;
        typeOf: z.ZodString;
        valueDate: z.ZodString;
        amount: z.ZodNumber;
        pendingAmount: z.ZodNumber;
        createdAt: z.ZodString;
        manual: z.ZodBoolean;
        active: z.ZodBoolean;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: number;
        amount: number;
        createdAt: string;
        valueDate: string;
        active: boolean;
        transfer: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        };
        typeOf: string;
        pendingAmount: number;
        manual: boolean;
    }, {
        type: string;
        id: number;
        amount: number;
        createdAt: string;
        valueDate: string;
        active: boolean;
        transfer: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        };
        typeOf: string;
        pendingAmount: number;
        manual: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: {
        type: string;
        id: number;
        amount: number;
        createdAt: string;
        valueDate: string;
        active: boolean;
        transfer: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        };
        typeOf: string;
        pendingAmount: number;
        manual: boolean;
    }[];
}, {
    totalFilteredRecords: number;
    pageItems: {
        type: string;
        id: number;
        amount: number;
        createdAt: string;
        valueDate: string;
        active: boolean;
        transfer: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        };
        typeOf: string;
        pendingAmount: number;
        manual: boolean;
    }[];
}>;
declare const GetPendingTransactionsRequestSchema: z.ZodObject<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    orderBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}, {
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
type GetPendingTransactionsResponse = z.infer<typeof GetPendingTransactionsResponseSchema>;
type GetPendingTransactionsRequest = z.infer<typeof GetPendingTransactionsRequestSchema>;
declare const GetCompletedTransactionsResponseSchema: z.ZodObject<{
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        transactionType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            deposit: z.ZodOptional<z.ZodBoolean>;
            dividendPayout: z.ZodOptional<z.ZodBoolean>;
            withdrawal: z.ZodOptional<z.ZodBoolean>;
            interestPosting: z.ZodOptional<z.ZodBoolean>;
            feeDeduction: z.ZodOptional<z.ZodBoolean>;
            initiateTransfer: z.ZodOptional<z.ZodBoolean>;
            approveTransfer: z.ZodOptional<z.ZodBoolean>;
            withdrawTransfer: z.ZodOptional<z.ZodBoolean>;
            rejectTransfer: z.ZodOptional<z.ZodBoolean>;
            overdraftInterest: z.ZodOptional<z.ZodBoolean>;
            writtenoff: z.ZodOptional<z.ZodBoolean>;
            overdraftFee: z.ZodOptional<z.ZodBoolean>;
            withholdTax: z.ZodOptional<z.ZodBoolean>;
            escheat: z.ZodOptional<z.ZodBoolean>;
            amountHold: z.ZodOptional<z.ZodBoolean>;
            amountRelease: z.ZodOptional<z.ZodBoolean>;
            interestpayableAccrued: z.ZodOptional<z.ZodBoolean>;
            overdraftInterestReceivableAccrued: z.ZodOptional<z.ZodBoolean>;
            isDebit: z.ZodOptional<z.ZodBoolean>;
            chargeBack: z.ZodOptional<z.ZodBoolean>;
            isFeeReversal: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            escheat?: boolean | undefined;
            deposit?: boolean | undefined;
            dividendPayout?: boolean | undefined;
            withdrawal?: boolean | undefined;
            interestPosting?: boolean | undefined;
            feeDeduction?: boolean | undefined;
            initiateTransfer?: boolean | undefined;
            approveTransfer?: boolean | undefined;
            withdrawTransfer?: boolean | undefined;
            rejectTransfer?: boolean | undefined;
            overdraftInterest?: boolean | undefined;
            writtenoff?: boolean | undefined;
            overdraftFee?: boolean | undefined;
            withholdTax?: boolean | undefined;
            amountHold?: boolean | undefined;
            amountRelease?: boolean | undefined;
            interestpayableAccrued?: boolean | undefined;
            overdraftInterestReceivableAccrued?: boolean | undefined;
            isDebit?: boolean | undefined;
            chargeBack?: boolean | undefined;
            isFeeReversal?: boolean | undefined;
        }, {
            value: string;
            code: string;
            id: number;
            escheat?: boolean | undefined;
            deposit?: boolean | undefined;
            dividendPayout?: boolean | undefined;
            withdrawal?: boolean | undefined;
            interestPosting?: boolean | undefined;
            feeDeduction?: boolean | undefined;
            initiateTransfer?: boolean | undefined;
            approveTransfer?: boolean | undefined;
            withdrawTransfer?: boolean | undefined;
            rejectTransfer?: boolean | undefined;
            overdraftInterest?: boolean | undefined;
            writtenoff?: boolean | undefined;
            overdraftFee?: boolean | undefined;
            withholdTax?: boolean | undefined;
            amountHold?: boolean | undefined;
            amountRelease?: boolean | undefined;
            interestpayableAccrued?: boolean | undefined;
            overdraftInterestReceivableAccrued?: boolean | undefined;
            isDebit?: boolean | undefined;
            chargeBack?: boolean | undefined;
            isFeeReversal?: boolean | undefined;
        }>;
        accountId: z.ZodOptional<z.ZodNumber>;
        accountNo: z.ZodOptional<z.ZodString>;
        enrichedTransactionData: z.ZodOptional<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            merchantLogoUrl: z.ZodOptional<z.ZodString>;
            merchantWebsite: z.ZodOptional<z.ZodString>;
            merchantName: z.ZodOptional<z.ZodString>;
            paymentChannel: z.ZodOptional<z.ZodString>;
            personalFinanceCategoryIconUrl: z.ZodOptional<z.ZodString>;
            personalFinanceCategory: z.ZodOptional<z.ZodString>;
            personalFinanceSubCategory: z.ZodOptional<z.ZodString>;
            isRecurring: z.ZodOptional<z.ZodBoolean>;
            merchantPhoneNumber: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodObject<{
                address: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                region: z.ZodOptional<z.ZodString>;
                postal_code: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                store_number: z.ZodOptional<z.ZodString>;
                lat: z.ZodOptional<z.ZodNumber>;
                lon: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            }, {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id?: string | undefined;
            merchantLogoUrl?: string | undefined;
            merchantWebsite?: string | undefined;
            merchantName?: string | undefined;
            paymentChannel?: string | undefined;
            personalFinanceCategoryIconUrl?: string | undefined;
            personalFinanceCategory?: string | undefined;
            personalFinanceSubCategory?: string | undefined;
            isRecurring?: boolean | undefined;
            merchantPhoneNumber?: string | undefined;
            location?: {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            } | undefined;
        }, {
            id?: string | undefined;
            merchantLogoUrl?: string | undefined;
            merchantWebsite?: string | undefined;
            merchantName?: string | undefined;
            paymentChannel?: string | undefined;
            personalFinanceCategoryIconUrl?: string | undefined;
            personalFinanceCategory?: string | undefined;
            personalFinanceSubCategory?: string | undefined;
            isRecurring?: boolean | undefined;
            merchantPhoneNumber?: string | undefined;
            location?: {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            } | undefined;
        }>>;
        date: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodNumber, "many">]>;
        dateTime: z.ZodOptional<z.ZodString>;
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        paymentDetailData: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            paymentType: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: number;
            }, {
                name: string;
                id: number;
            }>>;
            reference: z.ZodOptional<z.ZodString>;
            accountNumber: z.ZodOptional<z.ZodString>;
            checkNumber: z.ZodOptional<z.ZodString>;
            routingCode: z.ZodOptional<z.ZodString>;
            receiptNumber: z.ZodOptional<z.ZodString>;
            bankNumber: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            paymentType?: {
                name: string;
                id: number;
            } | undefined;
            reference?: string | undefined;
            accountNumber?: string | undefined;
            checkNumber?: string | undefined;
            routingCode?: string | undefined;
            receiptNumber?: string | undefined;
            bankNumber?: string | undefined;
        }, {
            id: number;
            paymentType?: {
                name: string;
                id: number;
            } | undefined;
            reference?: string | undefined;
            accountNumber?: string | undefined;
            checkNumber?: string | undefined;
            routingCode?: string | undefined;
            receiptNumber?: string | undefined;
            bankNumber?: string | undefined;
        }>>;
        amount: z.ZodNumber;
        runningBalance: z.ZodNumber;
        accrualRunningBalance: z.ZodOptional<z.ZodNumber>;
        interestPayableDerived: z.ZodOptional<z.ZodNumber>;
        reversed: z.ZodBoolean;
        submittedOnDate: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodNumber, "many">]>;
        interestedPostedAsOn: z.ZodBoolean;
        bookingDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodNumber, "many">]>>;
        submittedByUsername: z.ZodOptional<z.ZodString>;
        isReversal: z.ZodOptional<z.ZodBoolean>;
        originalTransactionId: z.ZodOptional<z.ZodNumber>;
        lienTransaction: z.ZodOptional<z.ZodBoolean>;
        releaseTransactionId: z.ZodOptional<z.ZodNumber>;
        reasonForBlock: z.ZodOptional<z.ZodString>;
        refNo: z.ZodOptional<z.ZodString>;
        subTransactionType: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
        isAlreadyChargeBack: z.ZodOptional<z.ZodBoolean>;
        initiatedAt: z.ZodOptional<z.ZodString>;
        transactionReferenceId: z.ZodOptional<z.ZodString>;
        createdBySystem: z.ZodOptional<z.ZodBoolean>;
        transfer: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            amount: z.ZodNumber;
            correlationId: z.ZodString;
            creditor: z.ZodObject<{
                identifier: z.ZodString;
                name: z.ZodString;
                city: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
                country: z.ZodString;
                stateOrProvince: z.ZodOptional<z.ZodString>;
                agent: z.ZodOptional<z.ZodObject<{
                    identifier: z.ZodOptional<z.ZodString>;
                    name: z.ZodOptional<z.ZodString>;
                    country: z.ZodString;
                    address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }>>;
                address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                accountType: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }>;
            debtor: z.ZodObject<{
                identifier: z.ZodString;
                name: z.ZodString;
                city: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
                country: z.ZodString;
                stateOrProvince: z.ZodOptional<z.ZodString>;
                agent: z.ZodOptional<z.ZodObject<{
                    identifier: z.ZodOptional<z.ZodString>;
                    name: z.ZodOptional<z.ZodString>;
                    country: z.ZodString;
                    address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }, {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                }>>;
                address: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                accountType: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }, {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            }>;
            createdAt: z.ZodString;
            executedAt: z.ZodString;
            externalId: z.ZodString;
            reference: z.ZodArray<z.ZodString, "many">;
            status: z.ZodString;
            transactionId: z.ZodString;
            type: z.ZodString;
            valueDate: z.ZodString;
            paymentType: z.ZodString;
            debtorAccountNumber: z.ZodString;
            debtorAccountId: z.ZodNumber;
            creditorAccountNumber: z.ZodString;
            paymentRailMetaData: z.ZodOptional<z.ZodObject<{
                businessFunctionCode: z.ZodOptional<z.ZodObject<{
                    businessFunctionCode: z.ZodString;
                    transactionTypeCode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                }, {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                }>>;
                receiverDepositoryInstitution: z.ZodOptional<z.ZodObject<{
                    receiverABANumber: z.ZodString;
                    receiverShortName: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    receiverABANumber: string;
                    receiverShortName: string;
                }, {
                    receiverABANumber: string;
                    receiverShortName: string;
                }>>;
                originator: z.ZodOptional<z.ZodObject<{
                    personal: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode: string;
                    }, {
                        identificationCode: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }>>;
                beneficiary: z.ZodOptional<z.ZodObject<{
                    personal: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode: string;
                    }, {
                        identificationCode: string;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }, {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                }>>;
                beneficiaryFI: z.ZodOptional<z.ZodObject<{
                    financialInstitution: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode?: string | undefined;
                    }, {
                        identificationCode?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }>>;
                beneficiaryIntermediaryFI: z.ZodOptional<z.ZodObject<{
                    financialInstitution: z.ZodOptional<z.ZodObject<{
                        identificationCode: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        identificationCode?: string | undefined;
                    }, {
                        identificationCode?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }, {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                }>>;
                typeSubType: z.ZodOptional<z.ZodObject<{
                    typeCode: z.ZodString;
                    subTypeCode: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    typeCode: string;
                    subTypeCode: string;
                }, {
                    typeCode: string;
                    subTypeCode: string;
                }>>;
                fiPaymentMethodToBeneficiary: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            }, {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            }>>;
            traceNumbers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            statementDescription: z.ZodString;
            stopFutureDebit: z.ZodBoolean;
            createdBySystem: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        }, {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        date: string | number[];
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        amount: number;
        submittedOnDate: string | number[];
        transactionType: {
            value: string;
            code: string;
            id: number;
            escheat?: boolean | undefined;
            deposit?: boolean | undefined;
            dividendPayout?: boolean | undefined;
            withdrawal?: boolean | undefined;
            interestPosting?: boolean | undefined;
            feeDeduction?: boolean | undefined;
            initiateTransfer?: boolean | undefined;
            approveTransfer?: boolean | undefined;
            withdrawTransfer?: boolean | undefined;
            rejectTransfer?: boolean | undefined;
            overdraftInterest?: boolean | undefined;
            writtenoff?: boolean | undefined;
            overdraftFee?: boolean | undefined;
            withholdTax?: boolean | undefined;
            amountHold?: boolean | undefined;
            amountRelease?: boolean | undefined;
            interestpayableAccrued?: boolean | undefined;
            overdraftInterestReceivableAccrued?: boolean | undefined;
            isDebit?: boolean | undefined;
            chargeBack?: boolean | undefined;
            isFeeReversal?: boolean | undefined;
        };
        runningBalance: number;
        reversed: boolean;
        interestedPostedAsOn: boolean;
        status?: string | undefined;
        accountNo?: string | undefined;
        accountId?: number | undefined;
        submittedByUsername?: string | undefined;
        createdBySystem?: boolean | undefined;
        transfer?: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        } | undefined;
        enrichedTransactionData?: {
            id?: string | undefined;
            merchantLogoUrl?: string | undefined;
            merchantWebsite?: string | undefined;
            merchantName?: string | undefined;
            paymentChannel?: string | undefined;
            personalFinanceCategoryIconUrl?: string | undefined;
            personalFinanceCategory?: string | undefined;
            personalFinanceSubCategory?: string | undefined;
            isRecurring?: boolean | undefined;
            merchantPhoneNumber?: string | undefined;
            location?: {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            } | undefined;
        } | undefined;
        dateTime?: string | undefined;
        paymentDetailData?: {
            id: number;
            paymentType?: {
                name: string;
                id: number;
            } | undefined;
            reference?: string | undefined;
            accountNumber?: string | undefined;
            checkNumber?: string | undefined;
            routingCode?: string | undefined;
            receiptNumber?: string | undefined;
            bankNumber?: string | undefined;
        } | undefined;
        accrualRunningBalance?: number | undefined;
        interestPayableDerived?: number | undefined;
        bookingDate?: string | number[] | undefined;
        isReversal?: boolean | undefined;
        originalTransactionId?: number | undefined;
        lienTransaction?: boolean | undefined;
        releaseTransactionId?: number | undefined;
        reasonForBlock?: string | undefined;
        refNo?: string | undefined;
        subTransactionType?: string | undefined;
        isAlreadyChargeBack?: boolean | undefined;
        initiatedAt?: string | undefined;
        transactionReferenceId?: string | undefined;
    }, {
        date: string | number[];
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        amount: number;
        submittedOnDate: string | number[];
        transactionType: {
            value: string;
            code: string;
            id: number;
            escheat?: boolean | undefined;
            deposit?: boolean | undefined;
            dividendPayout?: boolean | undefined;
            withdrawal?: boolean | undefined;
            interestPosting?: boolean | undefined;
            feeDeduction?: boolean | undefined;
            initiateTransfer?: boolean | undefined;
            approveTransfer?: boolean | undefined;
            withdrawTransfer?: boolean | undefined;
            rejectTransfer?: boolean | undefined;
            overdraftInterest?: boolean | undefined;
            writtenoff?: boolean | undefined;
            overdraftFee?: boolean | undefined;
            withholdTax?: boolean | undefined;
            amountHold?: boolean | undefined;
            amountRelease?: boolean | undefined;
            interestpayableAccrued?: boolean | undefined;
            overdraftInterestReceivableAccrued?: boolean | undefined;
            isDebit?: boolean | undefined;
            chargeBack?: boolean | undefined;
            isFeeReversal?: boolean | undefined;
        };
        runningBalance: number;
        reversed: boolean;
        interestedPostedAsOn: boolean;
        status?: string | undefined;
        accountNo?: string | undefined;
        accountId?: number | undefined;
        submittedByUsername?: string | undefined;
        createdBySystem?: boolean | undefined;
        transfer?: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        } | undefined;
        enrichedTransactionData?: {
            id?: string | undefined;
            merchantLogoUrl?: string | undefined;
            merchantWebsite?: string | undefined;
            merchantName?: string | undefined;
            paymentChannel?: string | undefined;
            personalFinanceCategoryIconUrl?: string | undefined;
            personalFinanceCategory?: string | undefined;
            personalFinanceSubCategory?: string | undefined;
            isRecurring?: boolean | undefined;
            merchantPhoneNumber?: string | undefined;
            location?: {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            } | undefined;
        } | undefined;
        dateTime?: string | undefined;
        paymentDetailData?: {
            id: number;
            paymentType?: {
                name: string;
                id: number;
            } | undefined;
            reference?: string | undefined;
            accountNumber?: string | undefined;
            checkNumber?: string | undefined;
            routingCode?: string | undefined;
            receiptNumber?: string | undefined;
            bankNumber?: string | undefined;
        } | undefined;
        accrualRunningBalance?: number | undefined;
        interestPayableDerived?: number | undefined;
        bookingDate?: string | number[] | undefined;
        isReversal?: boolean | undefined;
        originalTransactionId?: number | undefined;
        lienTransaction?: boolean | undefined;
        releaseTransactionId?: number | undefined;
        reasonForBlock?: string | undefined;
        refNo?: string | undefined;
        subTransactionType?: string | undefined;
        isAlreadyChargeBack?: boolean | undefined;
        initiatedAt?: string | undefined;
        transactionReferenceId?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: {
        date: string | number[];
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        amount: number;
        submittedOnDate: string | number[];
        transactionType: {
            value: string;
            code: string;
            id: number;
            escheat?: boolean | undefined;
            deposit?: boolean | undefined;
            dividendPayout?: boolean | undefined;
            withdrawal?: boolean | undefined;
            interestPosting?: boolean | undefined;
            feeDeduction?: boolean | undefined;
            initiateTransfer?: boolean | undefined;
            approveTransfer?: boolean | undefined;
            withdrawTransfer?: boolean | undefined;
            rejectTransfer?: boolean | undefined;
            overdraftInterest?: boolean | undefined;
            writtenoff?: boolean | undefined;
            overdraftFee?: boolean | undefined;
            withholdTax?: boolean | undefined;
            amountHold?: boolean | undefined;
            amountRelease?: boolean | undefined;
            interestpayableAccrued?: boolean | undefined;
            overdraftInterestReceivableAccrued?: boolean | undefined;
            isDebit?: boolean | undefined;
            chargeBack?: boolean | undefined;
            isFeeReversal?: boolean | undefined;
        };
        runningBalance: number;
        reversed: boolean;
        interestedPostedAsOn: boolean;
        status?: string | undefined;
        accountNo?: string | undefined;
        accountId?: number | undefined;
        submittedByUsername?: string | undefined;
        createdBySystem?: boolean | undefined;
        transfer?: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        } | undefined;
        enrichedTransactionData?: {
            id?: string | undefined;
            merchantLogoUrl?: string | undefined;
            merchantWebsite?: string | undefined;
            merchantName?: string | undefined;
            paymentChannel?: string | undefined;
            personalFinanceCategoryIconUrl?: string | undefined;
            personalFinanceCategory?: string | undefined;
            personalFinanceSubCategory?: string | undefined;
            isRecurring?: boolean | undefined;
            merchantPhoneNumber?: string | undefined;
            location?: {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            } | undefined;
        } | undefined;
        dateTime?: string | undefined;
        paymentDetailData?: {
            id: number;
            paymentType?: {
                name: string;
                id: number;
            } | undefined;
            reference?: string | undefined;
            accountNumber?: string | undefined;
            checkNumber?: string | undefined;
            routingCode?: string | undefined;
            receiptNumber?: string | undefined;
            bankNumber?: string | undefined;
        } | undefined;
        accrualRunningBalance?: number | undefined;
        interestPayableDerived?: number | undefined;
        bookingDate?: string | number[] | undefined;
        isReversal?: boolean | undefined;
        originalTransactionId?: number | undefined;
        lienTransaction?: boolean | undefined;
        releaseTransactionId?: number | undefined;
        reasonForBlock?: string | undefined;
        refNo?: string | undefined;
        subTransactionType?: string | undefined;
        isAlreadyChargeBack?: boolean | undefined;
        initiatedAt?: string | undefined;
        transactionReferenceId?: string | undefined;
    }[];
}, {
    totalFilteredRecords: number;
    pageItems: {
        date: string | number[];
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        amount: number;
        submittedOnDate: string | number[];
        transactionType: {
            value: string;
            code: string;
            id: number;
            escheat?: boolean | undefined;
            deposit?: boolean | undefined;
            dividendPayout?: boolean | undefined;
            withdrawal?: boolean | undefined;
            interestPosting?: boolean | undefined;
            feeDeduction?: boolean | undefined;
            initiateTransfer?: boolean | undefined;
            approveTransfer?: boolean | undefined;
            withdrawTransfer?: boolean | undefined;
            rejectTransfer?: boolean | undefined;
            overdraftInterest?: boolean | undefined;
            writtenoff?: boolean | undefined;
            overdraftFee?: boolean | undefined;
            withholdTax?: boolean | undefined;
            amountHold?: boolean | undefined;
            amountRelease?: boolean | undefined;
            interestpayableAccrued?: boolean | undefined;
            overdraftInterestReceivableAccrued?: boolean | undefined;
            isDebit?: boolean | undefined;
            chargeBack?: boolean | undefined;
            isFeeReversal?: boolean | undefined;
        };
        runningBalance: number;
        reversed: boolean;
        interestedPostedAsOn: boolean;
        status?: string | undefined;
        accountNo?: string | undefined;
        accountId?: number | undefined;
        submittedByUsername?: string | undefined;
        createdBySystem?: boolean | undefined;
        transfer?: {
            type: string;
            status: string;
            id: number;
            paymentType: string;
            amount: number;
            externalId: string;
            reference: string[];
            statementDescription: string;
            createdAt: string;
            debtor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            creditor: {
                name: string;
                identifier: string;
                country: string;
                accountType?: string | undefined;
                agent?: {
                    country: string;
                    name?: string | undefined;
                    identifier?: string | undefined;
                    address?: string[] | undefined;
                } | undefined;
                address?: string[] | undefined;
                postalCode?: string | undefined;
                city?: string | undefined;
                stateOrProvince?: string | undefined;
            };
            executedAt: string;
            correlationId: string;
            valueDate: string;
            transactionId: string;
            debtorAccountNumber: string;
            debtorAccountId: number;
            creditorAccountNumber: string;
            stopFutureDebit: boolean;
            createdBySystem: boolean;
            traceNumbers?: Record<string, any> | undefined;
            paymentRailMetaData?: {
                originator?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                businessFunctionCode?: {
                    businessFunctionCode: string;
                    transactionTypeCode: string;
                } | undefined;
                receiverDepositoryInstitution?: {
                    receiverABANumber: string;
                    receiverShortName: string;
                } | undefined;
                beneficiary?: {
                    personal?: {
                        identificationCode: string;
                    } | undefined;
                } | undefined;
                beneficiaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                beneficiaryIntermediaryFI?: {
                    financialInstitution?: {
                        identificationCode?: string | undefined;
                    } | undefined;
                } | undefined;
                typeSubType?: {
                    typeCode: string;
                    subTypeCode: string;
                } | undefined;
                fiPaymentMethodToBeneficiary?: Record<string, any> | undefined;
            } | undefined;
        } | undefined;
        enrichedTransactionData?: {
            id?: string | undefined;
            merchantLogoUrl?: string | undefined;
            merchantWebsite?: string | undefined;
            merchantName?: string | undefined;
            paymentChannel?: string | undefined;
            personalFinanceCategoryIconUrl?: string | undefined;
            personalFinanceCategory?: string | undefined;
            personalFinanceSubCategory?: string | undefined;
            isRecurring?: boolean | undefined;
            merchantPhoneNumber?: string | undefined;
            location?: {
                address?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                region?: string | undefined;
                postal_code?: string | undefined;
                store_number?: string | undefined;
                lat?: number | undefined;
                lon?: number | undefined;
            } | undefined;
        } | undefined;
        dateTime?: string | undefined;
        paymentDetailData?: {
            id: number;
            paymentType?: {
                name: string;
                id: number;
            } | undefined;
            reference?: string | undefined;
            accountNumber?: string | undefined;
            checkNumber?: string | undefined;
            routingCode?: string | undefined;
            receiptNumber?: string | undefined;
            bankNumber?: string | undefined;
        } | undefined;
        accrualRunningBalance?: number | undefined;
        interestPayableDerived?: number | undefined;
        bookingDate?: string | number[] | undefined;
        isReversal?: boolean | undefined;
        originalTransactionId?: number | undefined;
        lienTransaction?: boolean | undefined;
        releaseTransactionId?: number | undefined;
        reasonForBlock?: string | undefined;
        refNo?: string | undefined;
        subTransactionType?: string | undefined;
        isAlreadyChargeBack?: boolean | undefined;
        initiatedAt?: string | undefined;
        transactionReferenceId?: string | undefined;
    }[];
}>;
declare enum SubTransactionType {
    NONE = 0,
    CARD_TRANSACTION = 1,
    SETTLEMENT_RETURN_CREDIT = 2,
    LOAN_DISBURSEMENT = 3,
    LOAN_REPAYMENT = 4,
    CARD_AUTHORIZE_PAYMENT = 5,
    DOMESTIC_ATM_WITHDRAWAL_FEE = 6,
    INTERNATIONAL_ATM_WITHDRAWAL_FEE = 7,
    INTERNATIONAL_TRANSACTION_FEE = 8,
    EXTERNAL_CARD_PUSH_TRANSACTION_FEE = 9,
    EXTERNAL_CARD_PULL_TRANSACTION_FEE = 10,
    MERCHANT_CREDIT = 11,
    MERCHANT_CREDIT_REVERSAL = 12,
    MCC_CHARGE = 13,
    TRANSFER_FEE = 14,
    EXTERNAL_CARD_CHARGE_BACK = 15,
    EXTERNAL_CARD = 16,
    CREDIT_CARD_DUE_PAYMENT = 17,
    TRANSFER_RETURN_FEE = 18,
    ACH = 19,
    SWIFT = 20,
    WIRE = 21,
    OPERATIONAL_ACCOUNT_LOAN_TRANSACTION = 22,
    OPERATIONAL_ACCOUNT_SAVINGS_TRANSACTION = 23,
    SAVINGS_ACCOUNT_WAIVE_CHARGE_TRANSACTION = 24,
    DOMESTIC_ATM_WITHDRAWAL_FEE_REVERSAL = 25,
    INTERNATIONAL_ATM_WITHDRAWAL_FEE_REVERSAL = 26,
    INTERNATIONAL_TRANSACTION_FEE_REVERSAL = 27,
    FEE_OTHER = 28,
    FEE_OTHER_REVERSAL = 29
}
declare enum TransactionType {
    INVALID = 0,
    DEPOSIT = 1,
    WITHDRAWAL = 2,
    INTEREST_POSTING = 3,
    WITHDRAWAL_FEE = 4,
    ANNUAL_FEE = 5,
    WAIVE_CHARGES = 6,
    PAY_CHARGE = 7,
    DIVIDEND_PAYOUT = 8,
    INITIATE_TRANSFER = 12,
    APPROVE_TRANSFER = 13,
    WITHDRAW_TRANSFER = 14,
    REJECT_TRANSFER = 15,
    WRITTEN_OFF = 16,
    OVERDRAFT_INTEREST = 17,
    WITHHOLD_TAX = 18,
    ESCHEAT = 19,
    AMOUNT_HOLD = 20,
    AMOUNT_RELEASE = 21,
    INTEREST_PAYABLE_ACCRUED = 22,
    OVERDRAFT_INTEREST_RECEIVABLE_ACCRUED = 23,
    PAY_CHARGE_REVERSAL = 24,
    CHARGE_BACK = 25,
    FUNDS_ALLOCATION = 30,
    FUNDS_DEALLOCATION = 31
}
declare const GetCompletedTransactionsRequestSchema: z.ZodObject<{
    offset: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    showEnrichedTransactions: z.ZodDefault<z.ZodBoolean>;
    subTransactionType: z.ZodOptional<z.ZodNativeEnum<typeof SubTransactionType>>;
    statusType: z.ZodOptional<z.ZodString>;
    transactionType: z.ZodOptional<z.ZodNativeEnum<typeof TransactionType>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    paymentType: z.ZodOptional<z.ZodString>;
    fromAmount: z.ZodOptional<z.ZodNumber>;
    toAmount: z.ZodOptional<z.ZodNumber>;
    isCardTransaction: z.ZodOptional<z.ZodBoolean>;
    showInterestAccruals: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    orderBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodString>;
    getCardData: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    showEnrichedTransactions: boolean;
    paymentType?: string | undefined;
    reference?: string | undefined;
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    transactionType?: TransactionType | undefined;
    subTransactionType?: SubTransactionType | undefined;
    statusType?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    fromAmount?: number | undefined;
    toAmount?: number | undefined;
    isCardTransaction?: boolean | undefined;
    showInterestAccruals?: boolean | undefined;
    getCardData?: boolean | undefined;
}, {
    paymentType?: string | undefined;
    reference?: string | undefined;
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    transactionType?: TransactionType | undefined;
    subTransactionType?: SubTransactionType | undefined;
    showEnrichedTransactions?: boolean | undefined;
    statusType?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    fromAmount?: number | undefined;
    toAmount?: number | undefined;
    isCardTransaction?: boolean | undefined;
    showInterestAccruals?: boolean | undefined;
    getCardData?: boolean | undefined;
}>;
type GetCompletedTransactionsResponse = z.infer<typeof GetCompletedTransactionsResponseSchema>;
type GetCompletedTransactionsRequest = z.infer<typeof GetCompletedTransactionsRequestSchema>;

declare const CreatePayment: (params: {
    payment: CreatePaymentInput;
    tenantId?: string;
}) => Command<{
    payment: CreatePaymentInput;
    tenantId?: string;
}, ProcessOutput>;
declare const GetPayment: (params: {
    id: number;
    tenantId?: string;
}) => Command<{
    id: number;
    tenantId?: string;
}, Payment>;
declare const UpdatePayment: (params: {
    id: number;
    payment: UpdatePaymentInput;
    tenantId?: string;
}) => Command<{
    id: number;
    payment: UpdatePaymentInput;
    tenantId?: string;
}, Payment>;
declare const GetPayments: (params: PaymentFilters, configuration?: {
    tenantId?: string;
}) => Command<{
    params: PaymentFilters;
    configuration: {
        tenantId?: string;
    };
}, PaymentResponse>;
declare const DeletePayment: (params: {
    id: number;
    tenantId?: string;
}) => Command<{
    id: number;
    tenantId?: string;
}, void>;

interface SimpleCard {
  internalCardId: string,
  cardType?: string,
  tenantIdentifier?: string,
  status?: string
}

interface AuthorizationRequest {
  card: SimpleCard,
  payload: any,
  tenantId?: string,
  skipNotification?: boolean,
  flag?: string
}

interface CardUpdate {
  clientId: number,
  businessCardIDURL: string,
  businessCardIDQRCode: string
  tenantId?: string
}

declare const SendAuthorizationToCore: (params: AuthorizationRequest) => Command<AuthorizationRequest, any>;
declare const UpdateCardID: (params: CardUpdate) => Command<CardUpdate, void>;

declare const ClientIdentifierRequestSchema: z$1.ZodObject<{
    documentTypeId: z$1.ZodString;
    documentKey: z$1.ZodString;
    status: z$1.ZodString;
    description: z$1.ZodOptional<z$1.ZodString>;
    issuedBy: z$1.ZodOptional<z$1.ZodString>;
    locale: z$1.ZodOptional<z$1.ZodString>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
    expiryDate: z$1.ZodOptional<z$1.ZodString>;
    nationality: z$1.ZodOptional<z$1.ZodNumber>;
    issuedDate: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    documentTypeId: z$1.ZodString;
    documentKey: z$1.ZodString;
    status: z$1.ZodString;
    description: z$1.ZodOptional<z$1.ZodString>;
    issuedBy: z$1.ZodOptional<z$1.ZodString>;
    locale: z$1.ZodOptional<z$1.ZodString>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
    expiryDate: z$1.ZodOptional<z$1.ZodString>;
    nationality: z$1.ZodOptional<z$1.ZodNumber>;
    issuedDate: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    documentTypeId: z$1.ZodString;
    documentKey: z$1.ZodString;
    status: z$1.ZodString;
    description: z$1.ZodOptional<z$1.ZodString>;
    issuedBy: z$1.ZodOptional<z$1.ZodString>;
    locale: z$1.ZodOptional<z$1.ZodString>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
    expiryDate: z$1.ZodOptional<z$1.ZodString>;
    nationality: z$1.ZodOptional<z$1.ZodNumber>;
    issuedDate: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">>;
declare const ClientIdentifierResponseSchema: z$1.ZodObject<{
    id: z$1.ZodNumber;
    officeId: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
    changes: z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>;
    isScheduledTransfer: z$1.ZodBoolean;
    isSkipNotification: z$1.ZodBoolean;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    id: z$1.ZodNumber;
    officeId: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
    changes: z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>;
    isScheduledTransfer: z$1.ZodBoolean;
    isSkipNotification: z$1.ZodBoolean;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    id: z$1.ZodNumber;
    officeId: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
    changes: z$1.ZodRecord<z$1.ZodString, z$1.ZodAny>;
    isScheduledTransfer: z$1.ZodBoolean;
    isSkipNotification: z$1.ZodBoolean;
}, z$1.ZodAny, "strip">>;
declare const ListClientDocumentResponseSchema: z$1.ZodArray<z$1.ZodObject<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    documentType: z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
        isMasked: z$1.ZodOptional<z$1.ZodBoolean>;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
        isMasked?: boolean | undefined;
    }, {
        name: string;
        id: number;
        isMasked?: boolean | undefined;
    }>;
    documentKey: z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>;
    status: z$1.ZodString;
    description: z$1.ZodOptional<z$1.ZodString>;
    issuedBy: z$1.ZodOptional<z$1.ZodString>;
    expiryDate: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodNumber, "many">]>>;
    nationality: z$1.ZodOptional<z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
    issuedDate: z$1.ZodOptional<z$1.ZodString>;
    documentStatus: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    documentType: z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
        isMasked: z$1.ZodOptional<z$1.ZodBoolean>;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
        isMasked?: boolean | undefined;
    }, {
        name: string;
        id: number;
        isMasked?: boolean | undefined;
    }>;
    documentKey: z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>;
    status: z$1.ZodString;
    description: z$1.ZodOptional<z$1.ZodString>;
    issuedBy: z$1.ZodOptional<z$1.ZodString>;
    expiryDate: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodNumber, "many">]>>;
    nationality: z$1.ZodOptional<z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
    issuedDate: z$1.ZodOptional<z$1.ZodString>;
    documentStatus: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    documentType: z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
        isMasked: z$1.ZodOptional<z$1.ZodBoolean>;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
        isMasked?: boolean | undefined;
    }, {
        name: string;
        id: number;
        isMasked?: boolean | undefined;
    }>;
    documentKey: z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>;
    status: z$1.ZodString;
    description: z$1.ZodOptional<z$1.ZodString>;
    issuedBy: z$1.ZodOptional<z$1.ZodString>;
    expiryDate: z$1.ZodOptional<z$1.ZodUnion<[z$1.ZodString, z$1.ZodArray<z$1.ZodNumber, "many">]>>;
    nationality: z$1.ZodOptional<z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>>;
    issuedDate: z$1.ZodOptional<z$1.ZodString>;
    documentStatus: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">>, "many">;
type ClientIdentifierRequest = z$1.infer<typeof ClientIdentifierRequestSchema>;
type ClientIdentifierResponse = z$1.infer<typeof ClientIdentifierResponseSchema>;
type ListClientDocumentResponse = z$1.infer<typeof ListClientDocumentResponseSchema>;
declare const DocumentUploadRequestSchema: z$1.ZodObject<{
    name: z$1.ZodString;
    file: z$1.ZodUnion<[z$1.ZodType<Buffer<ArrayBufferLike>, z$1.ZodTypeDef, Buffer<ArrayBufferLike>>, z$1.ZodType<buffer.Blob, z$1.ZodTypeDef, buffer.Blob>, z$1.ZodType<buffer.File, z$1.ZodTypeDef, buffer.File>]>;
    type: z$1.ZodOptional<z$1.ZodString>;
    description: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodTypeAny, {
    name: string;
    file: Buffer<ArrayBufferLike> | buffer.Blob | buffer.File;
    type?: string | undefined;
    description?: string | undefined;
}, {
    name: string;
    file: Buffer<ArrayBufferLike> | buffer.Blob | buffer.File;
    type?: string | undefined;
    description?: string | undefined;
}>;
type DocumentUploadRequest = z$1.infer<typeof DocumentUploadRequestSchema>;
type DocumentUploadResponse = z$1.infer<typeof ClientIdentifierResponseSchema>;
declare const DeleteClientDocumentResponseSchema: z$1.ZodObject<{
    officeId: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    clientId: number;
    resourceId: number;
    officeId: number;
}, {
    clientId: number;
    resourceId: number;
    officeId: number;
}>;
type DeleteClientDocumentResponse = z$1.infer<typeof DeleteClientDocumentResponseSchema>;
declare const ApproveRejectClientDocumentResponseSchema: z$1.ZodObject<{
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    clientId: number;
    resourceId: number;
}, {
    clientId: number;
    resourceId: number;
}>;
type ApproveRejectClientDocumentResponse = z$1.infer<typeof ApproveRejectClientDocumentResponseSchema>;

declare const GetPermittedDocumentTypes: (params: {
    tenantId?: string;
    clientId: number;
}) => Command<{
    tenantId?: string;
    clientId: number;
}, any>;
declare const ListClientDocument: (params: {
    tenantId?: string;
    clientId: number;
    unmaskValue?: boolean;
    fields?: string;
}) => Command<{
    tenantId?: string;
    clientId: number;
    unmaskValue?: boolean;
    fields?: string;
}, ListClientDocumentResponse>;
declare const CreateClientIdentifier: (params: {
    tenatId?: string;
    clientId: number;
    input: ClientIdentifierRequest;
}) => Command<{
    tenantId?: string;
    clientId: number;
    input: ClientIdentifierRequest;
}, ClientIdentifierResponse>;
declare const UpdateClientIdentifier: (params: {
    tenantId?: string;
    clientId: number;
    identifierId: string;
    updates: ClientIdentifierRequest;
}) => Command<{
    tenantId?: string;
    clientId: number;
    identifierId: string;
    updates: ClientIdentifierRequest;
}, ClientIdentifierResponse>;
declare const UploadClientIdentifierDocument: (params: {
    tenantId?: string;
    clientId: number;
    identifierId: string;
    data: DocumentUploadRequest;
}) => Command<{
    tenantId?: string;
    clientId: number;
    identifierId: string;
    data: DocumentUploadRequest;
}, DocumentUploadResponse>;
declare const DeleteClientDocument: (params: {
    tenantId?: string;
    clientId: number;
    identifierId: number;
}) => Command<{
    tenantId?: string;
    clientId: number;
    identifierId: number;
}, DeleteClientDocumentResponse>;
declare const ApproveRejectClientDocument: (params: {
    tenantId?: string;
    clientId: number;
    identifierId: number;
    command: "approve" | "reject";
}) => Command<{
    tenantId?: string;
    clientId: number;
    identifierId: number;
    command: "approve" | "reject";
}, ApproveRejectClientDocumentResponse>;

declare const CreateClientRequestSchema: z$1.ZodObject<{
    firstname: z$1.ZodString;
    middlename: z$1.ZodOptional<z$1.ZodString>;
    lastname: z$1.ZodString;
    fullname: z$1.ZodOptional<z$1.ZodString>;
    dob: z$1.ZodString;
    genderId: z$1.ZodNumber;
    locale: z$1.ZodString;
    officeId: z$1.ZodNumber;
    mobileCountryCode: z$1.ZodString;
    mobileNo: z$1.ZodString;
    emailAddress: z$1.ZodString;
    legalFormId: z$1.ZodNumber;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    isOptedForMLALStatus: z$1.ZodOptional<z$1.ZodBoolean>;
    currentMLALStatus: z$1.ZodOptional<z$1.ZodString>;
    isStaff: z$1.ZodOptional<z$1.ZodBoolean>;
    staffId: z$1.ZodOptional<z$1.ZodNumber>;
    clientClassificationId: z$1.ZodOptional<z$1.ZodNumber>;
    savingsProductId: z$1.ZodOptional<z$1.ZodNumber>;
    active: z$1.ZodOptional<z$1.ZodBoolean>;
    dateFormat: z$1.ZodString;
    activationDate: z$1.ZodOptional<z$1.ZodString>;
    submittedOnDate: z$1.ZodString;
    dateOfBirth: z$1.ZodString;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    firstname: z$1.ZodString;
    middlename: z$1.ZodOptional<z$1.ZodString>;
    lastname: z$1.ZodString;
    fullname: z$1.ZodOptional<z$1.ZodString>;
    dob: z$1.ZodString;
    genderId: z$1.ZodNumber;
    locale: z$1.ZodString;
    officeId: z$1.ZodNumber;
    mobileCountryCode: z$1.ZodString;
    mobileNo: z$1.ZodString;
    emailAddress: z$1.ZodString;
    legalFormId: z$1.ZodNumber;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    isOptedForMLALStatus: z$1.ZodOptional<z$1.ZodBoolean>;
    currentMLALStatus: z$1.ZodOptional<z$1.ZodString>;
    isStaff: z$1.ZodOptional<z$1.ZodBoolean>;
    staffId: z$1.ZodOptional<z$1.ZodNumber>;
    clientClassificationId: z$1.ZodOptional<z$1.ZodNumber>;
    savingsProductId: z$1.ZodOptional<z$1.ZodNumber>;
    active: z$1.ZodOptional<z$1.ZodBoolean>;
    dateFormat: z$1.ZodString;
    activationDate: z$1.ZodOptional<z$1.ZodString>;
    submittedOnDate: z$1.ZodString;
    dateOfBirth: z$1.ZodString;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    firstname: z$1.ZodString;
    middlename: z$1.ZodOptional<z$1.ZodString>;
    lastname: z$1.ZodString;
    fullname: z$1.ZodOptional<z$1.ZodString>;
    dob: z$1.ZodString;
    genderId: z$1.ZodNumber;
    locale: z$1.ZodString;
    officeId: z$1.ZodNumber;
    mobileCountryCode: z$1.ZodString;
    mobileNo: z$1.ZodString;
    emailAddress: z$1.ZodString;
    legalFormId: z$1.ZodNumber;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    isOptedForMLALStatus: z$1.ZodOptional<z$1.ZodBoolean>;
    currentMLALStatus: z$1.ZodOptional<z$1.ZodString>;
    isStaff: z$1.ZodOptional<z$1.ZodBoolean>;
    staffId: z$1.ZodOptional<z$1.ZodNumber>;
    clientClassificationId: z$1.ZodOptional<z$1.ZodNumber>;
    savingsProductId: z$1.ZodOptional<z$1.ZodNumber>;
    active: z$1.ZodOptional<z$1.ZodBoolean>;
    dateFormat: z$1.ZodString;
    activationDate: z$1.ZodOptional<z$1.ZodString>;
    submittedOnDate: z$1.ZodString;
    dateOfBirth: z$1.ZodString;
}, z$1.ZodAny, "strip">>;
declare const CreateClientResponseSchema: z$1.ZodObject<{
    clientId: z$1.ZodNumber;
    status: z$1.ZodString;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    clientId: z$1.ZodNumber;
    status: z$1.ZodString;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    clientId: z$1.ZodNumber;
    status: z$1.ZodString;
}, z$1.ZodAny, "strip">>;
declare const UpdateClientRequestSchema: z$1.ZodObject<{
    firstname: z$1.ZodOptional<z$1.ZodString>;
    middlename: z$1.ZodOptional<z$1.ZodString>;
    fullname: z$1.ZodOptional<z$1.ZodString>;
    genderId: z$1.ZodOptional<z$1.ZodNumber>;
    lastname: z$1.ZodOptional<z$1.ZodString>;
    occupationId: z$1.ZodOptional<z$1.ZodNumber>;
    mobileCountryCode: z$1.ZodOptional<z$1.ZodString>;
    mobileNo: z$1.ZodOptional<z$1.ZodString>;
    emailAddress: z$1.ZodOptional<z$1.ZodString>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    clientClassificationId: z$1.ZodOptional<z$1.ZodNumber>;
    dateOfBirth: z$1.ZodOptional<z$1.ZodString>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    firstname: z$1.ZodOptional<z$1.ZodString>;
    middlename: z$1.ZodOptional<z$1.ZodString>;
    fullname: z$1.ZodOptional<z$1.ZodString>;
    genderId: z$1.ZodOptional<z$1.ZodNumber>;
    lastname: z$1.ZodOptional<z$1.ZodString>;
    occupationId: z$1.ZodOptional<z$1.ZodNumber>;
    mobileCountryCode: z$1.ZodOptional<z$1.ZodString>;
    mobileNo: z$1.ZodOptional<z$1.ZodString>;
    emailAddress: z$1.ZodOptional<z$1.ZodString>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    clientClassificationId: z$1.ZodOptional<z$1.ZodNumber>;
    dateOfBirth: z$1.ZodOptional<z$1.ZodString>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    firstname: z$1.ZodOptional<z$1.ZodString>;
    middlename: z$1.ZodOptional<z$1.ZodString>;
    fullname: z$1.ZodOptional<z$1.ZodString>;
    genderId: z$1.ZodOptional<z$1.ZodNumber>;
    lastname: z$1.ZodOptional<z$1.ZodString>;
    occupationId: z$1.ZodOptional<z$1.ZodNumber>;
    mobileCountryCode: z$1.ZodOptional<z$1.ZodString>;
    mobileNo: z$1.ZodOptional<z$1.ZodString>;
    emailAddress: z$1.ZodOptional<z$1.ZodString>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    clientClassificationId: z$1.ZodOptional<z$1.ZodNumber>;
    dateOfBirth: z$1.ZodOptional<z$1.ZodString>;
    dateFormat: z$1.ZodOptional<z$1.ZodString>;
}, z$1.ZodAny, "strip">>;
declare const ListClientsRequestSchema: z$1.ZodObject<{
    tenantId: z$1.ZodOptional<z$1.ZodString>;
    offset: z$1.ZodOptional<z$1.ZodNumber>;
    limit: z$1.ZodOptional<z$1.ZodNumber>;
    orderBy: z$1.ZodOptional<z$1.ZodString>;
    sortOrder: z$1.ZodOptional<z$1.ZodString>;
    officeId: z$1.ZodOptional<z$1.ZodNumber>;
    displayName: z$1.ZodOptional<z$1.ZodString>;
    firstname: z$1.ZodOptional<z$1.ZodString>;
    lastname: z$1.ZodOptional<z$1.ZodString>;
    externalId: z$1.ZodOptional<z$1.ZodString>;
    orphansOnly: z$1.ZodOptional<z$1.ZodBoolean>;
    clientStatus: z$1.ZodOptional<z$1.ZodString>;
    mobileNo: z$1.ZodOptional<z$1.ZodString>;
    createdStartDate: z$1.ZodOptional<z$1.ZodString>;
    creationEndDate: z$1.ZodOptional<z$1.ZodString>;
    activatedStartDate: z$1.ZodOptional<z$1.ZodString>;
    activatedEndDate: z$1.ZodOptional<z$1.ZodString>;
    closedStartDate: z$1.ZodOptional<z$1.ZodString>;
    closedEndDate: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodTypeAny, {
    displayName?: string | undefined;
    externalId?: string | undefined;
    tenantId?: string | undefined;
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    officeId?: number | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    mobileNo?: string | undefined;
    orphansOnly?: boolean | undefined;
    clientStatus?: string | undefined;
    createdStartDate?: string | undefined;
    creationEndDate?: string | undefined;
    activatedStartDate?: string | undefined;
    activatedEndDate?: string | undefined;
    closedStartDate?: string | undefined;
    closedEndDate?: string | undefined;
}, {
    displayName?: string | undefined;
    externalId?: string | undefined;
    tenantId?: string | undefined;
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    officeId?: number | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    mobileNo?: string | undefined;
    orphansOnly?: boolean | undefined;
    clientStatus?: string | undefined;
    createdStartDate?: string | undefined;
    creationEndDate?: string | undefined;
    activatedStartDate?: string | undefined;
    activatedEndDate?: string | undefined;
    closedStartDate?: string | undefined;
    closedEndDate?: string | undefined;
}>;
declare const ListClientsResponseSchema: z$1.ZodObject<{
    totalFilteredRecords: z$1.ZodNumber;
    pageItems: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodAny, z$1.objectOutputType<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.ZodAny, "strip">, z$1.objectInputType<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.ZodAny, "strip">>, "many">;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    totalFilteredRecords: z$1.ZodNumber;
    pageItems: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodAny, z$1.objectOutputType<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.ZodAny, "strip">, z$1.objectInputType<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.ZodAny, "strip">>, "many">;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    totalFilteredRecords: z$1.ZodNumber;
    pageItems: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, "strip", z$1.ZodAny, z$1.objectOutputType<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.ZodAny, "strip">, z$1.objectInputType<{
        id: z$1.ZodNumber;
        accountNo: z$1.ZodString;
        status: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z$1.ZodObject<{
            active: z$1.ZodBoolean;
            mandatory: z$1.ZodBoolean;
            systemDefined: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z$1.ZodBoolean;
        activationDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        firstname: z$1.ZodString;
        lastname: z$1.ZodString;
        displayName: z$1.ZodString;
        mobileNo: z$1.ZodString;
        emailAddress: z$1.ZodString;
        dateOfBirth: z$1.ZodArray<z$1.ZodNumber, "many">;
        gender: z$1.ZodObject<{
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z$1.ZodArray<z$1.ZodAny, "many">;
        clientClassification: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z$1.ZodObject<{
            active: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z$1.ZodBoolean;
        skipAvs: z$1.ZodBoolean;
        officeId: z$1.ZodNumber;
        officeName: z$1.ZodString;
        imageId: z$1.ZodOptional<z$1.ZodString>;
        imagePresent: z$1.ZodOptional<z$1.ZodBoolean>;
        timeline: z$1.ZodObject<{
            submittedOnDate: z$1.ZodArray<z$1.ZodNumber, "many">;
            submittedByUsername: z$1.ZodOptional<z$1.ZodString>;
            submittedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            submittedByLastname: z$1.ZodOptional<z$1.ZodString>;
            activatedOnDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
            activatedByUsername: z$1.ZodOptional<z$1.ZodString>;
            activatedByFirstname: z$1.ZodOptional<z$1.ZodString>;
            activatedByLastname: z$1.ZodOptional<z$1.ZodString>;
        }, "strip", z$1.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z$1.ZodObject<{
            id: z$1.ZodNumber;
            code: z$1.ZodString;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z$1.ZodString;
        updatedAt: z$1.ZodString;
        isBlockExternalCardsAddition: z$1.ZodBoolean;
        clientNonPersonDetails: z$1.ZodObject<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            constitution: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            mainBusinessLine: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
            countryOfIncorporation: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        }, z$1.ZodAny, "strip">>;
        clientTransferOptionData: z$1.ZodObject<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, "strip", z$1.ZodAny, z$1.objectOutputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">, z$1.objectInputType<{
            isExternalCardDebitDisable: z$1.ZodBoolean;
            isExternalCardCreditDisable: z$1.ZodBoolean;
            isAchDebitOutgoingDisable: z$1.ZodBoolean;
            isAchCreditOutgoingDisable: z$1.ZodBoolean;
            isAchDebitIncomingDisable: z$1.ZodBoolean;
            isAchCreditIncomingDisable: z$1.ZodBoolean;
            isInternalCreditDisable: z$1.ZodBoolean;
            isInternalDebitDisable: z$1.ZodBoolean;
            isWireCreditOutgoingDisable: z$1.ZodBoolean;
            isWireCreditIncomingDisable: z$1.ZodBoolean;
            isSwiftCreditOutgoingDisable: z$1.ZodBoolean;
            isSwiftCreditIncomingDisable: z$1.ZodBoolean;
            isFxpayCreditOutgoingDisable: z$1.ZodBoolean;
            isAllocateToSubAccountDisable: z$1.ZodBoolean;
            isInternalCreditOwnDisable: z$1.ZodBoolean;
            type: z$1.ZodString;
            resourceId: z$1.ZodNumber;
            id: z$1.ZodNumber;
        }, z$1.ZodAny, "strip">>;
        authorizations: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        mobileCountryCode: z$1.ZodString;
        clientKycStatus: z$1.ZodObject<{}, "strip", z$1.ZodAny, z$1.objectOutputType<{}, z$1.ZodAny, "strip">, z$1.objectInputType<{}, z$1.ZodAny, "strip">>;
        ofLoanCycle: z$1.ZodNumber;
        ofLoanActive: z$1.ZodNumber;
        activeDepositAccount: z$1.ZodNumber;
        onBoardingStatus: z$1.ZodOptional<z$1.ZodString>;
    }, z$1.ZodAny, "strip">>, "many">;
}, z$1.ZodAny, "strip">>;
type CreateClientRequest = z$1.infer<typeof CreateClientRequestSchema>;
type CreateClientResponse = z$1.infer<typeof CreateClientResponseSchema>;
type UpdateClientRequest = z$1.infer<typeof UpdateClientRequestSchema>;
type ListClientsRequest = z$1.infer<typeof ListClientsRequestSchema>;
type ListClientsResponse = z$1.infer<typeof ListClientsResponseSchema>;
declare const VerifyWithActivateClientSchema: z$1.ZodEffects<z$1.ZodEffects<z$1.ZodEffects<z$1.ZodEffects<z$1.ZodEffects<z$1.ZodObject<{
    clientId: z$1.ZodString;
    kycVerificationType: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodEnum<["FULL", "PARTIAL"]>>>;
    note: z$1.ZodOptional<z$1.ZodString>;
    locale: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodString>>;
    dateFormat: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodString>>;
    activationDate: z$1.ZodOptional<z$1.ZodString>;
    isActivatedByManualReview: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodBoolean>>;
    manualReviewActivationComments: z$1.ZodOptional<z$1.ZodString>;
    skipVerify: z$1.ZodDefault<z$1.ZodBoolean>;
    skipActivate: z$1.ZodDefault<z$1.ZodBoolean>;
    autoActivate: z$1.ZodDefault<z$1.ZodBoolean>;
}, "strip", z$1.ZodTypeAny, {
    clientId: string;
    skipVerify: boolean;
    skipActivate: boolean;
    autoActivate: boolean;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
}, {
    clientId: string;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
    skipVerify?: boolean | undefined;
    skipActivate?: boolean | undefined;
    autoActivate?: boolean | undefined;
}>, {
    clientId: string;
    skipVerify: boolean;
    skipActivate: boolean;
    autoActivate: boolean;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
}, {
    clientId: string;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
    skipVerify?: boolean | undefined;
    skipActivate?: boolean | undefined;
    autoActivate?: boolean | undefined;
}>, {
    clientId: string;
    skipVerify: boolean;
    skipActivate: boolean;
    autoActivate: boolean;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
}, {
    clientId: string;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
    skipVerify?: boolean | undefined;
    skipActivate?: boolean | undefined;
    autoActivate?: boolean | undefined;
}>, {
    clientId: string;
    skipVerify: boolean;
    skipActivate: boolean;
    autoActivate: boolean;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
}, {
    clientId: string;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
    skipVerify?: boolean | undefined;
    skipActivate?: boolean | undefined;
    autoActivate?: boolean | undefined;
}>, {
    clientId: string;
    skipVerify: boolean;
    skipActivate: boolean;
    autoActivate: boolean;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
}, {
    clientId: string;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
    skipVerify?: boolean | undefined;
    skipActivate?: boolean | undefined;
    autoActivate?: boolean | undefined;
}>, {
    clientId: string;
    skipVerify: boolean;
    skipActivate: boolean;
    autoActivate: boolean;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
}, {
    clientId: string;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    activationDate?: string | undefined;
    kycVerificationType?: "FULL" | "PARTIAL" | undefined;
    note?: string | undefined;
    isActivatedByManualReview?: boolean | undefined;
    manualReviewActivationComments?: string | undefined;
    skipVerify?: boolean | undefined;
    skipActivate?: boolean | undefined;
    autoActivate?: boolean | undefined;
}>;
type VerifyWithActivateClient = z$1.infer<typeof VerifyWithActivateClientSchema>;
declare const ResponseVerifySchema: z$1.ZodObject<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    officeId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
    data: z$1.ZodObject<{
        clientVerificationStatus: z$1.ZodEnum<["PENDING", "IN_PROGRESS", "APPROVED", "REJECTED"]>;
        clientKycStatus: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        clientVerificationStatus: "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
        clientKycStatus: string;
    }, {
        clientVerificationStatus: "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
        clientKycStatus: string;
    }>;
}, "strip", z$1.ZodTypeAny, {
    id: number;
    clientId: number;
    resourceId: number;
    data: {
        clientVerificationStatus: "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
        clientKycStatus: string;
    };
    officeId: number;
}, {
    id: number;
    clientId: number;
    resourceId: number;
    data: {
        clientVerificationStatus: "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
        clientKycStatus: string;
    };
    officeId: number;
}>;
type ResponseVerify = z$1.infer<typeof ResponseVerifySchema>;
declare const GetStatusOfVerifyClientResponseSchema: z$1.ZodObject<{
    id: z$1.ZodNumber;
    accountNo: z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>;
    displayName: z$1.ZodString;
    legalForm: z$1.ZodObject<{
        code: z$1.ZodString;
        value: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        value: number;
        code: string;
    }, {
        value: number;
        code: string;
    }>;
    verificationStatus: z$1.ZodObject<{
        id: z$1.ZodNumber;
        value: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        value: string;
        id: number;
    }, {
        value: string;
        id: number;
    }>;
    identifiers: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        documentType: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodString;
            isMasked: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            name: string;
            id: number;
            isMasked: boolean;
        }, {
            name: string;
            id: number;
            isMasked: boolean;
        }>;
        documentKey: z$1.ZodString;
        issuedDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        expiryDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        description: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodString;
        issuedBy: z$1.ZodOptional<z$1.ZodString>;
        verificationStatus: z$1.ZodOptional<z$1.ZodObject<{
            id: z$1.ZodNumber;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            id: number;
        }, {
            value: string;
            id: number;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
        status: string;
        id: number;
        clientId: number;
        documentKey: string;
        documentType: {
            name: string;
            id: number;
            isMasked: boolean;
        };
        description?: string | undefined;
        issuedBy?: string | undefined;
        expiryDate?: number[] | undefined;
        issuedDate?: number[] | undefined;
        verificationStatus?: {
            value: string;
            id: number;
        } | undefined;
    }, {
        status: string;
        id: number;
        clientId: number;
        documentKey: string;
        documentType: {
            name: string;
            id: number;
            isMasked: boolean;
        };
        description?: string | undefined;
        issuedBy?: string | undefined;
        expiryDate?: number[] | undefined;
        issuedDate?: number[] | undefined;
        verificationStatus?: {
            value: string;
            id: number;
        } | undefined;
    }>, "many">>;
    ofLoanCycle: z$1.ZodNumber;
    mobileCountryCode: z$1.ZodString;
    ofLoanActive: z$1.ZodNumber;
    activeDepositAccount: z$1.ZodNumber;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    id: z$1.ZodNumber;
    accountNo: z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>;
    displayName: z$1.ZodString;
    legalForm: z$1.ZodObject<{
        code: z$1.ZodString;
        value: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        value: number;
        code: string;
    }, {
        value: number;
        code: string;
    }>;
    verificationStatus: z$1.ZodObject<{
        id: z$1.ZodNumber;
        value: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        value: string;
        id: number;
    }, {
        value: string;
        id: number;
    }>;
    identifiers: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        documentType: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodString;
            isMasked: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            name: string;
            id: number;
            isMasked: boolean;
        }, {
            name: string;
            id: number;
            isMasked: boolean;
        }>;
        documentKey: z$1.ZodString;
        issuedDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        expiryDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        description: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodString;
        issuedBy: z$1.ZodOptional<z$1.ZodString>;
        verificationStatus: z$1.ZodOptional<z$1.ZodObject<{
            id: z$1.ZodNumber;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            id: number;
        }, {
            value: string;
            id: number;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
        status: string;
        id: number;
        clientId: number;
        documentKey: string;
        documentType: {
            name: string;
            id: number;
            isMasked: boolean;
        };
        description?: string | undefined;
        issuedBy?: string | undefined;
        expiryDate?: number[] | undefined;
        issuedDate?: number[] | undefined;
        verificationStatus?: {
            value: string;
            id: number;
        } | undefined;
    }, {
        status: string;
        id: number;
        clientId: number;
        documentKey: string;
        documentType: {
            name: string;
            id: number;
            isMasked: boolean;
        };
        description?: string | undefined;
        issuedBy?: string | undefined;
        expiryDate?: number[] | undefined;
        issuedDate?: number[] | undefined;
        verificationStatus?: {
            value: string;
            id: number;
        } | undefined;
    }>, "many">>;
    ofLoanCycle: z$1.ZodNumber;
    mobileCountryCode: z$1.ZodString;
    ofLoanActive: z$1.ZodNumber;
    activeDepositAccount: z$1.ZodNumber;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    id: z$1.ZodNumber;
    accountNo: z$1.ZodUnion<[z$1.ZodString, z$1.ZodNumber]>;
    displayName: z$1.ZodString;
    legalForm: z$1.ZodObject<{
        code: z$1.ZodString;
        value: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        value: number;
        code: string;
    }, {
        value: number;
        code: string;
    }>;
    verificationStatus: z$1.ZodObject<{
        id: z$1.ZodNumber;
        value: z$1.ZodString;
    }, "strip", z$1.ZodTypeAny, {
        value: string;
        id: number;
    }, {
        value: string;
        id: number;
    }>;
    identifiers: z$1.ZodOptional<z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        clientId: z$1.ZodNumber;
        documentType: z$1.ZodObject<{
            id: z$1.ZodNumber;
            name: z$1.ZodString;
            isMasked: z$1.ZodBoolean;
        }, "strip", z$1.ZodTypeAny, {
            name: string;
            id: number;
            isMasked: boolean;
        }, {
            name: string;
            id: number;
            isMasked: boolean;
        }>;
        documentKey: z$1.ZodString;
        issuedDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        expiryDate: z$1.ZodOptional<z$1.ZodArray<z$1.ZodNumber, "many">>;
        description: z$1.ZodOptional<z$1.ZodString>;
        status: z$1.ZodString;
        issuedBy: z$1.ZodOptional<z$1.ZodString>;
        verificationStatus: z$1.ZodOptional<z$1.ZodObject<{
            id: z$1.ZodNumber;
            value: z$1.ZodString;
        }, "strip", z$1.ZodTypeAny, {
            value: string;
            id: number;
        }, {
            value: string;
            id: number;
        }>>;
    }, "strip", z$1.ZodTypeAny, {
        status: string;
        id: number;
        clientId: number;
        documentKey: string;
        documentType: {
            name: string;
            id: number;
            isMasked: boolean;
        };
        description?: string | undefined;
        issuedBy?: string | undefined;
        expiryDate?: number[] | undefined;
        issuedDate?: number[] | undefined;
        verificationStatus?: {
            value: string;
            id: number;
        } | undefined;
    }, {
        status: string;
        id: number;
        clientId: number;
        documentKey: string;
        documentType: {
            name: string;
            id: number;
            isMasked: boolean;
        };
        description?: string | undefined;
        issuedBy?: string | undefined;
        expiryDate?: number[] | undefined;
        issuedDate?: number[] | undefined;
        verificationStatus?: {
            value: string;
            id: number;
        } | undefined;
    }>, "many">>;
    ofLoanCycle: z$1.ZodNumber;
    mobileCountryCode: z$1.ZodString;
    ofLoanActive: z$1.ZodNumber;
    activeDepositAccount: z$1.ZodNumber;
}, z$1.ZodAny, "strip">>;
type GetStatusOfVerifyClientResponse = z$1.infer<typeof GetStatusOfVerifyClientResponseSchema>;

declare const GetClient: (params: {
    clientId: number;
    tenantId?: string;
    riskRating?: boolean;
    clientAddress?: boolean;
    clientIdentifier?: boolean;
    staffInSelectedOfficeOnly?: boolean;
    checkIdentitiesExpiration?: boolean;
    clientAccountAssociate?: boolean;
}) => Command<{
    clientId: number;
    tenantId?: string;
    riskRating?: boolean;
    clientAddress?: boolean;
    clientIdentifier?: boolean;
    staffInSelectedOfficeOnly?: boolean;
    checkIdentitiesExpiration?: boolean;
    clientAccountAssociate?: boolean;
}, any>;
declare const UpdateClient: (params: {
    tenantId?: string;
    clientId: number;
    updates: UpdateClientRequest;
}) => Command<{
    tenantId?: string;
    clientId: number;
    updates: UpdateClientRequest;
}, ProcessOutput$1>;
declare const CreateClient: (params: {
    tenantId?: string;
    clientData: CreateClientRequest;
}) => Command<{
    tenantId?: string;
    clientData: CreateClientRequest;
}, CreateClientResponse>;
declare const GetClients: (params: ListClientsRequest, configuration: {
    tenantId?: string;
}) => Command<{
    params: ListClientsRequest;
    configuration: {
        tenantId?: string;
    };
}, ListClientsResponse>;
declare const DeleteClient: (params: {
    clientId: number;
    tenantId?: string;
}) => Command<{
    clientId: number;
    tenantId?: string;
}, ProcessOutput$1>;
declare const VerifyWithActivateClients: (params: {
    tenantId?: string;
    param: VerifyWithActivateClient;
}) => Command<{
    tenantId?: string;
    param: VerifyWithActivateClient;
}, ProcessOutput$1 | ResponseVerify>;
declare const GetStatusOfVerifyClient: (params: {
    tenantId?: string;
    clientId: number;
}) => Command<{
    tenantId?: string;
    clientId: number;
}, GetStatusOfVerifyClientResponse>;

/**
 * Retrieves detailed information about a specific savings account.
 *
 * @param accountId - The ID of the savings account to retrieve
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the full SavingAccount details
 *
 * @example
 * ```typescript
 * const getAccountCmd = GetAccount(123, { tenantId: "tokoro" });
 * const account = await getAccountCmd.execute(config);
 * console.log(account.accountNo, account.accountBalance);
 * ```
 */
declare const GetAccount: (accountId: number, configuration?: {
    tenantId?: string;
}) => Command<{
    accountId: number;
    configuration?: {
        tenantId?: string;
    };
}, SavingAccount>;
/**
 * Updates an existing savings account with new details.
 *
 * @param accountId - The ID of the account to update
 * @param requestData - The account fields to update (see UpdateAccountRequest)
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the update response
 *
 * @example
 * ```typescript
 * const updateCmd = UpdateAccount(
 *   123,
 *   {
 *     clientId: 1,
 *     productId: 2,
 *     submittedOnDate: "01 December 2025",
 *     nominalAnnualInterestRate: "5.5",
 *     locale: "en",
 *     dateFormat: "dd MMMM yyyy"
 *   },
 *   { tenantId: "tokoro" }
 * );
 * const result = await updateCmd.execute(config);
 * ```
 */
declare const UpdateAccount: (accountId: number, requestData: UpdateAccountRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    accountId: number;
    requestData: UpdateAccountRequest;
    configuration?: {
        tenantId?: string;
    };
}, any>;
/**
 * Deletes a savings account from the system.
 *
 * @param accountId - The ID of the account to delete
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the deletion confirmation
 *
 * @example
 * ```typescript
 * const deleteCmd = DeleteAccount(123, { tenantId: "tokoro" });
 * const result = await deleteCmd.execute(config);
 * ```
 */
declare const DeleteAccount: (accountId: number, configuration?: {
    tenantId?: string;
}) => Command<{
    accountId: number;
    configuration?: {
        tenantId?: string;
    };
}, ProcessOutput$1>;
declare const GetAccountsOfClient: (clientId: number, params: ListAccountsOfClientRequest, configuration: {
    tenantId?: string;
}) => Command<{
    clientId: number;
    params: ListAccountsOfClientRequest;
    configuration: {
        tenantId?: string;
    };
}, ListAccountsOfClientRequest>;
/**
 * Creates a new savings account and immediately activates it in a single operation.
 * This combines the submit, approve, and activate commands.
 *
 * @param params - The account creation parameters (see CreateAndActivateAccountRequest)
 * @param params.clientId - The ID of the client who will own the account
 * @param params.productId - The ID of the savings product to use
 * @param params.submittedOnDate - The date the account is submitted (format: "dd MMMM yyyy")
 * @param params.locale - The locale for date formatting (e.g., "en")
 * @param params.dateFormat - The date format string (e.g., "dd MMMM yyyy")
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the created and activated account details
 *
 * @example
 * ```typescript
 * const createCmd = CreateAndActivateAccount(
 *   {
 *     clientId: 1,
 *     productId: 2,
 *     locale: "en",
 *     dateFormat: "dd MMMM yyyy",
 *     submittedOnDate: "01 December 2025",
 *     monthDayFormat: "dd MMM",
 *     nominalAnnualInterestRate: 5.0
 *   },
 *   { tenantId: "tokoro" }
 * );
 * const result = await createCmd.execute(config);
 * console.log(result.savingsId);
 * ```
 */
declare const CreateAndActivateAccount: (params: CreateAndActivateAccountRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    params: CreateAndActivateAccountRequest;
    configuration?: {
        tenantId?: string;
    };
}, CreateAndActivateAccountResponse>;
/**
 * Closes a savings account permanently. This deactivates the account so no further transactions can be performed.
 *
 * @param savingsAccountId - The ID of the savings account to close
 * @param requestData - The closure parameters (see CloseAccountRequest)
 * @param requestData.closedOnDate - The date the account is closed (format must match dateFormat)
 * @param requestData.dateFormat - The date format string (e.g., "dd MMMM yyyy")
 * @param requestData.locale - The locale for date formatting (e.g., "en")
 * @param requestData.closeReasonCodeId - The ID representing the reason for account closure
 * @param requestData.withdrawBalance - Optional: Whether to withdraw remaining balance during closure
 * @param requestData.postInterestValidationOnClosure - Optional: Whether to validate interest posting on closure
 * @param requestData.ignoreNegativeBalance - Optional: Whether to allow closure even with negative balance
 * @param requestData.paymentTypeId - Optional: The payment type ID if withdrawing balance
 * @param params - Optional configuration
 * @param params.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the account closure confirmation
 *
 * @example
 * ```typescript
 * const closeCmd = CloseAccount(
 *   5100,
 *   {
 *     closedOnDate: "01 April 2025",
 *     dateFormat: "dd MMMM yyyy",
 *     locale: "en",
 *     withdrawBalance: false,
 *     postInterestValidationOnClosure: true,
 *     ignoreNegativeBalance: false,
 *     closeReasonCodeId: 5100
 *   },
 *   { tenantId: "tokoro" }
 * );
 * const result = await closeCmd.execute(config);
 * console.log(result.changes.status); // "ACCOUNT_CLOSE_REASON"
 * ```
 */
declare const CloseAccount: (savingsAccountId: number, requestData: CloseAccountRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    savingsAccountId: number;
    requestData: CloseAccountRequest;
    configuration?: {
        tenantId?: string;
    };
}, CloseAccountResponse>;
/**
 * Schedules the closure of a savings account.
 *
 * @param accountId - The ID of the savings account to schedule for closure
 * @param requestData - The closure parameters (see CloseAccountRequest)
 * @param requestData.closedOnDate - The date the account is scheduled to be closed
 * @param requestData.dateFormat - The date format string (e.g., "dd MMMM yyyy")
 * @param requestData.locale - The locale for date formatting (e.g., "en")
 * @param requestData.closeReasonCodeId - The ID representing the reason for account closure
 * @param requestData.withdrawBalance - Optional: Whether to withdraw remaining balance during closure
 * @param requestData.postInterestValidationOnClosure - Optional: Whether to validate interest posting on closure
 * @param requestData.ignoreNegativeBalance - Optional: Whether to allow closure even with negative balance
 * @param requestData.paymentTypeId - Optional: The payment type ID if withdrawing balance
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the schedule closure confirmation
 *
 * @example
 * ```typescript
 * const scheduleCloseCmd = ScheduleAccountClosure(
 *   5100,
 *   {
 *     closedOnDate: "01 April 2025",
 *     dateFormat: "dd MMMM yyyy",
 *     locale: "en",
 *     withdrawBalance: false,
 *     postInterestValidationOnClosure: true,
 *     ignoreNegativeBalance: false,
 *     closeReasonCodeId: 5100
 *   },
 *   { tenantId: "tokoro" }
 * );
 * const result = await scheduleCloseCmd.execute(config);
 * ```
 */
declare const ScheduleAccountClosure: (accountId: number, requestData: CloseAccountRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    accountId: number;
    requestData: CloseAccountRequest;
    configuration?: {
        tenantId?: string;
    };
}, CloseAccountResponse>;
/**
 * Blocks a savings account.
 *
 * @param accountId - The ID of the savings account to block
 * @param requestData - The block parameters (see BlockAccountRequest)
 * @param requestData.blockReasonCodeId - The ID representing the reason for blocking the account
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the block confirmation
 *
 * @example
 * ```typescript
 * const blockCmd = BlockAccount(
 *   123,
 *   { blockReasonCodeId: 5100 },
 *   { tenantId: "tokoro" }
 * );
 * const result = await blockCmd.execute(config);
 * console.log(result.changes.subStatus.value); // "Block"
 * ```
 */
declare const BlockAccount: (accountId: number, requestData: BlockAccountRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    accountId: number;
    requestData: BlockAccountRequest;
    configuration?: {
        tenantId?: string;
    };
}, BlockAccountResponse>;
/**
 * Places a hold on a specific amount in a client's account.
 *
 * @param accountId - The ID of the savings account
 * @param requestData - The hold amount parameters (see HoldAmountRequest)
 * @param requestData.transactionAmount - The amount to be held
 * @param requestData.holdAmountReasonCodeId - The ID representing the reason for holding the amount
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the hold amount confirmation
 *
 * @example
 * ```typescript
 * const holdCmd = HoldAmount(
 *   123,
 *   { transactionAmount: 45, holdAmountReasonCodeId: 6100 },
 *   { tenantId: "tokoro" }
 * );
 * const result = await holdCmd.execute(config);
 * console.log(result.changes.savingsAmountOnHold); // 45
 * ```
 */
declare const HoldAmount: (accountId: number, requestData: HoldAmountRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    accountId: number;
    requestData: HoldAmountRequest;
    configuration?: {
        tenantId?: string;
    };
}, HoldAmountResponse>;

declare const CreateAccountProductRequestSchema: z.ZodObject<{
    name: z.ZodString;
    dateFormat: z.ZodOptional<z.ZodString>;
    locale: z.ZodString;
    inMultiplesOf: z.ZodOptional<z.ZodString>;
    withdrawalFeeForTransfers: z.ZodOptional<z.ZodBoolean>;
    allowOverdraft: z.ZodOptional<z.ZodBoolean>;
    enforceMinRequiredBalance: z.ZodOptional<z.ZodBoolean>;
    withHoldTax: z.ZodOptional<z.ZodBoolean>;
    isDormancyTrackingActive: z.ZodOptional<z.ZodBoolean>;
    isLinkedToFloatingInterestRates: z.ZodOptional<z.ZodBoolean>;
    skipCollectTransferCharge: z.ZodOptional<z.ZodBoolean>;
    nominalAnnualInterestRate: z.ZodOptional<z.ZodString>;
    interestCompoundingPeriodType: z.ZodNumber;
    interestPostingPeriodType: z.ZodNumber;
    interestCalculationType: z.ZodNumber;
    interestCalculationDaysInYearType: z.ZodNumber;
    interestRateDifferential: z.ZodOptional<z.ZodString>;
    floatingRateId: z.ZodOptional<z.ZodNumber>;
    isFloatingInterestRateCalculationAllowed: z.ZodOptional<z.ZodBoolean>;
    minRequiredOpeningBalance: z.ZodOptional<z.ZodString>;
    charges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        isMandatory: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }>, "many">>;
    description: z.ZodString;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    currencyCode: z.ZodString;
    digitsAfterDecimal: z.ZodNumber;
    accountingRule: z.ZodNumber;
    shortName: z.ZodString;
    isUsedForSuspenseAccounting: z.ZodOptional<z.ZodBoolean>;
    isLinkedWithFundSourceAccount: z.ZodOptional<z.ZodBoolean>;
    isReservedProduct: z.ZodOptional<z.ZodBoolean>;
    minDifferentialRate: z.ZodOptional<z.ZodString>;
    defaultDifferentialRate: z.ZodOptional<z.ZodString>;
    maxDifferentialRate: z.ZodOptional<z.ZodString>;
    paymentChannelToFundSourceMappings: z.ZodOptional<z.ZodString>;
    feeToIncomeAccountMappings: z.ZodOptional<z.ZodString>;
    penaltyToIncomeAccountMappings: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    locale: string;
    interestCompoundingPeriodType: number;
    interestPostingPeriodType: number;
    interestCalculationType: number;
    interestCalculationDaysInYearType: number;
    description: string;
    currencyCode: string;
    digitsAfterDecimal: number;
    accountingRule: number;
    shortName: string;
    dateFormat?: string | undefined;
    inMultiplesOf?: string | undefined;
    withdrawalFeeForTransfers?: boolean | undefined;
    allowOverdraft?: boolean | undefined;
    enforceMinRequiredBalance?: boolean | undefined;
    withHoldTax?: boolean | undefined;
    isDormancyTrackingActive?: boolean | undefined;
    isLinkedToFloatingInterestRates?: boolean | undefined;
    skipCollectTransferCharge?: boolean | undefined;
    nominalAnnualInterestRate?: string | undefined;
    interestRateDifferential?: string | undefined;
    floatingRateId?: number | undefined;
    isFloatingInterestRateCalculationAllowed?: boolean | undefined;
    minRequiredOpeningBalance?: string | undefined;
    charges?: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    isUsedForSuspenseAccounting?: boolean | undefined;
    isLinkedWithFundSourceAccount?: boolean | undefined;
    isReservedProduct?: boolean | undefined;
    minDifferentialRate?: string | undefined;
    defaultDifferentialRate?: string | undefined;
    maxDifferentialRate?: string | undefined;
    paymentChannelToFundSourceMappings?: string | undefined;
    feeToIncomeAccountMappings?: string | undefined;
    penaltyToIncomeAccountMappings?: string | undefined;
}, {
    name: string;
    locale: string;
    interestCompoundingPeriodType: number;
    interestPostingPeriodType: number;
    interestCalculationType: number;
    interestCalculationDaysInYearType: number;
    description: string;
    currencyCode: string;
    digitsAfterDecimal: number;
    accountingRule: number;
    shortName: string;
    dateFormat?: string | undefined;
    inMultiplesOf?: string | undefined;
    withdrawalFeeForTransfers?: boolean | undefined;
    allowOverdraft?: boolean | undefined;
    enforceMinRequiredBalance?: boolean | undefined;
    withHoldTax?: boolean | undefined;
    isDormancyTrackingActive?: boolean | undefined;
    isLinkedToFloatingInterestRates?: boolean | undefined;
    skipCollectTransferCharge?: boolean | undefined;
    nominalAnnualInterestRate?: string | undefined;
    interestRateDifferential?: string | undefined;
    floatingRateId?: number | undefined;
    isFloatingInterestRateCalculationAllowed?: boolean | undefined;
    minRequiredOpeningBalance?: string | undefined;
    charges?: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    isUsedForSuspenseAccounting?: boolean | undefined;
    isLinkedWithFundSourceAccount?: boolean | undefined;
    isReservedProduct?: boolean | undefined;
    minDifferentialRate?: string | undefined;
    defaultDifferentialRate?: string | undefined;
    maxDifferentialRate?: string | undefined;
    paymentChannelToFundSourceMappings?: string | undefined;
    feeToIncomeAccountMappings?: string | undefined;
    penaltyToIncomeAccountMappings?: string | undefined;
}>;
declare const CreateAccountProductResponseSchema: z.ZodObject<{
    resourceId: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    resourceId: string;
}, {
    id: string;
    resourceId: string;
}>;
type CreateAccountProductRequest = z.infer<typeof CreateAccountProductRequestSchema>;
type CreateAccountProductResponse = z.infer<typeof CreateAccountProductResponseSchema>;
declare const UpdateAccountProductRequestSchema: z.ZodObject<{
    currencyCode: z.ZodOptional<z.ZodString>;
    digitsAfterDecimal: z.ZodOptional<z.ZodNumber>;
    interestCompoundingPeriodType: z.ZodOptional<z.ZodNumber>;
    interestPostingPeriodType: z.ZodOptional<z.ZodNumber>;
    interestCalculationType: z.ZodOptional<z.ZodNumber>;
    interestCalculationDaysInYearType: z.ZodOptional<z.ZodNumber>;
    accountingRule: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    shortName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    nominalAnnualInterestRate: z.ZodOptional<z.ZodString>;
    inMultiplesOf: z.ZodOptional<z.ZodString>;
    minRequiredOpeningBalance: z.ZodOptional<z.ZodString>;
    withdrawalFeeForTransfers: z.ZodOptional<z.ZodBoolean>;
    allowOverdraft: z.ZodOptional<z.ZodBoolean>;
    enforceMinRequiredBalance: z.ZodOptional<z.ZodBoolean>;
    withHoldTax: z.ZodOptional<z.ZodBoolean>;
    isDormancyTrackingActive: z.ZodOptional<z.ZodBoolean>;
    isUsedForSuspenseAccounting: z.ZodOptional<z.ZodBoolean>;
    isLinkedWithFundSourceAccount: z.ZodOptional<z.ZodBoolean>;
    skipCollectTransferCharge: z.ZodOptional<z.ZodBoolean>;
    isReservedProduct: z.ZodOptional<z.ZodBoolean>;
    isLinkedToFloatingInterestRates: z.ZodOptional<z.ZodBoolean>;
    floatingRateId: z.ZodOptional<z.ZodNumber>;
    minDifferentialRate: z.ZodOptional<z.ZodString>;
    interestRateDifferential: z.ZodOptional<z.ZodString>;
    defaultDifferentialRate: z.ZodOptional<z.ZodString>;
    maxDifferentialRate: z.ZodOptional<z.ZodString>;
    isFloatingInterestRateCalculationAllowed: z.ZodOptional<z.ZodBoolean>;
    paymentChannelToFundSourceMappings: z.ZodOptional<z.ZodString>;
    feeToIncomeAccountMappings: z.ZodOptional<z.ZodString>;
    penaltyToIncomeAccountMappings: z.ZodOptional<z.ZodString>;
    charges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        isMandatory: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }>, "many">>;
    locale: z.ZodOptional<z.ZodString>;
    dateFormat: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    inMultiplesOf?: string | undefined;
    withdrawalFeeForTransfers?: boolean | undefined;
    allowOverdraft?: boolean | undefined;
    enforceMinRequiredBalance?: boolean | undefined;
    withHoldTax?: boolean | undefined;
    isDormancyTrackingActive?: boolean | undefined;
    isLinkedToFloatingInterestRates?: boolean | undefined;
    skipCollectTransferCharge?: boolean | undefined;
    nominalAnnualInterestRate?: string | undefined;
    interestCompoundingPeriodType?: number | undefined;
    interestPostingPeriodType?: number | undefined;
    interestCalculationType?: number | undefined;
    interestCalculationDaysInYearType?: number | undefined;
    interestRateDifferential?: string | undefined;
    floatingRateId?: number | undefined;
    isFloatingInterestRateCalculationAllowed?: boolean | undefined;
    minRequiredOpeningBalance?: string | undefined;
    charges?: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[] | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    currencyCode?: string | undefined;
    digitsAfterDecimal?: number | undefined;
    accountingRule?: number | undefined;
    shortName?: string | undefined;
    isUsedForSuspenseAccounting?: boolean | undefined;
    isLinkedWithFundSourceAccount?: boolean | undefined;
    isReservedProduct?: boolean | undefined;
    minDifferentialRate?: string | undefined;
    defaultDifferentialRate?: string | undefined;
    maxDifferentialRate?: string | undefined;
    paymentChannelToFundSourceMappings?: string | undefined;
    feeToIncomeAccountMappings?: string | undefined;
    penaltyToIncomeAccountMappings?: string | undefined;
}, {
    name?: string | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    inMultiplesOf?: string | undefined;
    withdrawalFeeForTransfers?: boolean | undefined;
    allowOverdraft?: boolean | undefined;
    enforceMinRequiredBalance?: boolean | undefined;
    withHoldTax?: boolean | undefined;
    isDormancyTrackingActive?: boolean | undefined;
    isLinkedToFloatingInterestRates?: boolean | undefined;
    skipCollectTransferCharge?: boolean | undefined;
    nominalAnnualInterestRate?: string | undefined;
    interestCompoundingPeriodType?: number | undefined;
    interestPostingPeriodType?: number | undefined;
    interestCalculationType?: number | undefined;
    interestCalculationDaysInYearType?: number | undefined;
    interestRateDifferential?: string | undefined;
    floatingRateId?: number | undefined;
    isFloatingInterestRateCalculationAllowed?: boolean | undefined;
    minRequiredOpeningBalance?: string | undefined;
    charges?: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[] | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    currencyCode?: string | undefined;
    digitsAfterDecimal?: number | undefined;
    accountingRule?: number | undefined;
    shortName?: string | undefined;
    isUsedForSuspenseAccounting?: boolean | undefined;
    isLinkedWithFundSourceAccount?: boolean | undefined;
    isReservedProduct?: boolean | undefined;
    minDifferentialRate?: string | undefined;
    defaultDifferentialRate?: string | undefined;
    maxDifferentialRate?: string | undefined;
    paymentChannelToFundSourceMappings?: string | undefined;
    feeToIncomeAccountMappings?: string | undefined;
    penaltyToIncomeAccountMappings?: string | undefined;
}>;
declare const UpdateAccountProductResponseSchema: z.ZodObject<{
    id: z.ZodString;
    resourceId: z.ZodString;
    changes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    resourceId: string;
    changes?: Record<string, unknown> | undefined;
}, {
    id: string;
    resourceId: string;
    changes?: Record<string, unknown> | undefined;
}>;
type UpdateAccountProductRequest = z.infer<typeof UpdateAccountProductRequestSchema>;
type UpdateAccountProductResponse = z.infer<typeof UpdateAccountProductResponseSchema>;
declare const AccountProductItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    shortName: z.ZodString;
    description: z.ZodString;
    currency: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        displayLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    }>;
    interestCompoundingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestPostingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationDaysInYearType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    minRequiredBalance: z.ZodNumber;
    enforceMinRequiredBalance: z.ZodBoolean;
    withHoldTax: z.ZodBoolean;
    accountingRule: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    charges: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        isMandatory: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }>, "many">;
    isDormancyTrackingActive: z.ZodBoolean;
    isLinkedToFloatingInterestRates: z.ZodBoolean;
    isFloatingInterestRateCalculationAllowed: z.ZodBoolean;
    isUsedForSuspenseAccounting: z.ZodBoolean;
    isLinkedWithFundSourceAccount: z.ZodBoolean;
    isSkipCollectTransferCharge: z.ZodBoolean;
    isReservedProduct: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    };
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    isDormancyTrackingActive: boolean;
    isLinkedToFloatingInterestRates: boolean;
    interestCompoundingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    isFloatingInterestRateCalculationAllowed: boolean;
    minRequiredBalance: number;
    charges: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[];
    description: string;
    accountingRule: {
        value: string;
        code: string;
        id: number;
    };
    shortName: string;
    isUsedForSuspenseAccounting: boolean;
    isLinkedWithFundSourceAccount: boolean;
    isReservedProduct: boolean;
    isSkipCollectTransferCharge: boolean;
}, {
    name: string;
    id: number;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    };
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    isDormancyTrackingActive: boolean;
    isLinkedToFloatingInterestRates: boolean;
    interestCompoundingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    isFloatingInterestRateCalculationAllowed: boolean;
    minRequiredBalance: number;
    charges: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[];
    description: string;
    accountingRule: {
        value: string;
        code: string;
        id: number;
    };
    shortName: string;
    isUsedForSuspenseAccounting: boolean;
    isLinkedWithFundSourceAccount: boolean;
    isReservedProduct: boolean;
    isSkipCollectTransferCharge: boolean;
}>;
declare const GetAllAccountProductsResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    shortName: z.ZodString;
    description: z.ZodString;
    currency: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        displayLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    }>;
    interestCompoundingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestPostingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationDaysInYearType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    minRequiredBalance: z.ZodNumber;
    enforceMinRequiredBalance: z.ZodBoolean;
    withHoldTax: z.ZodBoolean;
    accountingRule: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    charges: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        isMandatory: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }, {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }>, "many">;
    isDormancyTrackingActive: z.ZodBoolean;
    isLinkedToFloatingInterestRates: z.ZodBoolean;
    isFloatingInterestRateCalculationAllowed: z.ZodBoolean;
    isUsedForSuspenseAccounting: z.ZodBoolean;
    isLinkedWithFundSourceAccount: z.ZodBoolean;
    isSkipCollectTransferCharge: z.ZodBoolean;
    isReservedProduct: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    };
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    isDormancyTrackingActive: boolean;
    isLinkedToFloatingInterestRates: boolean;
    interestCompoundingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    isFloatingInterestRateCalculationAllowed: boolean;
    minRequiredBalance: number;
    charges: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[];
    description: string;
    accountingRule: {
        value: string;
        code: string;
        id: number;
    };
    shortName: string;
    isUsedForSuspenseAccounting: boolean;
    isLinkedWithFundSourceAccount: boolean;
    isReservedProduct: boolean;
    isSkipCollectTransferCharge: boolean;
}, {
    name: string;
    id: number;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        displayLabel: string;
    };
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    isDormancyTrackingActive: boolean;
    isLinkedToFloatingInterestRates: boolean;
    interestCompoundingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    isFloatingInterestRateCalculationAllowed: boolean;
    minRequiredBalance: number;
    charges: {
        id?: number | undefined;
        isMandatory?: boolean | undefined;
    }[];
    description: string;
    accountingRule: {
        value: string;
        code: string;
        id: number;
    };
    shortName: string;
    isUsedForSuspenseAccounting: boolean;
    isLinkedWithFundSourceAccount: boolean;
    isReservedProduct: boolean;
    isSkipCollectTransferCharge: boolean;
}>, "many">;
type AccountProductItem = z.infer<typeof AccountProductItemSchema>;
type GetAllAccountProductsResponse = z.infer<typeof GetAllAccountProductsResponseSchema>;
type GetAccountProductByIdResponse = AccountProductItem;

/**
 * Creates a new savings account product.
 *
 * @param params - The account product creation parameters (see CreateAccountProductRequest)
 * @param params.currencyCode - The currency code for the savings product (e.g., "USD")
 * @param params.digitsAfterDecimal - The number of digits after the decimal point for amounts
 * @param params.interestCompoundingPeriodType - The period type for interest compounding
 * @param params.interestPostingPeriodType - The period type for posting interest to the account
 * @param params.interestCalculationType - The method used to calculate interest
 * @param params.interestCalculationDaysInYearType - The number of days used in interest calculations for the year
 * @param params.accountingRule - The accounting rule used for this savings product
 * @param params.name - The name of the saving product
 * @param params.shortName - A short name for the savings product
 * @param params.description - A brief description of the savings product
 * @param params.locale - The locale for formatting date and number fields (e.g., "en")
 * @param params.dateFormat - The date format string (e.g., "dd MMMM yyyy")
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the created account product details
 *
 * @example
 * ```typescript
 * const createCmd = CreateAccountProduct(
 *   {
 *     currencyCode: "USD",
 *     digitsAfterDecimal: 2,
 *     interestCompoundingPeriodType: 1,
 *     interestPostingPeriodType: 4,
 *     interestCalculationType: 1,
 *     interestCalculationDaysInYearType: 365,
 *     accountingRule: 1,
 *     name: "savings product",
 *     shortName: "te21",
 *     description: "test",
 *     inMultiplesOf: "1",
 *     isLinkedToFloatingInterestRates: true,
 *     floatingRateId: 1,
 *     minDifferentialRate: "1",
 *     interestRateDifferential: "12",
 *     defaultDifferentialRate: "3",
 *     maxDifferentialRate: "14",
 *     isFloatingInterestRateCalculationAllowed: true,
 *     minRequiredOpeningBalance: "1000",
 *     locale: "en",
 *     dateFormat: "dd MMMM yyyy",
 *     startDate: "01 January 2024",
 *     endDate: "31 December 2024"
 *   },
 *   { tenantId: "z01j3e71zd6zkq908yvf5861a8" }
 * );
 * const result = await createCmd.execute(config);
 * console.log(result.resourceId, result.id);
 * ```
 */
declare const CreateAccountProduct: (params: CreateAccountProductRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    params: CreateAccountProductRequest;
    configuration?: {
        tenantId?: string;
    };
}, CreateAccountProductResponse>;
/**
 * Updates an existing savings account product.
 *
 * @param productId - The ID of the savings product to update
 * @param params - The account product update parameters (see UpdateAccountProductRequest)
 * @param params.name - The updated name of the savings product
 * @param params.shortName - The updated short name for the savings product
 * @param params.description - A brief description of the savings product
 * @param params.currencyCode - The currency code for the savings product
 * @param params.digitsAfterDecimal - The number of digits after the decimal point
 * @param params.nominalAnnualInterestRate - The nominal annual interest rate
 * @param params.minRequiredOpeningBalance - The minimum balance required to open the savings account
 * @param params.locale - The locale for formatting date and number fields
 * @param params.dateFormat - The date format string
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the update response with changes
 *
 * @example
 * ```typescript
 * const updateCmd = UpdateAccountProduct(
 *   101,
 *   {
 *     name: "Saving Product test",
 *     shortName: "savi",
 *     description: "SAVING TEST",
 *     currencyCode: "USD",
 *     digitsAfterDecimal: 2,
 *     inMultiplesOf: "1",
 *     nominalAnnualInterestRate: "2",
 *     minRequiredOpeningBalance: "1000",
 *     withdrawalFeeForTransfers: false,
 *     interestCompoundingPeriodType: 1,
 *     interestPostingPeriodType: 4,
 *     interestCalculationType: 1,
 *     interestCalculationDaysInYearType: 365,
 *     accountingRule: 1,
 *     charges: [{ id: 132, isMandatory: false }],
 *     startDate: "2023-07-01",
 *     endDate: "2024-09-30",
 *     paymentChannelToFundSourceMappings: "[]",
 *     penaltyToIncomeAccountMappings: "[]",
 *     feeToIncomeAccountMappings: "[]",
 *     locale: "en",
 *     dateFormat: "dd MMMM yyyy"
 *   },
 *   { tenantId: "z01j3e71zd6zkq908yvf5861a8" }
 * );
 * const result = await updateCmd.execute(config);
 * console.log(result.changes);
 * ```
 */
declare const UpdateAccountProduct: (productId: number, params: UpdateAccountProductRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    productId: number;
    params: UpdateAccountProductRequest;
    configuration?: {
        tenantId?: string;
    };
}, UpdateAccountProductResponse>;
/**
 * Retrieves all savings account products.
 *
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns a list of all account products
 *
 * @example
 * ```typescript
 * const listCmd = GetAllAccountProducts({ tenantId: "z01j3e71zd6zkq908yvf5861a8" });
 * const result = await listCmd.execute(config);
 * result.forEach(product => console.log(product.name));
 * ```
 */
declare const GetAllAccountProducts: (configuration?: {
    tenantId?: string;
}) => Command<{
    configuration?: {
        tenantId?: string;
    };
}, GetAllAccountProductsResponse>;
/**
 * Retrieves a single savings account product by its ID.
 *
 * @param productId - The ID of the savings product to retrieve
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the account product details
 *
 * @example
 * ```typescript
 * const getCmd = GetAccountProductById(101, { tenantId: "z01j3e71zd6zkq908yvf5861a8" });
 * const result = await getCmd.execute(config);
 * console.log(result.name);
 * ```
 */
declare const GetAccountProductById: (productId: number, configuration?: {
    tenantId?: string;
}) => Command<{
    productId: number;
    configuration?: {
        tenantId?: string;
    };
}, GetAccountProductByIdResponse>;

declare const GenerateAccountStatementRequestSchema: z.ZodObject<{
    reportName: z.ZodString;
    parentEntityType: z.ZodString;
    parentEntityId: z.ZodNumber;
    reportType: z.ZodEnum<["PDF", "CSV", "EXCELL", "EXCELL 2007"]>;
    docType: z.ZodString;
    params: z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
        saving_no: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start_date: string;
        end_date: string;
        saving_no: string;
    }, {
        start_date: string;
        end_date: string;
        saving_no: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        start_date: string;
        end_date: string;
        saving_no: string;
    };
    reportName: string;
    parentEntityType: string;
    parentEntityId: number;
    reportType: "PDF" | "CSV" | "EXCELL" | "EXCELL 2007";
    docType: string;
}, {
    params: {
        start_date: string;
        end_date: string;
        saving_no: string;
    };
    reportName: string;
    parentEntityType: string;
    parentEntityId: number;
    reportType: "PDF" | "CSV" | "EXCELL" | "EXCELL 2007";
    docType: string;
}>;
declare const GenerateAccountStatementResponseSchema: z.ZodObject<{
    jobId: z.ZodNumber;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    jobId: number;
}, {
    status: string;
    jobId: number;
}>;
type GenerateAccountStatementRequest = z.infer<typeof GenerateAccountStatementRequestSchema>;
type GenerateAccountStatementResponse = z.infer<typeof GenerateAccountStatementResponseSchema>;
declare const DownloadAccountStatementResponseSchema: z.ZodObject<{
    data: z.ZodType<buffer.Blob, z.ZodTypeDef, buffer.Blob>;
    fileName: z.ZodOptional<z.ZodString>;
    contentType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: buffer.Blob;
    fileName?: string | undefined;
    contentType?: string | undefined;
}, {
    data: buffer.Blob;
    fileName?: string | undefined;
    contentType?: string | undefined;
}>;
type DownloadAccountStatementResponse = z.infer<typeof DownloadAccountStatementResponseSchema>;
declare const GetAccountDocumentsDetailsQueryParamsSchema: z.ZodObject<{
    createdAtFrom: z.ZodOptional<z.ZodString>;
    createdAtTo: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["statement", "receipt", "report", "passport"]>>;
}, "strip", z.ZodTypeAny, {
    type?: "statement" | "receipt" | "report" | "passport" | undefined;
    name?: string | undefined;
    createdAtFrom?: string | undefined;
    createdAtTo?: string | undefined;
}, {
    type?: "statement" | "receipt" | "report" | "passport" | undefined;
    name?: string | undefined;
    createdAtFrom?: string | undefined;
    createdAtTo?: string | undefined;
}>;
type GetAccountDocumentsDetailsQueryParams = z.infer<typeof GetAccountDocumentsDetailsQueryParamsSchema>;
declare const GetAccountDocumentsDetailsResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    parentEntityType: z.ZodString;
    parentEntityId: z.ZodNumber;
    name: z.ZodString;
    fileName: z.ZodString;
    size: z.ZodNumber;
    mimeType: z.ZodString;
    type: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    name: string;
    id: string;
    createdAt: string;
    description: string;
    parentEntityType: string;
    parentEntityId: number;
    fileName: string;
    size: number;
    mimeType: string;
}, {
    type: string;
    name: string;
    id: string;
    createdAt: string;
    description: string;
    parentEntityType: string;
    parentEntityId: number;
    fileName: string;
    size: number;
    mimeType: string;
}>, "many">;
type GetAccountDocumentsDetailsResponse = z.infer<typeof GetAccountDocumentsDetailsResponseSchema>;

/**
 * Generates an account statement.
 *
 * @param requestData - The statement generation parameters (see GenerateAccountStatementRequest)
 * @param requestData.reportName - The name of the report
 * @param requestData.parentEntityType - The parent entity type (e.g., "savings")
 * @param requestData.parentEntityId - The parent entity ID
 * @param requestData.reportType - The report type (e.g., "PDF")
 * @param requestData.docType - The document type (e.g., "statement")
 * @param requestData.params - Additional parameters (start_date, end_date, saving_no)
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the statement generation job details
 *
 * @example
 * ```typescript
 * const generateCmd = GenerateAccountStatement(
 *   {
 *     reportName: "Report current and saving account(Pentaho)",
 *     parentEntityType: "savings",
 *     parentEntityId: 1,
 *     reportType: "PDF",
 *     docType: "statement",
 *     params: {
 *       start_date: "01 January 2023",
 *       end_date: "02 January 2023",
 *       saving_no: "1"
 *     }
 *   },
 *   { tenantId: "tokoro" }
 * );
 * const result = await generateCmd.execute(config);
 * console.log(result.jobId); // 315
 * ```
 */
declare const GenerateAccountStatement: (requestData: GenerateAccountStatementRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    requestData: GenerateAccountStatementRequest;
    configuration?: {
        tenantId?: string;
    };
}, GenerateAccountStatementResponse>;
/**
 * Downloads a document associated with a specific savings account.
 * This API returns a binary file as a raw byte stream.
 *
 * @param savingsAccountId - The ID of the savings account
 * @param documentId - The UUID of the document to download
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the document as a Blob with metadata
 *
 * @example
 * ```typescript
 * const downloadCmd = DownloadAccountStatement(
 *   12,
 *   "45ac4379-7185-471b-a103-916d25dc648d",
 *   { tenantId: "z01j3e71zd6zkq908yvf5861a8" }
 * );
 * const result = await downloadCmd.execute(config);
 * // result.data is a Blob containing the file
 * // result.fileName contains the extracted filename (if available)
 * // result.contentType contains the MIME type (if available)
 * ```
 */
declare const DownloadAccountStatement: (savingsAccountId: number, documentId: string, configuration?: {
    tenantId?: string;
}) => Command<{
    savingsAccountId: number;
    documentId: string;
    configuration?: {
        tenantId?: string;
    };
}, DownloadAccountStatementResponse>;
/**
 * Retrieves the details of all documents linked to a savings account.
 *
 * @param savingsAccountId - The ID of the savings account
 * @param queryParams - Optional query parameters for filtering documents
 * @param queryParams.createdAtFrom - Filter documents created from this date (e.g., "2023-01-01+00:00:00")
 * @param queryParams.createdAtTo - Filter documents created up to this date (e.g., "2023-12-31+23:59:00")
 * @param queryParams.name - Name of the document (e.g., "January 01st - July 17st")
 * @param queryParams.type - Filter documents by type (statement, receipt, report, passport)
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns a list of document details
 *
 * @example
 * ```typescript
 * const getDocsCmd = GetAccountDocumentsDetails(
 *   123,
 *   { type: "statement", createdAtFrom: "2023-01-01+00:00:00" },
 *   { tenantId: "z01j3e71zd6zkq908yvf5861a8" }
 * );
 * const result = await getDocsCmd.execute(config);
 * result.forEach(doc => console.log(doc.name));
 * ```
 */
declare const GetAccountDocumentsDetails: (savingsAccountId: number, queryParams?: GetAccountDocumentsDetailsQueryParams, configuration?: {
    tenantId?: string;
}) => Command<{
    savingsAccountId: number;
    queryParams?: GetAccountDocumentsDetailsQueryParams;
    configuration?: {
        tenantId?: string;
    };
}, GetAccountDocumentsDetailsResponse>;

declare const CreateTransfer: (params: {
    transfer: CreateTransferInput;
    tenantId: string;
}) => Command<{
    transfer: CreateTransferInput;
    tenantId: string;
}, CreateTransferOutput>;
declare const GetTransfer: (params: {
    id: number;
    tenantId: string;
}) => Command<{
    id: number;
    tenantId: string;
}, any>;
declare const GetTransfers: (params: GetTransferInput) => Command<GetTransferInput, Array<Transfer>>;
declare const MarkAsSuccess: (params: {
    externalId: string;
    paymentType?: PaymentRail;
    tenantId?: string;
}) => Command<{
    externalId: string;
    paymentType?: PaymentRail;
    tenantId?: string;
}, ProcessOutput$1>;
declare const MarkAsProcessing: (params: {
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
        outgoingTransfer: string;
    };
    tenantId?: string;
}) => Command<{
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
        outgoingTransfer: string;
    };
    tenantId?: string;
}, ProcessOutput$1>;
declare const MarkAsReturned: (params: MarkAsReturnInput) => Command<MarkAsReturnInput, ProcessOutput$1>;
declare const LogFailTransfer: (params: {
    payload: Transfer;
    tenantId?: string;
}) => Command<{
    payload: Transfer;
    tenantId?: string;
}, ProcessOutput$1>;
declare const MarkAsFail: (params: {
    externalId: string;
    errorMessage: string;
    paymentType: PaymentRail;
    tenantId?: string;
}) => Command<{
    externalId: string;
    errorMessage: string;
    paymentType: PaymentRail;
    tenantId?: string;
}, ProcessOutput$1>;
declare const UpdateTraceNumber: (params: UpdateTraceNumbersInput) => Command<UpdateTraceNumbersInput, ProcessOutput$1>;

declare const BankInformationSchema: z.ZodObject<{
    routingNumber: z.ZodString;
    swiftCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    routingNumber: string;
    swiftCode: string;
}, {
    routingNumber: string;
    swiftCode: string;
}>;
declare const AccountDetailsDataSchema: z.ZodObject<{
    accountNumber: z.ZodString;
    bankInformation: z.ZodObject<{
        routingNumber: z.ZodString;
        swiftCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        routingNumber: string;
        swiftCode: string;
    }, {
        routingNumber: string;
        swiftCode: string;
    }>;
}, "strip", z.ZodTypeAny, {
    accountNumber: string;
    bankInformation: {
        routingNumber: string;
        swiftCode: string;
    };
}, {
    accountNumber: string;
    bankInformation: {
        routingNumber: string;
        swiftCode: string;
    };
}>;
declare const AddressSchema: z.ZodObject<{
    line1: z.ZodString;
    line2: z.ZodString;
    city: z.ZodString;
    stateCode: z.ZodString;
    countryCode: z.ZodString;
    postalCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    line1: string;
    line2: string;
    stateCode: string;
    countryCode: string;
    postalCode: string;
    city: string;
}, {
    line1: string;
    line2: string;
    stateCode: string;
    countryCode: string;
    postalCode: string;
    city: string;
}>;
declare const RecipientShape: {
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    nickName: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    businessName: z.ZodString;
    emailAddress: z.ZodString;
    phoneNumber: z.ZodString;
    recipientType: z.ZodString;
    paymentRail: z.ZodString;
    isOwnAccount: z.ZodBoolean;
    address: z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodString;
        city: z.ZodString;
        stateCode: z.ZodString;
        countryCode: z.ZodString;
        postalCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }>;
    accountDetailsData: z.ZodObject<{
        accountNumber: z.ZodString;
        bankInformation: z.ZodObject<{
            routingNumber: z.ZodString;
            swiftCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
            swiftCode: string;
        }, {
            routingNumber: string;
            swiftCode: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }>;
};
declare const RecipientSchema: z.ZodObject<{
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    nickName: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    businessName: z.ZodString;
    emailAddress: z.ZodString;
    phoneNumber: z.ZodString;
    recipientType: z.ZodString;
    paymentRail: z.ZodString;
    isOwnAccount: z.ZodBoolean;
    address: z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodString;
        city: z.ZodString;
        stateCode: z.ZodString;
        countryCode: z.ZodString;
        postalCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }>;
    accountDetailsData: z.ZodObject<{
        accountNumber: z.ZodString;
        bankInformation: z.ZodObject<{
            routingNumber: z.ZodString;
            swiftCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
            swiftCode: string;
        }, {
            routingNumber: string;
            swiftCode: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: number;
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
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
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
}, {
    id: number;
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
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
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
}>;
declare const RecipientsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    nickName: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    businessName: z.ZodString;
    emailAddress: z.ZodString;
    phoneNumber: z.ZodString;
    recipientType: z.ZodString;
    paymentRail: z.ZodString;
    isOwnAccount: z.ZodBoolean;
    address: z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodString;
        city: z.ZodString;
        stateCode: z.ZodString;
        countryCode: z.ZodString;
        postalCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }>;
    accountDetailsData: z.ZodObject<{
        accountNumber: z.ZodString;
        bankInformation: z.ZodObject<{
            routingNumber: z.ZodString;
            swiftCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
            swiftCode: string;
        }, {
            routingNumber: string;
            swiftCode: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: number;
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
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
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
}, {
    id: number;
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
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
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
}>, "many">;
declare const RecipientRequestShape: {
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
};
declare const RecipientRequestSchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}, {
    name?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
declare const CreateRecipientRequestShape: {
    nickName: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    businessName: z.ZodOptional<z.ZodString>;
    emailAddress: z.ZodString;
    phoneNumber: z.ZodString;
    recipientType: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    isOwnAccount: z.ZodOptional<z.ZodBoolean>;
    address: z.ZodOptional<z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodString;
        city: z.ZodString;
        stateCode: z.ZodString;
        countryCode: z.ZodString;
        postalCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }>>;
    accountDetailsData: z.ZodObject<{
        accountNumber: z.ZodString;
        bankInformation: z.ZodObject<{
            routingNumber: z.ZodString;
            swiftCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
            swiftCode: string;
        }, {
            routingNumber: string;
            swiftCode: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }>;
};
declare const CreateRecipientRequestSchema: z.ZodEffects<z.ZodObject<{
    nickName: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    businessName: z.ZodOptional<z.ZodString>;
    emailAddress: z.ZodString;
    phoneNumber: z.ZodString;
    recipientType: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    isOwnAccount: z.ZodOptional<z.ZodBoolean>;
    address: z.ZodOptional<z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodString;
        city: z.ZodString;
        stateCode: z.ZodString;
        countryCode: z.ZodString;
        postalCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }>>;
    accountDetailsData: z.ZodObject<{
        accountNumber: z.ZodString;
        bankInformation: z.ZodObject<{
            routingNumber: z.ZodString;
            swiftCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
            swiftCode: string;
        }, {
            routingNumber: string;
            swiftCode: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    paymentRail: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD";
    recipientType: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
    phoneNumber: string;
    accountDetailsData: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    };
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    businessName?: string | undefined;
    isOwnAccount?: boolean | undefined;
}, {
    paymentRail: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD";
    recipientType: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
    phoneNumber: string;
    accountDetailsData: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    };
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    businessName?: string | undefined;
    isOwnAccount?: boolean | undefined;
}>, {
    paymentRail: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD";
    recipientType: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
    phoneNumber: string;
    accountDetailsData: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    };
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    businessName?: string | undefined;
    isOwnAccount?: boolean | undefined;
}, {
    paymentRail: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD";
    recipientType: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    nickName: string;
    phoneNumber: string;
    accountDetailsData: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    };
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    businessName?: string | undefined;
    isOwnAccount?: boolean | undefined;
}>;
declare const RecipientFilterKeySchema: z.ZodEnum<["name"]>;
type RecipientFilterKey = z.infer<typeof RecipientFilterKeySchema>;
declare const UpdateRecipientRequestSchema: z.ZodEffects<z.ZodObject<{
    nickName: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    businessName: z.ZodOptional<z.ZodString>;
    emailAddress: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    recipientType: z.ZodOptional<z.ZodString>;
    paymentRail: z.ZodOptional<z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>;
    isOwnAccount: z.ZodOptional<z.ZodBoolean>;
    address: z.ZodOptional<z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodString;
        city: z.ZodString;
        stateCode: z.ZodString;
        countryCode: z.ZodString;
        postalCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }, {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    }>>;
    accountDetailsData: z.ZodOptional<z.ZodObject<{
        accountNumber: z.ZodString;
        bankInformation: z.ZodObject<{
            routingNumber: z.ZodString;
            swiftCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            routingNumber: string;
            swiftCode: string;
        }, {
            routingNumber: string;
            swiftCode: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }, {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    recipientType?: string | undefined;
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    businessName?: string | undefined;
    phoneNumber?: string | undefined;
    isOwnAccount?: boolean | undefined;
    accountDetailsData?: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    } | undefined;
}, {
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    recipientType?: string | undefined;
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    businessName?: string | undefined;
    phoneNumber?: string | undefined;
    isOwnAccount?: boolean | undefined;
    accountDetailsData?: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    } | undefined;
}>, {
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    recipientType?: string | undefined;
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    businessName?: string | undefined;
    phoneNumber?: string | undefined;
    isOwnAccount?: boolean | undefined;
    accountDetailsData?: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    } | undefined;
}, {
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    recipientType?: string | undefined;
    address?: {
        line1: string;
        line2: string;
        stateCode: string;
        countryCode: string;
        postalCode: string;
        city: string;
    } | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    businessName?: string | undefined;
    phoneNumber?: string | undefined;
    isOwnAccount?: boolean | undefined;
    accountDetailsData?: {
        accountNumber: string;
        bankInformation: {
            routingNumber: string;
            swiftCode: string;
        };
    } | undefined;
}>;
type Recipient = z.infer<typeof RecipientSchema>;
type Recipients = z.infer<typeof RecipientsSchema>;
type RecipientRequest = z.infer<typeof RecipientRequestSchema>;
type CreateRecipientRequest = z.infer<typeof CreateRecipientRequestSchema>;
type UpdateRecipientRequest = z.infer<typeof UpdateRecipientRequestSchema>;

declare const GetRecipient: (params: {
    clientId: number;
    id: number;
    tenantId?: string;
}) => Command<{
    clientId: number;
    id: number;
    tenantId?: string;
}, Recipient>;
declare const CreateRecipient: (params: {
    clientId: number;
    recipient: CreateRecipientRequest;
    tenantId?: string;
}) => Command<{
    clientId: number;
    recipient: CreateRecipientRequest;
    tenantId?: string;
}, Recipient>;
declare const DeleteRecipient: (params: {
    clientId: number;
    recipientId: number;
    tenantId?: string;
}) => Command<{
    clientId: number;
    recipientId: number;
    tenantId?: string;
}, ProcessOutput$1>;
declare const GetRecipients: (clientId: number, params: RecipientRequest, configuration: {
    tenantId?: string;
}) => Command<{
    params: RecipientRequest;
    configuration: {
        tenantId?: string;
    };
}, Recipients>;

declare const GraphQL: (request: GraphQLRequest) => Command<GraphQLRequest, any>;

declare const GetUserDetail: (params?: {
    tenantId?: string;
}) => Command<{
    tenantId?: string;
}, UserDetail>;
declare const EnableSelfServiceAccess: (requestData: EnableSelfServiceAccessRequest, params?: {
    tenantId?: string;
}) => Command<{
    tenantId?: string;
}, EnableSelfServiceAccessResponse>;
declare const UpdateSelfServiceUser: (requestData: UpdateSelfServiceUserRequest, params?: {
    tenantId?: string;
}) => Command<{
    tenantId?: string;
}, UpdateSelfServiceUserResponse>;
declare const DeleteSelfServiceUser: (userId: number, params: {
    tenantId?: string;
}) => Command<{
    tenantId?: string;
}, DeleteSelfServiceUserResponse>;

declare const CardProductResponseShape: z$1.ZodObject<{
    totalFilteredRecords: z$1.ZodNumber;
    pageItems: z$1.ZodArray<z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
        active: z$1.ZodBoolean;
        bin: z$1.ZodString;
        cardType: z$1.ZodString;
        network: z$1.ZodString;
        manualPin: z$1.ZodBoolean;
        virtual: z$1.ZodBoolean;
        digitalFirst: z$1.ZodBoolean;
        atmWithdrawalsEnabled: z$1.ZodBoolean;
        internationalPaymentsEnabled: z$1.ZodBoolean;
        currencyCode: z$1.ZodString;
        currencyDigitsAfterDecimal: z$1.ZodNumber;
        currencyInMultiplesOf: z$1.ZodNumber;
        cardProcessorId: z$1.ZodNumber;
        cardProcessorDisplayName: z$1.ZodString;
        yearExpire: z$1.ZodNumber;
        maxActiveCardAllowed: z$1.ZodNumber;
        creditProductId: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
        active: boolean;
        currencyCode: string;
        bin: string;
        cardType: string;
        network: string;
        manualPin: boolean;
        virtual: boolean;
        digitalFirst: boolean;
        atmWithdrawalsEnabled: boolean;
        internationalPaymentsEnabled: boolean;
        currencyDigitsAfterDecimal: number;
        currencyInMultiplesOf: number;
        cardProcessorId: number;
        cardProcessorDisplayName: string;
        yearExpire: number;
        maxActiveCardAllowed: number;
        creditProductId: number;
    }, {
        name: string;
        id: number;
        active: boolean;
        currencyCode: string;
        bin: string;
        cardType: string;
        network: string;
        manualPin: boolean;
        virtual: boolean;
        digitalFirst: boolean;
        atmWithdrawalsEnabled: boolean;
        internationalPaymentsEnabled: boolean;
        currencyDigitsAfterDecimal: number;
        currencyInMultiplesOf: number;
        cardProcessorId: number;
        cardProcessorDisplayName: string;
        yearExpire: number;
        maxActiveCardAllowed: number;
        creditProductId: number;
    }>, "many">;
}, "strip", z$1.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: {
        name: string;
        id: number;
        active: boolean;
        currencyCode: string;
        bin: string;
        cardType: string;
        network: string;
        manualPin: boolean;
        virtual: boolean;
        digitalFirst: boolean;
        atmWithdrawalsEnabled: boolean;
        internationalPaymentsEnabled: boolean;
        currencyDigitsAfterDecimal: number;
        currencyInMultiplesOf: number;
        cardProcessorId: number;
        cardProcessorDisplayName: string;
        yearExpire: number;
        maxActiveCardAllowed: number;
        creditProductId: number;
    }[];
}, {
    totalFilteredRecords: number;
    pageItems: {
        name: string;
        id: number;
        active: boolean;
        currencyCode: string;
        bin: string;
        cardType: string;
        network: string;
        manualPin: boolean;
        virtual: boolean;
        digitalFirst: boolean;
        atmWithdrawalsEnabled: boolean;
        internationalPaymentsEnabled: boolean;
        currencyDigitsAfterDecimal: number;
        currencyInMultiplesOf: number;
        cardProcessorId: number;
        cardProcessorDisplayName: string;
        yearExpire: number;
        maxActiveCardAllowed: number;
        creditProductId: number;
    }[];
}>;
type CardProducts = z$1.infer<typeof CardProductResponseShape>;
declare const CardProductDetailShape: z$1.ZodObject<{
    id: z$1.ZodNumber;
    name: z$1.ZodString;
    externalProductId: z$1.ZodNumber;
    active: z$1.ZodBoolean;
    bin: z$1.ZodNumber;
    cardType: z$1.ZodString;
    network: z$1.ZodString;
    manualPin: z$1.ZodBoolean;
    virtual: z$1.ZodBoolean;
    digitalFirst: z$1.ZodBoolean;
    atmWithdrawalsEnabled: z$1.ZodBoolean;
    internationalPaymentsEnabled: z$1.ZodBoolean;
    onlinePaymentsEnabled: z$1.ZodBoolean;
    contactlessPaymentsEnabled: z$1.ZodBoolean;
    posPaymentsEnabled: z$1.ZodBoolean;
    currencyCode: z$1.ZodString;
    currencyDigitsAfterDecimal: z$1.ZodNumber;
    currencyInMultiplesOf: z$1.ZodNumber;
    velocityRules: z$1.ZodObject<{
        controls: z$1.ZodArray<z$1.ZodString, "many">;
        type: z$1.ZodString;
        value: z$1.ZodNumber;
        timePeriod: z$1.ZodNumber;
        timeUnit: z$1.ZodString;
        category: z$1.ZodString;
        categoryId: z$1.ZodNumber;
        version: z$1.ZodNumber;
        id: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        value: number;
        type: string;
        id: number;
        controls: string[];
        timePeriod: number;
        timeUnit: string;
        category: string;
        categoryId: number;
        version: number;
    }, {
        value: number;
        type: string;
        id: number;
        controls: string[];
        timePeriod: number;
        timeUnit: string;
        category: string;
        categoryId: number;
        version: number;
    }>;
    cardProcessorId: z$1.ZodNumber;
    cardProcessorDisplayName: z$1.ZodString;
    yearExpire: z$1.ZodNumber;
    maxActiveCardAllowed: z$1.ZodNumber;
    prepaidCard: z$1.ZodBoolean;
    legalForm: z$1.ZodNumber;
    businessCardIDEnabled: z$1.ZodBoolean;
    fulfillCardOnOrder: z$1.ZodBoolean;
}, "strip", z$1.ZodTypeAny, {
    name: string;
    id: number;
    legalForm: number;
    active: boolean;
    currencyCode: string;
    bin: number;
    cardType: string;
    network: string;
    manualPin: boolean;
    virtual: boolean;
    digitalFirst: boolean;
    atmWithdrawalsEnabled: boolean;
    internationalPaymentsEnabled: boolean;
    currencyDigitsAfterDecimal: number;
    currencyInMultiplesOf: number;
    cardProcessorId: number;
    cardProcessorDisplayName: string;
    yearExpire: number;
    maxActiveCardAllowed: number;
    externalProductId: number;
    onlinePaymentsEnabled: boolean;
    contactlessPaymentsEnabled: boolean;
    posPaymentsEnabled: boolean;
    velocityRules: {
        value: number;
        type: string;
        id: number;
        controls: string[];
        timePeriod: number;
        timeUnit: string;
        category: string;
        categoryId: number;
        version: number;
    };
    prepaidCard: boolean;
    businessCardIDEnabled: boolean;
    fulfillCardOnOrder: boolean;
}, {
    name: string;
    id: number;
    legalForm: number;
    active: boolean;
    currencyCode: string;
    bin: number;
    cardType: string;
    network: string;
    manualPin: boolean;
    virtual: boolean;
    digitalFirst: boolean;
    atmWithdrawalsEnabled: boolean;
    internationalPaymentsEnabled: boolean;
    currencyDigitsAfterDecimal: number;
    currencyInMultiplesOf: number;
    cardProcessorId: number;
    cardProcessorDisplayName: string;
    yearExpire: number;
    maxActiveCardAllowed: number;
    externalProductId: number;
    onlinePaymentsEnabled: boolean;
    contactlessPaymentsEnabled: boolean;
    posPaymentsEnabled: boolean;
    velocityRules: {
        value: number;
        type: string;
        id: number;
        controls: string[];
        timePeriod: number;
        timeUnit: string;
        category: string;
        categoryId: number;
        version: number;
    };
    prepaidCard: boolean;
    businessCardIDEnabled: boolean;
    fulfillCardOnOrder: boolean;
}>;
type CardProductDetail = z$1.infer<typeof CardProductDetailShape>;
declare const CardProductRequestShape: z$1.ZodObject<{
    cardProcessorId: z$1.ZodDefault<z$1.ZodNumber>;
    externalProductId: z$1.ZodDefault<z$1.ZodNumber>;
    cardProcessorConfigId: z$1.ZodDefault<z$1.ZodNumber>;
    name: z$1.ZodString;
    legalForm: z$1.ZodNumber;
    cardType: z$1.ZodDefault<z$1.ZodEnum<["CREDIT", "DEBIT"]>>;
    network: z$1.ZodDefault<z$1.ZodString>;
    bin: z$1.ZodString;
    yearExpire: z$1.ZodNumber;
    maxActiveCardAllowed: z$1.ZodDefault<z$1.ZodNumber>;
    currencyCode: z$1.ZodString;
    currencyDigitsAfterDecimal: z$1.ZodNumber;
    onlinePaymentsEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
    contactlessPaymentsEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
    atmWithdrawalsEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
    internationalPaymentsEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
    posPaymentsEnabled: z$1.ZodOptional<z$1.ZodBoolean>;
    virtual: z$1.ZodOptional<z$1.ZodBoolean>;
    manualPin: z$1.ZodOptional<z$1.ZodBoolean>;
    active: z$1.ZodOptional<z$1.ZodBoolean>;
    prepaidCard: z$1.ZodOptional<z$1.ZodBoolean>;
}, "strip", z$1.ZodTypeAny, {
    name: string;
    legalForm: number;
    currencyCode: string;
    bin: string;
    cardType: "CREDIT" | "DEBIT";
    network: string;
    currencyDigitsAfterDecimal: number;
    cardProcessorId: number;
    yearExpire: number;
    maxActiveCardAllowed: number;
    externalProductId: number;
    cardProcessorConfigId: number;
    active?: boolean | undefined;
    manualPin?: boolean | undefined;
    virtual?: boolean | undefined;
    atmWithdrawalsEnabled?: boolean | undefined;
    internationalPaymentsEnabled?: boolean | undefined;
    onlinePaymentsEnabled?: boolean | undefined;
    contactlessPaymentsEnabled?: boolean | undefined;
    posPaymentsEnabled?: boolean | undefined;
    prepaidCard?: boolean | undefined;
}, {
    name: string;
    legalForm: number;
    currencyCode: string;
    bin: string;
    currencyDigitsAfterDecimal: number;
    yearExpire: number;
    active?: boolean | undefined;
    cardType?: "CREDIT" | "DEBIT" | undefined;
    network?: string | undefined;
    manualPin?: boolean | undefined;
    virtual?: boolean | undefined;
    atmWithdrawalsEnabled?: boolean | undefined;
    internationalPaymentsEnabled?: boolean | undefined;
    cardProcessorId?: number | undefined;
    maxActiveCardAllowed?: number | undefined;
    externalProductId?: number | undefined;
    onlinePaymentsEnabled?: boolean | undefined;
    contactlessPaymentsEnabled?: boolean | undefined;
    posPaymentsEnabled?: boolean | undefined;
    prepaidCard?: boolean | undefined;
    cardProcessorConfigId?: number | undefined;
}>;
declare const CardProductUpdateRequestShape: z$1.ZodObject<{
    cardProcessorId: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodNumber>>;
    externalProductId: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodNumber>>;
    cardProcessorConfigId: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodNumber>>;
    name: z$1.ZodOptional<z$1.ZodString>;
    legalForm: z$1.ZodOptional<z$1.ZodNumber>;
    cardType: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodEnum<["CREDIT", "DEBIT"]>>>;
    network: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodString>>;
    bin: z$1.ZodOptional<z$1.ZodString>;
    yearExpire: z$1.ZodOptional<z$1.ZodNumber>;
    maxActiveCardAllowed: z$1.ZodOptional<z$1.ZodDefault<z$1.ZodNumber>>;
    currencyCode: z$1.ZodOptional<z$1.ZodString>;
    currencyDigitsAfterDecimal: z$1.ZodOptional<z$1.ZodNumber>;
    onlinePaymentsEnabled: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    contactlessPaymentsEnabled: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    atmWithdrawalsEnabled: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    internationalPaymentsEnabled: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    posPaymentsEnabled: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    virtual: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    manualPin: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    active: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
    prepaidCard: z$1.ZodOptional<z$1.ZodOptional<z$1.ZodBoolean>>;
}, "strip", z$1.ZodTypeAny, {
    name?: string | undefined;
    legalForm?: number | undefined;
    active?: boolean | undefined;
    currencyCode?: string | undefined;
    bin?: string | undefined;
    cardType?: "CREDIT" | "DEBIT" | undefined;
    network?: string | undefined;
    manualPin?: boolean | undefined;
    virtual?: boolean | undefined;
    atmWithdrawalsEnabled?: boolean | undefined;
    internationalPaymentsEnabled?: boolean | undefined;
    currencyDigitsAfterDecimal?: number | undefined;
    cardProcessorId?: number | undefined;
    yearExpire?: number | undefined;
    maxActiveCardAllowed?: number | undefined;
    externalProductId?: number | undefined;
    onlinePaymentsEnabled?: boolean | undefined;
    contactlessPaymentsEnabled?: boolean | undefined;
    posPaymentsEnabled?: boolean | undefined;
    prepaidCard?: boolean | undefined;
    cardProcessorConfigId?: number | undefined;
}, {
    name?: string | undefined;
    legalForm?: number | undefined;
    active?: boolean | undefined;
    currencyCode?: string | undefined;
    bin?: string | undefined;
    cardType?: "CREDIT" | "DEBIT" | undefined;
    network?: string | undefined;
    manualPin?: boolean | undefined;
    virtual?: boolean | undefined;
    atmWithdrawalsEnabled?: boolean | undefined;
    internationalPaymentsEnabled?: boolean | undefined;
    currencyDigitsAfterDecimal?: number | undefined;
    cardProcessorId?: number | undefined;
    yearExpire?: number | undefined;
    maxActiveCardAllowed?: number | undefined;
    externalProductId?: number | undefined;
    onlinePaymentsEnabled?: boolean | undefined;
    contactlessPaymentsEnabled?: boolean | undefined;
    posPaymentsEnabled?: boolean | undefined;
    prepaidCard?: boolean | undefined;
    cardProcessorConfigId?: number | undefined;
}>;
type CardProductRequest = z$1.infer<typeof CardProductRequestShape>;
type CardProductUpdateRequest = z$1.infer<typeof CardProductUpdateRequestShape>;
declare const CreateCardProductResponseShape: z$1.ZodObject<{
    id: z$1.ZodString;
    resourceId: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    id: string;
    resourceId: number;
}, {
    id: string;
    resourceId: number;
}>;
type CreateCardProductResponse = z$1.infer<typeof CreateCardProductResponseShape>;

declare const ListCardProduct: (params?: {
    limit?: number;
    offset?: number;
}, configuration?: {
    tenantId?: string;
}) => Command<{
    params: {
        limit?: number;
        offset?: number;
    };
    configuration?: {
        tenantId?: string;
    };
}, CardProducts>;
declare const GetCardProduct: (cardProductId: number, configuration?: {
    tenantId: string;
}) => Command<{
    cardProductId: number;
    configuration?: {
        tenantId: string;
    };
}, CardProductDetail>;
declare const CreateCardProduct: (params: CardProductRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    params: CardProductRequest;
    configuration?: {
        tenantId?: string;
    };
}, CreateCardProductResponse>;
declare const UpdateCardProduct: (cardProductId: number, params: CardProductUpdateRequest, configuration?: {
    tenantId: string;
}) => Command<{
    cardProductId: number;
    params: CardProductUpdateRequest;
    configuration?: {
        tenantId: string;
    };
}, CreateCardProductResponse>;

declare const ClientAddressShape: z$1.ZodArray<z$1.ZodObject<{
    clientId: z$1.ZodNumber;
    addressType: z$1.ZodString;
    addressId: z$1.ZodNumber;
    addressTypeId: z$1.ZodNumber;
    isActive: z$1.ZodBoolean;
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodString;
    addressLine3: z$1.ZodString;
    mobileNo: z$1.ZodNumber;
    townVillage: z$1.ZodString;
    countyDistrict: z$1.ZodString;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryName: z$1.ZodString;
    stateName: z$1.ZodString;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodNumber;
    createdBy: z$1.ZodString;
    updatedBy: z$1.ZodString;
    minifiedAddress: z$1.ZodArray<z$1.ZodString, "many">;
}, "strip", z$1.ZodTypeAny, {
    clientId: number;
    postalCode: number;
    city: string;
    mobileNo: number;
    addressType: string;
    addressId: number;
    addressTypeId: number;
    isActive: boolean;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    townVillage: string;
    countyDistrict: string;
    stateProvinceId: number;
    countryName: string;
    stateName: string;
    countryId: number;
    createdBy: string;
    updatedBy: string;
    minifiedAddress: string[];
}, {
    clientId: number;
    postalCode: number;
    city: string;
    mobileNo: number;
    addressType: string;
    addressId: number;
    addressTypeId: number;
    isActive: boolean;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    townVillage: string;
    countyDistrict: string;
    stateProvinceId: number;
    countryName: string;
    stateName: string;
    countryId: number;
    createdBy: string;
    updatedBy: string;
    minifiedAddress: string[];
}>, "many">;
type GetClientAddressResponse = z$1.infer<typeof ClientAddressShape>;
declare const CreateClientAddressResponseSchema: z$1.ZodObject<{
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    clientId: number;
    resourceId: number;
}, {
    clientId: number;
    resourceId: number;
}>;
type CreateClientAddressResponse = z$1.infer<typeof CreateClientAddressResponseSchema>;
declare const UpdateClientAddressResponseSchema: z$1.ZodObject<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
}, "strip", z$1.ZodTypeAny, {
    id: number;
    clientId: number;
    resourceId: number;
}, {
    id: number;
    clientId: number;
    resourceId: number;
}>;
type UpdateClientAddressResponse = z$1.infer<typeof UpdateClientAddressResponseSchema>;
declare const CreateClientAddressSchema: z$1.ZodObject<{
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodOptional<z$1.ZodString>;
    addressLine3: z$1.ZodOptional<z$1.ZodString>;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodString;
} & {
    isActive: z$1.ZodBoolean;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodOptional<z$1.ZodString>;
    addressLine3: z$1.ZodOptional<z$1.ZodString>;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodString;
} & {
    isActive: z$1.ZodBoolean;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodOptional<z$1.ZodString>;
    addressLine3: z$1.ZodOptional<z$1.ZodString>;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodString;
} & {
    isActive: z$1.ZodBoolean;
}, z$1.ZodAny, "strip">>;
type CreateClientAddressRequest = z$1.infer<typeof CreateClientAddressSchema>;
declare const UpdateClientAddressSchema: z$1.ZodObject<{
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodOptional<z$1.ZodString>;
    addressLine3: z$1.ZodOptional<z$1.ZodString>;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodString;
} & {
    addressId: z$1.ZodNumber;
    addressTypeId: z$1.ZodNumber;
}, "strip", z$1.ZodAny, z$1.objectOutputType<{
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodOptional<z$1.ZodString>;
    addressLine3: z$1.ZodOptional<z$1.ZodString>;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodString;
} & {
    addressId: z$1.ZodNumber;
    addressTypeId: z$1.ZodNumber;
}, z$1.ZodAny, "strip">, z$1.objectInputType<{
    addressLine1: z$1.ZodString;
    addressLine2: z$1.ZodOptional<z$1.ZodString>;
    addressLine3: z$1.ZodOptional<z$1.ZodString>;
    city: z$1.ZodString;
    stateProvinceId: z$1.ZodNumber;
    countryId: z$1.ZodNumber;
    postalCode: z$1.ZodString;
} & {
    addressId: z$1.ZodNumber;
    addressTypeId: z$1.ZodNumber;
}, z$1.ZodAny, "strip">>;
type UpdateClientAddressRequest = z$1.infer<typeof UpdateClientAddressSchema>;

declare const GetClientAddress: (clientId: number, configuration?: {
    tenantId?: string;
}) => Command<{
    clientId: number;
    configuration?: {
        tenantId?: string;
    };
}, GetClientAddressResponse>;
declare const CreateClientAddress: (clientId: number, type: number, params: CreateClientAddressRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    clientId: number;
    type: number;
    params: CreateClientAddressRequest;
    configuration?: {
        tenantId?: string;
    };
}, CreateClientAddressResponse>;
declare const UpdateClientAddress: (clientId: number, type: number, params: UpdateClientAddressRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    clientId: number;
    type: number;
    params: UpdateClientAddressRequest;
    configuration?: {
        tenantId?: string;
    };
}, UpdateClientAddressResponse>;
declare const SetClientAddressStatus: (clientId: number, type: number, params: {
    addressId: number;
    isActive: boolean;
}, configuration?: {
    tenantId?: string;
}) => Command<{
    clientId: number;
    type: number;
    params: {
        addressId: number;
        isActive: boolean;
    };
    configuration?: {
        tenantId?: string;
    };
}, UpdateClientAddressResponse>;

declare const ClientClassificationResponseSchema: z$1.ZodObject<{
    clientId: z$1.ZodNumber;
    currentClassificationStartDate: z$1.ZodString;
    applicableDate: z$1.ZodString;
    upcomingClassificationRequestId: z$1.ZodNumber;
    currentClassification: z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
        position: z$1.ZodNumber;
        description: z$1.ZodString;
        active: z$1.ZodBoolean;
        mandatory: z$1.ZodBoolean;
        systemDefined: z$1.ZodBoolean;
        codeName: z$1.ZodString;
        isMasked: z$1.ZodBoolean;
        charges: z$1.ZodArray<z$1.ZodObject<{
            chargeId: z$1.ZodNumber;
            numberOfFeeExemptedCharge: z$1.ZodNumber;
            exemptedFeeAmount: z$1.ZodNumber;
            chargeAmount: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }, {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }>, "many">;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    }, {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    }>;
    upcomingClassification: z$1.ZodOptional<z$1.ZodObject<{
        id: z$1.ZodNumber;
        name: z$1.ZodString;
        position: z$1.ZodNumber;
        description: z$1.ZodString;
        active: z$1.ZodBoolean;
        mandatory: z$1.ZodBoolean;
        systemDefined: z$1.ZodBoolean;
        codeName: z$1.ZodString;
        isMasked: z$1.ZodBoolean;
        charges: z$1.ZodArray<z$1.ZodObject<{
            chargeId: z$1.ZodNumber;
            numberOfFeeExemptedCharge: z$1.ZodNumber;
            exemptedFeeAmount: z$1.ZodNumber;
            chargeAmount: z$1.ZodNumber;
        }, "strip", z$1.ZodTypeAny, {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }, {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }>, "many">;
    }, "strip", z$1.ZodTypeAny, {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    }, {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    }>>;
}, "strip", z$1.ZodTypeAny, {
    clientId: number;
    currentClassificationStartDate: string;
    applicableDate: string;
    upcomingClassificationRequestId: number;
    currentClassification: {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    };
    upcomingClassification?: {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    } | undefined;
}, {
    clientId: number;
    currentClassificationStartDate: string;
    applicableDate: string;
    upcomingClassificationRequestId: number;
    currentClassification: {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    };
    upcomingClassification?: {
        name: string;
        id: number;
        active: boolean;
        charges: {
            chargeId: number;
            numberOfFeeExemptedCharge: number;
            exemptedFeeAmount: number;
            chargeAmount: number;
        }[];
        codeName: string;
        description: string;
        position: number;
        isMasked: boolean;
        mandatory: boolean;
        systemDefined: boolean;
    } | undefined;
}>;
type ClientClassificationResponse = z$1.infer<typeof ClientClassificationResponseSchema>;
declare const SwitchClientClassificationRequestSchema: z$1.ZodEffects<z$1.ZodObject<{
    classificationId: z$1.ZodNumber;
    expectedApplicableDate: z$1.ZodString;
    dateFormat: z$1.ZodString;
    locale: z$1.ZodOptional<z$1.ZodString>;
}, "strip", z$1.ZodTypeAny, {
    dateFormat: string;
    classificationId: number;
    expectedApplicableDate: string;
    locale?: string | undefined;
}, {
    dateFormat: string;
    classificationId: number;
    expectedApplicableDate: string;
    locale?: string | undefined;
}>, {
    dateFormat: string;
    classificationId: number;
    expectedApplicableDate: string;
    locale?: string | undefined;
}, {
    dateFormat: string;
    classificationId: number;
    expectedApplicableDate: string;
    locale?: string | undefined;
}>;
declare const SwitchClientClassificationResponseSchema: z$1.ZodObject<{
    id: z$1.ZodNumber;
    clientId: z$1.ZodNumber;
    resourceId: z$1.ZodNumber;
    data: z$1.ZodObject<{
        oldClassificationId: z$1.ZodNumber;
        newClassificationId: z$1.ZodNumber;
    }, "strip", z$1.ZodTypeAny, {
        oldClassificationId: number;
        newClassificationId: number;
    }, {
        oldClassificationId: number;
        newClassificationId: number;
    }>;
}, "strip", z$1.ZodTypeAny, {
    id: number;
    clientId: number;
    resourceId: number;
    data: {
        oldClassificationId: number;
        newClassificationId: number;
    };
}, {
    id: number;
    clientId: number;
    resourceId: number;
    data: {
        oldClassificationId: number;
        newClassificationId: number;
    };
}>;
type SwitchClientClassificationRequest = z$1.infer<typeof SwitchClientClassificationRequestSchema>;
type SwitchClientClassificationResponse = z$1.infer<typeof SwitchClientClassificationResponseSchema>;

/**
 * Retrieves the classification for a client.
 * @param clientId The id of the client to retrieve the classification for.
 * @param configuration The configuration object containing the tenant id.
 * @returns A promise that resolves to the classification for the given client.
 */
declare const GetClientClassification: (clientId: number, configuration?: {
    tenantId: string;
}) => Command<{
    clientId: number;
    configuration?: {
        tenantId: string;
    };
}, ClientClassificationResponse>;
/**
 * Switches the client classification for the given client id.
 * @param clientId the id of the client to switch the classification for
 * @param configuration the configuration object containing the tenant id
 * @returns a promise that resolves to the response from the server
 */
declare const SwitchClientClassification: (clientId: number, params: SwitchClientClassificationRequest, configuration?: {
    tenantId: string;
}) => Command<{
    clientId: number;
    params: SwitchClientClassificationRequest;
    configuration?: {
        tenantId: string;
    };
}, SwitchClientClassificationResponse>;

/**
 * Retrieves all global configurations for the banking system.
 *
 * This API returns all configuration settings including their names, enabled status,
 * IDs, trap door settings, and value data types. These configurations control various
 * aspects of the banking platform's behavior.
 *
 * @param configuration - Configuration parameters
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns all global configurations
 *
 * @example
 * ```typescript
 * const getConfigsCmd = GetConfigurations({ tenantId: "z01j3e71zd6zkq90" });
 * const result = await getConfigsCmd.execute(config);
 *
 * // Access the configurations array
 * result.globalConfiguration.forEach(config => {
 *   console.log(`${config.name}: ${config.enabled ? 'enabled' : 'disabled'}`);
 * });
 * ```
 *
 * @see {@link https://apidocs.cloud.mbanq.com/reference/get_v1-configurations} API Documentation
 */
declare const GetConfigurations: (configuration?: {
    tenantId?: string;
}) => Command<{
    tenantId?: string;
}, GetConfigurationsResponse>;
/**
 * Retrieves a specific global configuration by its name.
 *
 * This API returns the configuration details for a specific global configuration
 * identified by its name, including its value, description, trap door setting,
 * and value data type.
 *
 * @param configName - The name of the configuration to retrieve
 * @param configuration - Configuration parameters
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the specific configuration details
 *
 * @example
 * ```typescript
 * const getConfigCmd = GetConfigurationByName(
 *   'virtual-card-reordering-limit',
 *   { tenantId: "z01j3e71zd6zkq90" }
 * );
 * const result = await getConfigCmd.execute(config);
 *
 * console.log(`Value: ${result.value}`);
 * console.log(`Description: ${result.description}`);
 * console.log(`Data Type: ${result.valueDataType}`);
 * ```
 *
 * @see {@link https://apidocs.cloud.mbanq.com/reference/get_v1-configurations-name-configname} API Documentation
 */
declare const GetConfigurationByName: (configName: string, configuration?: {
    tenantId?: string;
}) => Command<{
    configName: string;
    configuration?: {
        tenantId?: string;
    };
}, GetConfigurationByNameResponse>;
/**
 * Enables or disables a specific global configuration.
 *
 * This API allows you to enable or disable a configuration by its ID.
 * The configuration's enabled status will be updated according to the provided value.
 *
 * @param configId - The ID of the configuration to update
 * @param requestData - The update parameters
 * @param requestData.enabled - Whether the configuration should be enabled (true) or disabled (false)
 * @param configuration - Configuration parameters
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the update confirmation
 *
 * @example
 * ```typescript
 * // Enable a configuration
 * const enableCmd = EnableDisableConfiguration(
 *   33,
 *   { enabled: true },
 *   { tenantId: "z01j3e71zd6zkq90" }
 * );
 * const result = await enableCmd.execute(config);
 * console.log(`Configuration ${result.resourceId} updated`);
 *
 * // Disable a configuration
 * const disableCmd = EnableDisableConfiguration(
 *   33,
 *   { enabled: false },
 *   { tenantId: "z01j3e71zd6zkq90" }
 * );
 * await disableCmd.execute(config);
 * ```
 *
 * @see {@link https://apidocs.cloud.mbanq.com/reference/enabledisableconfiguration} API Documentation
 */
declare const EnableDisableConfiguration: (configId: number, requestData: UpdateConfigurationRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    configId: number;
    requestData: UpdateConfigurationRequest;
    configuration?: {
        tenantId?: string;
    };
}, UpdateConfigurationResponse>;

/**
 * Retrieves pending transactions for a specific savings account.
 *
 * Use this API to retrieve the pending transactions of an account, including pending
 * card authorizations and ACH transactions.
 *
 * Pending transactions are those that have not been completed yet. For example, a
 * transaction under AML (Anti-Money Laundering) screening is considered a pending transaction.
 *
 * @param savingsId - The ID of the savings account
 * @param params - Optional query parameters for pagination and sorting
 * @param params.offset - Indicates the result from which pagination starts. Defaults to 0
 * @param params.limit - Restricts the size of results returned. Defaults to 200
 * @param params.orderBy - In which property order data will be fetched. Defaults to "createdAt"
 * @param params.sortOrder - Specifies the sorting order. Possible values: ASC, DESC. Defaults to "DESC"
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the pending transactions response
 *
 * @example
 * ```typescript
 * const getPendingCmd = GetPendingTransactions(
 *   123,
 *   { offset: 0, limit: 200, orderBy: "createdAt", sortOrder: "DESC" },
 *   { tenantId: "tokoro" }
 * );
 * const result = await getPendingCmd.execute(config);
 * console.log(result.totalFilteredRecords);
 * console.log(result.pageItems[0].transfer.status); // "AML_SCREENING"
 * ```
 */
declare const GetPendingTransactions: (savingsId: number, params?: GetPendingTransactionsRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    savingsId: number;
    params?: GetPendingTransactionsRequest;
    configuration?: {
        tenantId?: string;
    };
}, GetPendingTransactionsResponse>;
/**
 * Retrieves completed transactions for a specific savings account.
 *
 * Use this API to retrieve completed transactions of an account, excluding pending
 * transactions. Completed transactions include those successfully processed, such as
 * an incoming return credited to the account or an outgoing ACH transaction sent to the bank.
 *
 * Additional filters can be applied to narrow down results. Refer to the Query Params
 * section for more details.
 *
 * @param savingsAccountId - The ID associated to the account
 * @param params - Optional query parameters for filtering, pagination and sorting
 * @param params.offset - Indicates the result from which pagination starts. Defaults to 0
 * @param params.limit - Restricts the size of results returned. Defaults to 200
 * @param params.showEnrichedTransactions - Indicates whether to display enriched transaction details in the response. Defaults to true
 * @param params.subTransactionType - Transaction Sub Type can be used as a filter to retrieve the transactions
 * @param params.statusType - The status of transactions (e.g., PROCESSED, PROCESSING, REJECTED)
 * @param params.transactionType - Filter can be based on the transaction type
 * @param params.startDate - Use this to retrieve transactions from the start date (format: dd MMM yyyy)
 * @param params.endDate - Retrieve the transaction until the end Date (format: dd MMM yyyy)
 * @param params.reference - Filter based on the reference provided at the time of the transaction
 * @param params.paymentType - Different payment type we do like ACH, INTERNAL, CASH etc.
 * @param params.fromAmount - Use this to retrieve Transactions which are greater than the fromAmount
 * @param params.toAmount - Type amount range till
 * @param params.isCardTransaction - Type amount range till
 * @param params.showInterestAccruals - Do you want to display the accruals transactions
 * @param params.orderBy - The list is sorted by the indicated field. Defaults to "id"
 * @param params.sortOrder - Specifies the sorting order. Possible values: ASC, DESC
 * @param params.getCardData - Do you want to get Card data. Defaults to false
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 *
 * @returns A Command that when executed returns the completed transactions response
 *
 * @example
 * ```typescript
 * const getCompletedCmd = GetCompletedTransactions(
 *   123,
 *   {
 *     offset: 0,
 *     limit: 15,
 *     showEnrichedTransactions: true,
 *     orderBy: "id",
 *     sortOrder: "DESC"
 *   },
 *   { tenantId: "tokoro" }
 * );
 * const result = await getCompletedCmd.execute(config);
 * console.log(result.totalFilteredRecords);
 * console.log(result.pageItems[0].transactionType.code);
 * ```
 */
declare const GetCompletedTransactions: (savingsAccountId: number, params?: GetCompletedTransactionsRequest, configuration?: {
    tenantId?: string;
}) => Command<{
    savingsAccountId: number;
    params?: GetCompletedTransactionsRequest;
    configuration?: {
        tenantId?: string;
    };
}, GetCompletedTransactionsResponse>;

export { UpdateSelfServiceUser as $, ApproveRejectClientDocument as A, BlockAccount as B, CreatePayment as C, DeletePayment as D, GetAccountDocumentsDetails as E, MarkAsReturned as F, GetPayment as G, HoldAmount as H, MarkAsFail as I, MarkAsProcessing as J, LogFailTransfer as K, ListClientDocument as L, MarkAsSuccess as M, GetTransfers as N, UpdateTraceNumber as O, CreateTransfer as P, GetTransfer as Q, GetRecipient as R, SendAuthorizationToCore as S, CreateRecipient as T, UpdatePayment as U, VerifyWithActivateClients as V, DeleteRecipient as W, GetRecipients as X, GraphQL as Y, GetUserDetail as Z, EnableSelfServiceAccess as _, GetPayments as a, AccountDetailsDataSchema as a$, DeleteSelfServiceUser as a0, ListCardProduct as a1, GetCardProduct as a2, CreateCardProduct as a3, UpdateCardProduct as a4, GetClientAddress as a5, CreateClientAddress as a6, UpdateClientAddress as a7, SetClientAddressStatus as a8, SwitchClientClassification as a9, CreatePaymentInputSchema as aA, UpdatePaymentInputSchema as aB, PaymentResponseSchema as aC, PaymentShape as aD, CreatePaymentInputShape as aE, UpdatePaymentInputShape as aF, SavingAccountSchema as aG, SavingAccountShape as aH, type SavingAccount as aI, ListAccountsOfClientResponseShape as aJ, ListAccountsOfClientResponseSchema as aK, ListAccountsRequestShape as aL, ListAccountsRequestSchema as aM, type UpdateAccountRequest as aN, UpdateAccountRequestSchema as aO, UpdateAccountRequestShape as aP, type UserDetail as aQ, UserDetailSchema as aR, UserDetailShape as aS, RecipientSchema as aT, CreateRecipientRequestSchema as aU, RecipientRequestSchema as aV, RecipientFilterKeySchema as aW, RecipientShape as aX, CreateRecipientRequestShape as aY, RecipientRequestShape as aZ, BankInformationSchema as a_, GetClientClassification as aa, GetConfigurations as ab, GetConfigurationByName as ac, EnableDisableConfiguration as ad, GetPendingTransactions as ae, GetCompletedTransactions as af, type Payment as ag, type CreatePaymentInput as ah, type UpdatePaymentInput as ai, type PaymentResponse as aj, type Transfer as ak, type GetTransferInput as al, type CreateTransferInput as am, type TransferResponse as an, type MarkAsReturnInput as ao, type UpdateTraceNumbersInput as ap, type ProcessOutput$1 as aq, type PaymentRail as ar, type Recipient as as, type CreateRecipientRequest as at, type RecipientRequest as au, type RecipientFilterKey as av, PaymentStatusSchema as aw, PaymentRailSchema as ax, PaymentTypeSchema as ay, SortOrderSchema as az, UpdateCardID as b, AddressSchema as b0, RecipientsSchema as b1, TransferSchema as b2, CreateTransferInputSchema as b3, GetTransferInputSchema as b4, MarkAsReturnInputSchema as b5, UpdateTraceNumbersInputSchema as b6, ProcessOutputSchema$1 as b7, TransferResponseSchema as b8, CreateTransferOutputSchema as b9, PaymentRailSchema$1 as ba, PaymentTypeSchema$1 as bb, AccountTypeSchema as bc, TransferShape as bd, CreateTransferInputShape as be, GetTransferInputShape as bf, MarkAsReturnInputShape as bg, UpdateTraceNumbersInputShape as bh, ProcessOutputShape as bi, TransferResponseShape as bj, CreateTransferOutputShape as bk, ClientSchema as bl, AgentSchema as bm, PartySchema as bn, type UpdateRecipientRequest as bo, GetPermittedDocumentTypes as c, CreateClientIdentifier as d, UpdateClientIdentifier as e, UploadClientIdentifierDocument as f, DeleteClientDocument as g, GetClient as h, UpdateClient as i, CreateClient as j, GetClients as k, DeleteClient as l, GetStatusOfVerifyClient as m, GetAccount as n, GetAccountsOfClient as o, UpdateAccount as p, DeleteAccount as q, CreateAndActivateAccount as r, CloseAccount as s, ScheduleAccountClosure as t, CreateAccountProduct as u, UpdateAccountProduct as v, GetAllAccountProducts as w, GetAccountProductById as x, GenerateAccountStatement as y, DownloadAccountStatement as z };
