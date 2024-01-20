import { Alert } from '@mui/material';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signout } from '../../actions/userActions';

const SignOut = () => {
  const { loading, error, success } = useSelector(
    (state) => state.userSignout
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signoutHandler = async () => {
    await dispatch(signout());
  };
  useLayoutEffect(() => {
    signoutHandler();
  }, []);
  useEffect(() => {
    if (success) {
      window.location.href = '/signin';
    }
  }, [success, navigate]);
  useEffect(() => {
    if (error) {
      return <Alert severity={'error'}>{error}</Alert>;
    }
  }, [error]);

  return;
};

export default SignOut;
