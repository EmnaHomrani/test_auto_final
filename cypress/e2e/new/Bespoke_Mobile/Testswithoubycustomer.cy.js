describe('Tests with / by customer Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Tests with / by customer', () => {
      // Cliquer sur "Product Id"
      cy.get('#headingLD-0326', { timeout: 15000 })
.scrollIntoView()
.should('be.visible')
.click({ force: true });
    
      // Cliquer sur "Front Desk disconnection management"
      cy.contains('span', 'Tests with / by customer', { timeout: 10000 })
        .should('be.visible')
        .click();
    
      cy.wait(500);

    	    function selectFirstOption(formControlName) {
      cy.get(`[formcontrolname="${formControlName}"]`).click({ force: true })
      cy.get('.cdk-overlay-container mat-option')
        .first()
        .click({ force: true })
    }
    
    // Utilisation :
    
    selectFirstOption('testsResults')
    
  // 5. Liste déroulante "Statut"
cy.xpath(
    '/html/body/app-root/app-order-details/div/div[6]/app-offers-section/ngb-accordion/div[2]/div[2]/div/div/app-activity-section/div[3]/div/form/div[1]/div[2]/div/div[1]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span'
  )
    .should('be.visible')
    .click({ force: true });
  
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