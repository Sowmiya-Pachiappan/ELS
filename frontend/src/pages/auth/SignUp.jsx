import { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const { error, loading, userRedirect, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ data }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(userRedirect);
    }
  }, [userInfo, userRedirect, navigate]);

  return (
    <Paper elevation={3} className='p-5 md:p-10'>
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
              label='Name'
              variant='outlined'
              name='name'
              value={data.name}
              onChange={changeHandler}
              required
            />
          </Grid>
        </Grid>
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
            <Button
              size='large'
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SignUp;
