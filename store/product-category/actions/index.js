import axios from 'axios';
import { confirmDialog } from '../../../components/custom/ConfirmDialogue';
import { baseAxios } from '../../../services';
import { notify } from '../../../utils/custom/Notification';
import { confirmObj, status } from '../../../utils/enum';
import { convertQueryString } from '../../../utils/utolity';
import {
  PRODUCT_CATEGORY_DATA_ON_PROGRESS,
  PRODUCT_CATEGORY_DATA_SUBMIT_PROGRESS,
  BIND_PRODUCT_CATEGORY_BASIC_INFO,
  GET_PRODUCT_CATEGORIES_BY_QUERY,
  GET_PRODUCT_CATEGORY_BY_ID,
  OPEN_PRODUCT_CATEGORY_SIDEBAR,
  GET_PRODUCT_CATEGORY_DROPDOWN,
  DROP_DOWN_PRODUCT_SUB_CATEGORY_BY_PRODUCT_ID,
} from '../action-types';
import { ProductCategoryBasicInfoModal } from '../model';

export const productCategoryDataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_DATA_ON_PROGRESS,
    dataProgress: condition,
  });
};
export const productCategoryDataSubmitOnProgress =
  (condition) => (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORY_DATA_SUBMIT_PROGRESS,
      submitProductCategoryDataProgress: condition,
    });
  };
export const productCategorySidebarOpen = (condition) => (dispatch) => {
  dispatch({
    type: OPEN_PRODUCT_CATEGORY_SIDEBAR,
    openProductCategorySidebar: condition,
  });
};
export const bindProductCategoryBasicInfo = (productCategory) => (dispatch) => {
  dispatch({
    type: BIND_PRODUCT_CATEGORY_BASIC_INFO,
    productCategory,
  });
};

//Get List Data by Query
export const getProductCategories =
  (queryParams, queryObj) => async (dispatch) => {
    dispatch(productCategoryDataOnProgress(true));
    const apiEndpoint = `/api/product-category?${convertQueryString(
      queryParams
    )}`;
    await axios
      .post(apiEndpoint, queryObj)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: GET_PRODUCT_CATEGORIES_BY_QUERY,
            productCategories: response.data.data,
            total: response.data.totalRecords,
            queryParams,
            queryObj,
          });
          dispatch(productCategoryDataOnProgress(false));
        }
      })
      .catch((e) => {
        notify('warning', 'Server Side ERROR');
        dispatch(productCategoryDataOnProgress(false));
      });
  };

export const getProductCategoryDropdown = () => async (dispatch) => {
  const apiEndpoint = `/api/product-category`;
  dispatch({
    type: GET_PRODUCT_CATEGORY_DROPDOWN,
    dropdownProductCategory: [],
    isDropdownProductCategoryLoaded: false,
  });
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_PRODUCT_CATEGORY_DROPDOWN,
          dropdownProductCategory: response.data.data.map((pc) => ({
            label: pc.name,
            value: pc._id,
          })),
          isDropdownProductCategoryLoaded: true,
        });
      }
    })
    .catch((e) => {
      notify('warning', 'Server Side ERROR');
      dispatch({
        type: GET_PRODUCT_CATEGORY_DROPDOWN,
        dropdownProductCategory: [],
        isDropdownProductCategoryLoaded: true,
      });
    });
};
// case DROP_DOWN_PRODUCT_SUB_CATEGORY_BY_PRODUCT_ID:
//   return {
//     ...state,
//     dropdownProductSubcategory: action.dropdownProductSubcategory,
//     isDropdownProductSubcategoryLoaded:
//       action.isDropdownProductSubcategoryLoaded,
//   };
export const getProductSubCategoryDropdownByCategoryId =
  (categoryId) => async (dispatch) => {
    const apiEndpoint = `/api/product-category/sub-category/${categoryId}`;
    dispatch({
      type: DROP_DOWN_PRODUCT_SUB_CATEGORY_BY_PRODUCT_ID,
      dropdownProductSubcategory: [],
      isDropdownProductSubcategoryLoaded: false,
    });
    await axios
      .get(apiEndpoint)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: DROP_DOWN_PRODUCT_SUB_CATEGORY_BY_PRODUCT_ID,
            dropdownProductSubcategory: response.data.data.map((pc) => ({
              label: pc.name,
              value: pc._id,
            })),
            isDropdownProductSubcategoryLoaded: true,
          });
        }
      })
      .catch((e) => {
        notify('warning', 'Server Side ERROR');
        dispatch({
          type: DROP_DOWN_PRODUCT_SUB_CATEGORY_BY_PRODUCT_ID,
          dropdownProductSubcategory: [],
          isDropdownProductSubcategoryLoaded: true,
        });
      });
  };

