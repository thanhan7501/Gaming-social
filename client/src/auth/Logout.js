import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../reducers/isAuthenticatedSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const doLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expired_time');
    dispatch(logOut());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{doLogout()}</>;
}

export default Logout