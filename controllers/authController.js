const jwt = require('jsonwebtoken');
const db = require('../models');
const crypto = require('crypto');
const Utilizadores = db.utilizadores;
const Areas = db.areas;
const { sendEmail } = require('../utils/emailService');

const generateRandomPassword = () => {
    return crypto.randomBytes(8).toString('hex'); // Gera uma senha aleatória de 16 caracteres
};

const authController = {
    register: async (req, res) => {
        const { nome, email, numero_colaborador, morada, data_nascimento, contacto, tipoid } = req.body;
        try {
            const existingUser = await Utilizadores.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email já registrado' });
            }

            const password = generateRandomPassword();
            const newUser = await Utilizadores.create({
                nome,
                password,
                email,
                numero_colaborador,
                morada,
                data_nascimento,
                contacto,
                tipoid,
                ativo: true,
                senha_temporaria: true
            });

            const emailText = `Olá ${nome},\n\nSua conta foi criada com sucesso. Sua senha temporária é: ${password}\n\nPor favor, altere sua senha após o primeiro login.\n\nObrigado!`;
            await sendEmail(email, 'Bem-vindo à aplicação', emailText);

            res.status(201).json(newUser);
        } catch (err) {
            console.error('Erro ao registrar usuário:', err);
            res.status(500).json({ error: 'Erro ao registrar usuário', details: err.message });
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
            const token = jwt.sign({ id: user.id, tipoid: user.tipoid, senha_temporaria: user.senha_temporaria }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            console.error("Erro ao realizar login:", err);
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    },

    me: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await Utilizadores.findByPk(decoded.id, {
                include: [{ model: Areas, as: 'areas' }]
            });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao obter detalhes do usuário' });
        }
    },

    changePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await Utilizadores.findByPk(decoded.id);

            console.log('Decoded token:', decoded);
            console.log('User found:', user);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (oldPassword !== user.password) {
                return res.status(400).json({ error: 'Senha antiga incorreta' });
            }

            user.password = newPassword;
            user.senha_temporaria = false;
            await user.save();
            res.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (err) {
            console.error('Erro ao tentar mudar a senha:', err);
            res.status(500).json({ error: 'Erro ao tentar mudar a senha', details: err.message });
        }
    },

    recoverPassword: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await Utilizadores.findOne({ where: { email } });
            if (user) {
                const password = generateRandomPassword();
                user.password = password;
                user.senha_temporaria = true;
                await user.save();

                const emailText = `Olá ${user.nome},\n\nVocê solicitou a recuperação de senha. Sua nova senha temporária é: ${password}\n\nPor favor, altere sua senha após o primeiro login.\n\nObrigado!`;
                await sendEmail(email, 'Recuperação de senha', emailText);
            }
            res.status(200).json({ message: 'Cheque sua caixa postal. Se este email está no nosso sistema, receberá um novo password.' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao tentar recuperar a senha' });
        }
    },
};

module.exports = authController;
