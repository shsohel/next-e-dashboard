import axios from 'axios';
import { confirmDialog } from '../../../components/custom/ConfirmDialogue';
import { baseAxios } from '../../../services';
import { notify } from '../../../utils/custom/Notification';
import { confirmObj, status } from '../../../utils/enum';
import { convertQueryString } from '../../../utils/utolity';
import { bindProductBasicInfo } from '../../product/actions';
import {
  ATTRIBUTE_DATA_ON_PROGRESS,
  ATTRIBUTE_DATA_SUBMIT_PROGRESS,
  BIND_ATTRIBUTE_BASIC_INFO,
  GET_ATTRIBUTES_BY_QUERY,
  GET_ATTRIBUTE_BY_ID,
  GET_ATTRIBUTE_DROPDOWN,
  GET_ATTRIBUTE_VALUES_DROPDOWN,
  OPEN_ATTRIBUTE_SIDEBAR,
} from '../action-types';
import { attributeBasicInfoModal } from '../model';

export const attributeDataOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_DATA_ON_PROGRESS,
    dataProgress: condition,
  });
};
export const attributeDataSubmitOnProgress = (condition) => (dispatch) => {
  dispatch({
    type: ATTRIBUTE_DATA_SUBMIT_PROGRESS,
    submitAttributeDataProgress: condition,
  });
};
export const attributeSidebarOpen = (condition) => (dispatch) => {
  dispatch({
    type: OPEN_ATTRIBUTE_SIDEBAR,
    openAttributeSidebar: condition,
  });
};
export const bindAttributeBasicInfo = (attribute) => (dispatch) => {
  dispatch({
    type: BIND_ATTRIBUTE_BASIC_INFO,
    attribute,
  });
};

//Get List Data by Query
export const getAttributes = (queryParams, queryObj) => async (dispatch) => {
  dispatch(attributeDataOnProgress(true));
  const apiEndpoint = `/api/attributes?${convertQueryString(queryParams)}`;
  await axios
    .post(apiEndpoint, queryObj)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_ATTRIBUTES_BY_QUERY,
          attributes: response.data.data,
          total: response.data.totalRecords,
          queryParams,
          queryObj,
        });
        dispatch(attributeDataOnProgress(false));
      }
    })
    .catch((e) => {
      notify('warning', 'Server Side ERROR');
      dispatch(attributeDataOnProgress(false));
    });
};

export const getAttributeDropdown = () => async (dispatch) => {
  const apiEndpoint = `/api/attributes`;
  dispatch({
    type: GET_ATTRIBUTE_DROPDOWN,
    dropdownAttribute: [],
    isDropdownAttribute: false,
  });
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_ATTRIBUTE_DROPDOWN,
          dropdownAttribute: response.data.data.map((d) => ({
            label: d.name,
            value: d._id,
          })),
          isDropdownAttribute: true,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: GET_ATTRIBUTE_DROPDOWN,
        dropdownAttribute: [],
        isDropdownAttribute: true,
      });
      notify('warning', 'Server Side ERROR');
    });
};
export const getAttributeValuesDropdown = (attributeId) => async (dispatch) => {
  const apiEndpoint = `/api/attributes/values/${attributeId}`;
  dispatch({
    type: GET_ATTRIBUTE_VALUES_DROPDOWN,
    dropdownAttributeValues: [],
    isDropdownAttributeValues: false,
  });
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_ATTRIBUTE_VALUES_DROPDOWN,
          dropdownAttributeValues: response.data.data.map((d) => ({
            label: d,
            value: d,
          })),
          isDropdownAttributeValues: true,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: GET_ATTRIBUTE_VALUES_DROPDOWN,
        dropdownAttributeValues: [],
        isDropdownAttributeValues: true,
      });
      notify('warning', 'Server Side ERROR');
    });
};
export const instantCreateValues =
  (data, rowId, attributeId) => async (dispatch, getState) => {
    const apiEndpoint = `/api/attributes/values/${attributeId}`;
    await axios
      .put(apiEndpoint, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(getState());
          const { product } = getState().products;
          const productAttributes = product.attributes;
          console.log('product', JSON.stringify(productAttributes, null, 2));
          console.log(rowId);
          const attributes = productAttributes.map((att) => {
            if (att.id === rowId) {
              att['values'] = [
                ...att.values,
                {
                  value: data.value,
                  label: data.value,
                },
              ];
            }
            return att;
          });
          console.log(attributes);

          dispatch(
            bindProductBasicInfo({
              ...product,
              attributes,
            })
          );
          dispatch(getAttributeValuesDropdown(attributeId));
        }
      })
      .catch((e) => {
        console.log(e);
        notify('warning', 'Server Side ERROR');
      });
  };

