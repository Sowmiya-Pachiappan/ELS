import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT_FAIL,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:5000';
export const signin = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: userInfo,
  });

  try {
    const { data } = await Axios.post('/api/user/signin', userInfo);

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { userInfo },
  });
  try {
    const { data } = await Axios.post(
      '/api/users/register',
      userInfo
    );
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => async (dispatch) => {
  dispatch({ type: USER_SIGNOUT_REQUEST });
  try {
    dispatch({ type: USER_SIGNOUT_SUCCESS });
    localStorage.removeItem('userInfo');
  } catch (error) {
    dispatch({
      type: USER_SIGNOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword =
  (resetdetails) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post(
        '/api/user/profile',
        {
          ...resetdetails,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
