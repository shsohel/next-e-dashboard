import { uniqId } from '../../../utils/utolity.js';

const attributes = [
  {
    id: uniqId(),
    attribute: null,
    values: [],
  },
];
export const ProductBasicInfoModal = {
  _id: null,
  name: '',
  sku: '',
  price: 0,
  salePrice: 0,
  images: [],
  discount: null,
  productCategory: null,
  productSubCategory: [],
  attributes,
  brand: null,
  weight: 0,
  length: 0,
  height: 0,
  width: 0,
  shipping: null,
  isEnableReview: true,
  isStockMange: true,
  stockQuantity: 0,
  isProductStockAvailable: true,
  descriptions: '',
  shotDescriptions: '',
  shippingMethod: null,
  isActive: true,
};
