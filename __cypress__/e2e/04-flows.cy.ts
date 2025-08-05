describe('E2E Flows - Complete User Journeys', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('Browse and Discover Flow', () => {
    it('should complete full browsing experience', () => {
      cy.get('main').should('be.visible');
      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);

      cy.contains('button', 'Drama').click();
      cy.get('a[href^="/"]').should('be.visible');

      cy.get('input[type="text"]').type('action');
      cy.get('a[href^="/"]').should('be.visible');

      cy.get('input[type="text"]').clear();
      cy.get('a[href^="/"]').first().click();
      cy.get('h1').should('be.visible');

      cy.contains('Back to Home').click();
      cy.get('main').should('be.visible');
    });
  });

  describe('Favorites Management Flow', () => {
    it('should complete favorites workflow using API', () => {
      cy.visit('/');

      cy.get('a[class*="card"]').should('have.length.greaterThan', 0);

      cy.get('a[class*="card"]')
        .first()
        .within(() => {
          cy.get('span').contains('Favorito').click();
        });

      cy.contains('button', 'Mostrar Favoritas').should('be.visible');
      cy.contains('button', 'Mostrar Favoritas').click();

      cy.get('a[class*="card"]').should('have.length.greaterThan', 0);

      cy.get('a[class*="card"]')
        .first()
        .within(() => {
          cy.get('span').contains('Favorito').should('be.visible');
        });

      cy.contains('button', 'Mostrar Todas').click();
    });
  });

  describe('Content Creation Flow', () => {
    it('should complete movie creation and management using API', () => {
      cy.visit('/');

      cy.get('a[class*="card"]').should('have.length.greaterThan', 0);

      cy.get('a[class*="card"]').first().click();

      cy.url().should('match', /\/\d+$/);
      cy.get('h1').should('be.visible');

      cy.contains('button', 'Editar').click();

      cy.get('form, input[type="text"]').should('be.visible');

      cy.get('input[type="text"]').first().clear();
      cy.get('input[type="text"]').first().type('Película Editada E2E');

      cy.contains('button', 'Guardar').click();

      cy.contains('Película Editada E2E').should('be.visible');

      cy.contains('button', 'Eliminar').click();

      cy.get('body').then(($body) => {
        if ($body.find('button').filter(':contains("Confirmar")').length > 0) {
          cy.contains('button', 'Confirmar').click();
        } else if (
          $body.find('button').filter(':contains("Eliminar")').length > 1
        ) {
          cy.get('button').contains('Eliminar').last().click();
        }
      });

      cy.get('body').should('be.visible');

      cy.visit('/');
      cy.get('main').should('be.visible');
    });
  });

  describe('Search and Filter Flow', () => {
    it('should complete comprehensive search experience', () => {
      cy.visit('/');

      cy.get('input[type="text"]').type('drama');
      cy.get('a[class*="card"]').should('be.visible');

      cy.get('input[type="text"]').clear();

      cy.contains('button', 'Drama').click();
      cy.get('a[class*="card"]').should('be.visible');

      cy.contains('button', 'Por Calificación').click();
      cy.get('a[class*="card"]').should('be.visible');

      cy.contains('button', 'Acción').click();
      cy.get('a[class*="card"]').should('be.visible');
    });
  });

  describe('Cross-Page Navigation Flow', () => {
    it('should navigate seamlessly between pages', () => {
      cy.get('main').should('be.visible');

      cy.get('a[href^="/"]').first().click();
      cy.get('h1').should('be.visible');

      cy.get('a[href="/"]').click();
      cy.get('main').should('be.visible');

      cy.get('button').contains('+').click();
      cy.get('form').should('be.visible');

      cy.get('body').then(($body) => {
        if ($body.find('button').filter(':contains("Cancelar")').length > 0) {
          cy.contains('button', 'Cancelar').click();
        }
      });

      cy.get('main').should('be.visible');
    });
  });
});
