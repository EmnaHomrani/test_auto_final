// support/loginAndSearch.js
Cypress.Commands.add('loginAndSearch', () => {
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

    cy.get('#password', { timeout: 20000 }).should('be.visible')
      .type(Cypress.env('PASSWORD'), { log: false });

    cy.get('#linkValidForm', { timeout: 20000 }).should('be.visible')
      .click();
  });

  // Étape 3️⃣ : GASSI si redirection
  cy.url({ timeout: 30000 }).then((url) => {
    if (url.includes('gassi.sso.francetelecom.fr')) {
      cy.origin('https://gassi.sso.francetelecom.fr', () => {
        cy.url({ timeout: 30000 }).should('include', 'sso-test.infra.ftgroup');
      });
    }
  });

  // Étape 4️⃣ : Vérifie retour Portfolio
  cy.url({ timeout: 30000 }).should('include', '/Home/Portfolio');

  // Attendre un indicateur de chargement ou un élément parent
  cy.wait(10000); // Délai initial pour stabiliser
  cy.log('Vérification du DOM après chargement initial');
  cy.get('body', { timeout: 40000 }).should('be.visible').then(($body) => {
    cy.log('Contenu du body (premiers 500 caractères) :', $body.html().substring(0, 500)); // Loguer pour débogage
  });

  // Attendre un état où le contenu est visible (ajuster selon l'UI)
  cy.get('.main-navbar', { timeout: 40000 }).should('be.visible')
    .then(() => {
      cy.log('Navbar principale détectée, contenu probablement chargé');
    });

  // Recherche de la commande
  cy.window().then((win) => {
    cy.stub(win, 'open').callsFake((url) => {
      win.location.href = url;
    }).as('windowOpen');
  });

  // Cibler un élément cliquable contenant "USER QA" avec débogage
  cy.log('Recherche de l\'élément "USER QA"');
  cy.contains('USER QA', { timeout: 40000 })
  .should('be.visible')
  .then(($el) => {
    if ($el.length) {
      cy.wrap($el).click();
    } else {
      cy.log('Élément "USER QA" non trouvé, tentative alternative');
      cy.get('.navbar .dropdown-toggle', { timeout: 40000 })
        .should('be.visible')
        .click()
        .then(() => {
          cy.contains('USER QA', { timeout: 40000 })
            .should('be.visible')
            .parentsUntil('.main-navbar')
            .find('button, a')
            .should('be.visible')
            .and('be.enabled')
            .click();
        });
    }
  });

  // Vérifier la redirection vers OTB
 // Vérifier la redirection vers OTB
 cy.url({ timeout: 80000 })
 .should('include', 'order-management')
 .then((url) => {
   cy.log('Current URL after USER QA click:', url);
 });

  // Saisie automatique du numéro d'ordre
  const orderNumber = 'Order EE-10065';
  cy.get('#mat-input-0', { timeout: 20000 })
    .should('be.visible')
    .clear()
    .type(orderNumber)
    .should('have.value', orderNumber)
    .type('{enter}')
    .then(() => {
      cy.log(`✅ Numéro d'ordre saisi : ${orderNumber}`);
    });

  // Clic sur la ligne 1 avec vérification
  cy.get('td')
  .eq(0)
  .should('be.visible')      // ensure element exists
  .then(($td) => {
    const text = $td.text();
    expect(text).to.not.be.empty; // assert text is not empty
    cy.wrap($td).click();         // click the actual DOM element
  });


  // Vérifier que la page des détails est atteinte
  cy.get('app-order-details', { timeout: 20000 }).should('be.visible')
    .then(() => {
      cy.log('Page des détails de la commande chargée');
    });
});