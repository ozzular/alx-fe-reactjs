import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  // Custom hook for authentication
  const useAuth = () => {
    return { isAuthenticated };
  };

  const { isAuthenticated: authStatus } = useAuth();

  if (!authStatus) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
