const db = require('../models');
const Utilizadores = db.utilizadores;
const Areas = db.areas;

const profileController = {
    getProfile: async (req, res) => {
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
    }
};

module.exports = profileController;
