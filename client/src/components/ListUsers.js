import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagementLayout from './UserManagementLayout';
import '../assets/css/UserManagement.css';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar utilizadores:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <UserManagementLayout>
            <div className="list-users-container">
                <h2>Listar Utilizadores</h2>
                <input
                    type="text"
                    placeholder="Buscar utilizador..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="form-control search-bar"
                />
                <ul className="user-list">
                    {currentUsers.map(user => (
                        <li key={user.id}>{user.nome}</li>
                    ))}
                </ul>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                        <button key={i} onClick={() => paginate(i + 1)} className="btn btn-primary">
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </UserManagementLayout>
    );
};

export default ListUsers;
