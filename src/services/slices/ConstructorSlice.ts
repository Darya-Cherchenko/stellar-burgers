import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

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
    addIngredients: (state, action) => {
      state.ingredients.push(action.payload.ingredient);
    },
    addBun: (state, action) => {
      state.bun = action.payload.ingredient;
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
  addBun,
  deleteIngredient,
  addOrderRequest,
  addModalData,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;

export const { getConstructorSelector } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
