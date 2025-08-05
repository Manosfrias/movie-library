describe('E2E Page Pieces - Functional Sections', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('Search Functionality', () => {
    it('should perform search operations', () => {
      cy.get('main').should('be.visible');

      cy.get('input[type="text"]').type('drama');

      cy.get('a[href^="/"]').should('be.visible');

      cy.get('input[type="text"]').clear();
    });

    it('should change search criteria', () => {
      cy.get('select').should('be.visible');

      cy.get('select').then(($select) => {
        if ($select.length > 0) {
          cy.get('select').select(1);
        }
      });
    });
  });

  describe('Filter Controls', () => {
    it('should filter by genre', () => {
      cy.get('main').should('be.visible');

      cy.contains('button', 'Drama').click();

      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);

      cy.contains('button', 'Drama').click();
    });

    it('should sort movies', () => {
      cy.get('main').should('be.visible');

      cy.contains('button', 'Calificación').click();

      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);
    });
  });

  describe('Favorites Toggle', () => {
    it('should toggle favorites view', () => {
      cy.get('main').should('be.visible');

      cy.get('button').contains('⭐').click();

      cy.get('button').contains('⭐').should('exist');
    });
  });

  describe('Movie Creation Button', () => {
    it('should open movie creation modal', () => {
      cy.get('main').should('be.visible');

      cy.get('button').contains('+').click();

      cy.get('form').should('be.visible');
    });
  });

  describe('Movie Cards', () => {
    it('should display movie information', () => {
      cy.get('main').should('be.visible');

      cy.get('h3').should('have.length.greaterThan', 0);
      cy.get('a[class*="card"]')
        .first()
        .within(() => {
          cy.get('h3').should('exist');
          cy.get('h3').should('not.be.empty');
        });
    });

    it('should have favorite buttons on cards', () => {
      cy.get('main').should('be.visible');

      cy.get('span').contains('Favorito').should('have.length.greaterThan', 0);
    });
  });
});
