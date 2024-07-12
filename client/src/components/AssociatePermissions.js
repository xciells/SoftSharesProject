import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/UserManagement.css';

const AssociatePermissions = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedPermission, setSelectedPermission] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/users');
                setUsers(response.data.users);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

    const updateUserPermission = async () => {
        try {
            await axios.patch(`http://localhost:3001/auth/users/${selectedUserId}/permission`, {
                tipoid: selectedPermission
            });
            setUsers(users.map(u => (u.id === selectedUserId ? { ...u, tipoid: selectedPermission } : u)));
        } catch (error) {
            console.error('Erro ao atualizar permissão do usuário:', error);
        }
    };

    return (
        <div className="associate-permissions-container">
            <h2>Associar Permissões</h2>
            <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
                <option value="" disabled>Selecione um utilizador</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.nome}</option>
                ))}
            </select>
            <select onChange={(e) => setSelectedPermission(e.target.value)} value={selectedPermission}>
                <option value={1}>Utilizador Comum</option>
                <option value={2}>Administrador</option>
            </select>
            <button onClick={updateUserPermission}>Atualizar Permissão</button>
        </div>
    );
};

export default AssociatePermissions;
