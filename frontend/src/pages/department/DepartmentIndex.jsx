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
import { listDepartments } from '../../actions/departmentActions';
import { useEffect } from 'react';
import DepartmentDataTable from './components/DepartmentDataTable';

const DepartmentIndex = () => {
  const { loading, error, departments } = useSelector(
    (state) => state.departmentList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!departments) {
      dispatch(listDepartments());
    }
  }, [departments]);

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='h6'>Manage Departments</Typography>
        <NavLink to={'/admin/department/new'}>
          <Button variant='contained'>Add Department</Button>
        </NavLink>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        departments && (
          <DepartmentDataTable
            loading={loading}
            departments={departments}
          />
        )
      )}
    </>
  );
};

export default DepartmentIndex;
