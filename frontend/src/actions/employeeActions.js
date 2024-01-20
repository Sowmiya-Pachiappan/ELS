import Axios from 'axios';
import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  FETCH_ALL_EMPLOYEES_FAIL,
  FETCH_ALL_EMPLOYEES_REQUEST,
  FETCH_ALL_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEE_FAIL,
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_FAIL,
  REMOVE_EMPLOYEE_REQUEST,
  REMOVE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
} from '../constants/employeeConstants';

Axios.defaults.baseURL = 'http://localhost:5000';

export const addEmployee =
  (employee) => async (dispatch, getState) => {
    dispatch({
      type: ADD_EMPLOYEE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post('/api/employee', employee, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({
        type: ADD_EMPLOYEE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listEmployees = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_ALL_EMPLOYEES_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/employee', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: FETCH_ALL_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_EMPLOYEES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailEmployee =
  (employeeId) => async (dispatch, getState) => {
    dispatch({
      type: FETCH_EMPLOYEE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(
        `/api/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: FETCH_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateEmployee =
  (employeeId, employee) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_EMPLOYEE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/employee/${employeeId}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEmployee =
  (employeeId) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_EMPLOYEE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.delete(
        `/api/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: REMOVE_EMPLOYEE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
