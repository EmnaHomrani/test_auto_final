Cypress.Commands.add('loginSSO', () => {
  const loginUrl =
    'https://gateform.wam-ba.sso.intraorange/pages/authent/gassiLikeForm?TYPE=33554433&REALMOID=06-xxx&METHOD=GET&SMAGENTNAME=-SM-xxx&TARGET=-SM-https%3a%2f%2fmytools-portal.sso-test.infra.ftgroup%2fbinbeemytools%2fHome%2fPortfolio';

  cy.visit(loginUrl, { failOnStatusCode: false });

  cy.get('#user', { timeout: 20000 })
    .should('be.visible')
    .type(Cypress.env('CU_ID'), { log: false });

  cy.get('#password')
    .should('be.visible')
    .type(Cypress.env('PASSWORD'), { log: false });

  cy.get('#linkValidForm').click();

  cy.url({ timeout: 30000 }).should('include', '/Home/Portfolio');
});

// Crée une session réutilisable
Cypress.Commands.add('sessionLogin', () => {
  cy.session('loginSSO', () => {
    cy.loginSSO();
  });
});
