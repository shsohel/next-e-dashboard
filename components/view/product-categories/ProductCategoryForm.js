import React from 'react';
import ReactSelect from 'react-select';
import Sidebar from '../../custom/Sidebar';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductCategory,
  productCategorySidebarOpen,
  bindProductCategoryBasicInfo,
  updateProductCategory,
} from '../../../store/product-category/actions';
import {
  getProductSubCategoryDropdown,
  instantCreateProductSubCategory,
} from '../../../store/product-sub-category/actions';
const ProductCategoryForm = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { productCategory } = useSelector(
    ({ productCategories }) => productCategories
  );
  const { dropdownProductSubCategory } = useSelector(
    ({ productSubCategories }) => productSubCategories
  );

  const handleSubCategoryOnFocus = () => {
    dispatch(getProductSubCategoryDropdown());
  };

  const handleDataOnChange = (e) => {
    const { name, value } = e.target;
    const updateInfo = {
      ...productCategory,
      [name]: value,
    };

    dispatch(bindProductCategoryBasicInfo(updateInfo));
  };

  const handleDropdownOChange = (data, e) => {
    const { action, name, option } = e;
    const updateInfo = {
      ...productCategory,
      [name]: data,
    };
    dispatch(bindProductCategoryBasicInfo(updateInfo));
  };

  const bindCreatedSubCategory = (subCategory) => {
    const option = {
      value: subCategory._id,
      label: subCategory.name,
    };
    const updateInfo = {
      ...productCategory,
      ['subCategories']: [...productCategory.subCategories, option],
    };
    dispatch(bindProductCategoryBasicInfo(updateInfo));
  };
  const handleCreateValue = (value) => {
    const option = {
      name: value,
      description: value,
    };

    dispatch(instantCreateProductSubCategory(option, bindCreatedSubCategory));
  };

  const handleSubmit = () => {
    const submitObj = {
      ...productCategory,
      subCategories: productCategory.subCategories.map((s) => s.value),
    };
    if (productCategory._id) {
      dispatch(updateProductCategory(submitObj));
    } else {
      dispatch(addProductCategory(submitObj));
    }
  };
  const handleCancel = () => {
    dispatch(productCategorySidebarOpen(false));
  };

  const FooterComponent = () => {
    return (
      <div className="border px-6 py-5">
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
    );
  };
  return (
    <div>
      <Sidebar
        handleSidebarModal={handleCancel}
        isOpen={isOpen}
        title="New Product Category"
        FooterComponent={<FooterComponent />}
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={productCategory.name}
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
              Sub Category
            </label>
            <CreatableSelect
              id="subCategoriesId"
              name="subCategories"
              isMulti
              isClearable
              value={productCategory.subCategories}
              placeholder="Select Value"
              options={dropdownProductSubCategory}
              onChange={(data, e) => {
                handleDropdownOChange(data, e);
              }}
              onCreateOption={handleCreateValue}
              onFocus={() => {
                handleSubCategoryOnFocus();
              }}
              styles={{
                valueContainer: (styles, state) => ({
                  ...styles,
                  border: '0px',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                  ...theme.colors,
                  primary: '#0288D1',
                },
              })}
            />
          </div>
          <div className="">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="description"
              value={productCategory.description}
              onChange={(e) => {
                handleDataOnChange(e);
              }}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default ProductCategoryForm;
