import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Login.css';

import softsharesLogo from '../assets/images/softshares_logo.png';
import softinsaLogo from '../assets//images/softinsa_logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Tentando login com:', { email, password }); // Mensagem de debug
        try {
            const response = await axios.post('http://localhost:3001/auth/login', { email, password });
            console.log('Resposta do servidor:', response.data); // Mensagem de debug
            const token = response.data.token;

            // Armazena o token no localStorage
            localStorage.setItem('token', token);
            console.log('Token armazenado no localStorage:', token); // Mensagem de debug

            // Decodifica o token para obter o tipo de usuário
            const decoded = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
            console.log('Token decodificado:', decoded); // Mensagem de debug

            if (decoded.senha_temporaria) {
                navigate('/change-password');
            } else if (decoded.tipoid === 2) {
                setMessage('Bem-vindo, Administrador!');
                navigate('/dashboard-admin');
            } else {
                setMessage('Utilizador sem permissões de administrador, acesse a aplicação mobile');
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error); // Mensagem de debug
            if (error.response) {
                console.error('Resposta do servidor:', error.response); // Mensagem de debug
                setMessage(error.response.data.error || 'Erro ao tentar fazer login');
            } else {
                setMessage('Erro ao tentar fazer login');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={softsharesLogo} alt="Softshares Logo" className="logo" />
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {message && <p className="message">{message}</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <img src={softinsaLogo} alt="Softinsa Logo" className="logo-bottom" />
            </div>
        </div>
    );
};

export default Login;
