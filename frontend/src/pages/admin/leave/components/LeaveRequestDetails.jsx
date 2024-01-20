import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const LeaveRequestDetails = ({ leaveRequest }) => {
  console.log(leaveRequest);
  return (
    <Box>
      <Grid container>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Employee Name</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>
            {leaveRequest?.Employee?.empFirstName +
              ' ' +
              leaveRequest?.Employee?.empLastName}
          </Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Emp Id</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>{leaveRequest?.Employee?.empCode}</Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Gender</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>
            {leaveRequest?.Employee?.empGender === 'female'
              ? 'Female'
              : leaveRequest?.Employee?.empGender === 'male'
              ? 'Male'
              : 'Transgender'}
          </Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Email Id</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>{leaveRequest?.Employee?.empEmail}</Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Emp Contact Number</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>{leaveRequest?.Employee?.empMobile}</Typography>
        </Grid>

        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Leave Type</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>
            {leaveRequest?.LeaveType?.leaveTypeCode}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Leave Date</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>
            {dayjs(leaveRequest?.leaveFrom).format('DD-MM-YYYY') +
              ' to ' +
              dayjs(leaveRequest?.leaveTo).format('DD-MM-YYYY')}
          </Typography>
        </Grid>

        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Posting Date</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>
            {dayjs(leaveRequest?.createdAt).format(
              'DD-MM-YYYY hh:mm:ss A'
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Employee Leave Reason</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>{leaveRequest?.leaveRequestDesc}</Typography>
        </Grid>
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography>Leave Status</Typography>
        </Grid>{' '}
        <Grid
          item
          className='p-3'
          borderBottom={'1px solid #ddd'}
          xs={6}
          md={3}
        >
          <Typography
            className={`${
              leaveRequest?.status === 'approved'
                ? 'text-green-500'
                : leaveRequest?.status === 'rejected'
                ? 'text-red-500'
                : 'text-blue-500'
            }`}
          >
            {leaveRequest?.status}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaveRequestDetails;
