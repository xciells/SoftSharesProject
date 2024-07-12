import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagementLayout from './UserManagementLayout';
import '../assets/css/UserManagement.css';

const ActivateDeactivateUser = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar utilizadores:', error);
            }
        };

        fetchUsers();
    }, []);

    const toggleUserStatus = async (userId, currentStatus) => {
        try {
            const response = await axios.patch(`http://localhost:3001/auth/${currentStatus ? 'deactivate' : 'activate'}-user/${userId}`);
            setMessage(response.data.message);
            setUsers(users.map(user => user.id === userId ? { ...user, ativo: !currentStatus } : user));
        } catch (error) {
            console.error('Erro ao alterar status do utilizador:', error);
            setMessage('Erro ao alterar status do utilizador');
        }
    };

    return (
        <UserManagementLayout>
            <div className="activate-deactivate-user-container">
                <h2>Ativar/Inativar Utilizadores</h2>
                {message && <div className="message">{message}</div>}
                <ul className="user-list">
                    {users.map(user => (
                        <li key={user.id}>
                            {user.nome}
                            <button
                                onClick={() => toggleUserStatus(user.id, user.ativo)}
                                className={`btn ${user.ativo ? 'btn-danger' : 'btn-success'} ml-2`}
                            >
                                {user.ativo ? 'Inativar' : 'Ativar'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </UserManagementLayout>
    );
};

export default ActivateDeactivateUser;
