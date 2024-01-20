import { LoadingButton } from '@mui/lab';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
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
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDepartments } from '../../../../actions/departmentActions';
import dayjs from 'dayjs';

const EmployeeForm = ({ loading, initialValues, onSubmit }) => {
  const {
    loading: loadingList,
    error: errorList,
    departments,
  } = useSelector((state) => state.departmentList);
  const dispatch = useDispatch();
  const [data, setData] = useState({ ...initialValues });

  const changeHandler = (e) => {
    console.log(e.target.name);
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
    if (!departments) {
      dispatch(listDepartments());
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
            <FormControl fullWidth>
              <TextField
                size='small'
                fullWidth
                label='Employee Code'
                variant='outlined'
                name='empCode'
                value={data.empCode}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                size='small'
                fullWidth
                label='First Name'
                variant='outlined'
                name='empFirstName'
                value={data.empFirstName}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                size='small'
                fullWidth
                label='Last Name'
                variant='outlined'
                name='empLastName'
                value={data.empLastName}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                size='small'
                label='Email'
                type='email'
                variant='outlined'
                name='empEmail'
                value={data.empEmail}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <InputLabel id='department'>Department</InputLabel>
              <Select
                labelId='department'
                value={data.DepartmentId}
                label='Department'
                name='DepartmentId'
                onChange={(value) => {
                  changeHandler(value);
                }}
                required
              >
                {departments?.map((department) => (
                  <MenuItem value={department.id} key={department.id}>
                    {department.deptName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <TextField
                inputProps={{ maxLength: 10 }}
                size='small'
                fullWidth
                label='Mobile'
                variant='outlined'
                name='empMobile'
                value={data.empMobile}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <InputLabel id='gender'>Gender</InputLabel>
              <Select
                labelId='gender'
                value={data.empGender}
                label='Gender'
                name='empGender'
                onChange={changeHandler}
                required
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'transgender'}>Transgender</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <TextField
                size='small'
                fullWidth
                label='Country'
                variant='outlined'
                name='empCountry'
                value={data.empCountry}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <TextField
                size='small'
                fullWidth
                label='City'
                variant='outlined'
                name='empCity'
                value={data.empCity}
                onChange={changeHandler}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size='small' required>
              <TextField
                size='small'
                fullWidth
                label='Address'
                variant='outlined'
                name='empAddress'
                value={data.empAddress}
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
                    value={data.empDOB}
                    onChange={(value) => {
                      const e = {
                        target: {
                          name: 'empDOB',
                          value: value,
                        },
                      };

                      changeHandler(e);
                    }}
                    required
                    label='DOB'
                    name='empDOB'
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

export default EmployeeForm;
