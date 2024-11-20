import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  // Check if the user has an auth token stored in localStorage
  const token = localStorage.getItem("authToken");

  // If no token is found, redirect to login page
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // If token is found, render the child routes
  return <Outlet />;
}

export default ProtectedRoute;
