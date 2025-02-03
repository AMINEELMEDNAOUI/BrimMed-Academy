import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, roles, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(userRole) === -1) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
