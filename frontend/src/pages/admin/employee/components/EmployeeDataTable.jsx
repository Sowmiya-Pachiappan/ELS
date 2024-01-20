import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  deleteEmployee,
  listEmployees,
} from '../../../../actions/employeeActions';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';
import { REMOVE_EMPLOYEE_RESET } from '../../../../constants/employeeConstants';
import { LoadingButton } from '@mui/lab';

const EmployeeDataTable = ({ loading, employees }) => {
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.employeeDelete);
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
    navigate(`/admin/employee/${id}`);
  };
  const deleteHandler = () => {
    dispatch(deleteEmployee(deletionId));
  };
  const columns = [
    { field: 'sNo', headerName: 'S.No' },
    { field: 'id', headerName: 'ID' },
    {
      field: 'empName',
      headerName: 'Name',
      flex: 1,
      renderCell: (param) => (
        <>
          {param.row.empStatus && <Badge color='success'></Badge>}{' '}
          {param.row.empName}
        </>
      ),
    },
    {
      field: 'empEmail',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'Department',
      headerName: 'Department',
      flex: 1,
    },
    {
      field: 'empMobile',
      headerName: 'Mobile',
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
  const rows = employees?.map((employee, i) => ({
    sNo: i + 1,
    id: employee.id,
    empName: employee.empFirstName + ' ' + employee.empLastName,
    empEmail: employee.empEmail,
    Department: employee.Department.deptName,
    empMobile: employee.empMobile,
    empStatus: employee.empStatus,
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
            dispatch({ type: REMOVE_EMPLOYEE_RESET });
            dispatch(listEmployees());
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Employee is deleted successfully
          </Alert>
        </Snackbar>
      )}
      {errorDelete && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={1000}
          onClose={() => {
            dispatch({ type: REMOVE_EMPLOYEE_RESET });
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
          {'Delete Employee?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to delete this employee?
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

export default EmployeeDataTable;
