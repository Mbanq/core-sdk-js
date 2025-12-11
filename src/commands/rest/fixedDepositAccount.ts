import { CreateFixedDepositAccountRequest, CreateFixedDepositAccountResponse, FixedDepositAccount, UpdateFixedDepositAccountRequest, UpdateFixedDepositAccountResponse, DeleteFixedDepositAccountResponse } from '../../types/fixedDepositAccount';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

/**
 * Creates a new Fixed Deposit Account for a customer and immediately activates it.
 * This combines the submit, approve, and activate commands in a single operation.
 *
 * @param params - The fixed deposit account creation parameters (see CreateFixedDepositAccountRequest)
 * @param params.productId - The ID of the fixed deposit product to use for the account
 * @param params.clientId - The unique identifier of the client opening the fixed deposit account
 * @param params.depositAmount - The amount to be deposited in the fixed deposit account
 * @param params.depositPeriod - The period for the deposit in terms of the frequency type
 * @param params.depositPeriodFrequencyId - The frequency type for the deposit period (e.g., Months, Years)
 * @param params.isConsent - Indicates whether the client has given consent for the fixed deposit
 * @param params.submittedOnDate - The date when the fixed deposit application is submitted
 * @param params.locale - The locale used for date and number formatting
 * @param params.dateFormat - The date format used in the request
 * @param params.nominalAnnualInterestRate - Optional annual nominal interest rate for the fixed deposit account
 * @param params.interestCompoundingPeriodType - Optional compounding period type for interest calculation
 * @param params.interestPostingPeriodType - Optional period type for posting interest to the account
 * @param params.interestCalculationType - Optional calculation method for the interest
 * @param params.interestCalculationDaysInYearType - Optional number of days considered in a year for interest calculation
 * @param params.preClosurePenalApplicable - Optional flag indicating if penalty is applicable for pre-closure
 * @param params.minDepositTerm - Optional minimum term for the deposit
 * @param params.minDepositTermTypeId - Optional type of period for the minimum deposit term
 * @param params.transferInterestToSavings - Optional flag to transfer interest to a savings account
 * @param params.monthDayFormat - Optional format for displaying month and day
 * @param params.charges - Optional list of charges to be applied to the fixed deposit account
 * @param params.charts - Optional list of interest rate charts applicable to the fixed deposit
 * @returns A Command that when executed returns the created fixed deposit account details
 *
 * @example
 * ```typescript
 * const createFDCmd = CreateFixedDepositAccount({
 *   productId: 609,
 *   depositAmount: "1000",
 *   depositPeriod: "1",
 *   depositPeriodFrequencyId: 3,
 *   isConsent: true,
 *   submittedOnDate: "22 October 2024",
 *   locale: "en",
 *   dateFormat: "dd MMMM yyyy",
 *   clientId: 5162
 * });
 * const result = await createFDCmd.execute(config);
 * console.log(result.savingsId); // The ID of the created fixed deposit account
 * ```
 */
export const CreateFixedDepositAccount = (
  params: CreateFixedDepositAccountRequest
): Command<{ params: CreateFixedDepositAccountRequest }, CreateFixedDepositAccountResponse> => {
  return {
    input: { params },
    metadata: {
      commandName: 'CreateFixedDepositAccount',
      path: '/v1/fixeddepositaccounts',
      method: 'POST'
    },
    async execute (config: Config) {
      try {
        const axiosInstance = await baseRequest(config);
        const response = await axiosInstance.post(
          '/v1/fixeddepositaccounts?command=submit,approve,activate',
          params
        );
        return response.data;
      } catch (error) {
        throw handleAxiosError(error);
      }
    }
  };
};

/**
 * Retrieves detailed information about a specific Fixed Deposit Account.
 *
 * This API provides comprehensive details of the selected Fixed Deposit account, including:
 * - Account parameters (deposit amount, maturity date, interest rates)
 * - Associated charges and fees
 * - Interest rate charts and slabs
 * - Account status and timeline
 * - Summary of transactions and balances
 *
 * @param accountId - The ID of the fixed deposit account to retrieve
 * @returns A Command that when executed returns the full FixedDepositAccount details
 *
 * @example
 * ```typescript
 * const getFDCmd = GetFixedDepositAccount(13400);
 * const account = await getFDCmd.execute(config);
 * console.log(account.accountNo, account.depositAmount);
 * console.log(account.status.value); // e.g., "Submitted and pending approval"
 * console.log(account.maturityDate); // [2025, 10, 22]
 * ```
 */
export const GetFixedDepositAccount = (
  accountId: number
): Command<{ accountId: number }, FixedDepositAccount> => {
  return {
    input: { accountId },
    metadata: {
      commandName: 'GetFixedDepositAccount',
      path: `/v1/fixeddepositaccounts/${accountId}`,
      method: 'GET'
    },
    async execute (config: Config) {
      try {
        const axiosInstance = await baseRequest(config);
        const response = await axiosInstance.get(`/v1/fixeddepositaccounts/${accountId}`);
        return response.data;
      } catch (error) {
        throw handleAxiosError(error);
      }
    }
  };
};

