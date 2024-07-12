const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizadores = db.utilizadores;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.userId = decoded.id;
        req.userType = decoded.tipoid;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await Utilizadores.findByPk(req.userId);
        if (user.tipoid === 2 || user.id === 0) {
            next();
        } else {
            return res.status(403).json({ error: 'Acesso negado. Requer permissões de administrador.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao verificar permissões de administrador' });
    }
};

module.exports = {
    verifyToken,
    isAdmin
};
