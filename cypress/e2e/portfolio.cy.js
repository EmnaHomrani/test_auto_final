describe('🔐 SSO → Portfolio → Clic vers OTB via bouton', () => {
    before(() => {
      cy.clearCookies();
      cy.log('🔁 Connexion à MyTools');
  
      // Étape 1️⃣ : Connexion MyTools
      cy.visit('https://mytools-portal.sso-test.infra.ftgroup/binbeemytools/Home/Portfolio', {
        failOnStatusCode: false,
      });
  
      // Étape 2️⃣ : Authentification via GateForm
      cy.origin('https://gateform.wam-ba.sso.intraorange', () => {
        cy.get('#user', { timeout: 20000 }).should('be.visible')
          .type(Cypress.env('CU_ID'), { log: false });
  
        cy.get('#password').should('be.visible')
          .type(Cypress.env('PASSWORD'), { log: false });
  
        cy.get('#linkValidForm').click();
      });
  
      // Étape 3️⃣ : GASSI si redirection
      cy.url({ timeout: 20000 }).then((url) => {
        if (url.includes('gassi.sso.francetelecom.fr')) {
          cy.origin('https://gassi.sso.francetelecom.fr', () => {
            cy.url({ timeout: 20000 }).should('include', 'sso-test.infra.ftgroup');
          });
        }
      });
  
      // Étape 4️⃣ : Vérifie retour Portfolio
      cy.url({ timeout: 20000 }).should('include', '/Home/Portfolio');
    });
  
    it('🎯 Clic sur "ORDER TO BILL IC" → redirection vers OTB et saisie auto de l\'order', () => {
      // Attente pour stabiliser le chargement
      cy.wait(2000);
  
      cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          win.location.href = url;
        }).as('windowOpen');
      });
  
      // Clic sur "USER QA"
      cy.contains('USER QA', { timeout: 20000 })
        .should('be.visible')
        .click();
  
      // Attendez que l'URL corresponde au nouvel onglet
      cy.url({ timeout: 20000 }).should('include', 'qa-otb-ic.sso-test.infra.ftgroup/#/order-management');
  
      // Saisie automatique du numéro d'ordre
      const orderNumber = 'Order EE-20004';
      cy.get('#mat-input-0', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(orderNumber)
        .should('have.value', orderNumber)
        .type('{enter}')
        .then(() => {
          cy.log(`✅ Numéro d'ordre saisi : ${orderNumber}`);
        });
  
      // Clic sur la ligne 1
      cy.get('td').eq(0)
        .should('be.visible')
        .click();
    })
})