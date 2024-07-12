const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../utils/authMiddleware');

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);
router.post('/recover-password', authController.recoverPassword);
router.post('/change-password', verifyToken, authController.changePassword);

// Rotas de gerenciamento de utilizadores
router.post('/create-user', verifyToken, isAdmin, authController.registerUser);
router.patch('/activate-user/:userId', verifyToken, isAdmin, authController.activateUser);
router.patch('/deactivate-user/:userId', verifyToken, isAdmin, authController.deactivateUser);
router.patch('/change-user-type/:userId', verifyToken, isAdmin, authController.changeUserType);
router.patch('/associate-area/:id', verifyToken, isAdmin, authController.associateArea);
router.get('/areas', verifyToken, authController.getAreas);

module.exports = router;
