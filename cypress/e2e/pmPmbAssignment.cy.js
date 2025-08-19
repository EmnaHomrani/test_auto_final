describe('PM/PMB Assignment Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Vérifie et complète PM/PMB Assignment', () => {
      cy.xpath('/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[3]/td[4]/span', { timeout: 10000 })
        .invoke('text')
        .then((status3) => {
          if (status3.trim() !== 'Completed') {
            cy.get('app-activity-section table tbody tr:nth-child(3) td:nth-child(2) span', { timeout: 10000 })
              .then(($span) => {
                if ($span.is(':visible')) {
                  cy.wrap($span)
                    .scrollIntoView()
                    .click({ force: true })
                    .then(() => {
                      cy.log('Clic sur PM/PMB Assignment');
                    });
  
                  cy.intercept('GET', '**/app/activity**').as('getActivity');
                  cy.wait('@getActivity', { timeout: 15000 }).then((interception) => {
                    cy.log('Requête activité terminée :', interception.response.statusCode);
                  });
  
                  cy.get('#mat-select-value-9', { timeout: 10000 })
                    .should('be.visible')
                    .click();
  
                  cy.intercept('GET', '/app/users*').as('getUsers');
                  cy.wait('@getUsers', { timeout: 10000 });
  
                  cy.get('.mat-option', { timeout: 10000 })
                    .contains('Guy ASSEMIEN')
                    .should('exist')
                    .should('be.visible')
                    .click({ force: true })
                    .then(() => {
                      cy.log('Guy ASSEMIEN sélectionné');
                    });
  
                  cy.xpath('/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[2]/div/div[1]/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span')
                    .should('be.visible')
                    .click({ force: true });
  
                  cy.get('.mat-option-text', { timeout: 10000 })
                    .contains('Completed')
                    .scrollIntoView()
                    .click({ force: true });
  
                  cy.contains('button', 'Quit')
                    .should('be.visible')
                    .click()
                    .then(() => {
                      cy.log('Clic sur Quit');
                    });
                } else {
                  cy.log('Span PM/PMB Assignment non visible');
                }
              });
          } else {
            cy.log('PM/PMB Assignment déjà terminé');
          }
        });
    });
  });