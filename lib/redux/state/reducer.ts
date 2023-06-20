import { combineReducers } from '@reduxjs/toolkit';
import images from './images/images.slice';

export const reducer = combineReducers({
  images,
});

export default reducer;
