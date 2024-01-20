import {
  ADD_LEAVE_REQUEST_FAIL,
  ADD_LEAVE_REQUEST_REQUEST,
  ADD_LEAVE_REQUEST_RESET,
  ADD_LEAVE_REQUEST_SUCCESS,
  APPROVE_LEAVE_REQUEST_FAIL,
  APPROVE_LEAVE_REQUEST_REQUEST,
  APPROVE_LEAVE_REQUEST_RESET,
  APPROVE_LEAVE_REQUEST_SUCCESS,
  FETCH_ALL_LEAVE_REQUESTS_FAIL,
  FETCH_ALL_LEAVE_REQUESTS_REQUEST,
  FETCH_ALL_LEAVE_REQUESTS_SUCCESS,
  FETCH_LEAVE_REQUEST_FAIL,
  FETCH_LEAVE_REQUEST_REQUEST,
  FETCH_LEAVE_REQUEST_SUCCESS,
  FETCH_MY_LEAVE_REQUESTS_FAIL,
  FETCH_MY_LEAVE_REQUESTS_REQUEST,
  FETCH_MY_LEAVE_REQUESTS_SUCCESS,
  REMOVE_LEAVE_REQUEST_FAIL,
  REMOVE_LEAVE_REQUEST_REQUEST,
  REMOVE_LEAVE_REQUEST_RESET,
  REMOVE_LEAVE_REQUEST_SUCCESS,
  UPDATE_LEAVE_REQUEST_FAIL,
  UPDATE_LEAVE_REQUEST_REQUEST,
  UPDATE_LEAVE_REQUEST_RESET,
  UPDATE_LEAVE_REQUEST_SUCCESS,
} from '../constants/leaveRequestConstants';

export const leaveRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LEAVE_REQUEST_REQUEST:
      return { loading: true };
    case ADD_LEAVE_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_LEAVE_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case ADD_LEAVE_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveRequestListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case FETCH_ALL_LEAVE_REQUESTS_SUCCESS:
      return {
        loading: false,
        leaveRequests: action.payload,
      };
    case FETCH_ALL_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const myLeaveRequestListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MY_LEAVE_REQUESTS_REQUEST:
      return { loading: true };
    case FETCH_MY_LEAVE_REQUESTS_SUCCESS:
      return {
        loading: false,
        leaveRequests: action.payload,
      };
    case FETCH_MY_LEAVE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const leaveRequestDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LEAVE_REQUEST_REQUEST:
      return { loading: true };
    case FETCH_LEAVE_REQUEST_SUCCESS:
      return {
        loading: false,
        leaveRequest: action.payload,
      };
    case FETCH_LEAVE_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const leaveRequestUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LEAVE_REQUEST_REQUEST:
      return { loading: true };
    case UPDATE_LEAVE_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_LEAVE_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_LEAVE_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};
export const leaveRequestApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVE_LEAVE_REQUEST_REQUEST:
      return { loading: true };
    case APPROVE_LEAVE_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case APPROVE_LEAVE_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case APPROVE_LEAVE_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveRequestDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_LEAVE_REQUEST_REQUEST:
      return { loading: true };
    case REMOVE_LEAVE_REQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_LEAVE_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_LEAVE_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};
