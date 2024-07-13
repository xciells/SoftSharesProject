const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../utils/authMiddleware');

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);
router.post('/recover-password', authController.recoverPassword);
router.patch('/change-password', verifyToken, authController.changePassword);

module.exports = router;
