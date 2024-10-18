import ingredientsSlice, {
  getIngredientsThunk,
  initialState
} from './IngredientsSlice';

import { describe, test, expect } from '@jest/globals';

describe('тест getIngredientsThunk', () => {
  const expectedResult = [
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
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  let mockInitialState = initialState;

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('тест getIngredientsThunk.pending', () => {
    const action = {
      type: getIngredientsThunk.pending.type,
      payload: null
    };

    const newState = ingredientsSlice(mockInitialState, action);
    expect(newState).toEqual({
      ...mockInitialState,
      loading: true
    });
  });

  test('тест getIngredientsThunk.fulfilled', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: expectedResult
    };

    const newState = ingredientsSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      ingredients: expectedResult
    });
  });

  test('тест getIngredientsThunk.rejected', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ingredientsSlice(mockInitialState, action);
    expect(newState).toEqual({
      ...mockInitialState,
      error: 'Error'
    });
  });
});
