import reducer, {
  initialState,
  addIngredients,
  deleteIngredient,
  addOrderRequest,
  addModalData,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp,
  TBurgerConstructor
} from './ConstructorSlice';

import { describe, test, expect } from '@jest/globals';

describe('тест burgerConstructorSlice', () => {
  const startState: TBurgerConstructor = JSON.parse(
    JSON.stringify(initialState)
  );
  const mockIngredients = [
    {
      id: '0',
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      id: '1',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      id: '2',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  const mockModalData = {
    success: true,
    name: 'Краторный био-марсианский бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        }
      ],
      _id: '670f6d98d829be001c77680c',
      owner: {
        name: 'Енот',
        email: 'raccoon.raccoonov@yandex.ru',
        createdAt: '2024-10-08T14:09:10.712Z',
        updatedAt: '2024-10-09T16:59:39.106Z'
      },
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-10-16T07:39:04.368Z',
      updatedAt: '2024-10-16T07:39:05.290Z',
      number: 56589,
      price: 2934
    }
  };
  const mockOrder = {
    _id: '670f6d98d829be001c77680c',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-10-16T07:39:04.368Z',
    updatedAt: '2024-10-16T07:39:05.290Z',
    number: 56589
  };

  test('проверка addIngredients', () => {
    const newState = reducer(initialState, addIngredients(mockIngredients[1]));
    expect(newState.ingredients[0]).toEqual({
      ...mockIngredients[1],
      id: expect.any(String)
    });
    expect(newState.ingredients.length).toBe(1);
  });

  test('проверка deleteIngredient', () => {
    const mockInitialState = {
      ...initialState,
      ingredients: [mockIngredients[0]]
    };

    const newState = reducer(
      mockInitialState,
      deleteIngredient({ id: mockIngredients[0].id })
    );
    expect(newState.ingredients).toEqual([]);
  });

  test('проверка addOrderRequest', () => {
    const newStateTrue = reducer(initialState, addOrderRequest(true));
    const newStateFalse = reducer(initialState, addOrderRequest(false));

    expect(newStateTrue).toEqual({
      ...initialState,
      orderRequest: true
    });

    expect(newStateFalse).toEqual({
      ...initialState,
      orderRequest: false
    });
  });

  test('проверка addModalData', () => {
    const newState = reducer(initialState, addModalData(mockModalData));
    expect(newState.orderModalData).toEqual(mockModalData);
  });

  test('проверка clearConstructor', () => {
    const mockInitialState = {
      ...initialState,
      bun: mockIngredients[0],
      ingredients: mockIngredients
    };

    const newState = reducer(mockInitialState, clearConstructor());

    expect(newState).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    });
  });

  test('проверка moveIngredientUp', () => {
    const ingredientId = 1;
    const endState: TBurgerConstructor = JSON.parse(JSON.stringify(startState));
    [
      endState.ingredients[ingredientId],
      endState.ingredients[ingredientId - 1]
    ] = [
      endState.ingredients[ingredientId - 1],
      endState.ingredients[ingredientId]
    ];

    const newState = reducer(startState, moveIngredientUp(ingredientId));

    expect(newState).toEqual(endState);
  });

  test('проверка moveIngredientDown', () => {
    const ingredientId = 0;
    const endState: TBurgerConstructor = JSON.parse(JSON.stringify(startState));
    [
      endState.ingredients[ingredientId],
      endState.ingredients[ingredientId + 1]
    ] = [
      endState.ingredients[ingredientId + 1],
      endState.ingredients[ingredientId]
    ];

    const newState = reducer(startState, moveIngredientDown(ingredientId));

    expect(newState).toEqual(endState);
  });
});
