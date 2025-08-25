describe('MARINE update Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à MARINE update', () => {
      // Cliquer sur "Product Id"
      cy.get('#headingLD-0328', { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    
      // Cliquer sur "MARINE update"
      cy.contains('span', 'MARINE update', { timeout: 10000 })
        .should('be.visible')
        .click();
    
      cy.wait(500);
    
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
    .should('be.visible')
    .should('not.be.disabled')
    .click();

  cy.wait(500);
    });
    
  });