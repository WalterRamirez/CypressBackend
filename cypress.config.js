const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  env: {
    username: 'cytest@test.com',
    password:'Welcome123',
    apiUrl: 'https://conduit-api.bondaracademy.com/',
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  reporter: 'cypress-multi-reporters', reporterOptions: {
    configFile: 'reporter-config.json'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'https://conduit.bondaracademy.com/',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  },
});
