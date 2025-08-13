import type { Command, Config } from '../types';
import { validateConfig } from '../utils/validation';
import { createCommandError } from '../utils/errorHandler';

export const createClient = (initialConfig: Config) => {
  const errors = validateConfig(initialConfig);
  if (errors.length > 0) {
    throw createCommandError({
      message: `Invalid configuration: ${errors.join(', ')}`,
      code: 'invalid_config'
    });
  }
  const executeMiddlewares = async (
    phase: 'before' | 'after' | 'onError',
    command: Command<any, any>,
    data?: any
  ) => {
    if (!initialConfig.middlewares) return;

    for (const middleware of initialConfig.middlewares) {
      if (phase === 'before' && middleware.before) {
        await middleware.before(command);
      } else if (phase === 'after' && middleware.after) {
        await middleware.after(command, data);
      } else if (phase === 'onError' && middleware.onError) {
        await middleware.onError(command, data);
      }
    }
  };

  let currentConfig = { ...initialConfig };

  return {
    setConfig: (config: Config) => {
      currentConfig = config;
    },
    updateConfig: (config: Partial<Config>) => {
      const newConfig = {
        ...currentConfig,
        ...config,
        axiosConfig: {
          ...currentConfig.axiosConfig,
          ...config.axiosConfig,
          headers: {
            ...currentConfig.axiosConfig?.headers,
            ...config.axiosConfig?.headers
          }
        }
      };

      const errors = validateConfig(newConfig);
      if (errors.length > 0) {
        throw createCommandError({
          message: `Invalid configuration: ${errors.join(', ')}`,
          code: 'invalid_config'
        });
      }
      currentConfig = newConfig;
    },
    resetConfig: () => {
      currentConfig = initialConfig;
    },
    request: async <TOutput>(command: Command<any, TOutput>): Promise<TOutput | undefined> => {
      try {
        await executeMiddlewares('before', command);
        const response = await command.execute(currentConfig);
        await executeMiddlewares('after', command, response);
        return response;
      } catch (error) {
        await executeMiddlewares('onError', command, error);
        throw error;
      }
    }
  };
};