/**
 * Updates an existing Fixed Deposit Account.
 *
 * This API allows you to modify the details and deposit parameters of an existing
 * Fixed Deposit Account. You can update interest rates, deposit amounts, charges,
 * and other account settings.
 *
 * @param accountId - The ID of the fixed deposit account to update
 * @param params - The update parameters
 * @param params.clientId - The unique identifier of the client
 * @param params.productId - The ID of the product associated with the account
 * @param params.submittedOnDate - The date the update request was submitted
 * @param params.depositAmount - The amount to be deposited
 * @param params.depositPeriod - The duration of the deposit period
 * @param params.depositPeriodFrequencyId - The frequency identifier for the deposit period
 * @param params.locale - The locale setting for formatting dates and numbers
 * @param params.dateFormat - The date format used in the request
 * @param params.nominalAnnualInterestRate - Optional annual nominal interest rate
 * @param params.withHoldTax - Optional flag indicating whether to withhold tax
 * @param params.interestCompoundingPeriodType - Optional type of interest compounding period
 * @param params.interestPostingPeriodType - Optional type of interest posting period
 * @param params.interestCalculationType - Optional type of interest calculation method
 * @param params.interestCalculationDaysInYearType - Optional number of days in year for interest calculation
 * @param params.preClosurePenalApplicable - Optional flag for pre-closure penalty
 * @param params.minDepositTerm - Optional minimum deposit term
 * @param params.minDepositTermTypeId - Optional identifier for minimum deposit term type
 * @param params.transferInterestToSavings - Optional flag to transfer interest to savings
 * @param params.monthDayFormat - Optional format for month and day
 * @param params.charges - Optional list of charges associated with the account
 * @param params.charts - Optional list of interest rate charts
 * @returns A Command that when executed returns the update response with changes
 *
 * @example
 * ```typescript
 * const updateFDCmd = UpdateFixedDepositAccount(13400, {
 *   clientId: 5162,
 *   productId: 609,
 *   submittedOnDate: "22 October 2024",
 *   nominalAnnualInterestRate: 2,
 *   depositAmount: "10001",
 *   depositPeriod: 1,
 *   withHoldTax: false,
 *   interestCompoundingPeriodType: 4,
 *   interestPostingPeriodType: 7,
 *   interestCalculationType: 2,
 *   depositPeriodFrequencyId: 3,
 *   locale: "en",
 *   dateFormat: "dd MMMM yyyy"
 * });
 * const result = await updateFDCmd.execute(config);
 * console.log('Updated account:', result.savingsId);
 * ```
 */
export const UpdateFixedDepositAccount = (
  accountId: number,
  params: UpdateFixedDepositAccountRequest
): Command<{ accountId: number; params: UpdateFixedDepositAccountRequest }, UpdateFixedDepositAccountResponse> => {
  return {
    input: { accountId, params },
    metadata: {
      commandName: 'UpdateFixedDepositAccount',
      path: `/v1/fixeddepositaccounts/${accountId}`,
      method: 'PUT'
    },
    async execute (config: Config) {
      try {
        const axiosInstance = await baseRequest(config);
        const response = await axiosInstance.put(`/v1/fixeddepositaccounts/${accountId}`, params);
        return response.data;
      } catch (error) {
        throw handleAxiosError(error);
      }
    }
  };
};

/**
 * Deletes a specific Fixed Deposit Account by its unique identifier.
 *
 * This API allows you to delete a Fixed Deposit Account. The account can only be
 * deleted if it is not activated.
 *
 * **Pre-check**: The account can only be deleted if the Fixed Deposit account is not activated.
 *
 * @param accountId - The ID associated with the fixed deposit account
 * @returns A Command that when executed returns the deletion response
 *
 * @example
 * ```typescript
 * const deleteFDCmd = DeleteFixedDepositAccount(13400);
 * const result = await deleteFDCmd.execute(config);
 * console.log('Deleted account:', result.savingsId);
 * ```
 */
export const DeleteFixedDepositAccount = (
  accountId: number
): Command<{ accountId: number }, DeleteFixedDepositAccountResponse> => {
  return {
    input: { accountId },
    metadata: {
      commandName: 'DeleteFixedDepositAccount',
      path: `/v1/fixeddepositaccounts/${accountId}`,
      method: 'DELETE'
    },
    async execute (config: Config) {
      try {
        const axiosInstance = await baseRequest(config);
        const response = await axiosInstance.delete(`/v1/fixeddepositaccounts/${accountId}`);
        return response.data;
      } catch (error) {
        throw handleAxiosError(error);
      }
    }
  };
};
