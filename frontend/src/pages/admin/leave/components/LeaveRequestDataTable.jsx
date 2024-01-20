import { DataGrid } from '@mui/x-data-grid';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
const LeaveRequestDataTable = ({ loading, leaveRequests }) => {
  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/admin/leave/${id}`);
  };

  const columns = [
    { field: 'sNo', headerName: 'S.No' },
    { field: 'id', headerName: 'ID' },
    { field: 'leaveType', headerName: 'Leave Type', flex: 1 },
    { field: 'leaveRequestDesc', headerName: 'Reason', flex: 1 },
    {
      field: 'leaveFrom',
      headerName: 'Leave From',
      flex: 1,
      renderCell: (params) => (
        <>{dayjs(params?.row?.leaveFrom).format('DD MMM,YYYY')}</>
      ),
    },
    {
      field: 'leaveTo',
      headerName: 'Leave To',
      flex: 1,
      renderCell: (params) => (
        <>{dayjs(params?.row?.leaveFrom).format('DD MMM,YYYY')}</>
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
              params?.row?.status === 'approved'
                ? 'text-green-500'
                : params?.row?.status === 'rejected'
                ? 'text-red-500'
                : 'text-blue-500'
            }`}
          >
            {params?.row?.status}
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
            onClick={() => editHandler(params?.row?.id)}
          >
            <AssignmentTurnedInIcon />
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

  return (
    <>
      <DataGrid
        rowSelection={false}
        loading={loading}
        className='border-none text-[14px]'
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

export default LeaveRequestDataTable;
