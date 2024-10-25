Cypress.Commands.add('addIngredients', (type) => {
  cy.get(`[data-cy="${type}"]`).children().first().children('button').click();
});
