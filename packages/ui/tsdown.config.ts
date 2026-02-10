import pluginBabel from '@rollup/plugin-babel';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/components/*/index.tsx'],
  fixedExtension: false,
  outDir: 'dist',
  format: ['esm'],
  platform: 'neutral',
  target: 'esnext',
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: true,
  sourcemap: true,
  plugins: [
    pluginBabel({
      babelHelpers: 'bundled',
      parserOpts: {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      },
      plugins: ['babel-plugin-react-compiler'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
});
