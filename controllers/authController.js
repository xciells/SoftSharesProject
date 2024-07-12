const jwt = require('jsonwebtoken');
const db = require('../models');
const crypto = require('crypto');
const Utilizadores = db.utilizadores;
const Areas = db.areas;
const UtilizadoresAreas = db.utilizadores_areas;

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

    associateArea: async (req, res) => {
        const { id } = req.params; // ID do usuário
        const { area_id } = req.body; // Novo ID da área

        try {
            const user = await Utilizadores.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const area = await Areas.findByPk(area_id);
            if (!area) {
                return res.status(404).json({ error: 'Área não encontrada' });
            }

            // Remove associações anteriores
            await UtilizadoresAreas.destroy({ where: { utilizador_id: id } });

            // Adiciona nova associação
            await UtilizadoresAreas.create({ utilizador_id: id, area_id });

            res.status(200).json({ message: `Usuário associado à área ${area.nome} com sucesso` });
        } catch (err) {
            console.error('Erro ao associar área ao usuário:', err);
            res.status(500).json({ error: 'Erro ao associar área ao usuário' });
        }
    },
    registerUser: async (req, res) => {
        const { nome, email, numero_colaborador, morada, data_nascimento, contacto, tipoid, areas } = req.body;
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

            // Associar áreas ao novo usuário
            if (req.userId !== 0) {
                // Caso não seja o admin geral, associar à área do admin logado
                const adminAreas = await UtilizadoresAreas.findAll({ where: { utilizador_id: req.userId } });
                const adminAreaIds = adminAreas.map(adminArea => adminArea.area_id);
                for (const areaId of adminAreaIds) {
                    await UtilizadoresAreas.create({ utilizador_id: newUser.id, area_id: areaId });
                }
            } else {
                // Caso seja o admin geral, associar às áreas selecionadas
                for (const areaId of areas) {
                    await UtilizadoresAreas.create({ utilizador_id: newUser.id, area_id: areaId });
                }
            }

            const emailText = `Olá ${nome},\n\nSua conta foi criada com sucesso. Sua senha temporária é: ${password}\n\nPor favor, altere sua senha após o primeiro login.\n\nObrigado!`;
            await sendEmail(email, 'Bem-vindo à aplicação', emailText);

            res.status(201).json(newUser);
        } catch (err) {
            console.error('Erro ao registrar usuário:', err);
            res.status(500).json({ error: 'Erro ao registrar usuário', details: err.message });
        }
    },

    getAreas: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const userId = decoded.id;

            if (userId === 0) {
                // Se for administrador geral, retorna todas as áreas
                const areas = await Areas.findAll();
                return res.status(200).json(areas);
            } else {
                // Se não for, retorna apenas as áreas associadas ao usuário
                const userAreas = await UtilizadoresAreas.findAll({
                    where: { utilizador_id: userId },
                    include: [{ model: Areas, as: 'area' }]
                });
                const areas = userAreas.map(ua => ua.area);
                return res.status(200).json(areas);
            }
        } catch (error) {
            console.error('Erro ao buscar áreas:', error);
            res.status(500).json({ error: 'Erro ao buscar áreas' });
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
    }
};

module.exports = authController;
