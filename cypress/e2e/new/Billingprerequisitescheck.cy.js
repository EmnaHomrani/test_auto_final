describe('Billing prerequisites check Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Billing prerequisites check', () => {
      cy.xpath(
        '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[8]/td[2]/span',
        { timeout: 10000 }
      )
        .should('contain.text', 'Billing prerequisites check')
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
      selectFirstOption('customerCreationRequired')
      selectFirstOption('salesDoc')

  
      // 5. Liste déroulante "Statut"
      cy.xpath(
        '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[2]/div/div[1]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span'
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