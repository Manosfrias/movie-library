describe('E2E Views - Page-Level Functionality', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('Home Page View', () => {
    it('should load home page with movies from API', () => {
      // Verificar que la página principal carga
      cy.get('main').should('be.visible');

      // Verificar que hay películas cargadas desde API
      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);

      // Verificar elementos principales de la página
      cy.get('h1').should('be.visible');
      cy.get('input').should('be.visible');
    });

    it('should handle search and filtering on home page', () => {
      cy.get('main').should('be.visible');

      // Realizar búsqueda
      cy.get('input[type="text"]').type('action');
      cy.get('a[href^="/"]').should('be.visible');

      // Aplicar filtro
      cy.get('input[type="text"]').clear();
      cy.contains('button', 'Drama').click();
      cy.get('a[href^="/"]').should('be.visible');
    });

    it('should manage favorites on home page', () => {
      cy.get('main').should('be.visible');

      // Marcar una película como favorita usando el badge real
      cy.get('span').contains('Favorito').first().click();

      // Filtrar solo favoritos usando el botón real
      cy.contains('button', 'Mostrar Favoritas').click();

      // Debería haber al menos una película
      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);
    });
  });

  describe('Movie Detail View', () => {
    it('should navigate to and display movie details', () => {
      cy.get('main').should('be.visible');

      // Hacer clic en primera película
      cy.get('a[href^="/"]').first().click();

      // Verificar que cargó la página de detalles
      cy.url().should('not.eq', Cypress.config().baseUrl + '/');
      cy.get('h1').should('be.visible');

      // Verificar que hay información de la película
      cy.contains('Director').should('be.visible');
      cy.contains(/\d{4}/).should('be.visible'); // Año
    });

    it('should edit movie from detail view', () => {
      cy.get('main').should('be.visible');
      cy.get('a[href^="/"]').first().click();

      // Entrar en modo edición
      cy.contains('button', 'Editar').click();

      // Verificar que aparecen inputs de edición
      cy.get('input[type="text"]').should('be.visible');
      cy.get('input[type="number"]').should('be.visible');
    });

    it('should navigate back from detail view', () => {
      cy.get('main').should('be.visible');
      cy.get('a[href^="/"]').first().click();

      // Regresar al home
      cy.get('a[href="/"]').click();

      // Verificar que regresamos a la página principal
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('main').should('be.visible');
    });
  });

  describe('Movie Creation View', () => {
    it('should create new movie', () => {
      cy.get('main').should('be.visible');

      // Abrir modal de creación
      cy.get('button').contains('+').click();

      // Llenar formulario con placeholders reales
      cy.get('input[placeholder*="Ej. El Padrino"]').type('Test Movie View');
      cy.get('input[placeholder*="Ej. Francis Ford Coppola"]').type(
        'Test Director'
      );
      cy.get('input[type="number"]').first().type('2025');
      cy.get('form select').select(1); // Selecciona el select dentro del formulario del modal
      cy.get('input[type="number"]').last().type('8.5');

      // Guardar
      cy.contains('button', 'Guardar').click();

      // Verificar que aparece en la lista
      cy.contains('Test Movie View').should('be.visible');
    });
  });
});
