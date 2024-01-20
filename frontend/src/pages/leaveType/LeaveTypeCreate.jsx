import {
  Alert,
  Breadcrumbs,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import LeaveTypeForm from './components/LeaveTypeForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLeaveType,
  listLeaveTypes,
} from '../../actions/leaveTypeActions';
import { ADD_LEAVE_TYPE_RESET } from '../../constants/leaveTypeConstants';

const LeaveTypeCreate = () => {
  const { loading, success, error } = useSelector(
    (state) => state.leaveTypeCreate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    deptCode: '',
    deptName: '',
    deptShortName: '',
  };
  const submitHandler = (values) => {
    dispatch(addLeaveType(values));
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
          to='/admin/leaveType'
          className={'no-underline'}
        >
          Leave Types
        </NavLink>
        <Typography color='text.primary'>New</Typography>
      </Breadcrumbs>
      <Typography variant='h6'>Create New Leave Type</Typography>
      <LeaveTypeForm
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
            dispatch({ type: ADD_LEAVE_TYPE_RESET });
            dispatch(listLeaveTypes());
            navigate('/admin/leaveType');
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            New Leave Type is added successfully
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

export default LeaveTypeCreate;
