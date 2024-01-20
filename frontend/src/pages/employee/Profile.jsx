import {
  Alert,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../admin/employee/components/EmployeeForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailEmployee,
  updateEmployee,
} from '../../actions/employeeActions';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { UPDATE_EMPLOYEE_RESET } from '../../constants/employeeConstants';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, employee } = useSelector(
    (state) => state.employeeDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.employeeUpdate);
  useEffect(() => {
    console.log(userInfo);
    if (userInfo?.employeeId) {
      dispatch(detailEmployee(userInfo.employeeId));
    }
  }, [userInfo]);

  const submitHandler = (values) => {
    dispatch(updateEmployee(userInfo.employeeId, values));
  };

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Stack gap={4}>
      <Typography variant='h6'>My Profile</Typography>
      <EmployeeForm
        onSubmit={submitHandler}
        initialValues={{
          ...employee,
          empDOB: dayjs(employee?.empDOB),
        }}
        loading={loadingUpdate}
      />
      {successUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_EMPLOYEE_RESET });
            navigate('/app/profile');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Profile is updated successfully
          </Alert>
        </Snackbar>
      )}
      {errorUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_EMPLOYEE_RESET });
          }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {errorUpdate}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default Profile;
