// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//registo e login
router.post('/register', authController.register);
router.post('/login', authController.login);

//ativar e desativar utilizadores
router.patch('/activate/:userId', authController.activateUser);
router.patch('/deactivate/:userId', authController.deactivateUser);

//mudar permissao entre admin ou utulizador comum
router.patch('/change-type/:userId', authController.changeUserType);

//mudar password pela primeira vez
router.patch('/change-password/:userId', authController.changePassword);

//recuperar password
router.post('/recover-password', authController.recoverPassword);

// Rota para associar �rea a um usu�rio
router.patch('/associate-area/:id', authController.associateArea);

// Rota para obter detalhes do usu�rio logado
router.get('/me', authController.me);

//Rota para mudar o password
router.patch('/change-password', authController.changePassword);

module.exports = router;
