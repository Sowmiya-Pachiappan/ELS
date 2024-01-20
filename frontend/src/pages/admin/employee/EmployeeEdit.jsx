import {
  Alert,
  Breadcrumbs,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { UPDATE_EMPLOYEE_RESET } from '../../../constants/employeeConstants';
import {
  detailEmployee,
  listEmployees,
  updateEmployee,
} from '../../../actions/employeeActions';
import EmployeeForm from './components/EmployeeForm';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const EmployeeEdit = () => {
  const { id } = useParams();
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
    if (id) {
      dispatch(detailEmployee(id));
    }
  }, [id]);

  const submitHandler = (values) => {
    dispatch(updateEmployee(id, values));
  };
  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Stack gap={4}>
      <Breadcrumbs aria-label='breadcrumb'>
        <NavLink
          color='inherit'
          to='/admin'
          className={'no-underline'}
        >
          Home
        </NavLink>
        <NavLink
          color='inherit'
          to='/admin/employee'
          className={'no-underline'}
        >
          Employees
        </NavLink>
        <Typography color='text.primary'>Edit</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Edit Employee</Typography>
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
            dispatch(listEmployees());
            navigate('/admin/employee');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Employee is updated successfully
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

export default EmployeeEdit;
