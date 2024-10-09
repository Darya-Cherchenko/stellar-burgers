import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid } from 'uuid';

export interface TBurgerConstructor {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

export const sendOrderThunk = createAsyncThunk(
  'burgerConstructor/sendOrder',
  (data: string[]) => orderBurgerApi(data)
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id != action.payload.id
      );
    },
    addOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    addModalData: (state, action) => {
      state.orderModalData = action.payload;
    },
    addNullOrderModalData: (state) => {
      state.orderModalData = null;
    },
    moveIngredientDown: (state, action) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload + 1]
      ] = [
        state.ingredients[action.payload + 1],
        state.ingredients[action.payload]
      ];
    },
    moveIngredientUp: (state, action) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload - 1]
      ] = [
        state.ingredients[action.payload - 1],
        state.ingredients[action.payload]
      ];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrderThunk.fulfilled, (state, { payload }) => {
        state.bun = null;
        state.ingredients = [];
        state.orderRequest = false;
        state.orderModalData = payload.order;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(sendOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      });
  }
});

export const {
  addIngredients,
  deleteIngredient,
  addOrderRequest,
  addModalData,
  addNullOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;

export const { getConstructorSelector } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
