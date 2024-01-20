import {
  ADD_LEAVE_TYPE_FAIL,
  ADD_LEAVE_TYPE_REQUEST,
  ADD_LEAVE_TYPE_RESET,
  ADD_LEAVE_TYPE_SUCCESS,
  FETCH_ALL_LEAVE_TYPES_FAIL,
  FETCH_ALL_LEAVE_TYPES_REQUEST,
  FETCH_ALL_LEAVE_TYPES_SUCCESS,
  FETCH_LEAVE_TYPE_FAIL,
  FETCH_LEAVE_TYPE_REQUEST,
  FETCH_LEAVE_TYPE_SUCCESS,
  REMOVE_LEAVE_TYPE_FAIL,
  REMOVE_LEAVE_TYPE_REQUEST,
  REMOVE_LEAVE_TYPE_RESET,
  REMOVE_LEAVE_TYPE_SUCCESS,
  UPDATE_LEAVE_TYPE_FAIL,
  UPDATE_LEAVE_TYPE_REQUEST,
  UPDATE_LEAVE_TYPE_RESET,
  UPDATE_LEAVE_TYPE_SUCCESS,
} from '../constants/leaveTypeConstants';

export const leaveTypeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LEAVE_TYPE_REQUEST:
      return { loading: true };
    case ADD_LEAVE_TYPE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_LEAVE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_LEAVE_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveTypeListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_LEAVE_TYPES_REQUEST:
      return { loading: true };
    case FETCH_ALL_LEAVE_TYPES_SUCCESS:
      return {
        loading: false,
        leaveTypes: action.payload,
      };
    case FETCH_ALL_LEAVE_TYPES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const leaveTypeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LEAVE_TYPE_REQUEST:
      return { loading: true };
    case FETCH_LEAVE_TYPE_SUCCESS:
      return {
        loading: false,
        leaveType: action.payload,
      };
    case FETCH_LEAVE_TYPE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const leaveTypeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LEAVE_TYPE_REQUEST:
      return { loading: true };
    case UPDATE_LEAVE_TYPE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_LEAVE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_LEAVE_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_LEAVE_TYPE_REQUEST:
      return { loading: true };
    case REMOVE_LEAVE_TYPE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_LEAVE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_LEAVE_TYPE_RESET:
      return {};
    default:
      return state;
  }
};
