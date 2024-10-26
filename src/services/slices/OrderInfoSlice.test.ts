import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { getOrderInfoThunk } from './OrderInfoSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('Тест заказа', () => {
  describe('Тесты получения данных заказа', () => {
    test('Тест ожидания ответа после получения данных заказа', () => {
      const store = setupStore();
      store.dispatch({ type: getOrderInfoThunk.pending.type });
      const state = store.getState();
      expect(state.order.isLoading).toBeTruthy();
      expect(state.order.error).toBeNull();
    });
    test('Тест ошибки после получения данных заказа', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrderInfoThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBe(error);
    });
    test('Тест успешного ответа после получения данных заказа', () => {
      const mockedPayload = {
        orders: [
          {
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
          }
        ]
      };
      const store = setupStore();
      store.dispatch({
        type: getOrderInfoThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBeNull();
      expect(state.order.orders).toEqual(mockedPayload.orders[0]);
    });
  });
});
