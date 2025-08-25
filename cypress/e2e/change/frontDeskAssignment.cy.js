describe('Front Desk Assignment Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Vérifie et complète Front Desk assignment', () => {
      cy.log('Vérification de la structure DOM actuelle :');
      cy.get('body').then(($body) => {
        cy.log('Contenu du body :', $body.html());
      });
  
      cy.xpath('/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[1]/td[2]/span', { timeout: 20000 })
        .invoke('text')
        .then((status1) => {
          cy.log(`Statut de Front Desk assignment : ${status1.trim()}`);
          if (status1.trim() !== 'Completed') {
            cy.xpath('/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[2]/table/tbody/tr[1]/td[2]/span', { timeout: 20000 })
              .should('contain.text', 'Front Desk assignment')
              .should('be.visible')
              .click();
  
            cy.wait(2000);
  
            cy.xpath('/html/body/app-root/app-order-details/div/div[5]/app-order-qualification/div/div[2]/div/div[2]/app-activity-section/div[3]/div/form/div[1]/div[1]/div/app-fd-assignment/div/form/div/div/div/div[2]/button', { timeout: 20000 })
              .should('contain.text', 'Assign to me')
              .should('be.visible')
              .should('not.be.disabled')
              .click({ force: true });
  
            cy.get('mat-select', { timeout: 20000 }).eq(1).as('statusSelect');
            cy.get('@statusSelect').click();
            cy.get('span.mat-option-text', { timeout: 20000 })
              .contains('Completed')
              .should('be.visible')
              .click();
            cy.get('@statusSelect')
              .should('contain.text', 'Completed');
            cy.get('@statusSelect').find('.mat-select-value-text')
              .should('contain.text', 'Completed');
            cy.contains('button', 'Save', { timeout: 20000 })
              .should('be.visible')
              .should('not.be.disabled')
              .click();
  
            cy.wait(5000);
          } else {
            cy.log('Front Desk assignment déjà terminé');
          }
        });
    });
  });