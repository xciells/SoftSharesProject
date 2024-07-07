import React from 'react';
import '../assets/css/MenuSuperior.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import softsharesLogo from '../assets/images/softshares_white.png'; /* Certifique-se de usar a logo branca correta */

const MenuSuperior = () => {
    const navigate = useNavigate();

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleNotificationsClick = () => {
        navigate('/notifications');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
            <img src={softsharesLogo} alt="SoftShares Logo" className="logo" />
            <div className="ml-auto">
                <FontAwesomeIcon icon={faUser} onClick={handleAccountClick} className="icon" />
                <FontAwesomeIcon icon={faBell} onClick={handleNotificationsClick} className="icon" />
            </div>
        </nav>
    );
};

export default MenuSuperior;
