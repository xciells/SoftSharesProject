import React from 'react';
import { Link } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const ManageUsers = () => {
    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <h2>Gerenciamento de Utilizadores</h2>
                <ul className="manage-users-list">
                    <li>
                        <Link to="/create-user">Registar Utilizador</Link>
                    </li>
                    <li>
                        <Link to="/list-users">Listar Utilizadores</Link>
                    </li>
                    <li>
                        <Link to="/activate-deactivate-user">Ativar/Inativar Utilizadores</Link>
                    </li>
                    <li>
                        <Link to="/associate-permissions">Associar Permissões</Link>
                    </li>
                    <li>
                        <Link to="/associate-area">Associar a uma Área</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ManageUsers;
