import { createSlice } from '@/lib/redux';
import type { ImagesState } from './images.types';

const initialState: ImagesState = {
  test: '',
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
});

// export const {} = imagesSlice.actions;

export default imagesSlice.reducer;
