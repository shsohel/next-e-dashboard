import {
  GET_TAGS_BY_QUERY,
  GET_TAG_BY_ID,
  TAG_DATA_ON_PROGRESS,
  TAG_DATA_SUBMIT_PROGRESS,
  OPEN_TAG_SIDEBAR,
  BIND_TAG_BASIC_INFO,
  GET_TAG_DROPDOWN,
} from '../action-types';
import { tagBasicInfoModal } from '../model';

const initialState = {
  dataProgress: false,
  submitTagDataProgress: false,
  openTagSidebar: false,
  tags: [],
  tag: tagBasicInfoModal,
  total: 1,
  queryParams: {},
  queryObj: {},
  dropdownTag: [],
  isDropdownTagLoaded: true,
};

const productCategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAGS_BY_QUERY:
      return {
        ...state,
        tags: action.tags,
        total: action.total,
        queryParams: action.queryParams,
        queryObj: action.queryObj,
      };

    case GET_TAG_BY_ID:
      return {
        ...state,
        tag: action.tag,
      };
    case BIND_TAG_BASIC_INFO:
      return {
        ...state,
        tag: action.tag,
      };
    case TAG_DATA_ON_PROGRESS:
      return {
        ...state,
        dataProgress: action.dataProgress,
      };

    case TAG_DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        submitTagDataProgress: action.submitTagDataProgress,
      };
    case OPEN_TAG_SIDEBAR:
      return {
        ...state,
        openTagSidebar: action.openTagSidebar,
      };
    case GET_TAG_DROPDOWN:
      return {
        ...state,
        dropdownTag: action.dropdownTag,
        isDropdownTagLoaded: action.isDropdownTagLoaded,
      };

    default:
      return state;
  }
};
export default productCategoryReducers;
