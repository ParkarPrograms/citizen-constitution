import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function PrivateRoute({ element, ...rest }) {
  const { user } = useUser();
  
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
