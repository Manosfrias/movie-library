describe('E2E Components - Basic Interactive Elements', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('Buttons', () => {
    it('should have clickable movie cards', () => {
      cy.get('main').should('be.visible');
      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);
      cy.get('a[href^="/"]').first().should('not.be.disabled');
    });

    it('should have functional favorite buttons', () => {
      cy.get('main').should('be.visible');
      cy.get('span').contains('Favorito').should('exist');
      cy.contains('button', 'Mostrar Favoritas').should('be.visible');
    });

    it('should have navigation buttons', () => {
      cy.get('a[href^="/"]').first().click();
      cy.get('a[href="/"]').should('be.visible');
      cy.contains('Back to Home').should('be.visible');
    });
  });

  describe('Form Controls', () => {
    it('should have search input', () => {
      cy.get('input[type="text"]').should('be.visible');
      cy.get('input[placeholder*="Buscar películas"]').should('be.visible');
    });

    it('should have filter controls', () => {
      cy.get('button').should('have.length.greaterThan', 0);
      cy.contains('Drama').should('be.visible');
      cy.contains('Action').should('be.visible');
    });

    it('should have interactive elements', () => {
      cy.get('button').first().should('not.be.disabled');
      cy.get('input').first().should('not.be.disabled');
    });
  });

  describe('Modal Elements', () => {
    it('should show floating add button', () => {
      cy.get('button').contains('+').should('be.visible');
    });
  });
});
