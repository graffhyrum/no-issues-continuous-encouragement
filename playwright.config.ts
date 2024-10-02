import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: [['html', {open: 'never'}], ['list']],
  timeout: 3 * 1000,
  use: {
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },

    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {...devices['Pixel 5']},
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {...devices['Desktop Edge'], channel: 'msedge'},
    },
    {
      name: 'Google Chrome',
      use: {...devices['Desktop Chrome'], channel: 'chrome'},
    },
  ],
});
