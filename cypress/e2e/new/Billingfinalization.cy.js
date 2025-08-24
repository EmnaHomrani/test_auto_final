describe('Billing finalization Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Billing finalization', () => {
      // Cliquer sur "Product Id"
      cy.contains('div', 'Product Id', { timeout: 15000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
    
      // Cliquer sur "Billing finalization"
      cy.contains('span', 'Billing finalization', { timeout: 10000 })
        .should('be.visible')
        .click();
    
      cy.wait(500);
    // Génère un nombre aléatoire entre 1000 et 9999
const randomNumber = Math.floor(1000 + Math.random() * 9000);

cy.get('[formcontrolname="prestationNumber"]')
  .clear() // au cas où le champ contient déjà une valeur
  .type(randomNumber.toString());

  function selectFirstOption(formControlName) {
    cy.get(`[formcontrolname="${formControlName}"]`).click({ force: true })
    cy.get('.cdk-overlay-container mat-option')
      .first()
      .click({ force: true })
  }
  
  // Utilisation :
  selectFirstOption('actionType')
  selectFirstOption('actionCause')
// 5. Liste déroulante "Statut"
cy.xpath(
    '/html/body/app-root/app-order-details/div/div[6]/app-offers-section/ngb-accordion/div[1]/div[2]/div/div/app-activity-section/div[3]/div/form/div[1]/div[2]/div/div[1]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span'
  )
    .should('be.visible')
    .click({ force: true });

  cy.get('.mat-select-panel', { timeout: 10000 })
    .should('exist')
    .should('not.have.class', 'ng-animating');

  cy.get('.mat-option-text')
    .contains('Completed')
    .scrollIntoView()
    .click({ force: true });
  
  // 6. Cliquer sur "Save"
  cy.contains('button', 'Save')
  .scrollIntoView()
  .should('be.visible')
  .should('not.be.disabled')
  .click({ force: true });


  cy.wait(500);
    });
    
  });