import { type Command, type Config } from '../../types';
import { GetConfigurationsResponse, GetConfigurationByNameResponse } from '../../types/globalConfiguration';
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

/**
 * Retrieves a specific global configuration by its name.
 * 
 * This API returns the configuration details for a specific global configuration
 * identified by its name, including its value, description, trap door setting,
 * and value data type.
 * 
 * @param configName - The name of the configuration to retrieve
 * @param configuration - Configuration parameters
 * @param configuration.tenantId - Optional tenant identifier for multi-tenant environments
 * 
 * @returns A Command that when executed returns the specific configuration details
 * 
 * @example
 * ```typescript
 * const getConfigCmd = GetConfigurationByName(
 *   'virtual-card-reordering-limit',
 *   { tenantId: "z01j3e71zd6zkq90" }
 * );
 * const result = await getConfigCmd.execute(config);
 * 
 * console.log(`Value: ${result.value}`);
 * console.log(`Description: ${result.description}`);
 * console.log(`Data Type: ${result.valueDataType}`);
 * ```
 * 
 * @see {@link https://apidocs.cloud.mbanq.com/reference/get_v1-configurations-name-configname} API Documentation
 */
export const GetConfigurationByName = (
    configName: string,
    configuration?: { tenantId?: string }
): Command<{
    configName: string;
    configuration?: { tenantId?: string };
}, GetConfigurationByNameResponse> => {
    return {
        input: { configName, configuration },
        metadata: {
            commandName: 'GetConfigurationByName',
            path: `/v1/configurations/name/${configName}`,
            method: 'GET'
        },
        execute: async (config: Config) => {
            if (configuration?.tenantId) {
                config.tenantId = configuration.tenantId;
            }
            const axiosInstance = await baseRequest(config);

            try {
                const response = await axiosInstance.get<GetConfigurationByNameResponse>(
                    `/v1/configurations/name/${configName}`
                );
                return response.data;
            } catch (error) {
                handleAxiosError(error);
            }
        }
    };
};
