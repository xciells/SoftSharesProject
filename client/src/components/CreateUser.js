import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagementLayout from './UserManagementLayout';
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
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/areas');
                setAllAreas(response.data);
            } catch (error) {
                console.error('Erro ao buscar áreas:', error);
            }
        };

        fetchAreas();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/auth/create-user', {
                nome,
                email,
                numero_colaborador: numeroColaborador,
                morada,
                data_nascimento: dataNascimento,
                contacto,
                tipoid,
                areas
            });

            setMessage('Utilizador criado com sucesso!');

            // Limpa o formulário após a criação bem-sucedida
            setNome('');
            setEmail('');
            setNumeroColaborador('');
            setMorada('');
            setDataNascimento('');
            setContacto('');
            setAreas([]);
        } catch (error) {
            console.error('Erro ao tentar criar utilizador:', error);
            if (error.response) {
                setMessage(error.response.data.error || 'Erro ao tentar criar utilizador');
            } else {
                setMessage('Erro ao tentar criar utilizador');
            }
        }
    };

    return (
        <UserManagementLayout>
            <div className="create-user-container">
                <h2>Criar Utilizador</h2>
                {message && <div className="message">{message}</div>}
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
                            max={new Date().toISOString().split('T')[0]}
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
                    <div className="form-group">
                        <label className="form-label">Áreas:</label>
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
                    </div>
                    <button type="submit" className="btn btn-primary">Criar Utilizador</button>
                </form>
            </div>
        </UserManagementLayout>
    );
};

export default CreateUser;
