import axios from 'axios';
import { confirmDialog } from '../../../components/custom/ConfirmDialogue';
import { baseAxios } from '../../../services';
import { notify } from '../../../utils/custom/Notification';
import { confirmObj, status } from '../../../utils/enum';
import { convertQueryString } from '../../../utils/utolity';
import {
  TAG_DATA_ON_PROGRESS,
  TAG_DATA_SUBMIT_PROGRESS,
  BIND_TAG_BASIC_INFO,
  GET_TAGS_BY_QUERY,
  GET_TAG_BY_ID,
  OPEN_TAG_SIDEBAR,
  GET_TAG_DROPDOWN,
  DROP_DOWN_PRODUCT_SUB_CATEGORY_BY_PRODUCT_ID,
} from '../action-types';
import { tagBasicInfoModal } from '../model';

export const tagDataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: TAG_DATA_ON_PROGRESS,
    dataProgress: condition,
  });
};
export const tagDataSubmitOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: TAG_DATA_SUBMIT_PROGRESS,
    submitTagDataProgress: condition,
  });
};
export const tagSidebarOpen = (condition) => (dispatch) => {
  dispatch({
    type: OPEN_TAG_SIDEBAR,
    openTagSidebar: condition,
  });
};
export const bindTagBasicInfo = (tag) => (dispatch) => {
  dispatch({
    type: BIND_TAG_BASIC_INFO,
    tag,
  });
};

//Get List Data by Query
export const getTags = (queryParams, queryObj) => async (dispatch) => {
  dispatch(tagDataOnProgress(true));
  const apiEndpoint = `/api/tag?${convertQueryString(queryParams)}`;
  await axios
    .post(apiEndpoint, queryObj)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_TAGS_BY_QUERY,
          tags: response.data.data,
          total: response.data.totalRecords,
          queryParams,
          queryObj,
        });
        dispatch(tagDataOnProgress(false));
      }
    })
    .catch((e) => {
      notify('warning', 'Server Side ERROR');
      dispatch(tagDataOnProgress(false));
    });
};

export const getTagDropdown = () => async (dispatch) => {
  const apiEndpoint = `/api/tag`;
  dispatch({
    type: GET_TAG_DROPDOWN,
    dropdownTag: [],
    isDropdownTagLoaded: false,
  });
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_TAG_DROPDOWN,
          dropdownTag: response.data.data.map((pc) => ({
            label: pc.name,
            value: pc._id,
          })),
          isDropdownTagLoaded: true,
        });
      }
    })
    .catch((e) => {
      notify('warning', 'Server Side ERROR');
      dispatch({
        type: GET_TAG_DROPDOWN,
        dropdownTag: [],
        isDropdownTagLoaded: true,
      });
    });
};

export const addTag = (tags) => (dispatch, getState) => {
  const apiEndpoint = `/api/tag/create`;
  dispatch(tagDataSubmitOnProgress(true));
  axios
    .post(apiEndpoint, tags)
    .then((response) => {
      if (response.status === 201) {
        const { queryParams, queryObj } = getState().tags;
        dispatch(tagDataSubmitOnProgress(false));
        dispatch(tagSidebarOpen(false));
        dispatch(bindTagBasicInfo(tagBasicInfoModal));
        dispatch(getTags(queryParams, queryObj));
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

export const instantCreateTag = (tag, createdTagBack) => (dispatch) => {
  const apiEndpoint = `/api/tag/create`;
  dispatch(tagDataSubmitOnProgress(true));
  axios
    .post(apiEndpoint, tag)
    .then((response) => {
      if (response.status === 201) {
        notify('success', 'The Tag has been added successfully');
        createdTagBack(response.data.data);
        dispatch(tagDataSubmitOnProgress(false));
      }
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        notify('error', `${response.data.error}`);
      }
      console.log(response);
      dispatch(tagDataSubmitOnProgress(false));
    });
};

export const getTag = (ProductCategory) => async (dispatch, getState) => {
  dispatch(tagDataOnProgress(true));
  const apiEndpoint = `/api/tag/${ProductCategory._id}`;
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
        dispatch(bindTagBasicInfo(ProductCategoryObj));
        dispatch(tagSidebarOpen(true));
        dispatch(tagDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(tagDataOnProgress(false));
      if (response?.status === status.severError) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === status.badRequest) {
        notify('errors', response.data.error);
      }
    });
};
export const updateTag = (tag) => async (dispatch, getState) => {
  dispatch(tagDataSubmitOnProgress(true));
  const apiEndpoint = `/api/tag/${tag._id}`;
  await axios
    .put(apiEndpoint, tag)
    .then((response) => {
      if (response.status === status.success) {
        const { queryParams, queryObj } = getState().tags;
        dispatch(bindTagBasicInfo(tagBasicInfoModal));
        dispatch(tagSidebarOpen(false));
        dispatch(tagDataSubmitOnProgress(false));
        notify('success', `The ProductCategory has been updated successfully `);
        dispatch(getTags(queryParams, queryObj));
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(tagDataSubmitOnProgress(false));
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
export const deleteTag = (tag) => (dispatch, getState) => {
  confirmDialog(confirmObj).then(async (e) => {
    if (e.isConfirmed) {
      const apiEndpoint = `/api/tag/${tag._id}`;
      console.log(apiEndpoint);
      dispatch(tagDataOnProgress(true));
      await axios
        .delete(apiEndpoint)
        .then((response) => {
          if (response.status === status.success) {
            const { queryParams, queryObj } = getState().tags;

            notify('success', 'The Item  has been deleted Successfully!');
            dispatch(getTags(queryParams, queryObj));
            dispatch(tagDataOnProgress(false));
          }
        })
        .catch(({ response }) => {
          console.log(response);
          dispatch(tagDataOnProgress(false));
          if (response.status === status.severError) {
            notify('error', `Please contact the support team!!!`);
          } else if (response?.status === status.badRequest) {
            notify('errors', response.data.error);
          }
        });
    }
  });
};
