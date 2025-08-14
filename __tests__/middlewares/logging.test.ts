import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLoggingMiddleware, Logger } from '../../src/middlewares/logging';
import { Command } from '../../src/types';

interface TestInput {
  testData?: string;
}

interface TestOutput {
  success?: boolean;
  data?: string;
}

describe('Logging Middleware', () => {
  let mockLogger: Logger;
  let mockCommand: Command<TestInput, TestOutput>;

  beforeEach(() => {
    mockLogger = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      log: vi.fn()
    };

    mockCommand = {
      input: { testData: 'value' },
      metadata: {
        commandName: 'TestCommand',
        path: '/test',
        method: 'GET'
      },
      execute: vi.fn()
    };
  });

  describe('createLoggingMiddleware', () => {
    it('should create middleware with custom logger', () => {
      const middleware = createLoggingMiddleware(mockLogger);

      expect(middleware.before).toBeInstanceOf(Function);
      expect(middleware.after).toBeInstanceOf(Function);
      expect(middleware.onError).toBeInstanceOf(Function);
    });

    it('should create middleware with default console logger', () => {
      const middleware = createLoggingMiddleware();

      expect(middleware.before).toBeInstanceOf(Function);
      expect(middleware.after).toBeInstanceOf(Function);
      expect(middleware.onError).toBeInstanceOf(Function);
    });

    it('should log command execution start in before hook', async () => {
      const middleware = createLoggingMiddleware(mockLogger);

      await middleware.before!(mockCommand);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Executing TestCommand',
        {
          input: { testData: 'value' },
          metadata: {
            commandName: 'TestCommand',
            path: '/test',
            method: 'GET'
          }
        }
      );
    });

    it('should log command completion in after hook', async () => {
      const middleware = createLoggingMiddleware(mockLogger);
      const response = { success: true, data: 'test' };

      await middleware.after!(mockCommand, response);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Completed TestCommand',
        {
          response: { success: true, data: 'test' },
          metadata: {
            commandName: 'TestCommand',
            path: '/test',
            method: 'GET'
          }
        }
      );
    });

    it('should log errors in onError hook', async () => {
      const middleware = createLoggingMiddleware(mockLogger);
      const error = new Error('Test error');

      await middleware.onError!(mockCommand, error);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Error in TestCommand',
        {
          error,
          input: { testData: 'value' },
          metadata: {
            commandName: 'TestCommand',
            path: '/test',
            method: 'GET'
          }
        }
      );
    });

    it('should handle command with no operation name', async () => {
      const commandWithoutName = {
        ...mockCommand,
        metadata: {
          ...mockCommand.metadata,
          commandName: ''
        }
      };

      const middleware = createLoggingMiddleware(mockLogger);

      await middleware.before!(commandWithoutName);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Executing ',
        expect.any(Object)
      );
    });

    it('should handle undefined response in after hook', async () => {
      const middleware = createLoggingMiddleware(mockLogger);

      await middleware.after!(mockCommand, undefined);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Completed TestCommand',
        {
          response: undefined,
          metadata: mockCommand.metadata
        }
      );
    });

    it('should handle undefined error in onError hook', async () => {
      const middleware = createLoggingMiddleware(mockLogger);
      const undefinedError = undefined as unknown as Error;

      await middleware.onError!(mockCommand, undefinedError);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Error in TestCommand',
        {
          error: undefined,
          input: mockCommand.input,
          metadata: mockCommand.metadata
        }
      );
    });

    it('should work with console logger by default', async () => {
      const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const middleware = createLoggingMiddleware();

      await middleware.before!(mockCommand);
      await middleware.after!(mockCommand, { success: true });
      await middleware.onError!(mockCommand, new Error('test'));

      expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

      consoleInfoSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });
});
