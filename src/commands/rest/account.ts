import { ProcessOutput } from '../../types';
import {
  ListAccountsOfClientRequest,
  SavingAccount,
  UpdateAccountRequest,
  CreateAndActivateAccountRequest,
  CreateAndActivateAccountResponse,
  CloseAccountRequest,
  CloseAccountResponse,
  BlockAccountRequest,
  BlockAccountResponse,
  HoldAmountRequest,
  HoldAmountResponse,
  GenerateAccountStatementRequest,
  GenerateAccountStatementResponse,
  DownloadAccountStatementResponse
} from '../../types/account';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

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
export const GetAccount = (accountId: number, configuration?: { tenantId?: string }): Command<{ accountId: number, configuration?: { tenantId?: string } }, SavingAccount> => {
  return {
    input: { accountId, configuration },
    metadata: {
      commandName: 'GetAccount',
      path: `/v1/savingsaccounts/${accountId}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<SavingAccount>(`/v1/savingsaccounts/${accountId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

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
export const UpdateAccount = (
  accountId: number,
  requestData: UpdateAccountRequest,
  configuration?: { tenantId?: string }
): Command<{ accountId: number, requestData: UpdateAccountRequest, configuration?: { tenantId?: string } }, any> => {
  return {
    input: { accountId, requestData, configuration },
    metadata: {
      commandName: 'UpdateAccount',
      path: `/v1/savingsaccounts/${accountId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put(`/v1/savingsaccounts/${accountId}`, requestData);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

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
export const DeleteAccount = (accountId: number, configuration?: { tenantId?: string }): Command<{ accountId: number, configuration?: { tenantId?: string } }, ProcessOutput> => {
  return {
    input: { accountId, configuration },
    metadata: {
      commandName: 'DeleteAccount',
      path: `/v1/savingsaccounts/${accountId}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete(`/v1/savingsaccounts/${accountId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};


export const GetAccountsOfClient = (clientId: number, params: ListAccountsOfClientRequest, configuration: { tenantId?: string }): Command<{ clientId: number, params: ListAccountsOfClientRequest, configuration: { tenantId?: string } }, ListAccountsOfClientRequest> => {
  return {
    input: { clientId, params, configuration },
    metadata: {
      commandName: 'ListAccountsOfClient',
      path: `/v1/clients/${clientId}/accounts`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<ListAccountsOfClientRequest>(`/v1/clients/${clientId}/accounts`, { params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

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
export const CreateAndActivateAccount = (
  params: CreateAndActivateAccountRequest,
  configuration?: { tenantId?: string }
): Command<{ params: CreateAndActivateAccountRequest, configuration?: { tenantId?: string } }, CreateAndActivateAccountResponse> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'CreateAndActivateAccount',
      path: '/v1/savingsaccounts',
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CreateAndActivateAccountResponse>(
          '/v1/savingsaccounts?command=submit,approve,activate',
          params
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

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
export const CloseAccount = (
  savingsAccountId: number,
  requestData: CloseAccountRequest,
  configuration?: { tenantId?: string }
): Command<{ savingsAccountId: number, requestData: CloseAccountRequest, configuration?: { tenantId?: string } }, CloseAccountResponse> => {
  return {
    input: { savingsAccountId, requestData, configuration },
    metadata: {
      commandName: 'CloseAccount',
      path: `/v1/savingsaccounts/${savingsAccountId}?command=close`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CloseAccountResponse>(
          `/v1/savingsaccounts/${savingsAccountId}?command=close`,
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
export const ScheduleAccountClosure = (
  accountId: number,
  requestData: CloseAccountRequest,
  configuration?: { tenantId?: string }
): Command<{ accountId: number, requestData: CloseAccountRequest, configuration?: { tenantId?: string } }, CloseAccountResponse> => {
  return {
    input: { accountId, requestData, configuration },
    metadata: {
      commandName: 'ScheduleAccountClosure',
      path: `/v1/savingsaccounts/${accountId}?command=SCHEDULECLOSE`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CloseAccountResponse>(
          `/v1/savingsaccounts/${accountId}?command=SCHEDULECLOSE`,
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
export const BlockAccount = (
  accountId: number,
  requestData: BlockAccountRequest,
  configuration?: { tenantId?: string }
): Command<{ accountId: number, requestData: BlockAccountRequest, configuration?: { tenantId?: string } }, BlockAccountResponse> => {
  return {
    input: { accountId, requestData, configuration },
    metadata: {
      commandName: 'BlockAccount',
      path: `/v1/savingsaccounts/${accountId}?command=block`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<BlockAccountResponse>(
          `/v1/savingsaccounts/${accountId}?command=block`,
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
export const HoldAmount = (
  accountId: number,
  requestData: HoldAmountRequest,
  configuration?: { tenantId?: string }
): Command<{ accountId: number, requestData: HoldAmountRequest, configuration?: { tenantId?: string } }, HoldAmountResponse> => {
  return {
    input: { accountId, requestData, configuration },
    metadata: {
      commandName: 'HoldAmount',
      path: `/v1/savingsaccounts/${accountId}?command=hold`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<HoldAmountResponse>(
          `/v1/savingsaccounts/${accountId}?command=hold`,
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
export const GenerateAccountStatement = (
  requestData: GenerateAccountStatementRequest,
  configuration?: { tenantId?: string }
): Command<{ requestData: GenerateAccountStatementRequest, configuration?: { tenantId?: string } }, GenerateAccountStatementResponse> => {
  return {
    input: { requestData, configuration },
    metadata: {
      commandName: 'GenerateAccountStatement',
      path: '/v1/generatestatements',
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
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
export const DownloadAccountStatement = (
  savingsAccountId: number,
  documentId: string,
  configuration?: { tenantId?: string }
): Command<{ savingsAccountId: number, documentId: string, configuration?: { tenantId?: string } }, DownloadAccountStatementResponse> => {
  return {
    input: { savingsAccountId, documentId, configuration },
    metadata: {
      commandName: 'DownloadAccountStatement',
      path: `/v1/savings/${savingsAccountId}/documents/${documentId}/attachment`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
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
