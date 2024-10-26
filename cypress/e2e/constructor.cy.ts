import { deleteCookie, setCookie } from '../../src/utils/cookie';

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDUzZDA2MTNhMmI3MDAxYzhmMGFlNyIsImlhdCI6MTcyOTEwMjIyNCwiZXhwIjoxNzI5MTAzNDI0fQ.9kepizWAnH0sXz6z20L8Pgo7iyr6y-CgM8EbkTRaXpI',
    );
    localStorage.setItem(
      'refreshToken',
      'b81e17825a3f41fa458782c4eff3198c536689154380040d006fab3519188c8be69761e7c2a6625e'
    );
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('GET', `api/login`, { fixture: 'user.json' }).as(
      'getUserLogin'
    );
    cy.visit('/');
  });
  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
  it('Тест получения списка ингредиентов с сервера', () => {
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.addIngredients('Булки');
    cy.addIngredients('Начинки');

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
  it('Тест открытия и закрытия модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('@modal').should('exist');

    cy.get('[data-cy="modal-overlay"]').click('left', { force: true });
    cy.get('@modal').should('not.exist');
  });
  it('Тест создания заказа', () => {
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as(
      'orderBurgerApi'
    );
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.addIngredients('Булки');
    cy.addIngredients('Начинки');

    cy.get('@constructor').children('div').children('button').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '56589');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('@constructor').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');
  });
});
