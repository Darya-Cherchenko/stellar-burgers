import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface TIngredients {
  ingredients: TIngredient[];
  isLoading: boolean;
  error?: string | null;
}

export const initialState: TIngredients = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload) {
          state.ingredients = action.payload;
        }
      })
      .addCase(getIngredientsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      });
  }
});

export const { getIngredientsSelector } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
