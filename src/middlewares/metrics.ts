import type { Middleware } from '../types';

export const createMetricsMiddleware = (
  metricsClient: any
): Middleware => ({
  before: async (command) => {
    metricsClient.incrementCounter(`${command.metadata.commandName}_started`);
  },
  after: async (command) => {
    metricsClient.incrementCounter(`${command.metadata.commandName}_completed`);
  },
  onError: async (command, error) => {
    metricsClient.incrementCounter(`${command.metadata.commandName}_error`);
    metricsClient.recordError(error);
  }
});
