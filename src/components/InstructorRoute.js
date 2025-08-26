import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const InstructorRoute = () => {
  // Get user info from Redux state
  const { userInfo } = useSelector((state) => state.user);

  // Check if user is logged in AND their role is 'Instructor'
  // If so, render the child component (using <Outlet />)
  // Otherwise, redirect them to the login page
  return userInfo && userInfo.role === 'Instructor' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default InstructorRoute;