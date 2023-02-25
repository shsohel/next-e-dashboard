import {
  GET_PRODUCT_CATEGORIES_BY_QUERY,
  GET_PRODUCT_CATEGORY_BY_ID,
  GET_PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_DATA_ON_PROGRESS,
  PRODUCT_CATEGORY_DATA_SUBMIT_PROGRESS,
  OPEN_PRODUCT_CATEGORY_SIDEBAR,
  BIND_PRODUCT_CATEGORY_BASIC_INFO,
} from '../action-types';
import { ProductCategoryBasicInfoModal } from '../model';

const initialState = {
  dataProgress: false,
  submitProductCategoryDataProgress: false,
  openProductCategorySidebar: false,
  productCategories: [],
  productCategory: ProductCategoryBasicInfoModal,
  total: 1,
  queryParams: {},
  queryObj: {},
};

const productCategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_BY_QUERY:
      return {
        ...state,
        productCategories: action.productCategories,
        total: action.total,
        queryParams: action.queryParams,
        queryObj: action.queryObj,
      };

    case GET_PRODUCT_CATEGORY_BY_ID:
      return {
        ...state,
        productCategory: action.productCategory,
      };
    case BIND_PRODUCT_CATEGORY_BASIC_INFO:
      return {
        ...state,
        productCategory: action.productCategory,
      };
    case PRODUCT_CATEGORY_DATA_ON_PROGRESS:
      return {
        ...state,
        dataProgress: action.dataProgress,
      };

    case PRODUCT_CATEGORY_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        submitProductCategoryDataProgress:
          action.submitProductCategoryDataProgress,
      };
    case OPEN_PRODUCT_CATEGORY_SIDEBAR:
      return {
        ...state,
        openProductCategorySidebar: action.openProductCategorySidebar,
      };

    default:
      return state;
  }
};
export default productCategoryReducers;
