import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Register.css';

import softsharesLogo from '../assets/images/softshares_logo.png';
import softinsaLogo from '../assets/images/softinsa_logo.png';

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [numeroColaborador, setNumeroColaborador] = useState('');
    const [morada, setMorada] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [contacto, setContacto] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/auth/register', {
                nome,
                email,
                numero_colaborador: numeroColaborador,
                morada,
                data_nascimento: dataNascimento,
                contacto,
                tipoid: 1 // Define o tipo de usuário como comum
            });

            setMessage('Registrado com sucesso!');

            // Limpa o formulário após o registro bem-sucedido
            setNome('');
            setEmail('');
            setNumeroColaborador('');
            setMorada('');
            setDataNascimento('');
            setContacto('');
        } catch (error) {
            console.error('Erro ao tentar registrar:', error);
            if (error.response) {
                setMessage(error.response.data.error || 'Erro ao tentar registrar');
            } else {
                setMessage('Erro ao tentar registrar');
            }
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <img src={softsharesLogo} alt="SoftShares Logo" className="logo" />
                <h2>Registrar</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="form-label">Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label className="form-label">Número Colaborador:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={numeroColaborador}
                            onChange={(e) => setNumeroColaborador(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Morada:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={morada}
                            onChange={(e) => setMorada(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Data de Nascimento:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            max={new Date().toISOString().split('T')[0]} // Define o valor máximo como a data atual
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contacto:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Voltar</button>
                </form>
                <img src={softinsaLogo} alt="Softinsa Logo" className="logo-bottom" />
            </div>
        </div>
    );
};

export default Register;
