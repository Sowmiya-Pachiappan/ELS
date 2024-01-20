import { Grid, Paper, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

const DepartmentForm = ({ loading, initialValues, onSubmit }) => {
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
              label='Department Code'
              variant='outlined'
              name='deptCode'
              value={data.deptCode}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              label='Department Name'
              variant='outlined'
              name='deptName'
              value={data.deptName}
              onChange={changeHandler}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              label='Department Short Code'
              variant='outlined'
              name='deptShortName'
              value={data.deptShortName}
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

export default DepartmentForm;
