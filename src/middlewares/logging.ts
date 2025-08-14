import type { Middleware } from '../types';

export interface Logger {
  info: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  warn?: (message: string, ...args: unknown[]) => void;
  log?: (message: string, ...args: unknown[]) => void;
}

export const createLoggingMiddleware = (
  logger: Logger = console
): Middleware => ({
  before: async (command) => {
    logger.info(`Executing ${command.metadata.commandName}`, {
      input: command.input,
      metadata: command.metadata
    });
  },
  after: async (command, response) => {
    logger.info(`Completed ${command.metadata.commandName}`, {
      response,
      metadata: command.metadata
    });
  },
  onError: async (command, error) => {
    logger.error(`Error in ${command.metadata.commandName}`, {
      error,
      input: command.input,
      metadata: command.metadata
    });
  }
});
