describe('FrontDeskdisconnectionmanagement Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à ProjectManagerdisconnectionmanagement', () => {
      // Cliquer sur "Product Id"
      cy.contains('div', 'Product Id', { timeout: 15000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
    
      // Cliquer sur "Front Desk disconnection management"
      cy.contains('span', 'Project Manager disconnection management', { timeout: 10000 })
        .should('be.visible')
        .click();
    
      cy.wait(500);

    
     // 5. Liste déroulante "Statut"
     cy.xpath(
      '/html/body/app-root/app-order-details/div/div[6]/app-offers-section/ngb-accordion/div/div[2]/div/div/app-activity-section/div[3]/div/form/div[1]/div[2]/div/div[1]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span'
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