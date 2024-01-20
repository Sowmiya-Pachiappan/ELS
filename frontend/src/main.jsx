import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import GuestLayout from './layouts/GuestLayout.jsx';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import SignIn from './pages/auth/SignIn.jsx';
import DepartmentIndex from './pages/department/DepartmentIndex.jsx';
import DepartmentCreate from './pages/department/DepartmentCreate.jsx';
import DepartmentEdit from './pages/department/DepartmentEdit.jsx';
import EmployeeIndex from './pages/admin/employee/EmployeeIndex.jsx';
import EmployeeCreate from './pages/admin/employee/EmployeeCreate.jsx';
import EmployeeEdit from './pages/admin/employee/EmployeeEdit.jsx';
import LeaveTypeIndex from './pages/leaveType/LeaveTypeIndex.jsx';
import LeaveTypeCreate from './pages/leaveType/LeaveTypeCreate.jsx';
import LeaveTypeEdit from './pages/leaveType/LeaveTypeEdit.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import SignOut from './components/auth/SignOut.jsx';
import EmployeeLayout from './layouts/EmployeeLayout.jsx';
import EmployeeDashboard from './pages/employee/EmployeeDashboard.jsx';
import ChangePassword from './pages/employee/ChangePassword.jsx';
import Profile from './pages/employee/Profile.jsx';
import LeaveApprove from './pages/admin/leave/LeaveApprove.jsx';
import LeaveRequestIndex from './pages/admin/leave/LeaveRequestIndex.jsx';
import LeaveRequestMineIndex from './pages/employee/Leave/LeaveRequestMineIndex.jsx';
import LeaveRequestCreate from './pages/employee/Leave/LeaveRequestCreate.jsx';
import LeaveRequestEdit from './pages/employee/Leave/LeaveRequestEdit.jsx';
import NotFound from './components/Error/NotFound.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 13,
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Routes>
              <Route path='/'>
                <Route index element={<App />}></Route>
                <Route
                  path='admin'
                  element={
                    <AdminLayout>
                      <Outlet />
                    </AdminLayout>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path='department'>
                    <Route index element={<DepartmentIndex />} />
                    <Route
                      path='new'
                      element={<DepartmentCreate />}
                    ></Route>
                    <Route
                      path=':id'
                      element={<DepartmentEdit />}
                    ></Route>
                  </Route>
                  <Route path='employee'>
                    <Route index element={<EmployeeIndex />} />
                    <Route
                      path='new'
                      element={<EmployeeCreate />}
                    ></Route>
                    <Route
                      path=':id'
                      element={<EmployeeEdit />}
                    ></Route>
                  </Route>
                  <Route path='leaveType'>
                    <Route index element={<LeaveTypeIndex />} />
                    <Route
                      path='new'
                      element={<LeaveTypeCreate />}
                    ></Route>
                    <Route
                      path=':id'
                      element={<LeaveTypeEdit />}
                    ></Route>
                  </Route>
                  <Route path='leave'>
                    <Route
                      index
                      element={<LeaveRequestIndex />}
                    ></Route>
                    <Route
                      path=':id'
                      element={<LeaveApprove />}
                    ></Route>
                  </Route>
                </Route>
                <Route
                  path='app'
                  element={
                    <EmployeeLayout>
                      <Outlet></Outlet>
                    </EmployeeLayout>
                  }
                >
                  <Route
                    index
                    element={<EmployeeDashboard></EmployeeDashboard>}
                  ></Route>
                  <Route
                    path='change-password'
                    element={<ChangePassword />}
                  ></Route>
                  <Route path='profile' element={<Profile />}></Route>
                  <Route path='leave'>
                    <Route
                      index
                      element={<LeaveRequestMineIndex />}
                    />
                    <Route
                      path='new'
                      element={<LeaveRequestCreate />}
                    />
                    <Route
                      path=':id'
                      element={<LeaveRequestEdit />}
                    />
                  </Route>
                </Route>
                <Route
                  path='signin'
                  element={
                    <GuestLayout>
                      <SignIn />
                    </GuestLayout>
                  }
                />

                <Route path='signout' element={<SignOut />} />
                <Route
                  path='signup'
                  element={
                    <GuestLayout>
                      <SignUp />
                    </GuestLayout>
                  }
                />
              </Route>
            </Routes>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
