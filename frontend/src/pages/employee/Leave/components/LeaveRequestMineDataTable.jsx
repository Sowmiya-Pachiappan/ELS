import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  deleteLeaveRequest,
  listmyLeaveRequests,
} from '../../../../actions/leaveRequestActions';
import { REMOVE_LEAVE_REQUEST_RESET } from '../../../../constants/leaveRequestConstants';
import { LoadingButton } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
const LeaveRequestMineDataTable = ({ loading, leaveRequests }) => {
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.leaveRequestDelete);
  const [deletionId, setDeletionId] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const editHandler = (id) => {
    navigate(`/app/leave/${id}`);
  };
  const deleteHandler = () => {
    dispatch(deleteLeaveRequest(deletionId));
  };
  const columns = [
    { field: 'sNo', headerName: 'S.No' },
    { field: 'id', headerName: 'ID' },
    { field: 'leaveType', headerName: 'Leave Type' },
    { field: 'leaveRequestDesc', headerName: 'Reason', flex: 1 },
    {
      field: 'leaveFrom',
      headerName: 'Leave From',
      flex: 1,
      renderCell: (params) => (
        <>{dayjs(params.row.leaveFrom).format('DD MMM,YYYY')}</>
      ),
    },
    {
      field: 'leaveTo',
      headerName: 'Leave To',
      flex: 1,
      renderCell: (params) => (
        <>{dayjs(params.row.leaveTo).format('DD MMM,YYYY')}</>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            className={`${
              params.row.status === 'approved'
                ? 'text-green-500'
                : params.row.status === 'rejected'
                ? 'text-red-500'
                : 'text-blue-500'
            }`}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label='edit'
            color='warning'
            size='small'
            onClick={() => editHandler(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='error'
            size='small'
            onClick={() => {
              confirmHandler();
              setDeletionId(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const rows = leaveRequests?.map((leaveRequest, i) => ({
    sNo: i + 1,
    id: leaveRequest.id,
    leaveType: leaveRequest.LeaveType.leaveTypeCode,
    leaveFrom: leaveRequest.leaveFrom,
    leaveRequestDesc: leaveRequest.leaveRequestDesc,
    leaveTo: leaveRequest.leaveTo,
    status: leaveRequest.status,
  }));
  useEffect(() => {
    if (successDelete) {
      closeHandler();
    }
  }, [successDelete]);
  return (
    <>
      {successDelete && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: REMOVE_LEAVE_REQUEST_RESET });
            dispatch(listmyLeaveRequests());
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Leave Request is deleted successfully
          </Alert>
        </Snackbar>
      )}
      {errorDelete && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: REMOVE_LEAVE_REQUEST_RESET });
          }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {errorDelete}
          </Alert>
        </Snackbar>
      )}
      <Dialog
        open={open}
        onClose={closeHandler}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete Leave Request?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to delete this Leave Request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>No</Button>
          <LoadingButton
            loading={loadingDelete}
            onClick={deleteHandler}
            variant='contained'
            autoFocus
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <DataGrid
        rowSelection={false}
        loading={loading}
        className='mt-10 border-none text-[14px]'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </>
  );
};

export default LeaveRequestMineDataTable;
