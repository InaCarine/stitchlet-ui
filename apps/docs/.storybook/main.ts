import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const currentDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
      {
        find: '@stitchlet/ui/styles',
        replacement: resolve(currentDir, '../../../packages/ui/styles/tokens.css'),
      },
      {
        find: '@stitchlet/ui',
        replacement: resolve(currentDir, '../../../packages/ui/src/index.ts'),
      },
    ];

    return config;
  },
};
export default config;
