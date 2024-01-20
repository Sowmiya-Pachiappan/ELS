import { Dehaze } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ drawerWidth, onDrawerToggle }) => {
  return (
    <AppBar
      className='relative shadow-none'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Dehaze />
        </IconButton>
        <Stack
          className='w-full'
          justifyContent={'space-between'}
          flexDirection={'row'}
        >
          <Typography
            variant='h5'
            noWrap
            component='div'
            color={'WindowText'}
            className='hidden sm:block text-white'
          >
            Employee Leave Management System
          </Typography>
          <Typography
            variant='h5'
            noWrap
            component='div'
            color={'WindowText'}
            className='block sm:hidden text-white'
          >
            ELMS
          </Typography>
          <NavLink
            className={'text-white no-underline'}
            to='/signout'
          >
            <Stack gap={1} direction='row'>
              <LogoutIcon /> Sign Out
            </Stack>
          </NavLink>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
