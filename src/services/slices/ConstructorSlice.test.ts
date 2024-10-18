import reducer from './ConstructorSlice';
import burgerConstructorSlice, {
  initialState,
  addIngredients,
  deleteIngredient,
  addOrderRequest,
  addModalData,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp
} from './ConstructorSlice';

import { describe, test, expect } from '@jest/globals';

describe('тест burgerConstructorSlice', () => {
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

  let mockInitialState = initialState;

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('проверка addIngredients', () => {
    const newState = reducer(
      initialState,
      addIngredients({ ingredients: mockIngredients })
    );
    expect(newState).toEqual({
      ...initialState,
      ingredients: [mockIngredients]
    });
  });

  test('проверка deleteIngredient', () => {
    mockInitialState = {
      ...initialState,
      ingredients: [mockIngredients[1]]
    };

    const newState = burgerConstructorSlice(
      initialState,
      deleteIngredient({ id: mockIngredients[1].id })
    );
    expect(newState).toEqual({
      ...initialState,
      ingredients: []
    });
  });

  test('проверка addOrderRequest', () => {
    const newStateTrue = burgerConstructorSlice(
      initialState,
      addOrderRequest(true)
    );
    const newStateFalse = burgerConstructorSlice(
      initialState,
      addOrderRequest(false)
    );

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
    const newState = burgerConstructorSlice(
      initialState,
      addModalData(mockModalData)
    );
    expect(newState).toEqual({
      ...initialState,
      orderModalData: mockModalData
    });
  });

  test('проверка clearConstructor', () => {
    mockInitialState = {
      bun: mockIngredients[0],
      ingredients: mockIngredients,
      orderRequest: true,
      orderModalData: mockOrder
    };

    const newState = burgerConstructorSlice(initialState, clearConstructor());

    expect(newState).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null
    });
  });

  test('проверка moveIngredientUp', () => {
    mockInitialState = {
      ...initialState,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };

    const newState = burgerConstructorSlice(
      initialState,
      moveIngredientUp(mockIngredients[2])
    );
    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[1]).toEqual(initialState.ingredients[0]);
    expect(newState.ingredients[0]).toEqual(initialState.ingredients[1]);
  });

  test('проверка moveIngredientDown', () => {
    mockInitialState = {
      ...initialState,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };

    const newState = burgerConstructorSlice(
      initialState,
      moveIngredientDown(mockIngredients[1])
    );
    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[0]).toEqual(initialState.ingredients[1]);
    expect(newState.ingredients[1]).toEqual(initialState.ingredients[0]);
  });
});
