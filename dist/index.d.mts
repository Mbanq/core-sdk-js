export { createClient } from './client/index.mjs';
export { C as CreateTransfer, l as CreateTransferInput, m as CreateTransferOutput, f as GetClientData, d as GetTransfer, j as GetTransferInput, G as GetTransfers, i as GraphQL, L as LogFailTransfer, M as MarkAsFail, a as MarkAsProcessing, k as MarkAsReturnInput, b as MarkAsReturned, c as MarkAsSuccess, P as ProcessOutput, S as SendAuthorizationToCore, T as Transfer, e as UpdateCardID, g as UpdateClient, h as UpdateClientIdentifier, U as UpdateTraceNumber } from './index-CR5y5AHj.mjs';
import { M as Middleware } from './config.d-NcOIimSJ.mjs';
export { a as Command, C as Config } from './config.d-NcOIimSJ.mjs';
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

declare const isCommandError: (error: unknown) => error is ApiError;

export { type Logger, type MetricsClient, Middleware, createLoggingMiddleware, createMetricsMiddleware, isCommandError };
