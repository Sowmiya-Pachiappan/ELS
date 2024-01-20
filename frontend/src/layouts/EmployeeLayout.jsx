import { useState } from 'react';
import EmployeeRouteProvider from '../RouteProvider/EmployeeRouteProvider';
import { Outlet } from 'react-router';
import {
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import EmpSideBar from './components/EmpSideBar';
const drawerWidth = 240;
const EmployeeLayout = () => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeDrawerHandler = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const drawerToggleHandler = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <div>
      <CssBaseline />
      <Header
        onDrawerToggle={drawerToggleHandler}
        drawerWidth={drawerWidth}
      />
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={closeDrawerHandler}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <EmpSideBar />
        </Drawer>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: '#070208',
              color: '#ffffff',
            },
          }}
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open={mobileOpen}
        >
          <Stack
            direction={'column'}
            alignItems={'center'}
            className='pt-10 pb-5'
            gap={2}
          >
            <Avatar />
            {userInfo.name}
          </Stack>
          <EmpSideBar />
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          p: 5,
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <EmployeeRouteProvider>
          <Outlet></Outlet>
        </EmployeeRouteProvider>
      </Box>
    </div>
  );
};

export default EmployeeLayout;
