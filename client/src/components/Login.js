import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

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

            if (decoded.tipoid === 2) {
                setMessage('Bem-vindo, Administrador!');
                console.log('Login bem-sucedido para administrador'); // Mensagem de debug
                // Redireciona para o dashboard do administrador ou para uma página protegida
            } else {
                setMessage('Utilizador sem permissões de administrador, acesse a aplicação mobile');
                console.log('Usuário sem permissões de administrador'); // Mensagem de debug
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                            {message && <p className="mt-3 text-center">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
