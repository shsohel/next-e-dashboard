import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import attributes from './attributes/reducers';
import productCategories from './product-category/reducers';
import productSubCategories from './product-sub-category/reducers';
import products from './product/reducers';
import tags from './tag/reducers';

// const middleware = [thunk, createDebounce()];
const middleware =
  process.env.NODE_ENV !== 'production'
    ? [
        require('redux-immutable-state-invariant').default(),
        thunk,
        createDebounce(),
      ]
    : [thunk, createDebounce()];
export const store = configureStore({
  reducer: {
    attributes,
    productCategories,
    productSubCategories,
    products,
    tags,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(...middleware),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ['products'],
      },
    }),
});
