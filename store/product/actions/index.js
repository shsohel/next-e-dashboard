import axios from 'axios';
import { useRouter } from 'next/router';
import { confirmDialog } from '../../../components/custom/ConfirmDialogue';
import { baseAxios } from '../../../services';
import { notify } from '../../../utils/custom/Notification';
import { confirmObj, status } from '../../../utils/enum';
import { convertQueryString, uniqId } from '../../../utils/utolity';
import {
  PRODUCT_DATA_ON_PROGRESS,
  PRODUCT_DATA_SUBMIT_PROGRESS,
  BIND_PRODUCT_BASIC_INFO,
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  OPEN_PRODUCT_SIDEBAR,
  BIND_PRODUCT_ATTRIBUTES,
} from '../action-types';
import { productBasicInfoModal } from '../model';

export const productDataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: PRODUCT_DATA_ON_PROGRESS,
    dataProgress: condition,
  });
};
export const productDataSubmitOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: PRODUCT_DATA_SUBMIT_PROGRESS,
    submitProductDataProgress: condition,
  });
};
export const productSidebarOpen = (condition) => (dispatch) => {
  dispatch({
    type: OPEN_PRODUCT_SIDEBAR,
    openProductSidebar: condition,
  });
};
export const bindProductBasicInfo = (product) => (dispatch) => {
  console.log('first');
  dispatch({
    type: BIND_PRODUCT_BASIC_INFO,
    product,
  });
};

//Get List Data by Query
export const getProducts = (queryParams, queryObj) => async (dispatch) => {
  dispatch(productDataOnProgress(true));
  const apiEndpoint = `/api/product?${convertQueryString(queryParams)}`;
  await axios
    .post(apiEndpoint, queryObj)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_QUERY,
          products: response.data.data,
          total: response.data.totalRecords,
          queryParams,
          queryObj,
        });
        dispatch(productDataOnProgress(false));
      }
    })
    .catch((e) => {
      notify('warning', 'Server Side ERROR');
      dispatch(productDataOnProgress(false));
    });
};

export const addProduct =
  (products, redirectCallBack) => async (dispatch, getState) => {
    const apiEndpoint = `/api/product/create`;
    dispatch(productDataSubmitOnProgress(true));
    await axios
      .post(apiEndpoint, products)
      .then((response) => {
        if (response.status === 201) {
          dispatch(productDataSubmitOnProgress(false));
          dispatch(bindProductBasicInfo(productBasicInfoModal));
          notify('success', 'The Product has been added successfully');

          redirectCallBack(response.data.data.slug);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 400) {
          notify('error', `${response.data.error}`);
        }
      });
  };

export const getProduct = (Product) => async (dispatch, getState) => {
  dispatch(productDataOnProgress(true));
  const apiEndpoint = `/api/product/${Product._id}`;
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === status.success) {
        const { data } = response.data;
        console.log('data', data);
        const ProductObj = {
          ...data,
          subCategories: data.productSubCategories.map((v) => ({
            value: v._id,
            label: v.name,
          })),
        };
        dispatch(bindProductBasicInfo(ProductObj));
        dispatch(productSidebarOpen(true));
        dispatch(productDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(productDataOnProgress(false));
      if (response?.status === status.severError) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === status.badRequest) {
        notify('errors', response.data.error);
      }
    });
};
export const getProductBySlug = (slug, router) => async (dispatch, getState) => {
  dispatch(productDataOnProgress(true));
  const apiEndpoint = `/api/product/get/${slug}`;
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === status.success) {
        const { data } = response.data;
        const obj = {
          ...productBasicInfoModal,
          _id: data._id,
          name: data.name,
          price: data.price,
          salePrice: data.salePrice,
          sku: data.sku,
          isProductStockAvailable: data.isProductStockAvailable,
          weight: data.weight,
          length: data.length,
          height: data.height,
          width: data.width,
          attributes: data.attribute.map((att) => ({
            id: uniqId(),
            attribute: { label: att.id.name, value: att.id._id },
            values: att.values.map((v) => ({ value: v, label: v })),
          })),
          images: data.images.map((m) => ({
            ...m,
            id: uniqId(),
          })),
          productCategory: {
            label: data.productCategories[0]?.name,
            value: data.productCategories[0]?._id,
          },
          productSubCategory: data.productSubCategories.map((sub) => ({
            label: sub?.name,
            value: sub?._id,
          })),
          tag: data.tags.map((sub) => ({
            label: sub?.name,
            value: sub?._id,
          })),
          descriptions: data.descriptions,
          shotDescriptions: data.shotDescriptions,
        };
        // const ProductObj = {
        //   ...data,
        //   subCategories: data.productSubCategories.map((v) => ({
        //     value: v._id,
        //     label: v.name,
        //   })),
        // };
        dispatch(bindProductBasicInfo(obj));
        dispatch(productDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        router.push('/404');
      }
      console.log(response);
      dispatch(productDataOnProgress(false));
      // if (response?.status === status.severError) {
      //   notify('error', `Please contact the support team!!!`);
      // } else if (response?.status === status.badRequest) {
      //   notify('errors', response.data.error);
      // }
    });
};
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch(productDataSubmitOnProgress(true));
  const apiEndpoint = `/api/product/${product._id}`;
  await axios
    .put(apiEndpoint, product)
    .then((response) => {
      if (response.status === status.success) {
        dispatch(productDataSubmitOnProgress(false));
        notify('success', `The Product has been updated successfully `);
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(productDataSubmitOnProgress(false));
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
export const deleteProduct = (product) => (dispatch, getState) => {
  confirmDialog(confirmObj).then(async (e) => {
    if (e.isConfirmed) {
      const apiEndpoint = `/api/product/${product._id}`;
      console.log(apiEndpoint);
      dispatch(productDataOnProgress(true));
      await axios
        .delete(apiEndpoint)
        .then((response) => {
          if (response.status === status.success) {
            const { queryParams, queryObj } = getState().products;

            notify('success', 'The Item  has been deleted Successfully!');
            dispatch(getProducts(queryParams, queryObj));
            dispatch(productDataOnProgress(false));
          }
        })
        .catch(({ response }) => {
          console.log(response);
          dispatch(productDataOnProgress(false));
          if (response.status === status.severError) {
            notify('error', `Please contact the support team!!!`);
          } else if (response?.status === status.badRequest) {
            notify('errors', response.data.error);
          }
        });
    }
  });
};
