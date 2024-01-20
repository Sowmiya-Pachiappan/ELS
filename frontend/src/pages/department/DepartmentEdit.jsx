import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  detailDepartment,
  listDepartments,
  updateDepartment,
} from '../../actions/departmentActions';
import {
  Alert,
  Breadcrumbs,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import DepartmentForm from './components/DepartmentForm';
import { UPDATE_DEPARTMENT_RESET } from '../../constants/departmentConstants';
import { NavLink } from 'react-router-dom';

const DepartmentEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, department } = useSelector(
    (state) => state.departmentDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.departmentUpdate);

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(detailDepartment(id));
    }
  }, [id]);

  const submitHandler = (values) => {
    dispatch(updateDepartment(id, values));
  };
  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Stack gap={4}>
      <Typography variant='h6'>Edit Department</Typography>
      <DepartmentForm
        onSubmit={submitHandler}
        initialValues={department}
        loading={loadingUpdate}
      />
      {successUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_DEPARTMENT_RESET });
            dispatch(listDepartments());
            navigate('/admin/department');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Department is updated successfully
          </Alert>
        </Snackbar>
      )}
      {errorUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_DEPARTMENT_RESET });
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

export default DepartmentEdit;
