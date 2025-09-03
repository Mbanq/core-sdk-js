export { createClient } from './client/index.mjs';
export { f as CreateClient, C as CreatePayment, k as DeleteAccount, D as DeleteClient, h as GetAccount, i as GetAccountsOfClient, c as GetClient, g as GetClients, G as GetPayment, a as GetPayments, l as GraphQL, L as ListAccountsOfClient, S as SendAuthorizationToCore, j as UpdateAccount, b as UpdateCardID, d as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment } from './index-Dxa-lc7x.mjs';
import { M as Middleware } from './client-BUCNGFJy.mjs';
export { a as Command, C as Config, b as CreatePaymentInput, r as CreatePaymentInputShape, l as CreatePaymentInputZod, L as ListAccountsOfClientResponseShape, w as ListAccountsOfClientResponseZod, x as ListAccountsRequestShape, y as ListAccountsRequestZod, P as Payment, i as PaymentFilterKeyZod, p as PaymentFilterShape, g as PaymentFilters, o as PaymentFiltersZod, e as PaymentRailType, j as PaymentRailZod, c as PaymentResponse, n as PaymentResponseZod, q as PaymentShape, d as PaymentStatus, h as PaymentStatusZod, f as PaymentType, k as PaymentTypeZod, v as SavingAccount, u as SavingAccountShape, t as SavingAccountZod, S as SortOrderZod, z as UpdateAccountRequest, B as UpdateAccountRequestShape, A as UpdateAccountRequestZod, U as UpdatePaymentInput, s as UpdatePaymentInputShape, m as UpdatePaymentInputZod } from './client-BUCNGFJy.mjs';
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

interface ApiError {
  name: string;
  message: string;
  statusCode?: number;
  code?: string;
  requestId?: string;
  originalError?: Error;
}

declare const createCommandError: ({ message, statusCode, code, requestId, originalError }: Omit<ApiError, "name">) => ApiError;
declare const isCommandError: (error: unknown) => error is ApiError;

export { type ApiError, type Logger, type MetricsClient, Middleware, createCommandError, createLoggingMiddleware, createMetricsMiddleware, isCommandError };
