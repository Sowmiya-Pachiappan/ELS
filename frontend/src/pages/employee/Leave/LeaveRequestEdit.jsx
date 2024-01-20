import {
  Alert,
  Breadcrumbs,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import LeaveRequestForm from './components/LeaveRequestForm';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  detailLeaveRequest,
  listmyLeaveRequests,
  updateLeaveRequest,
} from '../../../actions/leaveRequestActions';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_LEAVE_REQUEST_RESET } from '../../../constants/leaveRequestConstants';
import dayjs from 'dayjs';

const LeaveRequestEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, leaveRequest } = useSelector(
    (state) => state.leaveRequestDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.leaveRequestUpdate);

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(detailLeaveRequest(id));
    }
  }, [id]);

  const submitHandler = (values) => {
    dispatch(updateLeaveRequest(id, values));
  };
  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Stack gap={4}>
      <Breadcrumbs aria-label='breadcrumb'>
        <NavLink color='inherit' to='/app' className={'no-underline'}>
          Home
        </NavLink>
        <NavLink
          color='inherit'
          to='/app/leave'
          className={'no-underline'}
        >
          Leave Requests
        </NavLink>
        <Typography color='text.primary'>Edit</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Edit Leave Request</Typography>
      <LeaveRequestForm
        onSubmit={submitHandler}
        initialValues={{
          ...leaveRequest,
          leaveFrom: dayjs(leaveRequest?.leaveFrom),
          leaveTo: dayjs(leaveRequest?.leaveTo),
        }}
        loading={loadingUpdate}
      />
      {successUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_LEAVE_REQUEST_RESET });
            dispatch(listmyLeaveRequests());
            navigate('/app/leave');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Leave Request is updated successfully
          </Alert>
        </Snackbar>
      )}
      {errorUpdate && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: UPDATE_LEAVE_REQUEST_RESET });
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

export default LeaveRequestEdit;
