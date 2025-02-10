import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './config/context/userContext'; // Adjust path if needed
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false); // Stop loading when user is defined
    }
  }, [user]);

  console.log("User in route:", user);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while user data is being fetched
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
};

// 🔹 PropTypes validation
ProtectedRoute.propTypes = {
  requiredRole: PropTypes.string, // Ensure requiredRole is a string if passed
};

export default ProtectedRoute;
