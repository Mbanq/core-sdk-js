import { z } from 'zod';

export const GenerateAccountStatementRequestShape = {
  reportName: z.string(),
  parentEntityType: z.string(),
  parentEntityId: z.number(),
  reportType: z.enum(['PDF', 'CSV', 'EXCELL', 'EXCELL 2007']),
  docType: z.string(),
  params: z.object({
    start_date: z.string(),
    end_date: z.string(),
    saving_no: z.string()
  })
};

export const GenerateAccountStatementRequestSchema = z.object(GenerateAccountStatementRequestShape);

export const GenerateAccountStatementResponseShape = {
  jobId: z.number(),
  status: z.string()
};

export const GenerateAccountStatementResponseSchema = z.object(GenerateAccountStatementResponseShape);

export type GenerateAccountStatementRequest = z.infer<typeof GenerateAccountStatementRequestSchema>;
export type GenerateAccountStatementResponse = z.infer<typeof GenerateAccountStatementResponseSchema>;

export const DownloadAccountStatementRequestShape = {
  savingsAccountId: z.number(),
  documentId: z.string()
};

export const DownloadAccountStatementRequestSchema = z.object(DownloadAccountStatementRequestShape);

export const DownloadAccountStatementResponseShape = {
  data: z.instanceof(Blob),
  fileName: z.string().optional(),
  contentType: z.string().optional()
};

export const DownloadAccountStatementResponseSchema = z.object(DownloadAccountStatementResponseShape);

export type DownloadAccountStatementRequest = z.infer<typeof DownloadAccountStatementRequestSchema>;
export type DownloadAccountStatementResponse = z.infer<typeof DownloadAccountStatementResponseSchema>;

export const GetAccountDocumentsDetailsQueryParamsShape = {
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
  name: z.string().optional(),
  type: z.enum(['statement', 'receipt', 'report', 'passport']).optional()
};

export const GetAccountDocumentsDetailsQueryParamsSchema = z.object(GetAccountDocumentsDetailsQueryParamsShape);

export type GetAccountDocumentsDetailsQueryParams = z.infer<typeof GetAccountDocumentsDetailsQueryParamsSchema>;

export const AccountDocumentItemShape = {
  id: z.string(),
  parentEntityType: z.string(),
  parentEntityId: z.number(),
  name: z.string(),
  fileName: z.string(),
  size: z.number(),
  mimeType: z.string(),
  type: z.string(),
  description: z.string(),
  createdAt: z.string()
};

export const AccountDocumentItemSchema = z.object(AccountDocumentItemShape);

export const GetAccountDocumentsDetailsResponseSchema = z.array(AccountDocumentItemSchema);

export type AccountDocumentItem = z.infer<typeof AccountDocumentItemSchema>;
export type GetAccountDocumentsDetailsResponse = z.infer<typeof GetAccountDocumentsDetailsResponseSchema>;
