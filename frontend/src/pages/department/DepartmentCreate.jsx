import {
  Alert,
  Breadcrumbs,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import DepartmentForm from './components/DepartmentForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDepartment,
  listDepartments,
} from '../../actions/departmentActions';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { ADD_DEPARTMENT_RESET } from '../../constants/departmentConstants';

const DepartmentCreate = () => {
  const { loading, success, error } = useSelector(
    (state) => state.departmentCreate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    deptCode: '',
    deptName: '',
    deptShortName: '',
  };
  const submitHandler = (values) => {
    dispatch(addDepartment(values));
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
          to='/admin/department'
          className={'no-underline'}
        >
          Departments
        </NavLink>
        <Typography color='text.primary'>New</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Create New Department</Typography>
      <DepartmentForm
        onSubmit={submitHandler}
        loading={loading}
        initialValues={initialValues}
      />
      {success && (
        <Snackbar
          color={'success'}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: ADD_DEPARTMENT_RESET });
            dispatch(listDepartments());
            navigate('/admin/department');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            New Department is added successfully
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

export default DepartmentCreate;
