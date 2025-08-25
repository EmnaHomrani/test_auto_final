describe('Send the Service Completion Notice Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Send the Service Completion Notice', () => {
      // Cliquer sur "Product Id"
      cy.get('#headingLD-0328', { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    
      // Cliquer sur "Send the Service Completion Notice"
      cy.contains('span', 'Send the Service Completion Notice', { timeout: 10000 })
        .should('be.visible')
        .click();
    
      cy.wait(500);

      // 1. Ouvrir le calendrier
cy.get('p-calendar#serviceDeliveryDate')
.find('.p-datepicker-trigger')
.should('be.visible')
.click();

// 2. Attendre que le calendrier soit stable
cy.get('.p-datepicker')
.should('be.visible')
.should('not.have.class', 'ng-animating');

// 3. Sélectionner la bonne cellule de date (ex: 24)
cy.get('.p-datepicker td')
.contains(/^24$/) // Regex pour cibler exactement "24"
.should('have.length', 1) // Vérifie qu’il n’y a qu’un seul match
.click();

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