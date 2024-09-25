import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  shims: true,
  clean: true,
  dts: {
    resolve: true,
    // Only generate dts from files that don't import from @swc/core
    entry: {
      index: 'src/index.ts',
    },
    // Manually specify what to exclude
    compilerOptions: {
      skipLibCheck: true,
      moduleResolution: 'node',
    },
  },
});
