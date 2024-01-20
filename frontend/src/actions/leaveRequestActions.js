import Axios from 'axios';
import {
  ADD_LEAVE_REQUEST_FAIL,
  ADD_LEAVE_REQUEST_REQUEST,
  ADD_LEAVE_REQUEST_SUCCESS,
  APPROVE_LEAVE_REQUEST_FAIL,
  APPROVE_LEAVE_REQUEST_REQUEST,
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
  REMOVE_LEAVE_REQUEST_SUCCESS,
  UPDATE_LEAVE_REQUEST_FAIL,
  UPDATE_LEAVE_REQUEST_REQUEST,
  UPDATE_LEAVE_REQUEST_SUCCESS,
} from '../constants/leaveRequestConstants';

Axios.defaults.baseURL = 'http://localhost:5000';

export const addLeaveRequest =
  (leaveRequest) => async (dispatch, getState) => {
    dispatch({
      type: ADD_LEAVE_REQUEST_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post(
        '/api/leaveRequest',
        { EmployeeId: userInfo.employeeId, ...leaveRequest },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: ADD_LEAVE_REQUEST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_LEAVE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listLeaveRequests = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_ALL_LEAVE_REQUESTS_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/leaveRequest', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: FETCH_ALL_LEAVE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_LEAVE_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listmyLeaveRequests =
  () => async (dispatch, getState) => {
    dispatch({
      type: FETCH_MY_LEAVE_REQUESTS_REQUEST,
    });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(
        `/api/leaveRequest/mine/${userInfo.employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: FETCH_MY_LEAVE_REQUESTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MY_LEAVE_REQUESTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailLeaveRequest =
  (leaveRequestId) => async (dispatch, getState) => {
    dispatch({
      type: FETCH_LEAVE_REQUEST_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(
        `/api/leaveRequest/${leaveRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: FETCH_LEAVE_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LEAVE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateLeaveRequest =
  (leaveRequestId, leaveRequest) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_LEAVE_REQUEST_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/leaveRequest/${leaveRequestId}`,
        leaveRequest,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_LEAVE_REQUEST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_LEAVE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteLeaveRequest =
  (leaveRequestId) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_LEAVE_REQUEST_REQUEST,
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.delete(
        `/api/leaveRequest/${leaveRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: REMOVE_LEAVE_REQUEST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_LEAVE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const approveLeaveRequest =
  (leaveRequestId, leaveRequest) => async (dispatch, getState) => {
    dispatch({
      type: APPROVE_LEAVE_REQUEST_REQUEST,
    });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/leaveRequest/approve/${leaveRequestId}`,
        leaveRequest,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: APPROVE_LEAVE_REQUEST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: APPROVE_LEAVE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
