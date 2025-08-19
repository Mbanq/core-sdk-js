import { C as CreatePaymentInput, P as Payment, U as UpdatePaymentInput } from './index-Dyfp_UmI.mjs';
export { j as CreatePaymentInputZod, g as PaymentFilterKeyZod, d as PaymentRailType, h as PaymentRailZod, a as PaymentResponse, l as PaymentResponseZod, b as PaymentStatus, f as PaymentStatusZod, e as PaymentType, i as PaymentTypeZod, S as SortOrderZod, k as UpdatePaymentInputZod, c as createClient } from './index-Dyfp_UmI.mjs';
import { M as Middleware, C as Command } from './config.d-CyK6ZM6s.mjs';
export { a as Config } from './config.d-CyK6ZM6s.mjs';
export { G as GetClientData, c as GraphQL, S as SendAuthorizationToCore, U as UpdateCardID, a as UpdateClient, b as UpdateClientIdentifier } from './index-5Sj83ZJ4.mjs';
import 'zod';
import 'graphql';
import 'axios';

interface MetricsClient {
    incrementCounter: (counterName: string) => void;
    recordError?: (error: Error) => void;
}
declare const createMetricsMiddleware: (metricsClient: MetricsClient) => Middleware;

interface Logger {
    info: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
    warn?: (message: string, ...args: unknown[]) => void;
    log?: (message: string, ...args: unknown[]) => void;
}
declare const createLoggingMiddleware: (logger?: Logger) => Middleware;

declare const CreatePayment: (params: {
    payment: CreatePaymentInput;
    tenantId?: string;
}) => Command<{
    payment: CreatePaymentInput;
    tenantId?: string;
}, Payment>;
declare const GetPayment: (params: {
    id: string;
    tenantId?: string;
}) => Command<{
    id: string;
    tenantId?: string;
}, Payment>;
declare const UpdatePayment: (params: {
    id: string;
    payment: UpdatePaymentInput;
    tenantId?: string;
}) => Command<{
    id: string;
    payment: UpdatePaymentInput;
    tenantId?: string;
}, Payment>;
declare const GetPayments: (params?: {
    tenantId?: string;
}) => {
    list: () => {
        where: (field: string) => {
            eq: (value: any) => /*elided*/ any;
        };
        limit: (value: number) => /*elided*/ any;
        offset: (value: number) => /*elided*/ any;
        execute: () => Command<any, Array<Payment>>;
    };
};

interface ApiError {
  name: string;
  message: string;
  statusCode?: number;
  code?: string;
  requestId?: string;
  originalError?: Error;
}

declare const isCommandError: (error: unknown) => error is ApiError;

export { Command, CreatePayment, CreatePaymentInput, GetPayment, GetPayments, type Logger, type MetricsClient, Middleware, Payment, UpdatePayment, UpdatePaymentInput, createLoggingMiddleware, createMetricsMiddleware, isCommandError };
