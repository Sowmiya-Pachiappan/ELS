import Axios from 'axios';
import {
  ADD_LEAVE_TYPE_FAIL,
  ADD_LEAVE_TYPE_REQUEST,
  ADD_LEAVE_TYPE_SUCCESS,
  FETCH_ALL_LEAVE_TYPES_FAIL,
  FETCH_ALL_LEAVE_TYPES_REQUEST,
  FETCH_ALL_LEAVE_TYPES_SUCCESS,
  FETCH_LEAVE_TYPE_FAIL,
  FETCH_LEAVE_TYPE_REQUEST,
  FETCH_LEAVE_TYPE_SUCCESS,
  REMOVE_LEAVE_TYPE_FAIL,
  REMOVE_LEAVE_TYPE_REQUEST,
  REMOVE_LEAVE_TYPE_SUCCESS,
  UPDATE_LEAVE_TYPE_FAIL,
  UPDATE_LEAVE_TYPE_REQUEST,
  UPDATE_LEAVE_TYPE_SUCCESS,
} from '../constants/leaveTypeConstants';

Axios.defaults.baseURL = 'http://localhost:5000';

export const addLeaveType =
  (leaveType) => async (dispatch, getState) => {
    dispatch({
      type: ADD_LEAVE_TYPE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post('/api/leaveType', leaveType, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({
        type: ADD_LEAVE_TYPE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_LEAVE_TYPE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listLeaveTypes = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_ALL_LEAVE_TYPES_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/leaveType', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: FETCH_ALL_LEAVE_TYPES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_LEAVE_TYPES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailLeaveType =
  (leaveTypeId) => async (dispatch, getState) => {
    dispatch({
      type: FETCH_LEAVE_TYPE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(
        `/api/leaveType/${leaveTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: FETCH_LEAVE_TYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LEAVE_TYPE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateLeaveType =
  (leaveTypeId, leaveType) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_LEAVE_TYPE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/leaveType/${leaveTypeId}`,
        leaveType,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_LEAVE_TYPE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_LEAVE_TYPE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteLeaveType =
  (leaveTypeId) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_LEAVE_TYPE_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.delete(
        `/api/leaveType/${leaveTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: REMOVE_LEAVE_TYPE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_LEAVE_TYPE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
