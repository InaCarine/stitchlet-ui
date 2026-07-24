import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  fixedExtension: false,
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
});
