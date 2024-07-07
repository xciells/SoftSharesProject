import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/RecoverPassword.css';

import softsharesLogo from '../assets/images/softshares_logo.png';
import softinsaLogo from '../assets/images/softinsa_logo.png';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/auth/recover-password', { email });
            setMessage('Cheque sua caixa postal. Se este e-mail estiver registado no nosso sistema, receberá um novo password.');
        } catch (error) {
            console.error('Erro ao tentar recuperar a senha:', error);
            setMessage('Erro ao tentar recuperar a senha');
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="recover-password-container">
            <div className="recover-password-box">
                <img src={softsharesLogo} alt="Softshares Logo" className="logo" />
                <h2>Recuperar a senha</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handlePasswordRecovery}>
                    <div className="form-group">
                        <label className="form-label">E-mail:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Receber nova senha</button>
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Voltar</button>
                </form>
                <img src={softinsaLogo} alt="Softinsa Logo" className="logo-bottom" />
            </div>
        </div>
    );
};

export default RecoverPassword;
