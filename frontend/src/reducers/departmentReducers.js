import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_RESET,
  ADD_DEPARTMENT_SUCCESS,
  FETCH_ALL_DEPARTMENTS_FAIL,
  FETCH_ALL_DEPARTMENTS_REQUEST,
  FETCH_ALL_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENT_FAIL,
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  REMOVE_DEPARTMENT_FAIL,
  REMOVE_DEPARTMENT_REQUEST,
  REMOVE_DEPARTMENT_RESET,
  REMOVE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_RESET,
  UPDATE_DEPARTMENT_SUCCESS,
} from '../constants/departmentConstants';

export const departmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT_REQUEST:
      return { loading: true };
    case ADD_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const departmentListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_DEPARTMENTS_REQUEST:
      return { loading: true };
    case FETCH_ALL_DEPARTMENTS_SUCCESS:
      return {
        loading: false,
        departments: action.payload,
      };
    case FETCH_ALL_DEPARTMENTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const departmentDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENT_REQUEST:
      return { loading: true };
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        department: action.payload,
      };
    case FETCH_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const departmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DEPARTMENT_REQUEST:
      return { loading: true };
    case UPDATE_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const departmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_DEPARTMENT_REQUEST:
      return { loading: true };
    case REMOVE_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};
