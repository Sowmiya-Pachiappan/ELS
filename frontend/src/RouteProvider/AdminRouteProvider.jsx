import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const AdminRouteProvider = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userSignin);
  const isAdmin = Boolean(Number(userInfo?.isAdmin));
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={`/signin`} state={{ from: location }} />
  );
};

export default AdminRouteProvider;
