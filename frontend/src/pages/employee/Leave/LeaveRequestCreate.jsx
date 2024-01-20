import {
  Alert,
  Breadcrumbs,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import {
  addLeaveRequest,
  listmyLeaveRequests,
} from '../../../actions/leaveRequestActions';
import { ADD_LEAVE_REQUEST_RESET } from '../../../constants/leaveRequestConstants';
import { NavLink, useNavigate } from 'react-router-dom';
import LeaveRequestForm from './components/LeaveRequestForm';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

const LeaveRequestCreate = () => {
  const { loading, success, error } = useSelector(
    (state) => state.leaveRequestCreate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    leaveTypeId: '',
    leaveRequestDesc: '',
    leaveFrom: dayjs(Date.now()),
    leaveTo: dayjs(Date.now()),
  };
  const submitHandler = (values) => {
    dispatch(addLeaveRequest(values));
  };

  return (
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
          Leave
        </NavLink>
        <Typography color='text.primary'>New</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Request Leave</Typography>
      <LeaveRequestForm
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
            dispatch({ type: ADD_LEAVE_REQUEST_RESET });
            dispatch(listmyLeaveRequests());
            navigate('/app/leave');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            New Leave Request is added successfully
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

export default LeaveRequestCreate;
