/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'jest.setup.ts',
    'tsconfig.json',
    '/.turbo/',
    'eslint.config.mjs',
  ],
  coverageProvider: 'v8',
  // A set of global variables that need to be available in all test environments
  // globals: {},
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;
