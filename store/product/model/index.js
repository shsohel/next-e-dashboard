import { uniqId } from '../../../utils/utolity.js';
export const ProductBasicInfoModal = {
  _id: null,
  name: '',
  sku: '',
  price: 3500,
  salePrice: 3500,
  images: [],

  discount: null,
  brand: null,
  attributes: [
    {
      id: uniqId(),
      attribute: null,
      values: [],
    },
  ],
  productCategory: null,
  productSubCategory: [],
  isStockQuantity: 0,
  isProductStockAvailable: true,
  isActive: true,
  description: '',
};
