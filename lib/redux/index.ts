import {
  createAsyncThunk as reduxCreateAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  useDispatch as reduxUseDispatch,
  useSelector as reduxUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import type { makeStore } from './store';

export * from '@reduxjs/toolkit';

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useDispatch: () => AppDispatch = reduxUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
export const createAsyncThunk = reduxCreateAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export interface ThunkStatus {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: null | SerializedError | string | undefined;
}
