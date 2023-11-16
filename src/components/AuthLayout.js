// AuthLayout.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthLayout = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthLayout;
