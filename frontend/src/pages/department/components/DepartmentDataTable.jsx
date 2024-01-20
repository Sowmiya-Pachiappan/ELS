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
import { LoadingButton } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDepartment,
  listDepartments,
} from '../../../actions/departmentActions';
import { useNavigate } from 'react-router';
import { REMOVE_DEPARTMENT_RESET } from '../../../constants/departmentConstants';
import { useEffect, useState } from 'react';

const DepartmentDataTable = ({ loading, departments }) => {
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.departmentDelete);
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
    navigate(`/admin/department/${id}`);
  };
  const deleteHandler = () => {
    dispatch(deleteDepartment(deletionId));
  };
  const columns = [
    { field: 'sNo', headerName: 'S.No', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'deptCode',
      headerName: 'Department Code',
      flex: 1,
    },
    {
      field: 'deptName',
      headerName: 'Department Name',
      flex: 1,
    },
    {
      field: 'deptShortName',
      headerName: 'Department Short Name',
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
  const rows = departments?.map((department, i) => ({
    sNo: i + 1,
    id: department.id,
    deptCode: department.deptCode,
    deptName: department.deptName,
    deptShortName: department.deptShortName,
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
            dispatch({ type: REMOVE_DEPARTMENT_RESET });
            dispatch(listDepartments());
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Department is deleted successfully
          </Alert>
        </Snackbar>
      )}
      {errorDelete && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: REMOVE_DEPARTMENT_RESET });
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
          {'Delete Department?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to delete this department?
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

export default DepartmentDataTable;
