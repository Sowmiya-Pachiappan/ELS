import { LoadingButton } from '@mui/lab';
import { Grid, Paper, TextField } from '@mui/material';
import { useState } from 'react';

const LeaveTypeForm = ({ loading, initialValues, onSubmit }) => {
  const [data, setData] = useState({ ...initialValues });
  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(data);
  };
  return (
    <Paper sx={{ p: 5 }}>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              label='Leave Type Code'
              variant='outlined'
              name='leaveTypeCode'
              value={data.leaveTypeCode}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              label='Leave Type Name'
              variant='outlined'
              name='leaveTypeName'
              value={data.leaveTypeName}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              label='Leave Type Description'
              variant='outlined'
              name='leaveTypeDesc'
              value={data.leaveTypeDesc}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
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
    </Paper>
  );
};

export default LeaveTypeForm;
