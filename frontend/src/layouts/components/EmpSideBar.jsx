import { List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const EmpSideBar = () => {
  return (
    <List>
      {[
        { text: 'My Profile', path: '/app/profile' },
        {
          text: 'Change Password',
          path: '/app/change-password',
        },
        { text: 'Leave', path: '/app/leave' },
      ].map(({ text, path }) => (
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

export default EmpSideBar;
