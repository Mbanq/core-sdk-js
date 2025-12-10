# Claude Code Instructions for @mbanq/core-sdk-js

This document provides comprehensive instructions for Claude Code when working with the @mbanq/core-sdk-js project.

## Project Overview

This is **@mbanq/core-sdk-js** - a TypeScript/JavaScript SDK for the Mbanq payment API. It's a Node.js library with type-safe payment operations, multi-tenant support, and comprehensive validation using Zod.

## Architecture & Structure

### Key Directories
- **`src/`** - Main source code
  - **`src/client/`** - HTTP client configuration and setup
  - **`src/commands/`** - API operations (REST and GraphQL)
    - **`src/commands/rest/`** - REST API commands (payment, account, client, etc.)
    - **`src/commands/graphql/`** - GraphQL queries and mutations
  - **`src/middlewares/`** - Request/response middleware (logging, metrics)
  - **`src/types/`** - TypeScript type definitions and Zod schemas
  - **`src/utils/`** - Utility functions (error handling, validation, token generation)
  - **`src/index.ts`** - Main entry point

- **`__tests__/`** - Comprehensive test suite (23 test files)
- **`dist/`** - Built distribution files
- **`docs/`** - Documentation files

## Build System & Scripts

### Build Tool: tsup
- **Dual output**: CommonJS and ES Modules
- **TypeScript declarations**: Auto-generated
- **Watch mode**: Available for development

### Key Commands
```bash
npm run dev          # Development build with watch mode
npm run build        # Production build
npm run test         # Run tests with coverage (95% threshold)
npm run test:ci      # CI-friendly test output with JUnit
npm run lint         # ESLint with auto-fix
npm run semantic-release  # Automated versioning and publishing
```

### Test Requirements
- **Coverage**: 95% across lines, functions, branches, statements
- **Framework**: Vitest with Istanbul coverage
- **Test Environment**: Uses environment variables (SECRET, SIGNEE, TENANT_ID, BASE_URL)

## Development Guidelines

### Code Style & Standards
- **TypeScript**: Strict mode enabled, ES2022 target
- **Module System**: esnext with bundler resolution
- **Linting**: ESLint with TypeScript, security, and import plugins
- **Validation**: All operations must use Zod schemas

### File Organization Patterns
- **Commands**: Each API operation has its own file in `src/commands/rest/`
- **Types**: Corresponding type definitions in `src/types/`
- **Tests**: Mirror the source structure in `__tests__/`
- **Utilities**: Shared functionality in `src/utils/`

## Key Dependencies

### Runtime Dependencies
- **axios** - HTTP client
- **zod** - Runtime type validation
- **jsonwebtoken** - JWT authentication
- **graphql** - GraphQL query support
- **moment-timezone** - Date/time handling
- **uuid** - Unique identifier generation

### Development Dependencies
- **tsup** - Modern TypeScript bundler
- **vitest** - Testing framework with coverage
- **eslint** - Code quality and security
- **typescript** - Type system and compilation

## API Design Patterns

### Command Pattern (Primary API)
This SDK exclusively uses the **Command Pattern** for all API operations. All operations are executed through the client's `request()` method with specific command functions.

```typescript
// Get transfers with filters
const getTransfersCommand = GetTransfers({
  transferStatus: 'EXECUTION_SCHEDULED',
  executedAt: '2025-01-22',
  paymentType: 'ACH',
  queryLimit: 200,
  tenantId: 'default'
});
const transfers = await client.request(getTransfersCommand);

// Create a new transfer
const createTransferCommand = CreateTransfer({
  amount: 1000,
  currency: 'USD',
  paymentRail: 'ACH',
  paymentType: 'CREDIT',
  debtor: {
    name: 'Sender Name',
    identifier: '123456789',
    agent: { name: 'Bank Name', identifier: '021000021' }
  },
  creditor: {
    name: 'Recipient Name',
    identifier: '987654321',
    agent: { name: 'Recipient Bank', identifier: '121000248' }
  },
  tenantId: 'default'
});
const newTransfer = await client.request(createTransferCommand);
```

### Available Command Categories

#### Transfer Commands
- `GetTransfers` - List transfers with filtering
- `CreateTransfer` - Create new transfer
- `GetTransfer` - Get specific transfer by ID
- `MarkAsSuccess` - Mark transfer as successful
- `MarkAsProcessing` - Mark transfer as processing
- `MarkAsReturned` - Mark transfer as returned with reason
- `LogFailTransfer` - Log failed transfer details
- `MarkAsFail` - Mark transfer as failed
- `UpdateTraceNumber` - Update trace number for transfer

#### Payment Commands
- `CreatePayment` - Create new payment
- `GetPayment` - Get payment by ID
- `UpdatePayment` - Update existing payment
- `DeletePayment` - Delete payment
- `ListPayments` - List payments with filters
- `GetPayments` - Get payments with query parameters

#### Account Commands
- `GetAccount` - Get account details
- `ListAccounts` - List accounts with filtering
- `UpdateAccount` - Update account information
- `DeleteAccount` - Delete account

