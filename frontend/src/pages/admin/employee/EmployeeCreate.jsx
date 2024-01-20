import {
  Alert,
  Breadcrumbs,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import {
  addEmployee,
  listEmployees,
} from '../../../actions/employeeActions';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeForm from './components/EmployeeForm';
import { ADD_EMPLOYEE_RESET } from '../../../constants/employeeConstants';
import dayjs from 'dayjs';

const EmployeeCreate = () => {
  const { loading, success, error } = useSelector(
    (state) => state.employeeCreate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    empCode: '',
    empFirstName: '',
    empLastName: '',
    empEmail: '',
    DepartmentId: '',
    empMobile: '',
    empGender: '',
    empDOB: dayjs(Date.now()),
    empCountry: '',
    empCity: '',
    empAddress: '',
  };
  const submitHandler = (values) => {
    dispatch(addEmployee(values));
  };

  return (
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
        <Typography color='text.primary'>New</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Create New Employee</Typography>
      <EmployeeForm
        onSubmit={submitHandler}
        loading={loading}
        initialValues={initialValues}
      />
      {success && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: ADD_EMPLOYEE_RESET });
            dispatch(listEmployees());
            navigate('/admin/employee');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            New Employee is added successfully
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default EmployeeCreate;
