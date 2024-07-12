import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const AssociatePermissions = () => {
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

    const handleChangeType = async (userId, tipoid) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:3001/auth/change-user-type/${userId}`,
                { tipoid },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(users.map(user => (user.id === userId ? { ...user, tipoid } : user)));
        } catch (error) {
            console.error('Erro ao alterar tipo do utilizador:', error);
        }
    };

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <h2>Associar Permissões</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.tipoid === 1 ? 'Comum' : 'Administrador'}</td>
                                <td>
                                    <button
                                        onClick={() => handleChangeType(user.id, user.tipoid === 1 ? 2 : 1)}
                                        className="btn btn-primary"
                                    >
                                        Tornar {user.tipoid === 1 ? 'Administrador' : 'Comum'}
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

export default AssociatePermissions;
