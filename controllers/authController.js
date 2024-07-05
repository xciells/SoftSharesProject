// controllers/authController.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizadores = db.utilizadores;
const Areas = db.areas;

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
    },

    changeUserType: async (req, res) => {
        const { userId } = req.params;
        const { tipoid } = req.body; // 1 for common user, 2 for admin
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            user.tipoid = tipoid;
            await user.save();
            res.status(200).json({ message: 'Tipo de usuário atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar tipo de usuário' });
        }
    },
    changePassword: async (req, res) => {
        const { userId } = req.params;
        const { password } = req.body;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            user.password = password;
            user.senha_temporaria = false;
            await user.save();
            res.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar senha' });
        }
    },
    associateArea: async (req, res) => {
        const { id } = req.params; // ID do usuário
        const { area_id } = req.body; // Novo ID da área

        try {
            const user = await Utilizadores.findByPk(id);
            if (!user) {
                console.log(`Usuário com ID ${id} não encontrado`);
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const area = await Areas.findByPk(area_id);
            if (!area) {
                console.log(`Área com ID ${area_id} não encontrada`);
                return res.status(404).json({ error: 'Área não encontrada' });
            }

            user.area_id = area_id;
            await user.save();

            res.status(200).json({ message: `Usuário associado à área ${area.nome} com sucesso` });
        } catch (err) {
            console.error('Erro ao associar área ao usuário:', err);
            res.status(500).json({ error: 'Erro ao associar área ao usuário' });
        }
    }
};

module.exports = authController;