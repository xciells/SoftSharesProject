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

const usersController = {
    getUsers: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const userId = decoded.id;

            if (userId === 0) {
                const users = await Utilizadores.findAll();
                return res.status(200).json(users);
            } else {
                const userAreas = await UtilizadoresAreas.findAll({
                    where: { utilizador_id: userId }
                });

                const areaIds = userAreas.map(ua => ua.area_id);

                const users = await Utilizadores.findAll({
                    include: [
                        {
                            model: Areas,
                            as: 'areas',
                            where: { id: areaIds }
                        }
                    ]
                });

                return res.status(200).json(users);
            }
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await Utilizadores.findByPk(id, {
                include: [{ model: Areas, as: 'areas' }]
            });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json(user);
        } catch (err) {
            console.error('Erro ao buscar dados do usuário:', err);
            res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
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

            if (req.userId !== 0) {
                const adminAreas = await UtilizadoresAreas.findAll({ where: { utilizador_id: req.userId } });
                const adminAreaIds = adminAreas.map(adminArea => adminArea.area_id);
                for (const areaId of adminAreaIds) {
                    await UtilizadoresAreas.create({ utilizador_id: newUser.id, area_id: areaId });
                }
            } else {
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
        const { tipoid } = req.body;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            user.tipoid = tipoid;
            await user.save();
            res.status(200).json({ message: 'Permissão de usuário atualizada com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar permissão de usuário' });
        }
    },

    associateArea: async (req, res) => {
        const { id } = req.params;
        const { area_id } = req.body;

        try {
            const user = await Utilizadores.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const area = await Areas.findByPk(area_id);
            if (!area) {
                return res.status(404).json({ error: 'Área não encontrada' });
            }

            await UtilizadoresAreas.destroy({ where: { utilizador_id: id } });

            await UtilizadoresAreas.create({ utilizador_id: id, area_id });

            res.status(200).json({ message: `Usuário associado à área ${area.nome} com sucesso` });
        } catch (err) {
            console.error('Erro ao associar área ao usuário:', err);
            res.status(500).json({ error: 'Erro ao associar área ao usuário' });
        }
    },

    getAreas: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const userId = decoded.id;

            if (userId === 0) {
                const areas = await Areas.findAll();
                return res.status(200).json(areas);
            } else {
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
    }
};

module.exports = usersController;
