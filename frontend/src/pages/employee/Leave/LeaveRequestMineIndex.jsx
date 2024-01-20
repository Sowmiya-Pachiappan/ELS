import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listmyLeaveRequests } from '../../../actions/leaveRequestActions';
import LeaveRequestMineDataTable from './components/LeaveRequestMineDataTable';

const LeaveRequestMineIndex = () => {
  const { loading, error, leaveRequests } = useSelector(
    (state) => state.myleaveRequestList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!leaveRequests) {
      dispatch(listmyLeaveRequests());
    }
  }, []);
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='h6'>Leave Request History</Typography>
        <NavLink to={'/app/leave/new'}>
          <Button variant='contained'>Request Leave</Button>
        </NavLink>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        leaveRequests && (
          <LeaveRequestMineDataTable
            loading={loading}
            leaveRequests={leaveRequests}
          />
        )
      )}
    </>
  );
};

export default LeaveRequestMineIndex;
