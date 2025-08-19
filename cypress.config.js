const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'byuo3g',
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js', // inclut tous les tests .cy.js
    supportFile: 'cypress/support/e2e.js',
    screenshotOnRunFailure: true,
    experimentalRunAllSpecs: true,
    video: true,
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    baseUrl: 'https://mytools-portal.sso-test.infra.ftgroup',

    setupNodeEvents(on, config) {
      // Exemple de proxy si nécessaire
      config.env.CYPRESS_PROXY = 'http://your-proxy:port';
      return config;
    },
  },

  env: {
    CU_ID: process.env.CU_ID,
    PASSWORD: process.env.PASSWORD,
  },
});
