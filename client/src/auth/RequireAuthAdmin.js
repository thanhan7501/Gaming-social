import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuthAdmin = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.isAuthenticated);

    const authenticateUser = () => {
        
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    return (
        <div>RequireAuthUser</div>
    )
}

export default RequireAuthAdmin;``