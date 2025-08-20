describe('PM/PMB Assignment Workflow', () => {
  before(() => {
    cy.loginAndSearch();
  });

  it('Vérifie et complète PM/PMB Assignment', () => {
    // 1. Cliquer sur l'élément pour accéder à la section
    cy.xpath(
      '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[3]/td[2]/span',
      { timeout: 10000 }
    )
      .should('be.visible')
      .click({ force: true });

    // 1. Intercepter les requêtes réseau
cy.intercept('GET', '**/app/action-history*').as('getActionHistory');

// 2. Attendre que le mat-select soit prêt
cy.get('[formcontrolname="pmUser"]', { timeout: 15000 })
  .should('be.visible')
  .should('not.have.class', 'ng-animating')
  .should('not.be.disabled')
  .should('have.attr', 'aria-disabled', 'false')
  .should('have.attr', 'aria-expanded', 'false')
  .screenshot('before-click');

// 3. Cliquer sur le select pour ouvrir la liste
cy.get('[formcontrolname="pmUser"] .mat-select-trigger')
  .click({ force: true });

// 4. Vérifier que le menu est ouvert
cy.get('[formcontrolname="pmUser"]')
  .should('have.attr', 'aria-expanded', 'true');

// 5. Attendre la requête réseau
cy.wait('@getActionHistory', { timeout: 15000 })
  .its('response.statusCode')
  .should('eq', 200);

// 6. Attendre et cliquer sur l’option "Guy ASSEMIEN"
cy.get('.mat-select-panel mat-option', { timeout: 15000 })
  .should('exist')
  .contains('Guy ASSEMIEN')
  .click({ force: true });

// 7. Vérifier que la sélection est bien appliquée
cy.get('[formcontrolname="pmUser"]')
  .should('contain.text', 'Guy ASSEMIEN');


    // 5. Ouvrir la liste déroulante "Statut"
    cy.xpath('/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[2]/div/div[1]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span')
      .should('be.visible')
      .click({ force: true });

    // 6. Attendre que le panel de statut soit visible
    cy.get('.mat-select-panel', { timeout: 10000 })
      .should('exist')
      .should('not.have.class', 'ng-animating');

    // 7. Sélectionner le statut "Completed"
    cy.contains('.mat-option-text', 'Completed')
      .scrollIntoView()
      .click({ force: true });

    // 8. Cliquer sur le bouton Save
    cy.contains('button', 'Save')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.wait(500);
  });
});