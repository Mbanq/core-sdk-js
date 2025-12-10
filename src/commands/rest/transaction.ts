import {
  GetPendingTransactionsRequest,
  GetPendingTransactionsResponse,
  GetCompletedTransactionsRequest,
  GetCompletedTransactionsResponse
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
