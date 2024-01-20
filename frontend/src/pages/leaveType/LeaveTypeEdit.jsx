import {
  Alert,
  Breadcrumbs,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { UPDATE_LEAVE_TYPE_RESET } from '../../constants/leaveTypeConstants';
import {
  detailLeaveType,
  listLeaveTypes,
  updateLeaveType,
} from '../../actions/leaveTypeActions';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LeaveTypeForm from './components/LeaveTypeForm';
import { useDispatch, useSelector } from 'react-redux';

const LeaveTypeEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, leaveType } = useSelector(
    (state) => state.leaveTypeDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.leaveTypeUpdate);

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(detailLeaveType(id));
    }
  }, [id]);

  const submitHandler = (values) => {
    dispatch(updateLeaveType(id, values));
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
          to='/admin/leaveType'
          className={'no-underline'}
        >
          Leave Types
        </NavLink>
        <Typography color='text.primary'>Edit</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Edit Leave Type</Typography>
      <LeaveTypeForm
        onSubmit={submitHandler}
        initialValues={leaveType}
        loading={loadingUpdate}
      />
      {successUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_LEAVE_TYPE_RESET });
            dispatch(listLeaveTypes());
            navigate('/admin/leaveType');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Leave Type is updated successfully
          </Alert>
        </Snackbar>
      )}
      {errorUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_LEAVE_TYPE_RESET });
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

export default LeaveTypeEdit;
