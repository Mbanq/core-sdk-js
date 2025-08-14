import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMetricsMiddleware } from '../../src/middlewares/metrics';
import { Command } from '../../src/types';

interface MockMetricsClient {
  incrementCounter: ReturnType<typeof vi.fn>;
  recordError: ReturnType<typeof vi.fn>;
  recordDuration: ReturnType<typeof vi.fn>;
  recordValue: ReturnType<typeof vi.fn>;
}

interface TestInput {
  data?: string;
  testData?: string;
}

interface TestOutput {
  result: string;
}

describe('Metrics Middleware', () => {
  let mockMetricsClient: MockMetricsClient;
  let mockCommand: Command<TestInput, TestOutput>;

  beforeEach(() => {
    mockMetricsClient = {
      incrementCounter: vi.fn(),
      recordError: vi.fn(),
      recordDuration: vi.fn(),
      recordValue: vi.fn()
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

  describe('createMetricsMiddleware', () => {
    it('should create middleware with metrics client', () => {
      const middleware = createMetricsMiddleware(mockMetricsClient);

      expect(middleware.before).toBeInstanceOf(Function);
      expect(middleware.after).toBeInstanceOf(Function);
      expect(middleware.onError).toBeInstanceOf(Function);
    });

    it('should increment started counter in before hook', async () => {
      const middleware = createMetricsMiddleware(mockMetricsClient);

      await middleware.before!(mockCommand);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('TestCommand_started');
    });

    it('should increment completed counter in after hook', async () => {
      const middleware = createMetricsMiddleware(mockMetricsClient);
      const response = { success: true };

      await middleware.after!(mockCommand, response);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('TestCommand_completed');
    });

    it('should increment error counter and record error in onError hook', async () => {
      const middleware = createMetricsMiddleware(mockMetricsClient);
      const error = new Error('Test error');

      await middleware.onError!(mockCommand, error);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('TestCommand_error');
      expect(mockMetricsClient.recordError).toHaveBeenCalledWith(error);
    });

    it('should handle command name with spaces', async () => {
      const commandWithSpaces = {
        ...mockCommand,
        metadata: {
          ...mockCommand.metadata,
          commandName: 'Test Command With Spaces'
        }
      };

      const middleware = createMetricsMiddleware(mockMetricsClient);

      await middleware.before!(commandWithSpaces);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('Test Command With Spaces_started');
    });

    it('should handle empty command name', async () => {
      const commandWithEmptyName = {
        ...mockCommand,
        metadata: {
          ...mockCommand.metadata,
          commandName: ''
        }
      };

      const middleware = createMetricsMiddleware(mockMetricsClient);

      await middleware.before!(commandWithEmptyName);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('_started');
    });

    it('should handle undefined response in after hook', async () => {
      const middleware = createMetricsMiddleware(mockMetricsClient);

      await middleware.after!(mockCommand, undefined);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('TestCommand_completed');
    });

    it('should handle various error types in onError hook', async () => {
      const middleware = createMetricsMiddleware(mockMetricsClient);

      const stringError = 'String error' as any;
      await middleware.onError!(mockCommand, stringError);

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('TestCommand_error');
      expect(mockMetricsClient.recordError).toHaveBeenCalledWith(stringError);
    });

    it('should work with minimal metrics client', async () => {
      const minimalClient = {
        incrementCounter: vi.fn()
      };

      const middleware = createMetricsMiddleware(minimalClient);

      await middleware.before!(mockCommand);
      await middleware.after!(mockCommand, {});

      expect(minimalClient.incrementCounter).toHaveBeenCalledWith('TestCommand_started');
      expect(minimalClient.incrementCounter).toHaveBeenCalledWith('TestCommand_completed');
    });

    it('should handle missing recordError method gracefully', async () => {
      const clientWithoutRecordError = {
        incrementCounter: vi.fn()
      };

      const middleware = createMetricsMiddleware(clientWithoutRecordError);
      const error = new Error('Test error');

      await expect(middleware.onError!(mockCommand, error)).resolves.toBeUndefined();

      expect(clientWithoutRecordError.incrementCounter).toHaveBeenCalledWith('TestCommand_error');
    });

    it('should handle command names with special characters', async () => {
      const commandWithSpecialChars = {
        ...mockCommand,
        metadata: {
          ...mockCommand.metadata,
          commandName: 'Test-Command_123'
        }
      };

      const middleware = createMetricsMiddleware(mockMetricsClient);

      await middleware.before!(commandWithSpecialChars);
      await middleware.after!(commandWithSpecialChars, {});

      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('Test-Command_123_started');
      expect(mockMetricsClient.incrementCounter).toHaveBeenCalledWith('Test-Command_123_completed');
    });
  });
});
