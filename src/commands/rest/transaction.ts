import {
    GetPendingTransactionsRequest,
    GetPendingTransactionsResponse
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
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 * 
 * @returns A Command that when executed returns the pending transactions response
 * 
 * @example
 * ```typescript
 * const getPendingCmd = GetPendingTransactions(
 *   123,
 *   { offset: 0, limit: 200, orderBy: "createdAt", sortOrder: "DESC" },
 *   { tenantId: "tokoro" }
 * );
 * const result = await getPendingCmd.execute(config);
 * console.log(result.totalFilteredRecords);
 * console.log(result.pageItems[0].transfer.status); // "AML_SCREENING"
 * ```
 */
export const GetPendingTransactions = (
    savingsId: number,
    params?: GetPendingTransactionsRequest,
    configuration?: { tenantId?: string }
): Command<
    { savingsId: number; params?: GetPendingTransactionsRequest; configuration?: { tenantId?: string } },
    GetPendingTransactionsResponse
> => {
    return {
        input: { savingsId, params, configuration },
        metadata: {
            commandName: 'GetPendingTransactions',
            path: `/v1/savingsaccounts/${savingsId}/pendingTransaction`,
            method: 'GET'
        },
        execute: async (config: Config) => {
            if (configuration?.tenantId) {
                config.tenantId = configuration.tenantId;
            }
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
