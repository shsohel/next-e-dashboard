import {
  GET_ATTRIBUTES_BY_QUERY,
  GET_ATTRIBUTE_BY_ID,
  GET_ATTRIBUTES,
  ATTRIBUTE_DATA_ON_PROGRESS,
  ATTRIBUTE_DATA_SUBMIT_PROGRESS,
  OPEN_ATTRIBUTE_SIDEBAR,
  BIND_ATTRIBUTE_BASIC_INFO,
  GET_ATTRIBUTE_DROPDOWN,
  GET_ATTRIBUTE_VALUES_DROPDOWN,
} from '../action-types';
import { attributeBasicInfoModal } from '../model';

const initialState = {
  dataProgress: false,
  submitAttributeDataProgress: false,
  openAttributeSidebar: false,
  attributes: [],
  attribute: attributeBasicInfoModal,
  total: 1,
  queryParams: {},
  queryObj: {},
  dropdownAttribute: [],
  isDropdownAttribute: true,
  dropdownAttributeValues: [],
  isDropdownAttributeValues: true,
};

const attributeReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ATTRIBUTES_BY_QUERY:
      return {
        ...state,
        attributes: action.attributes,
        total: action.total,
        queryParams: action.queryParams,
        queryObj: action.queryObj,
      };

    case GET_ATTRIBUTE_BY_ID:
      return {
        ...state,
        attribute: action.attribute,
      };
    case BIND_ATTRIBUTE_BASIC_INFO:
      return {
        ...state,
        attribute: action.attribute,
      };
    case ATTRIBUTE_DATA_ON_PROGRESS:
      return {
        ...state,
        dataProgress: action.dataProgress,
      };

    case ATTRIBUTE_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        submitAttributeDataProgress: action.submitAttributeDataProgress,
      };
    case OPEN_ATTRIBUTE_SIDEBAR:
      return {
        ...state,
        openAttributeSidebar: action.openAttributeSidebar,
      };
    case GET_ATTRIBUTE_DROPDOWN:
      return {
        ...state,
        dropdownAttribute: action.dropdownAttribute,
        isDropdownAttribute: action.isDropdownAttribute,
      };
    case GET_ATTRIBUTE_VALUES_DROPDOWN:
      return {
        ...state,
        dropdownAttributeValues: action.dropdownAttributeValues,
        isDropdownAttributeValues: action.isDropdownAttributeValues,
      };

    default:
      return state;
  }
};
export default attributeReducers;
