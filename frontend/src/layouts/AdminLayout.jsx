import { useState } from 'react';

import { Drawer, CssBaseline, Box } from '@mui/material';

import { Outlet } from 'react-router';
import AdminRouteProvider from '../RouteProvider/AdminRouteProvider';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import UserInfoAvatar from './components/UserInfoAvatar';

const drawerWidth = 240;

const AdminLayout = () => {
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
          <UserInfoAvatar userInfo={userInfo} />
          <SideBar />
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
          <UserInfoAvatar userInfo={userInfo} />
          <SideBar />
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
        <AdminRouteProvider>
          <Outlet></Outlet>
        </AdminRouteProvider>
      </Box>
    </div>
  );
};

export default AdminLayout;
