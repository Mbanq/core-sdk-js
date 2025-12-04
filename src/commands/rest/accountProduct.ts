import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import {
    CreateAccountProductRequest,
    CreateAccountProductResponse,
    UpdateAccountProductRequest,
    UpdateAccountProductResponse,
    GetAllAccountProductsResponse
} from '../../types/accountProduct';

/**
 * Creates a new savings account product.
 * 
 * @param params - The account product creation parameters (see CreateAccountProductRequest)
 * @param params.currencyCode - The currency code for the savings product (e.g., "USD")
 * @param params.digitsAfterDecimal - The number of digits after the decimal point for amounts
 * @param params.interestCompoundingPeriodType - The period type for interest compounding
 * @param params.interestPostingPeriodType - The period type for posting interest to the account
 * @param params.interestCalculationType - The method used to calculate interest
 * @param params.interestCalculationDaysInYearType - The number of days used in interest calculations for the year
 * @param params.accountingRule - The accounting rule used for this savings product
 * @param params.name - The name of the saving product
 * @param params.shortName - A short name for the savings product
 * @param params.description - A brief description of the savings product
 * @param params.locale - The locale for formatting date and number fields (e.g., "en")
 * @param params.dateFormat - The date format string (e.g., "dd MMMM yyyy")
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 * 
 * @returns A Command that when executed returns the created account product details
 * 
 * @example
 * ```typescript
 * const createCmd = CreateAccountProduct(
 *   {
 *     currencyCode: "USD",
 *     digitsAfterDecimal: 2,
 *     interestCompoundingPeriodType: 1,
 *     interestPostingPeriodType: 4,
 *     interestCalculationType: 1,
 *     interestCalculationDaysInYearType: 365,
 *     accountingRule: 1,
 *     name: "savings product",
 *     shortName: "te21",
 *     description: "test",
 *     inMultiplesOf: "1",
 *     isLinkedToFloatingInterestRates: true,
 *     floatingRateId: 1,
 *     minDifferentialRate: "1",
 *     interestRateDifferential: "12",
 *     defaultDifferentialRate: "3",
 *     maxDifferentialRate: "14",
 *     isFloatingInterestRateCalculationAllowed: true,
 *     minRequiredOpeningBalance: "1000",
 *     locale: "en",
 *     dateFormat: "dd MMMM yyyy",
 *     startDate: "01 January 2024",
 *     endDate: "31 December 2024"
 *   },
 *   { tenantId: "z01j3e71zd6zkq908yvf5861a8" }
 * );
 * const result = await createCmd.execute(config);
 * console.log(result.resourceId, result.id);
 * ```
 */
export const CreateAccountProduct = (
    params: CreateAccountProductRequest,
    configuration?: { tenantId?: string }
): Command<{ params: CreateAccountProductRequest, configuration?: { tenantId?: string } }, CreateAccountProductResponse> => {
    return {
        input: { params, configuration },
        metadata: {
            commandName: 'CreateAccountProduct',
            path: '/v1/savingsproducts',
            method: 'POST'
        },
        execute: async (config: Config) => {
            if (configuration?.tenantId) {
                config.tenantId = configuration.tenantId;
            }
            const axiosInstance = await baseRequest(config);

            try {
                const response = await axiosInstance.post<CreateAccountProductResponse>(
                    '/v1/savingsproducts',
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
 * Updates an existing savings account product.
 * 
 * @param productId - The ID of the savings product to update
 * @param params - The account product update parameters (see UpdateAccountProductRequest)
 * @param params.name - The updated name of the savings product
 * @param params.shortName - The updated short name for the savings product
 * @param params.description - A brief description of the savings product
 * @param params.currencyCode - The currency code for the savings product
 * @param params.digitsAfterDecimal - The number of digits after the decimal point
 * @param params.nominalAnnualInterestRate - The nominal annual interest rate
 * @param params.minRequiredOpeningBalance - The minimum balance required to open the savings account
 * @param params.locale - The locale for formatting date and number fields
 * @param params.dateFormat - The date format string
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 * 
 * @returns A Command that when executed returns the update response with changes
 * 
 * @example
 * ```typescript
 * const updateCmd = UpdateAccountProduct(
 *   101,
 *   {
 *     name: "Saving Product test",
 *     shortName: "savi",
 *     description: "SAVING TEST",
 *     currencyCode: "USD",
 *     digitsAfterDecimal: 2,
 *     inMultiplesOf: "1",
 *     nominalAnnualInterestRate: "2",
 *     minRequiredOpeningBalance: "1000",
 *     withdrawalFeeForTransfers: false,
 *     interestCompoundingPeriodType: 1,
 *     interestPostingPeriodType: 4,
 *     interestCalculationType: 1,
 *     interestCalculationDaysInYearType: 365,
 *     accountingRule: 1,
 *     charges: [{ id: 132, isMandatory: false }],
 *     startDate: "2023-07-01",
 *     endDate: "2024-09-30",
 *     paymentChannelToFundSourceMappings: "[]",
 *     penaltyToIncomeAccountMappings: "[]",
 *     feeToIncomeAccountMappings: "[]",
 *     locale: "en",
 *     dateFormat: "dd MMMM yyyy"
 *   },
 *   { tenantId: "z01j3e71zd6zkq908yvf5861a8" }
 * );
 * const result = await updateCmd.execute(config);
 * console.log(result.changes);
 * ```
 */
export const UpdateAccountProduct = (
    productId: number,
    params: UpdateAccountProductRequest,
    configuration?: { tenantId?: string }
): Command<{ productId: number, params: UpdateAccountProductRequest, configuration?: { tenantId?: string } }, UpdateAccountProductResponse> => {
    return {
        input: { productId, params, configuration },
        metadata: {
            commandName: 'UpdateAccountProduct',
            path: `/v1/savingsproducts/${productId}`,
            method: 'PUT'
        },
        execute: async (config: Config) => {
            if (configuration?.tenantId) {
                config.tenantId = configuration.tenantId;
            }
            const axiosInstance = await baseRequest(config);

            try {
                const response = await axiosInstance.put<UpdateAccountProductResponse>(
                    `/v1/savingsproducts/${productId}`,
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
 * Retrieves all savings account products.
 * 
 * @param configuration - Optional configuration
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 * 
 * @returns A Command that when executed returns a list of all account products
 * 
 * @example
 * ```typescript
 * const listCmd = GetAllAccountProducts({ tenantId: "z01j3e71zd6zkq908yvf5861a8" });
 * const result = await listCmd.execute(config);
 * result.forEach(product => console.log(product.name));
 * ```
 */
export const GetAllAccountProducts = (
    configuration?: { tenantId?: string }
): Command<{ configuration?: { tenantId?: string } }, GetAllAccountProductsResponse> => {
    return {
        input: { configuration },
        metadata: {
            commandName: 'GetAllAccountProducts',
            path: '/v1/savingsproducts',
            method: 'GET'
        },
        execute: async (config: Config) => {
            if (configuration?.tenantId) {
                config.tenantId = configuration.tenantId;
            }
            const axiosInstance = await baseRequest(config);

            try {
                const response = await axiosInstance.get<GetAllAccountProductsResponse>(
                    '/v1/savingsproducts'
                );
                return response.data;
            } catch (error) {
                handleAxiosError(error);
            }
        }
    };
};
