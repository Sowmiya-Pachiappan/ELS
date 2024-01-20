import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const EmployeeRouteProvider = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userSignin);
  console.log(userInfo);
  if (!userInfo) {
    return <Navigate to={`/signin`} state={{ from: location }} />;
  }
  const isAdmin = Boolean(Number(userInfo?.isAdmin));
  return !isAdmin && <Outlet />;
};

export default EmployeeRouteProvider;
