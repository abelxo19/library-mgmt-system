import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/authUtils';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" />;
  }
  if (!hasRole(allowedRoles)) {
    return <Navigate to="/auth/unauthorized" />;
  }
  return <Outlet />;
};

export default ProtectedRoute; 