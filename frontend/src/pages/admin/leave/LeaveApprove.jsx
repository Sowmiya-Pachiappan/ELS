import {
  Alert,
  Breadcrumbs,
  CircularProgress,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveLeaveRequest,
  detailLeaveRequest,
  listLeaveRequests,
} from '../../../actions/leaveRequestActions';
import { useNavigate, useParams } from 'react-router';
import LeaveRequestDetails from './components/LeaveRequestDetails';
import { APPROVE_LEAVE_REQUEST_RESET } from '../../../constants/leaveRequestConstants';
import { NavLink } from 'react-router-dom';

const LeaveApprove = () => {
  const { id } = useParams();
  const { loading, error, leaveRequest } = useSelector(
    (state) => state.leaveRequestDetail
  );
  const [status, setStatus] = useState('');
  const {
    loading: loadingApprove,
    error: errorApprove,
    success: successApprove,
  } = useSelector((state) => state.leaveRequestApprove);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!leaveRequest) {
      dispatch(detailLeaveRequest(id));
    }
  }, []);
  const submitHandler = (status) => {
    dispatch(approveLeaveRequest(id, { status: status }));
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
          to='/admin/leave'
          className={'no-underline'}
        >
          Leave
        </NavLink>
        <Typography color='text.primary'>Approve</Typography>
      </Breadcrumbs>
      {successApprove && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: APPROVE_LEAVE_REQUEST_RESET });
            dispatch(listLeaveRequests());
            dispatch(detailLeaveRequest(id));
            navigate('/admin/leave');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Leave Request is updated successfully
          </Alert>
        </Snackbar>
      )}
      {errorApprove && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: APPROVE_LEAVE_REQUEST_RESET });
          }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {errorApprove}
          </Alert>
        </Snackbar>
      )}
      <Grid container>
        <Grid item className='p-3' xs={12} md={6}>
          <Typography variant='h5'>Leave Details</Typography>
        </Grid>
        <Grid item className='p-3' xs={12} md={6}>
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <LoadingButton
              loading={status === 'rejected' && loadingApprove}
              variant='outlined'
              color='error'
              onClick={() => {
                setStatus('rejected');
                submitHandler('rejected');
              }}
            >
              Reject
            </LoadingButton>
            <LoadingButton
              loading={status === 'approved' && loadingApprove}
              variant='contained'
              color='success'
              onClick={() => {
                setStatus('approved');
                submitHandler('approved');
              }}
            >
              Approve
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
      <LeaveRequestDetails leaveRequest={leaveRequest} />
    </Stack>
  );
};

export default LeaveApprove;
