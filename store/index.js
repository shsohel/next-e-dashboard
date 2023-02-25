import { configureStore } from '@reduxjs/toolkit';
import attributes from './attributes/reducers';
import productCategories from './product-category/reducers';
import productSubCategories from './product-sub-category/reducers';

export const store = configureStore({
  reducer: {
    attributes,
    productCategories,
    productSubCategories,
  },
});