export const addAttribute = (attribute) => (dispatch, getState) => {
  console.log(attribute);
  const apiEndpoint = `/api/attributes/create`;
  dispatch(attributeDataSubmitOnProgress(true));
  axios
    .post(apiEndpoint, attribute)
    .then((response) => {
      if (response.status === 201) {
        const { queryParams, queryObj } = getState().attributes;
        dispatch(attributeDataSubmitOnProgress(false));
        dispatch(attributeSidebarOpen(false));
        dispatch(bindAttributeBasicInfo(attributeBasicInfoModal));
        dispatch(getAttributes(queryParams, queryObj));
        notify('success', 'The attribute has been added successfully');
      }
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        notify('error', `${response.data.error}`);
      }
      console.log(response);
    });
};

export const getAttribute = (attribute) => async (dispatch, getState) => {
  dispatch(attributeDataOnProgress(true));
  const apiEndpoint = `/api/attributes/${attribute._id}`;
  await axios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === status.success) {
        const { data } = response.data;
        console.log('data', data);
        const attributeObj = {
          ...data,
          values: data.values.map((v) => ({
            value: v,
            label: v,
          })),
        };
        dispatch(bindAttributeBasicInfo(attributeObj));
        dispatch(attributeSidebarOpen(true));
        dispatch(attributeDataOnProgress(false));
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(attributeDataOnProgress(false));
      if (response?.status === status.severError) {
        notify('error', `Please contact the support team!!!`);
      } else if (response?.status === status.badRequest) {
        notify('errors', response.data.error);
      }
    });
};
export const updateAttribute = (attribute) => async (dispatch, getState) => {
  dispatch(attributeDataSubmitOnProgress(true));
  const apiEndpoint = `/api/attributes/${attribute._id}`;
  await axios
    .put(apiEndpoint, attribute)
    .then((response) => {
      if (response.status === status.success) {
        const { queryParams, queryObj } = getState().attributes;
        dispatch(bindAttributeBasicInfo(attributeBasicInfoModal));
        dispatch(attributeSidebarOpen(false));
        dispatch(attributeDataSubmitOnProgress(false));
        notify('success', `The attribute has been updated successfully `);
        dispatch(getAttributes(queryParams, queryObj));
      }
    })
    .catch(({ response }) => {
      console.log(response);
      dispatch(attributeDataSubmitOnProgress(false));
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
export const deleteAttribute = (attribute) => (dispatch, getState) => {
  confirmDialog(confirmObj).then(async (e) => {
    if (e.isConfirmed) {
      const apiEndpoint = `/api/attributes/${attribute._id}`;
      console.log(apiEndpoint);
      dispatch(attributeDataOnProgress(true));
      await axios
        .delete(apiEndpoint)
        .then((response) => {
          if (response.status === status.success) {
            const { queryParams, queryObj } = getState().attributes;

            notify('success', 'The Item  has been deleted Successfully!');
            dispatch(getAttributes(queryParams, queryObj));
            dispatch(attributeDataOnProgress(false));
          }
        })
        .catch(({ response }) => {
          console.log(response);
          dispatch(attributeDataOnProgress(false));
          if (response.status === status.severError) {
            notify('error', `Please contact the support team!!!`);
          } else if (response?.status === status.badRequest) {
            notify('errors', response.data.error);
          }
        });
    }
  });
};
