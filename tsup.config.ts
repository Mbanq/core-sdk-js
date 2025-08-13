import type { Options } from 'tsup';

export const tsup: Options = {
  entry: [
    'src/index.ts',
    'src/commands/index.ts',
    'src/client/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  shims: false,
  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true
};
