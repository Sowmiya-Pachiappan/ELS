import Axios from 'axios';
import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  FETCH_ALL_DEPARTMENTS_FAIL,
  FETCH_ALL_DEPARTMENTS_REQUEST,
  FETCH_ALL_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENT_FAIL,
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  REMOVE_DEPARTMENT_FAIL,
  REMOVE_DEPARTMENT_REQUEST,
  REMOVE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAIL,
  UPDATE_DEPARTMENT_REQUEST,
  UPDATE_DEPARTMENT_SUCCESS,
} from '../constants/departmentConstants';

Axios.defaults.baseURL = 'http://localhost:5000';

export const addDepartment =
  (department) => async (dispatch, getState) => {
    dispatch({
      type: ADD_DEPARTMENT_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post(
        '/api/department',
        department,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: ADD_DEPARTMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_DEPARTMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listDepartments = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_ALL_DEPARTMENTS_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/department', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: FETCH_ALL_DEPARTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_DEPARTMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailDepartment =
  (departmentId) => async (dispatch, getState) => {
    dispatch({
      type: FETCH_DEPARTMENT_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(
        `/api/department/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: FETCH_DEPARTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DEPARTMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateDepartment =
  (departmentId, department) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_DEPARTMENT_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/department/${departmentId}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_DEPARTMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DEPARTMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDepartment =
  (departmentId) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_DEPARTMENT_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.delete(
        `/api/department/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: REMOVE_DEPARTMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_DEPARTMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
