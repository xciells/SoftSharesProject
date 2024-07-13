import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuSuperior from './MenuSuperior';
import Sidebar from './Sidebar';
import '../assets/css/UserManagement.css';

const CreateUser = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [numeroColaborador, setNumeroColaborador] = useState('');
    const [morada, setMorada] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [contacto, setContacto] = useState('');
    const [tipoid, setTipoid] = useState(1);
    const [areas, setAreas] = useState([]);
    const [allAreas, setAllAreas] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                if (response.data.id === 0) {
                    const areasResponse = await axios.get('http://localhost:3001/users/areas', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAllAreas(areasResponse.data);
                } else {
                    const userAreasResponse = await axios.get('http://localhost:3001/users/areas', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAreas(userAreasResponse.data.map(area => area.id));
                    setAllAreas(userAreasResponse.data);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUser();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/auth/create-user', {
                nome,
                email,
                numero_colaborador: numeroColaborador,
                morada,
                data_nascimento: dataNascimento,
                contacto,
                tipoid,
                areas
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('Utilizador criado com sucesso!');
            handleClearForm();
        } catch (error) {
            console.error('Erro ao tentar criar utilizador:', error);
            if (error.response) {
                setMessage(error.response.data.error || 'Erro ao tentar criar utilizador');
            } else {
                setMessage('Erro ao tentar criar utilizador');
            }
        }
    };

    const handleClearForm = () => {
        setNome('');
        setEmail('');
        setNumeroColaborador('');
        setMorada('');
        setDataNascimento('');
        setContacto('');
        setTipoid(1);
        setAreas([]);
    };

    return (
        <div className="dashboard-admin">
            <MenuSuperior />
            <Sidebar />
            <div className="dashboard-content">
                <div className="create-user-container">
                    <h2>Criar Utilizador</h2>
                    <form onSubmit={handleCreateUser}>
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
                        <div className="form-group-inline">
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
                                <label className="form-label">Data de Nascimento:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dataNascimento}
                                    onChange={(e) => setDataNascimento(e.target.value)}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group-inline">
                            <div className="form-group">
                                <label className="form-label">Contacto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={contacto}
                                    onChange={(e) => setContacto(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tipo de Utilizador:</label>
                                <select
                                    className="form-control"
                                    value={tipoid}
                                    onChange={(e) => setTipoid(parseInt(e.target.value))}
                                    required
                                >
                                    <option value={1}>Comum</option>
                                    <option value={2}>Administrador</option>
                                </select>
                            </div>
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
                            <label className="form-label">Áreas:</label>
                            {user && user.id === 0 ? (
                                <select
                                    multiple
                                    className="form-control"
                                    value={areas}
                                    onChange={(e) => setAreas([...e.target.selectedOptions].map(option => option.value))}
                                >
                                    {allAreas.map(area => (
                                        <option key={area.id} value={area.id}>{area.nome}</option>
                                    ))}
                                </select>
                            ) : (
                                <p>Administrador só tem permissáo para adionar utlizadores à sua própria área.</p>
                            )}
                        </div>
                        <div className="form-buttons">
                            <button type="button" className="btn btn-secondary" onClick={handleClearForm}>Limpar</button>
                            <button type="submit" className="btn btn-primary">Criar Utilizador</button>
                        </div>
                    </form>
                    {message && <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
