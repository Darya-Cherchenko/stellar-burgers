import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedSlice, { getFeedThunk, getOrdersThunk } from './FeedSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      feed: feedSlice
    }
  });

describe('Тесты ленты заказов', () => {
  describe('Тесты получения ленты заказов', () => {
    test('Тест ожидания ответа после запроса ленты заказов', () => {
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });
    test('Тест ошибки после запроса ленты заказов', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getFeedThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(error);
    });
    test('Тест успешного ответа получения ленты заказов', () => {
      const mockedPayload = {
        orders: {
          _id: '67100191d829be001c7769d4',
          ingredients: [
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Минеральный флюоресцентный spicy бессмертный бургер',
          createdAt: '2024-10-16T18:10:25.134Z',
          updatedAt: '2024-10-16T18:10:26.040Z',
          number: 56621
        },
        total: 56247,
        totalToday: 59
      };
      const store = setupStore();
      store.dispatch({
        type: getFeedThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedPayload.orders);
      expect(state.feed.total).toBe(mockedPayload.total);
      expect(state.feed.totalToday).toBe(mockedPayload.totalToday);
    });
  });
  describe('Тесты получения истории заказов', () => {
    test('Тест ожидания ответа после запроса истории заказов', () => {
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });
    test('Тест ошибки после запроса истории заказов', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(error);
    });
    test('Тест успешного ответа получения истории заказов', () => {
      const mockedPayload = {
        _id: '67100191d829be001c7769d4',
        ingredients: [
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Минеральный флюоресцентный spicy бессмертный бургер',
        createdAt: '2024-10-16T18:10:25.134Z',
        updatedAt: '2024-10-16T18:10:26.040Z',
        number: 56621
      };
      const store = setupStore();
      store.dispatch({
        type: getOrdersThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedPayload);
    });
  });
});