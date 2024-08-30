import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AuthRoute = ({ element, ...rest }) => {
  const { user } = useUser(); // Access user data from context
  
  // If user is authenticated, redirect to a different page (e.g., /chapters)
  return user ? <Navigate to="/chapters" /> : element
};

export default AuthRoute;
