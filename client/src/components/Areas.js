import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const Areas = () => {
    const [areas, setAreas] = useState([]);
    const [newArea, setNewArea] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserAndAreas = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const userResponse = await axios.get('http://localhost:3001/auth/me', { headers });
                setUser(userResponse.data);

                const areasResponse = await axios.get('http://localhost:3001/areas', { headers });
                setAreas(areasResponse.data);
            } catch (error) {
                console.error('Erro ao buscar áreas ou usuário:', error);
                setMessage('Erro ao buscar áreas ou usuário');
            }
        };

        fetchUserAndAreas();
    }, []);

    const handleCreateArea = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const response = await axios.post('http://localhost:3001/areas/create', { nome: newArea }, { headers });
            setAreas([...areas, response.data]);
            setNewArea('');
            setMessage('Área criada com sucesso');
        } catch (error) {
            console.error('Erro ao criar área:', error);
            setMessage('Erro ao criar área');
        }
    };

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <div className="areas-container">
                    <h2>Áreas</h2>
                    {user && user.id === 0 ? (
                        <form onSubmit={handleCreateArea}>
                            <div className="form-group">
                                <label className="form-label">Nova Área:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newArea}
                                    onChange={(e) => setNewArea(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-primary">Criar Área</button>
                            </div>
                            {message && <p className="message">{message}</p>}
                        </form>
                    ) : (
                        <p>Este utilizador não tem permissão para criar novas áreas</p>
                    )}
                    <div className="areas-list">
                        <h3>Lista de Áreas</h3>
                        <ul>
                            {areas.map((area) => (
                                <li key={area.id}>{area.nome}</li>
                            ))}
                        </ul>
                    </div>
                    
                     </div>
            </div>
        </div>
    );
};

export default Areas;
