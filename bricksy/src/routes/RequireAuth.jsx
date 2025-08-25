// REPLACED: Simple protected route that redirects to /login preserving `from`
import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // While loading auth state, don't redirect (optional)
  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
