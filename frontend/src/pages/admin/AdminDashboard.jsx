import {
  Alert,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useLayoutEffect, useState } from 'react';
import { listLeaveRequests } from '../../actions/leaveRequestActions';
import _ from 'lodash';
import LeaveRequestDataTable from './leave/components/LeaveRequestDataTable';

const AdminDashboard = () => {
  const { loading, error, leaveRequests } = useSelector(
    (state) => state.leaveRequestList
  );
  const [stat, setStat] = useState({});
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!leaveRequests) {
      dispatch(listLeaveRequests());
    } else {
      setStat(_.groupBy(leaveRequests, 'status'));
    }
  }, [leaveRequests]);

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Alert severity='error'>{error}</Alert>
  ) : (
    <Stack gap={5}>
      <Grid container spacing={3} alignItems={'stretch'}>
        <Grid item xs={12} md={4}>
          <Card className='p-2'>
            <Stack
              direction={'row'}
              alignItems={'flex-start'}
              gap={1}
            >
              <IconButton>
                <ThumbUpOffAltIcon
                  color='success'
                  fontSize='medium'
                />
              </IconButton>
              <Stack gap={2}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: '#aaa' }}
                >
                  Approved
                </Typography>
                <Typography variant='h4' sx={{ color: '#333' }}>
                  {stat?.approved?.length ?? 0}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className='p-2'>
            <Stack
              direction={'row'}
              alignItems={'flex-start'}
              gap={1}
            >
              <IconButton>
                <PendingActionsIcon color='info' fontSize='medium' />
              </IconButton>
              <Stack gap={2}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: '#aaa' }}
                >
                  Waiting For Approval
                </Typography>
                <Typography variant='h4' sx={{ color: '#333' }}>
                  {stat?.['waiting for approval']?.length ?? 0}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className='p-2'>
            <Stack
              direction={'row'}
              alignItems={'flex-start'}
              gap={1}
            >
              <IconButton>
                <ThumbDownOffAltIcon
                  color='error'
                  fontSize='medium'
                />
              </IconButton>
              <Stack gap={2}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: '#aaa' }}
                >
                  Rejected
                </Typography>
                <Typography variant='h4' sx={{ color: '#333' }}>
                  {stat?.rejected?.length ?? 0}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Stack>
        <Typography variant='h5'>Latest Leave Requests</Typography>
        <LeaveRequestDataTable
          leaveRequests={_.orderBy(
            leaveRequests,
            'createdAt',
            'desc'
          )}
        />
      </Stack>
    </Stack>
  );
};

export default AdminDashboard;
