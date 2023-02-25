import {
  GET_PRODUCT_SUB_CATEGORIES_BY_QUERY,
  GET_PRODUCT_SUB_CATEGORY_BY_ID,
  PRODUCT_SUB_CATEGORY_DATA_ON_PROGRESS,
  PRODUCT_SUB_CATEGORY_DATA_SUBMIT_PROGRESS,
  OPEN_PRODUCT_SUB_CATEGORY_SIDEBAR,
  BIND_PRODUCT_SUB_CATEGORY_BASIC_INFO,
  DROP_DOWN_PRODUCT_SUB_CATEGORY,
} from '../action-types';
import { productSubCategoryBasicInfoModal } from '../model';

const initialState = {
  dataProgress: false,
  submitProductSubCategoryDataProgress: false,
  openProductSubCategorySidebar: false,
  productSubCategories: [],
  productSubCategory: productSubCategoryBasicInfoModal,
  total: 1,
  queryParams: {},
  queryObj: {},
  dropdownProductSubCategory: [],
};

const productSubCategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUB_CATEGORIES_BY_QUERY:
      return {
        ...state,
        productSubCategories: action.productSubCategories,
        total: action.total,
        queryParams: action.queryParams,
        queryObj: action.queryObj,
      };

    case GET_PRODUCT_SUB_CATEGORY_BY_ID:
      return {
        ...state,
        productSubCategory: action.productSubCategory,
      };
    case DROP_DOWN_PRODUCT_SUB_CATEGORY:
      return {
        ...state,
        dropdownProductSubCategory: action.dropdownProductSubCategory,
      };
    case BIND_PRODUCT_SUB_CATEGORY_BASIC_INFO:
      return {
        ...state,
        productSubCategory: action.productSubCategory,
      };
    case PRODUCT_SUB_CATEGORY_DATA_ON_PROGRESS:
      return {
        ...state,
        dataProgress: action.dataProgress,
      };

    case PRODUCT_SUB_CATEGORY_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        submitProductSubCategoryDataProgress:
          action.submitProductSubCategoryDataProgress,
      };
    case OPEN_PRODUCT_SUB_CATEGORY_SIDEBAR:
      return {
        ...state,
        openProductSubCategorySidebar: action.openProductSubCategorySidebar,
      };

    default:
      return state;
  }
};
export default productSubCategoryReducers;
