import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) return navigate('/login');
  }, [isAuth, navigate]);

  return isAuth && children;
}

export default ProtectedRoute;
