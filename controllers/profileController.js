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
                return res.status(404).json({ error: 'Usu�rio n�o encontrado' });
            }
            res.json(user);
        } catch (err) {
            console.error('Erro ao buscar dados do usu�rio:', err);
            res.status(500).json({ error: 'Erro ao buscar dados do usu�rio' });
        }
    }
};

module.exports = profileController;
