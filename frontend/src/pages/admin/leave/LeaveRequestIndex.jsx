import {
  Alert,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listLeaveRequests } from '../../../actions/leaveRequestActions';
import LeaveRequestDataTable from './components/LeaveRequestDataTable';

const LeaveRequestIndex = () => {
  const { loading, error, leaveRequests } = useSelector(
    (state) => state.leaveRequestList
  );
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredData, setFilteredData] = useState(leaveRequests);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!leaveRequests) {
      dispatch(listLeaveRequests());
    }
  }, []);

  const StatusFilterHandler = (event) => {
    setSelectedStatus(event.target.value);
  };
  useEffect(() => {
    // Filter the leave requests based on the selected status
    const filtered = leaveRequests?.filter((request) => {
      if (selectedStatus === 'all') {
        return true;
      }
      return request.status === selectedStatus;
    });

    setFilteredData(filtered);
  }, [selectedStatus, leaveRequests]);
  console.log(leaveRequests);
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='h6'>Manage Leave</Typography>
        <Select
          value={selectedStatus}
          onChange={StatusFilterHandler}
          variant='outlined'
        >
          <MenuItem value='all'>All</MenuItem>
          <MenuItem value='approved'>Approved</MenuItem>
          <MenuItem value='rejected'>Rejected</MenuItem>
          <MenuItem value='waiting for approval'>
            Waiting For Approval
          </MenuItem>
        </Select>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        filteredData && (
          <Box className='mt-10'>
            <LeaveRequestDataTable
              loading={loading}
              leaveRequests={filteredData}
            />
          </Box>
        )
      )}
    </>
  );
};

export default LeaveRequestIndex;
