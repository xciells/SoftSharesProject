import React from 'react';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const UserManagementLayout = ({ children }) => {
    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                {children}
            </div>
        </div>
    );
};

export default UserManagementLayout;
