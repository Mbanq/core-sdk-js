import { type Command, type Config } from '../../types';
import { GetConfigurationsResponse } from '../../types/globalConfiguration';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

/**
 * Retrieves all global configurations for the banking system.
 * 
 * This API returns all configuration settings including their names, enabled status,
 * IDs, trap door settings, and value data types. These configurations control various
 * aspects of the banking platform's behavior.
 * 
 * @param configuration - Configuration parameters
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 * 
 * @returns A Command that when executed returns all global configurations
 * 
 * @example
 * ```typescript
 * const getConfigsCmd = GetConfigurations({ tenantId: "z01j3e71zd6zkq90" });
 * const result = await getConfigsCmd.execute(config);
 * 
 * // Access the configurations array
 * result.globalConfiguration.forEach(config => {
 *   console.log(`${config.name}: ${config.enabled ? 'enabled' : 'disabled'}`);
 * });
 * ```
 * 
 * @see {@link https://apidocs.cloud.mbanq.com/reference/get_v1-configurations} API Documentation
 */
export const GetConfigurations = (configuration: {
    tenantId?: string;
}): Command<{
    tenantId?: string;
}, GetConfigurationsResponse> => {
    return {
        input: configuration,
        metadata: {
            commandName: 'GetConfigurations',
            path: '/v1/configurations',
            method: 'GET'
        },
        execute: async (config: Config) => {
            if (configuration.tenantId) {
                config.tenantId = configuration.tenantId;
            }
            const axiosInstance = await baseRequest(config);

            try {
                const response = await axiosInstance.get<GetConfigurationsResponse>('/v1/configurations');
                return response.data;
            } catch (error) {
                handleAxiosError(error);
            }
        }
    };
};
