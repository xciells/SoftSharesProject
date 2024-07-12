import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const ActivateDeactivateUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/auth/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar utilizadores:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleActive = async (userId, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:3001/auth/${currentStatus ? 'deactivate' : 'activate'}-user/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(users.map(user => (user.id === userId ? { ...user, ativo: !currentStatus } : user)));
        } catch (error) {
            console.error('Erro ao alterar status do utilizador:', error);
        }
    };

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <h2>Ativar/Inativar Utilizadores</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ativo</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.ativo ? 'Sim' : 'Não'}</td>
                                <td>
                                    <button
                                        onClick={() => handleToggleActive(user.id, user.ativo)}
                                        className={`btn ${user.ativo ? 'btn-danger' : 'btn-success'}`}
                                    >
                                        {user.ativo ? 'Inativar' : 'Ativar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivateDeactivateUser;
