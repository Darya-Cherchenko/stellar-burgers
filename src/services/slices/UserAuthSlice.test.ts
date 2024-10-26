import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userSlice, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserThunk
} from './UserAuthSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userSlice
    }
  });

describe('Тесты авторизации пользовтеля', () => {
  describe('Тесты запроса логина', () => {
    test('Тест ожидания ответа после запроса логина', () => {
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса логина', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: loginUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешного логина', () => {
      const mockedPayload = {
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDUzZDA2MTNhMmI3MDAxYzhmMGFlNyIsImlhdCI6MTcyOTEwMjIyNCwiZXhwIjoxNzI5MTAzNDI0fQ.9kepizWAnH0sXz6z20L8Pgo7iyr6y-CgM8EbkTRaXpI',
        refreshToken:
          'b81e17825a3f41fa458782c4eff3198c536689154380040d006fab3519188c8be69761e7c2a6625e',
        user: {
          email: 'raccoon.raccoonov@yandex.ru',
          name: 'Енот'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: loginUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
    });
  });

  describe('Тест запроса регистрации', () => {
    test('Тест ожидания ответа после запроса регистрации', () => {
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса регистрации', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: registerUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешной регистрации', () => {
      const mockedPayload = {
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDUzZDA2MTNhMmI3MDAxYzhmMGFlNyIsImlhdCI6MTcyOTEwMjIyNCwiZXhwIjoxNzI5MTAzNDI0fQ.9kepizWAnH0sXz6z20L8Pgo7iyr6y-CgM8EbkTRaXpI',
        refreshToken:
          'b81e17825a3f41fa458782c4eff3198c536689154380040d006fab3519188c8be69761e7c2a6625e',
        user: {
          email: 'raccoon.raccoonov@yandex.ru',
          name: 'Енот'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: registerUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
    });
  });

  describe('Тест запроса логаута', () => {
    test('Тест ожидания ответа после запроса логаута', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса логаута', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: logoutUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешного логаута', () => {
      const mockedPayload = {
        message: 'Successful logout'
      };
      const store = setupStore();
      store.dispatch({
        type: logoutUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест запроса изменения данных клиента', () => {
    test('Тест ожидания ответа после запроса изменения данных клиента', () => {
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса изменения данных клиента', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: updateUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешного изменения данных клиента', () => {
      const mockedPayload = {
        user: {
          email: 'raccoon.raccoonov@yandex.ru',
          name: 'Енот'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: updateUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
    });
  });

  describe('Тест запроса восстановления пароля', () => {
    test('Тест ожидания ответа после запроса восстановления пароля', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса восстановления пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: forgotPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешного восстановления пароля', () => {
      const mockedPayload = {
        message: 'Reset email sent'
      };
      const store = setupStore();
      store.dispatch({
        type: forgotPasswordThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест запроса изменения пароля', () => {
    test('Тест ожидания ответа после запроса изменения пароля', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса изменения пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: resetPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешного изменения пароля', () => {
      const mockedPayload = {
        message: 'Password successfully reset'
      };
      const store = setupStore();
      store.dispatch({
        type: resetPasswordThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест запроса данных пользователя', () => {
    test('Тест ожидания ответа после запроса данных пользователя', () => {
      const store = setupStore();
      store.dispatch({ type: getUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест ошибки после запроса данных пользователя', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест успешного запроса данных пользователя', () => {
      const mockedPayload = {
        user: {
          email: 'raccoon.raccoonov@yandex.ru',
          name: 'Енот'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: getUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
    });
  });
});
