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
    username: string;
    userId: number;
    accessToken: string;
    authenticated: boolean;
    officeId: number;
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
    username: string;
    userId: number;
    accessToken: string;
    authenticated: boolean;
    officeId: number;
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

declare const GetAccount: (params: {
    id: number;
    tenantId?: string;
}) => Command<{
    id: number;
    tenantId?: string;
}, SavingAccount>;
declare const UpdateAccount: (params: {
    clientId: number;
    accountId: number;
    updates: UpdateAccountRequest;
    tenantId?: string;
}) => Command<{
    clientId: number;
    accountId: number;
    updates: UpdateAccountRequest;
    tenantId?: string;
}, any>;
declare const DeleteAccount: (params: {
    accountId: number;
    tenantId?: string;
}) => Command<{
    accountId: number;
    tenantId?: string;
}, ProcessOutput$1>;
declare const ListAccountsOfClient: (params?: {
    clientId: number;
    tenantId?: string;
}) => {
    list: () => {
        where: (field: string) => {
            eq: (value: any) => /*elided*/ any;
        };
        execute: () => Command<any, ListAccountsOfClientRequest>;
    };
};
declare const GetAccountsOfClient: (clientId: number, params: ListAccountsOfClientRequest, configuration: {
    tenantId?: string;
}) => Command<{
    params: ListAccountsOfClientRequest;
    configuration: {
        tenantId?: string;
    };
}, ListAccountsOfClientRequest>;

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
    emailAddress: string;
    nickName: string;
    firstName: string;
    lastName: string;
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
    emailAddress: string;
    nickName: string;
    firstName: string;
    lastName: string;
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
    emailAddress: string;
    nickName: string;
    firstName: string;
    lastName: string;
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
    emailAddress: string;
    nickName: string;
    firstName: string;
    lastName: string;
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
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
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
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
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
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
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
    emailAddress?: string | undefined;
    nickName?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
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

export { type RecipientRequest as $, CreateRecipient as A, DeleteRecipient as B, CreatePayment as C, DeletePayment as D, GetRecipients as E, GraphQL as F, GetPayment as G, GetUserDetail as H, type CreatePaymentInput as I, type UpdatePaymentInput as J, type PaymentResponse as K, ListClientDocument as L, MarkAsSuccess as M, type GetTransferInput as N, type CreateTransferInput as O, type Payment as P, type TransferResponse as Q, type MarkAsReturnInput as R, SendAuthorizationToCore as S, type Transfer as T, UpdatePayment as U, VerifyWithActivateClients as V, type UpdateTraceNumbersInput as W, type ProcessOutput$1 as X, type PaymentRail as Y, type Recipient as Z, type CreateRecipientRequest as _, GetPayments as a, type RecipientFilterKey as a0, PaymentStatusSchema as a1, PaymentRailSchema as a2, PaymentTypeSchema as a3, SortOrderSchema as a4, CreatePaymentInputSchema as a5, UpdatePaymentInputSchema as a6, PaymentResponseSchema as a7, PaymentShape as a8, CreatePaymentInputShape as a9, CreateTransferInputSchema as aA, GetTransferInputSchema as aB, MarkAsReturnInputSchema as aC, UpdateTraceNumbersInputSchema as aD, ProcessOutputSchema$1 as aE, TransferResponseSchema as aF, CreateTransferOutputSchema as aG, PaymentRailSchema$1 as aH, PaymentTypeSchema$1 as aI, AccountTypeSchema as aJ, TransferShape as aK, CreateTransferInputShape as aL, GetTransferInputShape as aM, MarkAsReturnInputShape as aN, UpdateTraceNumbersInputShape as aO, ProcessOutputShape as aP, TransferResponseShape as aQ, CreateTransferOutputShape as aR, ClientSchema as aS, AgentSchema as aT, PartySchema as aU, type UpdateRecipientRequest as aV, UpdatePaymentInputShape as aa, SavingAccountSchema as ab, SavingAccountShape as ac, type SavingAccount as ad, ListAccountsOfClientResponseShape as ae, ListAccountsOfClientResponseSchema as af, ListAccountsRequestShape as ag, ListAccountsRequestSchema as ah, type UpdateAccountRequest as ai, UpdateAccountRequestSchema as aj, UpdateAccountRequestShape as ak, type UserDetail as al, UserDetailSchema as am, UserDetailShape as an, RecipientSchema as ao, CreateRecipientRequestSchema as ap, RecipientRequestSchema as aq, RecipientFilterKeySchema as ar, RecipientShape as as, CreateRecipientRequestShape as at, RecipientRequestShape as au, BankInformationSchema as av, AccountDetailsDataSchema as aw, AddressSchema as ax, RecipientsSchema as ay, TransferSchema as az, UpdateCardID as b, GetPermittedDocumentTypes as c, CreateClientIdentifier as d, UpdateClientIdentifier as e, UploadClientIdentifierDocument as f, GetClient as g, UpdateClient as h, CreateClient as i, GetClients as j, DeleteClient as k, GetStatusOfVerifyClient as l, GetAccount as m, GetAccountsOfClient as n, ListAccountsOfClient as o, UpdateAccount as p, DeleteAccount as q, MarkAsReturned as r, MarkAsFail as s, MarkAsProcessing as t, LogFailTransfer as u, GetTransfers as v, UpdateTraceNumber as w, CreateTransfer as x, GetTransfer as y, GetRecipient as z };
