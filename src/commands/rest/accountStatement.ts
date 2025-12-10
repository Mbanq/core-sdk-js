import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import {
  GenerateAccountStatementRequest,
  GenerateAccountStatementResponse,
  DownloadAccountStatementResponse,
  GetAccountDocumentsDetailsResponse,
  GetAccountDocumentsDetailsQueryParams
} from '../../types/accountStatement';

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
 *
 * @returns A Command that when executed returns the statement generation job details
 *
 * @example
 * ```typescript
 * const generateCmd = GenerateAccountStatement({
 *   reportName: "Report current and saving account(Pentaho)",
 *   parentEntityType: "savings",
 *   parentEntityId: 1,
 *   reportType: "PDF",
 *   docType: "statement",
 *   params: {
 *     start_date: "01 January 2023",
 *     end_date: "02 January 2023",
 *     saving_no: "1"
 *   }
 * });
 * const result = await generateCmd.execute(config);
 * console.log(result.jobId); // 315
 * ```
 */
export const GenerateAccountStatement = (
  requestData: GenerateAccountStatementRequest
): Command<{ requestData: GenerateAccountStatementRequest }, GenerateAccountStatementResponse> => {
  return {
    input: { requestData },
    metadata: {
      commandName: 'GenerateAccountStatement',
      path: '/v1/generatestatements',
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<GenerateAccountStatementResponse>(
          '/v1/generatestatements',
          requestData
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

/**
 * Downloads a document associated with a specific savings account.
 * This API returns a binary file as a raw byte stream.
 *
 * @param savingsAccountId - The ID of the savings account
 * @param documentId - The UUID of the document to download
 *
 * @returns A Command that when executed returns the document as a Blob with metadata
 *
 * @example
 * ```typescript
 * const downloadCmd = DownloadAccountStatement(
 *   12,
 *   "45ac4379-7185-471b-a103-916d25dc648d"
 * );
 * const result = await downloadCmd.execute(config);
 * // result.data is a Blob containing the file
 * // result.fileName contains the extracted filename (if available)
 * // result.contentType contains the MIME type (if available)
 * ```
 */
export const DownloadAccountStatement = (
  savingsAccountId: number,
  documentId: string
): Command<{ savingsAccountId: number, documentId: string }, DownloadAccountStatementResponse> => {
  return {
    input: { savingsAccountId, documentId },
    metadata: {
      commandName: 'DownloadAccountStatement',
      path: `/v1/savings/${savingsAccountId}/documents/${documentId}/attachment`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get(
          `/v1/savings/${savingsAccountId}/documents/${documentId}/attachment`,
          { responseType: 'blob' }
        );

        // Extract filename from Content-Disposition header if available
        const contentDisposition = response.headers['content-disposition'];
        let fileName: string | undefined;
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+?)"?$/i);
          if (fileNameMatch) {
            fileName = fileNameMatch[1];
          }
        }

        // Extract content type from headers
        const contentType = response.headers['content-type'];

        return {
          data: response.data,
          fileName,
          contentType
        };
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

/**
 * Retrieves the details of all documents linked to a savings account.
 *
 * @param savingsAccountId - The ID of the savings account
 * @param queryParams - Optional query parameters for filtering documents
 * @param queryParams.createdAtFrom - Filter documents created from this date (e.g., "2023-01-01+00:00:00")
 * @param queryParams.createdAtTo - Filter documents created up to this date (e.g., "2023-12-31+23:59:00")
 * @param queryParams.name - Name of the document (e.g., "January 01st - July 17st")
 * @param queryParams.type - Filter documents by type (statement, receipt, report, passport)
 *
 * @returns A Command that when executed returns a list of document details
 *
 * @example
 * ```typescript
 * const getDocsCmd = GetAccountDocumentsDetails(
 *   123,
 *   { type: "statement", createdAtFrom: "2023-01-01+00:00:00" }
 * );
 * const result = await getDocsCmd.execute(config);
 * result.forEach(doc => console.log(doc.name));
 * ```
 */
export const GetAccountDocumentsDetails = (
  savingsAccountId: number,
  queryParams?: GetAccountDocumentsDetailsQueryParams
): Command<{ savingsAccountId: number, queryParams?: GetAccountDocumentsDetailsQueryParams }, GetAccountDocumentsDetailsResponse> => {
  return {
    input: { savingsAccountId, queryParams },
    metadata: {
      commandName: 'GetAccountDocumentsDetails',
      path: `/v1/savings/${savingsAccountId}/documents`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetAccountDocumentsDetailsResponse>(
          `/v1/savings/${savingsAccountId}/documents`,
          { params: queryParams }
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
