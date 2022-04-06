import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../reducers/isAuthenticatedSlice";
import { useSelector } from "react-redux";
import authApi from "../api/authApi";
import Loading from "../components/loading/Loading";

const AutoLoginUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.isAuthenticated);
  const getNewToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await authApi.getNewToken(refreshToken);
      console.log(response)
      if (response.data && response.status === true) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }
      if (response.data.status === false) {
        dispatch(logOut());
      }
    } catch (err) {
      console.log(err);
      dispatch(logOut());
    }
  };

  const relogin = async () => {
    try {
      await getNewToken();
      setInterval(() => {
        getNewToken();
      }, 3480000);
      const response = await authApi.getInfo();
      console.log(response)
      if (response.info && response.status === true) {
        dispatch(logIn(response.info));
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      dispatch(logOut())
      setIsLoading(false);
    }
  };

  useEffect(() => {
    relogin();
  }, []);

  const checkAuthenticate = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (isAuthenticated === true) return <Outlet />;

    else return <Navigate to="/login" state={{ from: location }} replace />;
  };

  return <>{checkAuthenticate()}</>;
};

export default AutoLoginUser;
