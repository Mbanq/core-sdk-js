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
  BlockAccountResponse
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
