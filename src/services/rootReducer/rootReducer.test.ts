import { expect, test } from '@jest/globals';
import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import store from '../store';

test('проверка инициализации редьюсера rootReducer', () => {
  const newStore = configureStore({ reducer: rootReducer });
  expect(newStore.getState()).toEqual(store.getState());
});

test('rootReducer игнорирует unknown actions', () => {
  const newStore = configureStore({ reducer: rootReducer });
  const initialState = newStore.getState();

  newStore.dispatch({ type: 'UNKNOWN_ACTION' });

  expect(newStore.getState()).toEqual(initialState);
});
