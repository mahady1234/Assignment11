
import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../Component/Aside';

const DashboardLayout = () => {
    return (
        <div className='flex '>
            <Aside></Aside>
            <div className='w-full mt-12'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;


