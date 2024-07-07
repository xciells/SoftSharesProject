import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/DashboardAdmin.css';

const DashboardAdmin = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <h2>Bem-vindo, {user.nome}</h2>
                {user.id === 0 ? (
                    <p>Você tem acesso a todas as áreas.</p>
                ) : (
                    <p>Você tem acesso à área: {user.area_id}</p>
                )}
            </div>
        </div>
    );
};

export default DashboardAdmin;
