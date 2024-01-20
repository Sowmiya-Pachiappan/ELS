import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { listLeaveTypes } from '../../actions/leaveTypeActions';
import LeaveTypeDataTable from './components/LeaveTypeDataTable';

const LeaveTypeIndex = () => {
  const { loading, error, leaveTypes } = useSelector(
    (state) => state.leaveTypeList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!leaveTypes) {
      dispatch(listLeaveTypes());
    }
  }, [leaveTypes]);
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='h6'>Manage Leave Types</Typography>
        <NavLink to={'/admin/leaveType/new'}>
          <Button variant='contained'>Add Leave Type</Button>
        </NavLink>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        leaveTypes && (
          <LeaveTypeDataTable
            loading={loading}
            leaveTypes={leaveTypes}
          />
        )
      )}
    </>
  );
};

export default LeaveTypeIndex;
