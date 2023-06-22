import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './state/reducer';

export const store = configureStore({
  reducer,
});

export default store;
