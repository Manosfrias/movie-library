describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the welcome message', () => {
    cy.contains('Welcome to Movie Library').should('be.visible');
  });

  it('should display the description', () => {
    cy.contains('Your personal movie collection manager').should('be.visible');
  });

  it('should have the correct page title', () => {
    cy.title().should('include', 'Movie Library');
  });
});
