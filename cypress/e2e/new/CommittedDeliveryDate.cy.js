//CommittedDeliveryDate.cy.js



describe('Committed Delivery Date Modal', () => {
    before(() => {
        cy.loginAndSearch();
      });
    
    it('ouvre le modal et interagit avec le calendrier', () => {
        cy.contains('Committed Delivery Date')
      cy.get(':nth-child(4) > span > a[type="button"]',{ timeout: 10000 }).should('be.visible').should('not.be.disabled').click()
      .wait(500) // <- petit délai pour laisser l'event JS se monter
      cy.wait(10000);
      cy.get('ngb-modal-window').should('be.visible')
        /*
        .parent()
        .find('a[type="button"]')
        .should('exist')
        .should('be.visible')
        .then(($btn) => {
          if ($btn.length > 0) {
            cy.wrap($btn[0]).click({ force: true }); // wrap le DOM natif, pas le jQuery object
            cy.log('✅ Clic effectué sur le bouton Committed Delivery Date');
          } else {
            throw new Error('❌ Aucun bouton trouvé pour Committed Delivery Date');
          }
        });
      
      */
    })
  });
  