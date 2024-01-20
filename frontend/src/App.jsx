import { useSelector } from 'react-redux';
import './styles/App.css';
import { Navigate } from 'react-router';

function App() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const isAdmin = Boolean(Number(userInfo?.isAdmin));
  
  if (!userInfo) {
    // Redirect to the sign-in page if userInfo is not present
    return <Navigate to={'signin'} />;
  }

  return isAdmin ? (
    <Navigate to={'/admin'} />
  ) : (
    <Navigate to={'/app'} />
  );
}

export default App;
