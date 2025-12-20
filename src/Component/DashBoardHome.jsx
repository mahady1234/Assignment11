import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import MainDashBoard from './MainDashBoard';
import AdminDashboardHome from './AdminDashboardHome';
import VolunteerDashboardHome from './VolunteerDashboardHome';

const DashBoardHome = () => {
    const { role } = useContext(AuthContext);

    if (role === "Admin") {
        return <AdminDashboardHome />;
    }

    if (role === "donor") {
        return <MainDashBoard />;
    }

    if (role === "volunteer") {
        return <VolunteerDashboardHome />;
    }
};

export default DashBoardHome;