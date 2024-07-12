import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const AssociateArea = () => {
    const [users, setUsers] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [usersResponse, areasResponse] = await Promise.all([
                    axios.get('http://localhost:3001/auth/users', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:3001/auth/areas', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setUsers(usersResponse.data);
                setAreas(areasResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleAssociateArea = async () => {
        if (!selectedUser || !selectedArea) return;
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:3001/auth/associate-area/${selectedUser}`,
                { area_id: selectedArea },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Área associada com sucesso!');
        } catch (error) {
            console.error('Erro ao associar área:', error);
        }
    };

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <h2>Associar a uma Área</h2>
                <div className="form-group">
                    <label className="form-label">Utilizador:</label>
                    <select
                        className="form-control"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
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
                    >
                        <option value="">Selecione uma área</option>
                        {areas.map(area => (
                            <option key={area.id} value={area.id}>{area.nome}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAssociateArea} className="btn btn-primary">Associar Área</button>
            </div>
        </div>
    );
};

export default AssociateArea;
