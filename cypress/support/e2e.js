// Import des commandes custom
import './commands';
import './loginAndSearch';

// Plugins utiles
require('cypress-xpath');

// Ignorer les erreurs JS non critiques
Cypress.on('uncaught:exception', () => false);

// Exemple de hook global si besoin
beforeEach(() => {
  // Si tu veux injecter un cookie mock
  // cy.setCookie('SSO_SESSION', 'mocked-session-token');
});
