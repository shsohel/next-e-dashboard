import { uniqId } from '../../../utils/utolity.js';

const attributes = [
  {
    id: uniqId(),
    attribute: null,
    values: [],
  },
];
export const productBasicInfoModal = {
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
  tag: [],
  isActive: true,
  status: { label: 'Draft', value: 'Draft' },
};

export const productStatus = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Published', value: 'Published' },
  { label: 'Private', value: 'Private' },
];
