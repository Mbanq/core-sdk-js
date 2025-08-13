import type { Middleware } from '../types';
import { Console } from 'node:console';

export const createLoggingMiddleware = (
  logger: Console = console
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
