describe('E2E Page Pieces - Functional Sections', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('Search Functionality', () => {
    it('should perform search operations', () => {
      cy.get('main').should('be.visible');

      // Buscar por texto
      cy.get('input[type="text"]').type('drama');

      // Verificar que hay resultados
      cy.get('a[href^="/"]').should('be.visible');

      // Limpiar búsqueda
      cy.get('input[type="text"]').clear();
    });

    it('should change search criteria', () => {
      // Verificar que hay selector de criterio
      cy.get('select').should('be.visible');

      // Cambiar criterio si es un select
      cy.get('select').then(($select) => {
        if ($select.length > 0) {
          cy.get('select').select(1); // Seleccionar segundo criterio
        }
      });
    });
  });

  describe('Filter Controls', () => {
    it('should filter by genre', () => {
      cy.get('main').should('be.visible');

      // Hacer clic en filtro Drama
      cy.contains('button', 'Drama').click();

      // Verificar que sigue habiendo películas
      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);

      // Resetear filtro - hacer clic en el mismo género para deseleccionarlo
      cy.contains('button', 'Drama').click();
    });

    it('should sort movies', () => {
      cy.get('main').should('be.visible');

      // Hacer clic en ordenamiento por calificación
      cy.contains('button', 'Calificación').click();

      // Verificar que las películas siguen visibles
      cy.get('a[href^="/"]').should('have.length.greaterThan', 0);
    });
  });

  describe('Favorites Toggle', () => {
    it('should toggle favorites view', () => {
      cy.get('main').should('be.visible');

      // Buscar y hacer clic en toggle de favoritos
      cy.get('button').contains('⭐').click();

      // Verificar que el estado cambió
      cy.get('button').contains('⭐').should('exist');
    });
  });

  describe('Movie Creation Button', () => {
    it('should open movie creation modal', () => {
      cy.get('main').should('be.visible');

      // Hacer clic en botón de agregar película
      cy.get('button').contains('+').click();

      // Verificar que aparece un modal o formulario
      cy.get('form').should('be.visible');
    });
  });

  describe('Movie Cards', () => {
    it('should display movie information', () => {
      cy.get('main').should('be.visible');

      // Verificar que las tarjetas tienen información específica
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

      // Verificar que hay botones de favorito en las tarjetas usando texto real
      cy.get('span').contains('Favorito').should('have.length.greaterThan', 0);
    });
  });
});
