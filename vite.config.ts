// vite.config.ts
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
        provider: 'istanbul', // or 'c8'
        thresholds: {
          lines: 50,
          functions: 50,
          branches: 50,
          statements: 50,
        },
        exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**', '**/__tests__/**']
      },
      exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
      globals: true
    }
  }
});