export const addProductCategory =
  (productCategories) => (dispatch, getState) => {
    console.log(productCategories);
    const apiEndpoint = `/api/product-category/create`;
    dispatch(productCategoryDataSubmitOnProgress(true));
    axios
      .post(apiEndpoint, productCategories)
      .then((response) => {
        if (response.status === 201) {
          const { queryParams, queryObj } = getState().productCategories;
          dispatch(productCategoryDataSubmitOnProgress(false));
          dispatch(productCategorySidebarOpen(false));
          dispatch(bindProductCategoryBasicInfo(ProductCategoryBasicInfoModal));
          dispatch(getProductCategories(queryParams, queryObj));
          notify('success', 'The ProductCategory has been added successfully');
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          notify('error', `${response.data.error}`);
        }
        console.log(response);
      });
  };

export const instantCreateProductCategory =
  (productCategory, createdCategoryBack) => (dispatch) => {
    const apiEndpoint = `/api/product-category/create`;
    dispatch(productCategoryDataSubmitOnProgress(true));
    axios
      .post(apiEndpoint, productCategory)
      .then((response) => {
        if (response.status === 201) {
          notify('success', 'The ProductCategory has been added successfully');
          createdCategoryBack(response.data.data);
          dispatch(productCategoryDataSubmitOnProgress(false));
        }
      })
      .catch((e) => {
        console.log(e);
        if (response.status === 400) {
          notify('error', `${response.data.error}`);
        }
        dispatch(productCategoryDataSubmitOnProgress(false));
      });
  };
export const instantCreateProductSubCategoryByCategoryId =
  (subCategory, categoryId, createdSubCategoryBack) => (dispatch) => {
    const apiEndpoint = `/api/product-category/sub-category/${categoryId}`;
    dispatch(productCategoryDataSubmitOnProgress(true));
    axios
      .put(apiEndpoint, subCategory)
      .then((response) => {
        if (response.status === 200) {
          notify(
            'success',
            'The Product Sub Category has been added successfully'
          );
          createdSubCategoryBack(response.data.data, categoryId);
          dispatch(productCategoryDataSubmitOnProgress(false));
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          notify('error', `${response.data.error}`);
        }
        dispatch(productCategoryDataSubmitOnProgress(false));
      });
  };

export const getProductCategory =
  (ProductCategory) => async (dispatch, getState) => {
    dispatch(productCategoryDataOnProgress(true));
    const apiEndpoint = `/api/product-category/${ProductCategory._id}`;
    await axios
      .get(apiEndpoint)
      .then((response) => {
        if (response.status === status.success) {
          const { data } = response.data;
          console.log('data', data);
          const ProductCategoryObj = {
            ...data,
            subCategories: data.productSubCategories.map((v) => ({
              value: v._id,
              label: v.name,
            })),
          };
          dispatch(bindProductCategoryBasicInfo(ProductCategoryObj));
          dispatch(productCategorySidebarOpen(true));
          dispatch(productCategoryDataOnProgress(false));
        }
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(productCategoryDataOnProgress(false));
        if (response?.status === status.severError) {
          notify('error', `Please contact the support team!!!`);
        } else if (response?.status === status.badRequest) {
          notify('errors', response.data.error);
        }
      });
  };
export const updateProductCategory =
  (productCategory) => async (dispatch, getState) => {
    dispatch(productCategoryDataSubmitOnProgress(true));
    const apiEndpoint = `/api/product-category/${productCategory._id}`;
    await axios
      .put(apiEndpoint, productCategory)
      .then((response) => {
        if (response.status === status.success) {
          const { queryParams, queryObj } = getState().productCategories;
          dispatch(bindProductCategoryBasicInfo(ProductCategoryBasicInfoModal));
          dispatch(productCategorySidebarOpen(false));
          dispatch(productCategoryDataSubmitOnProgress(false));
          notify(
            'success',
            `The ProductCategory has been updated successfully `
          );
          dispatch(getProductCategories(queryParams, queryObj));
        }
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(productCategoryDataSubmitOnProgress(false));
        if (response?.status === status.severError) {
          notify('error', `Please contact the support team!!!`);
        } else if (response?.status === status.badRequest) {
          notify('errors', response.data.error);
        }
      });
  };

// ...confirmObj,
// text: `<h4 class="text-primary mb-0">${item.itemNumber}</h4> <br/> <span>You can't retrieve again!</span>`,

// Delete item
export const deleteProductCategory =
  (productCategory) => (dispatch, getState) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const apiEndpoint = `/api/product-category/${productCategory._id}`;
        console.log(apiEndpoint);
        dispatch(productCategoryDataOnProgress(true));
        await axios
          .delete(apiEndpoint)
          .then((response) => {
            if (response.status === status.success) {
              const { queryParams, queryObj } = getState().productCategories;

              notify('success', 'The Item  has been deleted Successfully!');
              dispatch(getProductCategories(queryParams, queryObj));
              dispatch(productCategoryDataOnProgress(false));
            }
          })
          .catch(({ response }) => {
            console.log(response);
            dispatch(productCategoryDataOnProgress(false));
            if (response.status === status.severError) {
              notify('error', `Please contact the support team!!!`);
            } else if (response?.status === status.badRequest) {
              notify('errors', response.data.error);
            }
          });
      }
    });
  };
