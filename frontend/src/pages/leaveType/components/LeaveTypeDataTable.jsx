import { LoadingButton } from '@mui/lab';
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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  deleteLeaveType,
  listLeaveTypes,
} from '../../../actions/leaveTypeActions';
import { REMOVE_LEAVE_TYPE_RESET } from '../../../constants/leaveTypeConstants';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const LeaveTypeDataTable = ({ loading, leaveTypes }) => {
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.leaveTypeDelete);
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
    navigate(`/admin/leaveType/${id}`);
  };
  const deleteHandler = () => {
    dispatch(deleteLeaveType(deletionId));
  };
  const columns = [
    { field: 'sNo', headerName: 'S.No' },
    { field: 'id', headerName: 'ID' },
    {
      field: 'leaveTypeCode',
      headerName: 'Code',
      renderCell: (param) => <>{param.row.leaveTypeCode}</>,
    },
    {
      field: 'leaveTypeName',
      headerName: 'Name',
      flex: 1,
      renderCell: (param) => <>{param.row.leaveTypeName}</>,
    },
    {
      field: 'leaveTypeDesc',
      headerName: 'Description',
      flex: 1,
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
  const rows = leaveTypes?.map((leaveType, i) => ({
    sNo: i + 1,
    id: leaveType.id,
    leaveTypeCode: leaveType.leaveTypeCode,
    leaveTypeName: leaveType.leaveTypeName,
    leaveTypeDesc: leaveType.leaveTypeDesc,
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
            dispatch({ type: REMOVE_LEAVE_TYPE_RESET });
            dispatch(listLeaveTypes());
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Leave Type is deleted successfully
          </Alert>
        </Snackbar>
      )}
      {errorDelete && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: REMOVE_LEAVE_TYPE_RESET });
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
          {'Delete Leave Type?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to delete this Leave Type?
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

export default LeaveTypeDataTable;
