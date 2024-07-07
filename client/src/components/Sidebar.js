import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/DashboardAdmin.css';

const Sidebar = () => {
    return (
        <div className="sidebar-custom">
            <h5 className="sidebar-heading">Admin Menu</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/dashboard-admin">Dashboard</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/opcao1">Opção 1</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/opcao2">Opção 2</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/opcao3">Opção 3</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
