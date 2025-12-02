import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return {
    test: {
      env: {
        SECRET: process.env.SECRET!,
        SIGNEE: process.env.SIGNEE!,
        TENANT_ID: process.env.TENANT_ID!,
        BASE_URL: process.env.BASE_URL!
      },
      coverage: {
        reporter: ['text', 'text-summary', 'html', 'json'],
        provider: 'istanbul',
        thresholds: {
          lines: 95,
          functions: 95,
          branches: 95,
          statements: 95
        },
        exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**', '**/__tests__/**', '**/*.config.ts', '*.config.js', '**/src/types/**']
      },
      exclude: [
        '**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**', '*.config.ts', '*.config.js'
      ],
      globals: true
    }
  };
});
