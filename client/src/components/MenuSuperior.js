import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import softsharesLogo from '../assets/images/softshares_white.png';
import '../assets/css/MenuSuperior.css';

const MenuSuperior = () => {
    const navigate = useNavigate();

    const handleAccountClick = () => {
        navigate('/account');
    };

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

    const areaNames = user.areas.map(area => area.nome).join(', ');

    const handleNotificationsClick = () => {
        navigate('/notifications');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
            <img src={softsharesLogo} alt="SoftShares Logo" className="logo" />
            <div className="textnav">
                {user.id === 0 ? (
                    <p>Você tem acesso a todas as áreas.</p>
                ) : (
                    <p>Você tem acesso a área: {areaNames}</p>
                )}
            </div>
            <div className="ml-auto">
                <FontAwesomeIcon icon={faUser} onClick={handleAccountClick} className="icon" />
                <FontAwesomeIcon icon={faBell} onClick={handleNotificationsClick} className="icon" />
            </div>
        </nav>
    );
};

export default MenuSuperior;
