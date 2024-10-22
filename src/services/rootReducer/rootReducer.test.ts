import { expect, test, describe } from '@jest/globals';
import rootReducer from './rootReducer';
import { initialState as ingredientsInitialState } from '../slices/IngredientsSlice';
import { initialState as feedInitialState } from '../slices/FeedSlice';
import { initialState as userInitialState } from '../slices/UserAuthSlice';
import { initialState as constructorInitialState } from '../slices/ConstructorSlice';
import { initialState as orderInfoInitialState } from '../slices/OrderInfoSlice';

describe('Тест корневого редьюсера', () => {
  const initialState = {
    user: { ...userInitialState },
    feed: { ...feedInitialState },
    order: { ...orderInfoInitialState },
    ingredients: { ...ingredientsInitialState },
    constructorbg: { ...constructorInitialState }
  };
  test('Тест инициализации корневого редьюсера', () => {
    const action = { type: 'UNKNOW_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});
