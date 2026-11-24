// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { sauceDemoURL } from './setup/task-2.session.js';

const task1SpecialSpecs = ['**/task-1/mobile-products.spec.js', '**/task-1/products-api.spec.js'];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  globalSetup: './setup/task-1.global-setup.js',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      testIgnore: [...task1SpecialSpecs, '**/task-2/**'],
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      testIgnore: [...task1SpecialSpecs, '**/task-2/**'],
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      testIgnore: ['**/task-1/**', '**/task-2/**'],
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'task2-auth',
      testDir: './setup',
      testMatch: '**/task-2.auth.setup.js',
      use: { ...devices['Desktop Chrome'], baseURL: sauceDemoURL, testIdAttribute: 'data-test' },
    },
    {
      name: 'task2-chromium',
      testMatch: '**/task-2/*.spec.js',
      dependencies: ['task2-auth'],
      use: { ...devices['Desktop Chrome'], baseURL: sauceDemoURL, testIdAttribute: 'data-test' },
    },
    {
      name: 'task2-firefox',
      testMatch: '**/task-2/*.spec.js',
      dependencies: ['task2-auth'],
      use: { ...devices['Desktop Firefox'], baseURL: sauceDemoURL, testIdAttribute: 'data-test' },
    },
    {
      name: 'task2-webkit',
      testMatch: '**/task-2/*.spec.js',
      dependencies: ['task2-auth'],
      use: { ...devices['Desktop Safari'], baseURL: sauceDemoURL, testIdAttribute: 'data-test' },
    },

    {
      name: 'mobile-chromium',
      testMatch: '**/task-1/mobile-products.spec.js',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'api',
      testMatch: '**/task-1/products-api.spec.js',
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

