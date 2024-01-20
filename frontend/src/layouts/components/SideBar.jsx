import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
const SideBar = () => {
  return (
    <List>
      {[
        { text: 'Home', icon: <DashboardIcon />, path: '/' },
        {
          text: 'Departments',
          path: '/admin/department',
        },
        {
          text: 'Leave Type',
          path: '/admin/leaveType',
        },
        {
          text: 'Employees',
          path: '/admin/employee',
          icon: <SupervisorAccountIcon />,
        },
        { text: 'Leave', path: '/admin/leave' },
      ].map(({ icon, text, path }) => (
        <ListItem
          button
          key={text}
          component={NavLink}
          to={path}
          style={({ isActive }) =>
            isActive
              ? {
                  borderLeft: '4px solid #9c27b0',
                }
              : null
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default SideBar;
