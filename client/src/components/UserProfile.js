import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserProfile.css'; // Certifique-se de criar ou editar este arquivo para adicionar os estilos personalizados

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3001/profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleBack = () => {
        navigate('/list-users');
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <div className="user-profile-container">
                   
                    <h2>{user.nome}</h2>
                    <p><strong>Área:</strong> {user.areas && user.areas.map(area => area.nome).join(', ')}</p>
                    <p><strong>Data de Nascimento:</strong> {user.data_nascimento}</p>
                    <p><strong>Tipo:</strong> {user.tipoid === 1 ? 'Comum' : 'Administrador'}</p>
                    <p><strong>Status:</strong> {user.ativo ? 'Ativo' : 'Inativado'}</p>
                    <button className="btn btn-secondary back-button" onClick={handleBack}>Voltar</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
