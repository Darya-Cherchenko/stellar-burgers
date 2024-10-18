import { describe, test, expect } from '@jest/globals';
import ordersInfoSlice, {
  initialState,
  getOrderInfoThunk
} from './OrderInfoSlice';

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

describe('тест thunk getOrderInfoThunk', () => {
  let mockInitialState = initialState;

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('тест pending getOrderInfoThunk', () => {
    const action = {
      type: getOrderInfoThunk.pending.type,
      payload: null
    };

    mockInitialState = {
      ...mockInitialState,
      orders: [mockOrder],
      status: 'done',
      error: 'Error'
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      orders: [],
      status: 'loading',
      error: null
    });
  });

  test('тест fulfilled getOrderInfoThunk', () => {
    const action = {
      type: getOrderInfoThunk.fulfilled.type,
      payload: {
        orders: [mockOrder],
        total: 10,
        totalToday: 110
      }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      orders: [mockOrder],
      total: 10,
      totalToday: 110,
      status: 'done'
    });
  });

  test('тест rejected getOrderInfoThunk', () => {
    const action = {
      type: getOrderInfoThunk.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      status: 'done',
      error: 'Error'
    });
  });
});
