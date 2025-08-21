describe('Order Qualification Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Order Qualification', () => {
      cy.xpath(
        '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[4]/td[2]/span',
        { timeout: 10000 }
      )
        .should('contain.text', 'Order Qualification')
        .should('be.visible')
        .click();
  
      cy.wait(500);
  
     // 2. Deuxième liste déroulante
    cy.xpath(
      '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[1]/div/app-prerequisites-check-common-activity/div/form/div/div/div[1]/div[2]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span',
      { timeout: 10000 }
    )
      .should('be.visible')
      .click({ force: true });
    
    // 2. Attendre que le panel d’options apparaisse dans le DOM
    cy.get('[formcontrolname="salesDoc"]', { timeout: 15000 })
    .should('be.visible')
    .should('not.have.class', 'ng-animating');
    
    // 3. Cliquer sur l’option "Yes" en ciblant le span à l’intérieur du panel
    cy.xpath('/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span', { timeout: 15000 })
  .contains('OK') // Verify the text is "OK"
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