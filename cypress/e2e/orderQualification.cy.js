describe('Order Qualification Workflow', () => {
    before(() => {
      cy.loginAndSearch();
    });
  
    it('Passe à Order Qualification', () => {
      proceedToOrderQualification();
    });
  
    // Fonction pour passer à Order Qualification
    function proceedToOrderQualification() {
      cy.intercept('GET', '**/app/activity**').as('getNextActivity');
      cy.wait('@getNextActivity', { timeout: 15000, failOnStatusCode: false }).then((interception) => {
        if (interception && interception.response && interception.response.statusCode === 200) {
          cy.log('Requête suivante terminée :', interception.response.statusCode);
        } else {
          cy.log('Aucune requête activité supplémentaire ou requête échouée, poursuite');
        }
  
        cy.get('span[placement="bottom"][tooltipclass="otb-tooltip"]')
          .contains('Order Qualification')
          .should('exist', { timeout: 15000 })
          .should('be.visible', { timeout: 15000 })
          .scrollIntoView()
          .click({ force: true })
          .then(() => {
            cy.log('Clic sur Order Qualification');
          });
  
        cy.get('.activity-details', { timeout: 10000 })
          .should('be.visible')
          .should('contain', 'Order Qualification')
          .then(() => {
            cy.log('Activité Order Qualification visible');
          });
      });
    }
  });