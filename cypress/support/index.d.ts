declare namespace Cypress {
  interface Chainable {
    addIngredients(ingredientName: string): Chainable<Element>;
  }
}
