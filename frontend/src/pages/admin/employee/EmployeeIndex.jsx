import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import EmployeeDataTable from './components/EmployeeDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listEmployees } from '../../../actions/employeeActions';

const EmployeeIndex = () => {
  const { loading, error, employees } = useSelector(
    (state) => state.employeeList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!employees) {
      dispatch(listEmployees());
    }
  }, [employees]);

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='h6'>Manage Employees</Typography>
        <NavLink to={'/admin/employee/new'}>
          <Button variant='contained'>Add Employee</Button>
        </NavLink>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        employees && (
          <EmployeeDataTable
            loading={loading}
            employees={employees}
          />
        )
      )}
    </>
  );
};

export default EmployeeIndex;
