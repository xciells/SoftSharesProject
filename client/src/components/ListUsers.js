import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('nome');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const usersPerPage = 30;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar utilizadores:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const toggleUserActiveStatus = async (userId, isActive) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:3001/users/${isActive ? 'deactivate-user' : 'activate-user'}/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => user.id === userId ? { ...user, ativo: !isActive } : user));
        } catch (error) {
            console.error('Erro ao alterar status do utilizador:', error);
        }
    };

    const toggleUserType = async (userId, currentType) => {
        try {
            const token = localStorage.getItem('token');
            const newType = currentType === 1 ? 2 : 1;
            await axios.patch(`http://localhost:3001/users/change-user-type/${userId}`, { tipoid: newType }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => user.id === userId ? { ...user, tipoid: newType } : user));
        } catch (error) {
            console.error('Erro ao alterar tipo de utilizador:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <div className="list-users-container">
                    <h2>Listar Utilizadores</h2>
                    Buscar por:
                    <div className="search-bar">
                        <select
                            className="form-control"
                            value={searchField}
                            onChange={handleSearchFieldChange}
                        >
                            <option value="nome">Nome</option>
                            <option value="numero_colaborador">Número de Colaborador</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Buscar por ${searchField}...`}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Número de Colaborador</th>
                                <th>Comum/Admin</th>
                                <th>Ativar/Desativar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(user => (
                                <tr key={user.id} onClick={() => navigate(`/user-profile/${user.id}`)}>
                                    <td>{user.id}</td>
                                    <td className="user-name">{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.numero_colaborador}</td>
                                    <td>
                                        <button
                                            className={`btn ${user.tipoid === 1 ? 'btn-comum' : 'btn-admin'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleUserType(user.id, user.tipoid);
                                            }}
                                        >
                                            {user.tipoid === 1 ? 'Comum' : 'Administrador'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-${user.ativo ? 'success' : 'danger'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleUserActiveStatus(user.id, user.ativo);
                                            }}
                                        >
                                            {user.ativo ? 'Ativo' : 'Inativado'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
                            <button key={number + 1} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUsers;
