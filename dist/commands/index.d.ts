import { P as ProcessOutput } from '../index-B5WvpVzR.js';
export { C as CreateTransfer, f as GetClientData, d as GetTransfer, G as GetTransfers, i as GraphQL, L as LogFailTransfer, M as MarkAsFail, a as MarkAsProcessing, b as MarkAsReturned, c as MarkAsSuccess, S as SendAuthorizationToCore, e as UpdateCardID, g as UpdateClient, h as UpdateClientIdentifier, U as UpdateTraceNumber } from '../index-B5WvpVzR.js';
import { a as Command } from '../config.d-NcOIimSJ.js';
import 'graphql';
import 'axios';

interface CustomUpdateInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  updates: object;
  params?: Record<string, any>;
}

interface CustomCreateInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  data: object;
  params?: Record<string, any>;
}

interface CustomGetInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  params?: Record<string, any>;
}

declare const CustomUpdate: (params: CustomUpdateInput) => Command<CustomUpdateInput, ProcessOutput>;
declare const CustomCreate: (params: CustomCreateInput) => Command<CustomCreateInput, ProcessOutput>;
declare const CustomGet: (params: CustomGetInput) => Command<CustomGetInput, any>;

export { CustomCreate, CustomGet, CustomUpdate };
