import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/userActions';
import { useNavigate } from 'react-router';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, success } = useSelector(
    (state) => state.profileUpdate
  );
  const [data, setData] = useState({});
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
    if (data.password === data.confirmPassword) {
      dispatch(resetPassword(data));
    }
  };
  return (
    <Paper sx={{ p: 5 }}>
      {success && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/app/profile');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Password is changed successfully
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: USER_UPDATE_RESET });
          }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <Stack gap={4}>
        <Typography variant='h6'>Change Password</Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                fullWidth
                label='Password'
                variant='outlined'
                name='password'
                value={data.password}
                onChange={changeHandler}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                fullWidth
                label='Confirm Password'
                variant='outlined'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={changeHandler}
                required
              />
            </Grid>
            <Grid item xs={12} className='flex justify-end'>
              <LoadingButton
                type='submit'
                loading={loading}
                variant='contained'
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Paper>
  );
};

export default ChangePassword;
