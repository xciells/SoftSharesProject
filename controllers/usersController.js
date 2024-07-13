const jwt = require('jsonwebtoken');
const db = require('../models');
const crypto = require('crypto');
const Utilizadores = db.utilizadores;
const Areas = db.areas;
const UtilizadoresAreas = db.utilizadores_areas;
const { sendEmail } = require('../utils/emailService');

const generateRandomPassword = () => {
    return crypto.randomBytes(8).toString('hex'); // Gera uma senha aleat�ria de 16 caracteres
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
            console.error('Erro ao buscar usu�rios:', err);
            res.status(500).json({ error: 'Erro ao buscar usu�rios' });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await Utilizadores.findByPk(id, {
                include: [{ model: Areas, as: 'areas' }]
            });
            if (!user) {
                return res.status(404).json({ error: 'Usu�rio n�o encontrado' });
            }
            res.json(user);
        } catch (err) {
            console.error('Erro ao buscar dados do usu�rio:', err);
            res.status(500).json({ error: 'Erro ao buscar dados do usu�rio' });
        }
    },

    registerUser: async (req, res) => {
        const { nome, email, numero_colaborador, morada, data_nascimento, contacto, tipoid, areas } = req.body;
        try {
            const existingUser = await Utilizadores.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email j� registrado' });
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

            const emailText = `Ol� ${nome},\n\nSua conta foi criada com sucesso. Sua senha tempor�ria �: ${password}\n\nPor favor, altere sua senha ap�s o primeiro login.\n\nObrigado!`;
            await sendEmail(email, 'Bem-vindo � aplica��o', emailText);

            res.status(201).json(newUser);
        } catch (err) {
            console.error('Erro ao registrar usu�rio:', err);
            res.status(500).json({ error: 'Erro ao registrar usu�rio', details: err.message });
        }
    },

    activateUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usu�rio n�o encontrado' });
            }
            user.ativo = true;
            await user.save();
            res.status(200).json({ message: 'Usu�rio ativado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao ativar usu�rio' });
        }
    },

    deactivateUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usu�rio n�o encontrado' });
            }
            user.ativo = false;
            await user.save();
            res.status(200).json({ message: 'Usu�rio inativado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao inativar usu�rio' });
        }
    },

    changeUserType: async (req, res) => {
        const { userId } = req.params;
        const { tipoid } = req.body;
        try {
            const user = await Utilizadores.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usu�rio n�o encontrado' });
            }
            user.tipoid = tipoid;
            await user.save();
            res.status(200).json({ message: 'Permiss�o de usu�rio atualizada com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar permiss�o de usu�rio' });
        }
    },

    associateArea: async (req, res) => {
        const { id } = req.params;
        const { area_id } = req.body;

        try {
            const user = await Utilizadores.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'Usu�rio n�o encontrado' });
            }

            const area = await Areas.findByPk(area_id);
            if (!area) {
                return res.status(404).json({ error: '�rea n�o encontrada' });
            }

            await UtilizadoresAreas.destroy({ where: { utilizador_id: id } });

            await UtilizadoresAreas.create({ utilizador_id: id, area_id });

            res.status(200).json({ message: `Usu�rio associado � �rea ${area.nome} com sucesso` });
        } catch (err) {
            console.error('Erro ao associar �rea ao usu�rio:', err);
            res.status(500).json({ error: 'Erro ao associar �rea ao usu�rio' });
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
            console.error('Erro ao buscar �reas:', error);
            res.status(500).json({ error: 'Erro ao buscar �reas' });
        }
    }
};

module.exports = usersController;
