describe('Delivery Prerequisites Check Workflow', () => {
  before(() => {
    cy.loginAndSearch();
  });

  it('Vérifie et complète Delivery prerequisites check', () => {
    // Cliquer sur "Delivery prerequisites check"
    cy.xpath(
      '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[2]/td[2]/span',
      { timeout: 10000 }
    )
      .should('contain.text', 'Delivery prerequisites check')
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
cy.get('[formControlName="salesDoc"]', { timeout: 15000 })
  .should('be.visible')
  .should('not.have.class', 'ng-animating');

// Select the "OK" option using the new XPath
cy.xpath('/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span', { timeout: 10000 })
  .should('be.visible')
  .contains('OK') // Verify the text is "OK"
  .click({ force: true });

    // 2. Deuxième liste déroulante
    cy.xpath(
      '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[1]/div/app-prerequisites-check-common-activity/div/form/div[3]/div/div[1]/div[2]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span',
      { timeout: 10000 }
    )
      .should('be.visible')
      .click({ force: true });
    
    // 2. Attendre que le panel d’options apparaisse dans le DOM
    cy.get('[formControlName="preSalesDocValueWorkable"]', { timeout: 15000 })
    .should('be.visible')
    .should('not.have.class', 'ng-animating');
    
    // 3. Cliquer sur l’option "Yes" en ciblant le span à l’intérieur du panel
    cy.xpath('/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span', { timeout: 15000 })
  .contains('Yes') // Verify the text is "Yes"
  .should('be.visible')
  .click({ force: true });

// 3. Troisième liste déroulante
cy.xpath(
  '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[1]/div/app-prerequisites-check-common-activity/div/form/div[3]/div/div[2]/div/div[1]/div[2]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span',
  { timeout: 10000 }
)
  .scrollIntoView() // Scroll the dropdown trigger into view
  .should('be.visible')
  .click({ force: true }); // Click to open the dropdown

// Wait for the dropdown panel to appear and be visible
cy.get('[formControlName="pmActionRequired"]', { timeout: 10000 })
  .should('exist')
  .should('be.visible'); // Ensure the panel is visible

// Select the "Yes" option
cy.get('div.mat-select-panel', { timeout: 10000 })
  .contains('span.mat-option-text', 'Yes')
  .should('be.visible')
  .click({ force: true });

    // 4. Quatrième liste déroulante
    cy.xpath(
      '/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[1]/div/app-prerequisites-check-common-activity/div/form/div[3]/div/div[2]/div/div[2]/div[2]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span',
      { timeout: 10000 }
    )
    .scrollIntoView() // Scroll the dropdown trigger into view
    .should('be.visible')
    .click({ force: true }); // Click to open the dropdown
  
  // Wait for the dropdown panel to appear and be visible
  cy.get('div.mat-select-panel', { timeout: 10000 })
    .should('exist')
    .should('be.visible'); // Ensure the panel is visible
  
  // Select the "Yes" option
  cy.get('div.mat-select-panel', { timeout: 10000 })
    .contains('span.mat-option-text', 'Yes')
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
