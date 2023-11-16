import { configureStore } from '@reduxjs/toolkit';

/** state */
import { api } from './state/api';
import uploader from './state/uploader/uploader.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    uploader,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
