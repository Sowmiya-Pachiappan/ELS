import {
  Alert,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userActions';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';

const AuthSignIn = ({ hidden, type }) => {
  const { loading, error, userInfo } = useSelector(
    (state) => state.userSignin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
    type: type,
  });
  useEffect(() => {
    if (userInfo) {
      const isAdmin = Boolean(Number(userInfo.isAdmin));

      return navigate(isAdmin ? '/admin' : '/app/profile');
    }
  }, [userInfo, navigate]);
  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const values = {
      ...data,
      isAdmin: type === 'admin' ? true : false,
    };
    console.log(values);
    dispatch(signin(values));
  };

  return (
    <Paper hidden={hidden} elevation={3} className='p-5 md:p-10'>
      <Typography
        component='h1'
        variant='h5'
        className='text-center mb-10'
      >
        Welcome to ELMS
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size='small'
              fullWidth
              label='Email Address'
              variant='outlined'
              type='email'
              name='email'
              value={data.email}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size='small'
              fullWidth
              label='Password'
              variant='outlined'
              type='password'
              value={data.password}
              name='password'
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              size='large'
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              Sign In
            </LoadingButton>
            {error && (
              <Alert className='mt-5' severity='error'>
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AuthSignIn;
