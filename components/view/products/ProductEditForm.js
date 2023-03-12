import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  getProductCategoryDropdown,
  getProductSubCategoryDropdownByCategoryId,
  instantCreateProductCategory,
  instantCreateProductSubCategoryByCategoryId,
} from '../../../store/product-category/actions';
import {
  addProduct,
  updateProduct,
  bindProductBasicInfo,
} from '../../../store/product/actions';
import {
  productBasicInfoModal,
  productStatus,
} from '../../../store/product/model';
import { getTagDropdown, instantCreateTag } from '../../../store/tag/actions';
import { selectThemeColors } from '../../../utils/utolity';
import TabControl from '../../custom/TabControl';
// import RichEditor from '../../RichEditor';
import Attribute from './Attribute';
import GeneralInfo from './GeneralInfo';
import Inventory from './Inventory';
import ProductImage from './ProductImage';
import Shipping from './Shipping';

const ProductEditForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { product } = useSelector(({ products }) => products);
  const {
    dropdownProductCategory,
    isDropdownProductCategoryLoaded,
    dropdownProductSubcategory,
    isDropdownProductSubcategoryLoaded,
  } = useSelector(({ productCategories }) => productCategories);
  const { dropdownTag, isDropdownTagLoaded, submitTagDataProgress } =
    useSelector(({ tags }) => tags);

  const handleDataOnChange = (e) => {
    const { name, value, checked, type } = e.target;
    const updatedProduct = {
      ...product,
      [name]:
        type === 'number'
          ? Number(value)
          : type === 'checkbox'
          ? checked
          : value,
    };
    dispatch(bindProductBasicInfo(updatedProduct));
  };

  const handleDropdownOChange = (data, e) => {
    const { name } = e;
    if (name === 'productCategory') {
      const updatedProduct = {
        ...product,
        [name]: data,
        ['productSubCategory']: [],
      };

      dispatch(bindProductBasicInfo(updatedProduct));
    } else {
      const updatedProduct = {
        ...product,
        [name]: data,
      };

      dispatch(bindProductBasicInfo(updatedProduct));
    }
  };

  const handleTagOnFocus = () => {
    dispatch(getTagDropdown());
  };

  const bindCreatedTag = (tag) => {
    const option = {
      value: tag._id,
      label: tag.name,
    };
    const updateInfo = {
      ...product,
      ['tag']: [...product.tag, option],
    };
    dispatch(bindProductBasicInfo(updateInfo));
    handleTagOnFocus();
  };

  const handleTagCreateValue = (value) => {
    const option = {
      name: value,
      description: value,
    };

    dispatch(instantCreateTag(option, bindCreatedTag));
  };

  const bindCreatedProductCategory = (category) => {
    const option = {
      value: category._id,
      label: category.name,
    };
    const updateInfo = {
      ...product,
      ['productCategory']: option,
      ['productSubCategory']: [],
    };
    dispatch(bindProductBasicInfo(updateInfo));
    handleTagOnFocus();
  };

  const handleProductCategoryCreateValue = (value) => {
    const option = {
      name: value,
      description: value,
    };

    dispatch(instantCreateProductCategory(option, bindCreatedProductCategory));
  };

  const handleProductCategoryOnFocus = () => {
    dispatch(getProductCategoryDropdown());
  };
  const handleProductSubCategoryOnFocus = (categoryId) => {
    dispatch(getProductSubCategoryDropdownByCategoryId(categoryId));
  };

  const bindCreatedProductSubCategory = (subCategory, categoryId) => {
    const option = {
      value: subCategory._id,
      label: subCategory.name,
    };
    const updateInfo = {
      ...product,
      productSubCategory: [...product.productSubCategory, option],
    };
    dispatch(bindProductBasicInfo(updateInfo));
    handleProductSubCategoryOnFocus(categoryId);
  };

  const handleSubCategoryCreatable = (inputValue, categoryId) => {
    const data = {
      subCategory: inputValue,
    };
    dispatch(
      instantCreateProductSubCategoryByCategoryId(
        data,
        categoryId,
        bindCreatedProductSubCategory
      )
    );
  };

  const handleSubmit = () => {
    const submitObj = {
      _id: product._id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      discount: null,
      productCategory: product.productCategory?.value ?? null,
      productSubCategory: product.productSubCategory.map(
        (subCategory) => subCategory.value
      ),
      brand: product.brand?.value ?? null,

      attribute: product.attributes.map((att) => ({
        id: att.attribute?.value ?? null,
        values: att.values.map((v) => v.label),
      })),
      weight: product.weight,
      length: product.length,
      height: product.height,
      width: product.width,
      isProductStockAvailable: product.isProductStockAvailable,
      descriptions: product.descriptions,
      shotDescriptions: product.shotDescriptions,
      tag: product.tag.map((t) => t.value),
      status: product.status?.label,
    };
    console.log('submitObj', JSON.stringify(submitObj, null, 2));
    dispatch(updateProduct(submitObj));
  };
  const handleCancel = () => {
    router.push('/product');
    dispatch(bindProductBasicInfo(productBasicInfoModal));
  };
  const defaultTabs = [
    {
      id: 1,
      name: 'General',
      current: true,
      component: (
        <div>
          <GeneralInfo />
        </div>
      ),
    },
    { id: 2, name: 'Inventory', current: false, component: <Inventory /> },
    {
      id: 3,
      name: 'Shipping',
      current: false,
      component: <Shipping />,
    },
    { id: 4, name: 'Attribute', current: false, component: <Attribute /> },
    { id: 5, name: 'Images', current: false, component: <ProductImage /> },
  ];
  return (
    <div>
      <div className="mb-1 flex justify-between border px-5 py-2">
        <div>
          <h3 className="font-medium">Edit Product</h3>
        </div>
        <div>
          <button
            className="mr-2 rounded-sm bg-primary py-1 px-4 text-white hover:bg-secondary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </button>
          <button
            className="rounded-sm bg-danger py-1 px-4 text-white hover:bg-gray-400"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="min-h-[30rem] rounded-sm border p-5">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Title :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.name}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              <div className="">
                <TabControl defaultTabs={defaultTabs} />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Description
                </label>
                <textarea
                  type="text"
                  name="descriptions"
                  id="descriptions"
                  autoComplete="descriptions"
                  className="mt-1 block min-h-[5rem] w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.descriptions}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Description
                </label>
                <textarea
                  type="text"
                  name="shotDescriptions"
                  id="shotDescriptions"
                  autoComplete="shotDescriptions"
                  className="mt-1 block min-h-[2rem] w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={product.shotDescriptions}
                  onChange={(e) => {
                    handleDataOnChange(e);
                  }}
                />
              </div>
              {/* <div className="">
                <RichEditor />
              </div> */}
            </div>
          </div>
          {/* Category Section */}
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Status
                </label>
                <ReactSelect
                  id="statusId"
                  instanceId="statusId"
                  theme={selectThemeColors}
                  name="status"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={product.status}
                  options={productStatus}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Category
                </label>
                <CreatableSelect
                  theme={selectThemeColors}
                  id="productCategoryId"
                  instanceId="productCategoryId"
                  isLoading={!isDropdownProductCategoryLoaded}
                  name="productCategory"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={product.productCategory}
                  options={dropdownProductCategory}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  onFocus={() => {
                    handleProductCategoryOnFocus();
                  }}
                  onCreateOption={(inputValue) => {
                    handleProductCategoryCreateValue(inputValue);
                  }}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Sub Category
                </label>
                <CreatableSelect
                  theme={selectThemeColors}
                  id="productSubCategoryId"
                  instanceId="productSubCategoryId"
                  isDisabled={!product.productCategory}
                  isMulti
                  isLoading={!isDropdownProductSubcategoryLoaded}
                  name="productSubCategory"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={product.productSubCategory}
                  options={dropdownProductSubcategory}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  onFocus={() => {
                    handleProductSubCategoryOnFocus(
                      product.productCategory?.value
                    );
                  }}
                  onCreateOption={(inputValue) => {
                    handleSubCategoryCreatable(
                      inputValue,
                      product.productCategory?.value
                    );
                  }}
                />
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <CreatableSelect
                  theme={selectThemeColors}
                  id="dropdownTagId"
                  instanceId="dropdownTagId"
                  isMulti
                  isLoading={!isDropdownTagLoaded || submitTagDataProgress}
                  name="tag"
                  className="mt-1 focus:ring-0"
                  isClearable
                  value={product.tag}
                  options={dropdownTag}
                  onChange={(data, e) => {
                    handleDropdownOChange(data, e);
                  }}
                  onFocus={() => {
                    handleTagOnFocus();
                  }}
                  onCreateOption={(inputValue) => {
                    handleTagCreateValue(inputValue);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;
