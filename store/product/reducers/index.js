import {
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS,
  PRODUCT_DATA_ON_PROGRESS,
  PRODUCT_DATA_SUBMIT_PROGRESS,
  OPEN_PRODUCT_SIDEBAR,
  BIND_PRODUCT_BASIC_INFO,
  BIND_PRODUCT_ATTRIBUTES,
} from '../action-types';
import { ProductBasicInfoModal, attributes } from '../model';

const initialState = {
  dataProgress: false,
  submitProductDataProgress: false,
  openProductSidebar: false,
  products: [],
  product: ProductBasicInfoModal,
  total: 1,
  queryParams: {},
  queryObj: {},
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_QUERY:
      return {
        ...state,
        products: action.products,
        total: action.total,
        queryParams: action.queryParams,
        queryObj: action.queryObj,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.product,
      };
    case BIND_PRODUCT_BASIC_INFO:
      return {
        ...state,
        product: action.product,
      };

    case PRODUCT_DATA_ON_PROGRESS:
      return {
        ...state,
        dataProgress: action.dataProgress,
      };

    case PRODUCT_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        submitProductDataProgress: action.submitProductDataProgress,
      };
    case OPEN_PRODUCT_SIDEBAR:
      return {
        ...state,
        openProductSidebar: action.openProductSidebar,
      };

    default:
      return state;
  }
};
export default productReducers;
