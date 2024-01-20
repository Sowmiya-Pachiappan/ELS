import { LoadingButton } from '@mui/lab';
import {
  Alert,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLeaveTypes } from '../../../../actions/leaveTypeActions';

const LeaveRequestForm = ({ loading, initialValues, onSubmit }) => {
  const {
    loading: loadingList,
    error: errorList,
    leaveTypes,
  } = useSelector((state) => state.leaveTypeList);
  const dispatch = useDispatch();
  const [data, setData] = useState({ ...initialValues });

  const changeHandler = (e) => {
    console.log(e.target.value);

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    onSubmit(data);
  };

  useLayoutEffect(() => {
    if (!leaveTypes) {
      dispatch(listLeaveTypes());
    }
  }, []);
  return loadingList ? (
    <CircularProgress />
  ) : errorList ? (
    <Alert severity='error'>{errorList}</Alert>
  ) : (
    <Paper sx={{ p: 5 }}>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <InputLabel id='leaveType'>LeaveType</InputLabel>
              <Select
                labelId='leaveType'
                value={data.LeaveTypeId}
                label='LeaveType'
                name='LeaveTypeId'
                onChange={(value) => {
                  changeHandler(value);
                }}
                required
              >
                {leaveTypes?.map((leaveType) => (
                  <MenuItem value={leaveType.id} key={leaveType.id}>
                    {leaveType.leaveTypeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                size='small'
                fullWidth
                label='Reason'
                variant='outlined'
                name='leaveRequestDesc'
                value={data.leaveRequestDesc}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DateField
                    value={data.leaveFrom}
                    onChange={(value) => {
                      const e = {
                        target: {
                          name: 'leaveFrom',
                          value: value,
                        },
                      };

                      changeHandler(e);
                    }}
                    required
                    label='Leave From'
                    name='leaveFrom'
                    size='small'
                    sx={{
                      width: '100%',
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>{' '}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DateField
                    value={data.leaveTo}
                    onChange={(value) => {
                      const e = {
                        target: {
                          name: 'leaveTo',
                          value: value,
                        },
                      };

                      changeHandler(e);
                    }}
                    required
                    label='Leave To'
                    name='leaveTo'
                    size='small'
                    sx={{
                      width: '100%',
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>{' '}
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
    </Paper>
  );
};

export default LeaveRequestForm;
