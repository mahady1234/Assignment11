import React, {  useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Component/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading, roleLoading, userStatus } = useContext(AuthContext)
    const location = useLocation()
    if (loading || roleLoading) {
        return <Loading></Loading>
    }
    if (!user || !userStatus == "Active") {
        return <Navigate state={location.pathname} to='/authRoot/login'></Navigate>
    }
    else {
        return children
    }

};

export default PrivateRoute;