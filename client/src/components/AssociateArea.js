import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagementLayout from './UserManagementLayout';
import '../assets/css/UserManagement.css';

const AssociateArea = () => {
    const [users, setUsers] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsersAndAreas = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:3001/users');
                const areasResponse = await axios.get('http://localhost:3001/areas');
                setUsers(usersResponse.data);
                setAreas(areasResponse.data);
            } catch (error) {
                console.error('Erro ao buscar utilizadores e áreas:', error);
            }
        };

        fetchUsersAndAreas();
    }, []);

    const handleAssociateArea = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:3001/auth/associate-area/${selectedUser}`, { area_id: selectedArea });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erro ao tentar associar área ao utilizador:', error);
            if (error.response) {
                setMessage(error.response.data.error || 'Erro ao tentar associar área ao utilizador');
            } else {
                setMessage('Erro ao tentar associar área ao utilizador');
            }
        }
    };

    return (
        <UserManagementLayout>
            <div className="associate-area-container">
                <h2>Associar a uma Área</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleAssociateArea}>
                    <div className="form-group">
                        <label className="form-label">Utilizador:</label>
                        <select
                            className="form-control"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required
                        >
                            <option value="">Selecione um utilizador</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Área:</label>
                        <select
                            className="form-control"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            required
                        >
                            <option value="">Selecione uma área</option>
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>{area.nome}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Associar</button>
                </form>
            </div>
        </UserManagementLayout>
    );
};

export default AssociateArea;
