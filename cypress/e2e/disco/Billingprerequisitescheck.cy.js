describe('Billingprerequisitescheck Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Billingprerequisitescheck', () => {
      cy.xpath(
        '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[5]/td[2]/span',
        { timeout: 10000 }
      )
        .should('contain.text', 'Billing prerequisites check')
        .should('be.visible')
        .click();
  
      cy.wait(500);
  
// 1. Première liste déroulante
cy.xpath(
    '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[1]/div/app-prerequisites-check-common-activity/div/form/div[1]/div/div[1]/div[2]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span',
    { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
  
  // Wait for the dropdown panel to be visible and not animating
  cy.get('[formcontrolname="salesDoc"]', { timeout: 15000 })
    .should('be.visible')
    .should('not.have.class', 'ng-animating');
  
  // Select the "OK" option using the new XPath
  cy.xpath('/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span', { timeout: 10000 })
    .should('be.visible')
    .contains('OK') // Verify the text is "OK"
    .click({ force: true });

  
     // 2. Deuxième liste déroulante
cy.get('[formcontrolname="lastBillRequired"]', { timeout: 15000 })
.should('not.have.class', 'ng-animating')
.should('be.visible')
.click({ force: true });

        

// Select the "OK" option using the new XPath
cy.xpath('/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span', { timeout: 10000 })
.contains('Yes') // Verify the text is "Yes"
.should('be.visible')
.click({ force: true });


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