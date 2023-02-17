import { configureStore } from '@reduxjs/toolkit';
import attributes from './attributes/reducers';

export const store = configureStore({
  reducer: {
    attributes,
  },
});
