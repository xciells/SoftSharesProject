// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models'); // Importando todos os modelos
const Utilizadores = db.utilizadores; // Certifique-se de que o nome do modelo está correto

const authController = {
    register: async (req, res) => {
        const { nome, password, email, numero_colaborador, morada, data_nascimento, contacto, tipoid } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Utilizadores.create({
                nome,
                password: hashedPassword,
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
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            console.error("Erro ao realizar login:", err);
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
};

module.exports = authController;
