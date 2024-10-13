import { getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface TOrderState {
  orders: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: TOrderState = {
  orders: null,
  isLoading: false,
  error: null
};

export const getOrderInfoThunk = createAsyncThunk(
  'feed/getOrders',
  (number: number) => getOrderByNumberApi(number)
);

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderInfoSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfoThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderInfoThunk.fulfilled, (state, { payload }) => {
        state.orders = payload.orders[0];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrderInfoThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      });
  }
});

export const { getOrderInfoSelector } = orderInfoSlice.selectors;
export default orderInfoSlice.reducer;
