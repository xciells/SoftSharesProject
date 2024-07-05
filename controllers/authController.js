// controllers/authController.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizadores = db.utilizadores;

const authController = {
    register: async (req, res) => {
        const { nome, password, email, numero_colaborador, morada, data_nascimento, contacto, tipoid } = req.body;
        try {
            const newUser = await Utilizadores.create({
                nome,
                password,
                email,
                numero_colaborador,
                morada,
                data_nascimento,
                contacto,
                tipoid
            });
            res.status(201).json(newUser);
        } catch (err) {
            console.error("Erro ao registrar usuário:", err);
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await Utilizadores.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            if (password !== user.password) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            console.error("Erro ao realizar login:", err);
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    },

    activateUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            user.ativo = true;
            await user.save();
            res.status(200).json({ message: 'Usuário ativado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao ativar usuário' });
        }
    },

    deactivateUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            user.ativo = false;
            await user.save();
            res.status(200).json({ message: 'Usuário inativado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao inativar usuário' });
        }
    }
};

module.exports = authController;
