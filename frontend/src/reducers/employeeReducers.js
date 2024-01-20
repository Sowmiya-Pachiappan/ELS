import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_RESET,
  ADD_EMPLOYEE_SUCCESS,
  FETCH_ALL_EMPLOYEES_FAIL,
  FETCH_ALL_EMPLOYEES_REQUEST,
  FETCH_ALL_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEE_FAIL,
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_FAIL,
  REMOVE_EMPLOYEE_REQUEST,
  REMOVE_EMPLOYEE_RESET,
  REMOVE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_SUCCESS,
} from '../constants/employeeConstants';

export const employeeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return { loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_EMPLOYEES_REQUEST:
      return { loading: true };
    case FETCH_ALL_EMPLOYEES_SUCCESS:
      return {
        loading: false,
        employees: action.payload,
      };
    case FETCH_ALL_EMPLOYEES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const employeeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_REQUEST:
      return { loading: true };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        employee: action.payload,
      };
    case FETCH_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const employeeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE_REQUEST:
      return { loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_EMPLOYEE_REQUEST:
      return { loading: true };
    case REMOVE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};
