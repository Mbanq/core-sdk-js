import {
  GetPendingTransactionsRequest,
  GetPendingTransactionsResponse,
  GetCompletedTransactionsRequest,
  GetCompletedTransactionsResponse,
  GetRecentTransactionsRequest,
  GetRecentTransactionsResponse
} from '../../types/transaction';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

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
 *
 * @returns A Command that when executed returns the pending transactions response
 *
 * @example
 * ```typescript
 * const getPendingCmd = GetPendingTransactions(
 *   123,
 *   { offset: 0, limit: 200, orderBy: "createdAt", sortOrder: "DESC" }
 * );
 * const result = await getPendingCmd.execute(config);
 * console.log(result.totalFilteredRecords);
 * console.log(result.pageItems[0].transfer.status); // "AML_SCREENING"
 * ```
 */
export const GetPendingTransactions = (
  savingsId: number,
  params?: GetPendingTransactionsRequest
): Command<
  { savingsId: number; params?: GetPendingTransactionsRequest },
  GetPendingTransactionsResponse
> => {
  return {
    input: { savingsId, params },
    metadata: {
      commandName: 'GetPendingTransactions',
      path: `/v1/savingsaccounts/${savingsId}/pendingTransaction`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetPendingTransactionsResponse>(
          `/v1/savingsaccounts/${savingsId}/pendingTransaction`,
          { params }
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

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
 *
 * @returns A Command that when executed returns the completed transactions response
 *
 * @example
 * ```typescript
 * const getCompletedCmd = GetCompletedTransactions(
 *   123,
 *   {
 *     offset: 0,
 *     limit: 200,
 *     orderBy: "createdAt",
 *     sortOrder: "DESC",
 *     subTransactionType: "DEPOSIT"
 *   }
 * );
 * const result = await getCompletedCmd.execute(config);
 * console.log(result.totalFilteredRecords);
 * console.log(result.pageItems[0].transfer.status); // "COMPLETED"
 * ```
 */
export const GetCompletedTransactions = (
  savingsId: number,
  params?: GetCompletedTransactionsRequest
): Command<
  { savingsId: number; params?: GetCompletedTransactionsRequest },
  GetCompletedTransactionsResponse
> => {
  return {
    input: { savingsId, params },
    metadata: {
      commandName: 'GetCompletedTransactions',
      path: `/v1/savingsaccounts/${savingsId}/transactions`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetCompletedTransactionsResponse>(
          `/v1/savingsaccounts/${savingsId}/transactions`,
          { params }
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

/**
 * Retrieves recent transactions for a specific savings account.
 *
 * Use this API to retrieve the recent transactions with their status, including Completed,
 * Pending, and Rejected. This unified endpoint returns transactions with card-related
 * information when applicable.
 *
 * Pass the account ID to get the transaction details.
 *
 * Retrieves a list of recent transactions with their status, including Completed,
 * Pending, and Rejected.
 *
 * @param savingsId - The ID associated with the account (Example: 101)
 * @param params - Optional query parameters for filtering, pagination and sorting
 * @param params.offset - Indicates the result from which pagination starts. Defaults to 0. Example: 0
 * @param params.limit - Restricts the size of results returned. Defaults to 50. To override the default and return all entries you must explicitly pass a non-positive integer value for limit e.g. limit=0, or limit=-1. Example: 20
 * @param params.orderBy - Specifies the data to order the results by. Defaults to createdAt. Available options: transactionDate, submittedOnDate, bookingDate, transactionAmount, createdAt
 * @param params.sortOrder - Specifies the sort direction for the results. Defaults to DESC (descending). Available options: ASC (Ascending order - oldest/smallest first), DESC (Descending order - newest/largest first)
 * @param params.type - Filter transactions by type. Multiple values can be provided. Example: type=AUTHORIZED_TX&type=SAVINGS_TX
 * @param params.transactionType - Filter by specific transaction types. Multiple values can be provided. Example: transactionType=DEPOSIT&transactionType=WITHDRAWAL
 * @param params.subTransactionType - Filter by sub-transaction types. Multiple values can be provided. Example: subTransactionType=CARD_TRANSACTION&subTransactionType=ACH
 * @param params.cardId - Filter transactions by card ID. Multiple card IDs can be provided. Example: cardId=12345&cardId=45678
 * @param params.status - Filter transactions by status. Multiple values can be provided. Example: status=PROCESSED&status=PROCESSING
 * @param params.startDate - Filter transactions from this date onwards (inclusive). Format: ISO-8601 date (YYYY-MM-DD). Example: 2024-01-01
 * @param params.endDate - Filter transactions up to this date (inclusive). Format: ISO-8601 date (YYYY-MM-DD). Example: 2024-12-31
 * @param params.reference - Filter based on the reference provided at the time of the transaction. Example: TXN-2024-001234
 *
 * @returns A Command that when executed returns the recent transactions response
 *
 * @example
 * ```typescript
 * const getRecentCmd = GetRecentTransactions(
 *   101,
 *   {
 *     offset: 0,
 *     limit: 50,
 *     orderBy: "createdAt",
 *     sortOrder: "DESC",
 *     type: ["SAVINGS_TX"],
 *     status: ["PROCESSED"]
 *   }
 * );
 * const result = await getRecentCmd.execute(config);
 * console.log(result.totalFilteredRecords);
 * console.log(result.pageItems[0].transactionAmount);
 * console.log(result.pageItems[0].cardNumber); // "****1234" if card transaction
 * ```
 */
export const GetRecentTransactions = (
  savingsId: number,
  params?: GetRecentTransactionsRequest
): Command<
  { savingsId: number; params?: GetRecentTransactionsRequest },
  GetRecentTransactionsResponse
> => {
  return {
    input: { savingsId, params },
    metadata: {
      commandName: 'GetRecentTransactions',
      path: `/v1/savingsaccounts/${savingsId}/unifiedtransactions`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetRecentTransactionsResponse>(
          `/v1/savingsaccounts/${savingsId}/unifiedtransactions`,
          { params }
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
