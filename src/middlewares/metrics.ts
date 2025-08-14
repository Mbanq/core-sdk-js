import type { Middleware } from '../types';

export interface MetricsClient {
  incrementCounter: (counterName: string) => void;
  recordError?: (error: Error) => void;
}

export const createMetricsMiddleware = (
  metricsClient: MetricsClient
): Middleware => ({
  before: async (command) => {
    metricsClient.incrementCounter(`${command.metadata.commandName}_started`);
  },
  after: async (command) => {
    metricsClient.incrementCounter(`${command.metadata.commandName}_completed`);
  },
  onError: async (command, error) => {
    metricsClient.incrementCounter(`${command.metadata.commandName}_error`);
    if (metricsClient.recordError && typeof metricsClient.recordError === 'function') {
      metricsClient.recordError(error);
    }
  }
});
