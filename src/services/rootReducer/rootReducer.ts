import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSliceReducer from '../slices/IngredientsSlice';
import constructorSliceReducer from '../slices/ConstructorSlice';
import orderInfoSliceReducer from '../slices/OrderInfoSlice';
import userAuthSliceReducer from '../slices/UserAuthSlice';
import feedSliceReducer from '../slices/FeedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: constructorSliceReducer,
  orderInfo: orderInfoSliceReducer,
  user: userAuthSliceReducer,
  feed: feedSliceReducer
});

export default rootReducer;
