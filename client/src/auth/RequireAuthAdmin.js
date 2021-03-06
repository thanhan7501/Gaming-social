import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Page403 from "../pages/403/Page403"
import Loading from "../components/loading/Loading";
import authApi from "../api/authApi";

const RequireAuthAdmin = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.isAuthenticated);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const authenticateUser = async () => {
        try {
            const response = await authApi.getInfo();
            if (response.info && response.status === true) {
                setIsAdmin(response.info.isAdmin);
            }
            else {
                setIsAdmin(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsAdmin(false);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    const checkAdmin = () => {
        if (isLoading) {
            return <Loading />;
        }

        if (isAdmin === true) return <Outlet />;

        else return <Page403 />;
    };

    return <>{checkAdmin()}</>;
}

export default RequireAuthAdmin;