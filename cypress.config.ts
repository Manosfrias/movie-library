import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3002',
    specPattern: '__cypress__/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: '__cypress__/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
