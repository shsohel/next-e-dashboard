import axios from 'axios';
import { confirmDialog } from '../../../components/custom/ConfirmDialogue';
import { notify } from '../../../utils/custom/Notification';
import { confirmObj, status } from '../../../utils/enum';
import { convertQueryString } from '../../../utils/utolity';
import {
  PRODUCT_SUB_CATEGORY_DATA_ON_PROGRESS,
  PRODUCT_SUB_CATEGORY_DATA_SUBMIT_PROGRESS,
  BIND_PRODUCT_SUB_CATEGORY_BASIC_INFO,
  GET_PRODUCT_SUB_CATEGORIES_BY_QUERY,
  GET_PRODUCT_SUB_CATEGORY_BY_ID,
  OPEN_PRODUCT_SUB_CATEGORY_SIDEBAR,
  DROP_DOWN_PRODUCT_SUB_CATEGORY,
} from '../action-types';
import { ProductSubCategoryBasicInfoModal } from '../model';

export const productCategoryDataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: PRODUCT_SUB_CATEGORY_DATA_ON_PROGRESS,
    dataProgress: condition,
  });
};
export const productCategoryDataSubmitOnProgress =
  (condition) => (dispatch) => {
    dispatch({
      type: PRODUCT_SUB_CATEGORY_DATA_SUBMIT_PROGRESS,
      submitProductSubCategoryDataProgress: condition,
    });
  };
export const productCategorySidebarOpen = (condition) => (dispatch) => {
  dispatch({
    type: OPEN_PRODUCT_SUB_CATEGORY_SIDEBAR,
    openProductSubCategorySidebar: condition,
  });
};
export const bindProductSubCategoryBasicInfo =
  (productSubCategory) => (dispatch) => {
    dispatch({
      type: BIND_PRODUCT_SUB_CATEGORY_BASIC_INFO,
      productSubCategory,
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
            type: GET_PRODUCT_SUB_CATEGORIES_BY_QUERY,
            productSubCategories: response.data.data,
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
export const getProductSubCategoryDropdown = () => async (dispatch) => {
  const apiEndpoint = `/api/product-sub-category`;
  dispatch({
    type: DROP_DOWN_PRODUCT_SUB_CATEGORY,
    dropdownProductCategory: [],
  });
  await axios
    .post(apiEndpoint, {})
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.data);
        const dropdownProductSubCategory = response.data.data.map((sub) => ({
          ...sub,
          value: sub._id,
          label: sub.name,
        }));
        dispatch({
          type: DROP_DOWN_PRODUCT_SUB_CATEGORY,
          dropdownProductSubCategory,
        });
      }
    })
    .catch((e) => {
      notify('warning', 'Server Side ERROR');
    });
};

export const addProductSubCategory =
  (ProductSubCategory) => (dispatch, getState) => {
    console.log(ProductSubCategory);
    const apiEndpoint = `/api/product-category/create`;
    dispatch(productCategoryDataSubmitOnProgress(true));
    axios
      .post(apiEndpoint, ProductSubCategory)
      .then((response) => {
        if (response.status === 201) {
          const { queryParams, queryObj } = getState().ProductSubCategorys;
          dispatch(productCategoryDataSubmitOnProgress(false));
          dispatch(productCategorySidebarOpen(false));
          dispatch(
            bindProductSubCategoryBasicInfo(ProductSubCategoryBasicInfoModal)
          );
          dispatch(getProductCategories(queryParams, queryObj));
          notify(
            'success',
            'The ProductSubCategory has been added successfully'
          );
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          notify('error', `${response.data.error}`);
        }
        console.log(response);
      });
  };

export const instantCreateProductSubCategory =
  (productSubCategory, createdSubCategoryBack) => (dispatch) => {
    const apiEndpoint = `/api/product-sub-category/create`;
    dispatch(productCategoryDataSubmitOnProgress(true));
    axios
      .post(apiEndpoint, productSubCategory)
      .then((response) => {
        if (response.status === 201) {
          notify(
            'success',
            'The ProductSubCategory has been added successfully'
          );
          createdSubCategoryBack(response.data.data);
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          notify('error', `${response.data.error}`);
        }
        console.log(response);
      });
  };

export const getProductSubCategory =
  (ProductSubCategory) => async (dispatch, getState) => {
    dispatch(productCategoryDataOnProgress(true));
    const apiEndpoint = `/api/product-category/${ProductSubCategory._id}`;
    await axios
      .get(apiEndpoint)
      .then((response) => {
        if (response.status === status.success) {
          const { data } = response.data;
          console.log('data', data);
          const ProductSubCategoryObj = {
            ...data,
            values: data.values.map((v) => ({
              value: v,
              label: v,
            })),
          };
          dispatch(bindProductSubCategoryBasicInfo(ProductSubCategoryObj));
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
export const updateProductSubCategory =
  (ProductSubCategory) => async (dispatch, getState) => {
    dispatch(productCategoryDataSubmitOnProgress(true));
    const apiEndpoint = `/api/ProductSubCategory/${ProductSubCategory._id}`;
    await axios
      .put(apiEndpoint, ProductSubCategory)
      .then((response) => {
        if (response.status === status.success) {
          const { queryParams, queryObj } = getState().ProductSubCategorys;
          dispatch(
            bindProductSubCategoryBasicInfo(ProductSubCategoryBasicInfoModal)
          );
          dispatch(productCategorySidebarOpen(false));
          dispatch(productCategoryDataSubmitOnProgress(false));
          notify(
            'success',
            `The ProductSubCategory has been updated successfully `
          );
          dispatch(getProductSubCategory(queryParams, queryObj));
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
export const deleteProductSubCategory =
  (ProductSubCategory) => (dispatch, getState) => {
    confirmDialog(confirmObj).then(async (e) => {
      if (e.isConfirmed) {
        const apiEndpoint = `/api/ProductSubCategory/${ProductSubCategory._id}`;
        console.log(apiEndpoint);
        dispatch(productCategoryDataOnProgress(true));
        await axios
          .delete(apiEndpoint)
          .then((response) => {
            if (response.status === status.success) {
              const { queryParams, queryObj } = getState().ProductSubCategorys;

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
