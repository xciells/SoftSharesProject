import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Login.css'; // Usando o CSS a partir da nova estrutura de diretórios

import softsharesLogo from '../assets/images/softshares_logo.png';
import softinsaLogo from '../assets/images/softinsa_logo.png';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false); // Estado para rastrear se a senha foi alterada
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        console.log('Iniciando a alteração de senha'); // Mensagem de debug
        if (newPassword !== confirmPassword) {
            setMessage('As novas senhas não coincidem');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log('Token recuperado do localStorage:', token); // Mensagem de debug
            const response = await axios.patch('http://localhost:3001/auth/change-password', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Resposta do servidor:', response.data); // Mensagem de debug
            setMessage('Senha alterada com sucesso');
            setPasswordChanged(true); // Atualiza o estado para indicar que a senha foi alterada
        } catch (error) {
            console.error('Erro ao tentar mudar a senha:', error); // Mensagem de debug
            if (error.response) {
                console.error('Resposta do servidor:', error.response); // Mensagem de debug
                setMessage(error.response.data.error || 'Erro ao tentar mudar a senha');
            } else {
                setMessage('Erro ao tentar mudar a senha');
            }
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={softsharesLogo} alt="Softshares Logo" className="logo" />
                <h2>Change Password</h2>
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label htmlFor="oldPassword" className="form-label">Senha Antiga:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="form-control"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            disabled={passwordChanged} // Desabilita o campo se a senha foi alterada
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword" className="form-label">Nova Senha:</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={passwordChanged} // Desabilita o campo se a senha foi alterada
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Nova Senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={passwordChanged} // Desabilita o campo se a senha foi alterada
                        />
                    </div>
                    {message && <p className="message">{message}</p>}
                    {!passwordChanged ? (
                        <button type="submit" className="btn btn-primary">Mudar Senha</button>
                    ) : (
                        <button onClick={handleBack} className="btn btn-secondary">Voltar</button>
                    )}
                </form>
                <img src={softinsaLogo} alt="Softinsa Logo" className="logo-bottom" />
            </div>
        </div>
    );
};

export default ChangePassword;