#### Client Commands
- `GetClient` - Get client details
- `CreateClient` - Create new client
- `UpdateClient` - Update client information
- `ListClients` - List clients with filtering
- `DeleteClient` - Delete client

### Multi-Tenant Support in Commands
All commands include tenant context through the `tenantId` parameter:

```typescript
// Tenant-specific operations
const tenantPayments = await client.request(ListPayments({
  tenantId: 'tenant-123',
  status: 'EXECUTION_SUCCESS'
}));

const tenantAccount = await client.request(GetAccount({
  tenantId: 'tenant-123',
  accountId: 789
}));
```

## Testing Guidelines

### Test Structure
- Tests mirror source structure in `__tests__/`
- Each module has comprehensive unit tests
- Mock external dependencies (axios, API calls)
- Test both success and error scenarios

### Coverage Requirements
- **Minimum**: 95% coverage across all metrics
- **Exclusions**: Config files, test files, node_modules, dist
- **Environment**: Must have required environment variables set

### Test Environment Setup
Required environment variables:
- `SECRET` - JWT secret for testing
- `SIGNEE` - JWT signee for testing
- `TENANT_ID` - Default tenant ID for tests
- `BASE_URL` - API base URL for tests

## Common Development Tasks

### Adding New API Operations
1. Create command function in appropriate `src/commands/rest/` file (payment.ts, account.ts, client.ts, transfer.ts, etc.)
2. Define command interface and parameters in corresponding `src/types/` file
3. Implement command validation using Zod schemas
4. Create comprehensive tests in `__tests__/` matching the command structure
5. Export the command from the appropriate command index file
6. Update documentation if needed

### Command Implementation Pattern
Each command follows this structure:
```typescript
// Command interface in types/
export interface CreateTransferCommand {
  amount: number;
  currency: string;
  paymentRail: PaymentRail;
  // ... other required fields
  tenantId: string;
}

// Command function implementation
export const CreateTransfer = (params: CreateTransferCommand) => ({
  metadata: { commandName: 'CreateTransfer' },
  params: TransferCreateSchema.parse(params) // Zod validation
});

// Usage in client
const result = await client.request(CreateTransfer(commandParams));
```

### Adding New Middleware
1. Create middleware file in `src/middlewares/`
2. Implement Middleware interface (before, after, onError)
3. Add tests for middleware functionality
4. Export from middleware index

### Modifying Validation
1. Update Zod schemas in `src/types/`
2. Test validation with valid/invalid inputs
3. Ensure error messages are descriptive
4. Update related type definitions

## Security Considerations

### Authentication Methods
- **JWT Token**: Secret + signee (preferred)
- **Bearer Token**: Direct token provision
- **OAuth 2.0**: Password grant flow

### Security Best Practices
- Never hardcode credentials
- Use environment variables for sensitive data
- Validate all inputs with Zod schemas
- Implement proper error handling to prevent credential leakage
- Use HTTPS endpoints only in production

## Error Handling Patterns

### CommandError Structure
All operations throw CommandError with:
- `code` - Error code
- `message` - Human-readable message
- `statusCode` - HTTP status code
- `requestId` - Request tracking ID (optional)

### Error Types
- Authentication errors (invalid credentials, expired tokens)
- Validation errors (Zod validation failures)
- API errors (server-side errors)
- Network errors (connectivity issues)

## Package Exports

The package supports modular imports:
```typescript
import { CoreSDK } from '@mbanq/core-sdk-js';           // Main SDK
import { createInstance } from '@mbanq/core-sdk-js/client';  // Client only
import { commands } from '@mbanq/core-sdk-js/command';     // Commands only
import { types } from '@mbanq/core-sdk-js/types';         // Types only
```

## Build & Deployment

### Build Process
1. TypeScript compilation with strict checks
2. Dual format bundling (CJS/ESM)
3. Declaration file generation
4. Code splitting and minification

### Release Process
- Automated semantic versioning
- GitHub integration for releases
- NPM package publishing
- Changelog generation

## Development Workflow

### Before Making Changes
1. Run existing tests: `npm test`
2. Check linting: `npm run lint`
3. Understand existing patterns and conventions
4. Review related documentation

### After Making Changes
1. Run tests with coverage: `npm run test`
2. Fix any linting issues: `npm run lint`
3. Build project: `npm run build`
4. Update documentation if API changes were made
5. Ensure all tests pass and coverage requirements are met

### Commit Standards
- Use conventional commit format
- Include tests for new functionality
- Update documentation for API changes
- Maintain test coverage standards

## Debugging Tips

### Common Issues
- **Authentication failures**: Check credentials, token expiration
- **Validation errors**: Verify input data against Zod schemas
- **Test failures**: Ensure environment variables are set
- **Build issues**: Check TypeScript configuration and dependencies

### Debugging Tools
- Use logging middleware for request tracing
- Check test coverage reports for untested code
- Use TypeScript strict mode for type safety
- Monitor error patterns in CommandError instances

This SDK follows modern TypeScript best practices with emphasis on type safety, comprehensive testing, and developer experience. The SDK exclusively uses the **Command Pattern** for all API operations - every interaction is executed through `client.request(CommandName(params))`. When working with this codebase, prioritize maintainability, security, and adherence to the established command-based architecture.