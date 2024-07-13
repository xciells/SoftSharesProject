const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken, isAdmin } = require('../utils/authMiddleware');

// Rotas de gerenciamento de utilizadores
router.get('/', verifyToken, isAdmin, usersController.getUsers);
router.post('/create-user', verifyToken, isAdmin, usersController.registerUser);
router.patch('/activate-user/:userId', verifyToken, isAdmin, usersController.activateUser);
router.patch('/deactivate-user/:userId', verifyToken, isAdmin, usersController.deactivateUser);
router.patch('/change-user-type/:userId', verifyToken, isAdmin, usersController.changeUserType);
router.patch('/associate-area/:id', verifyToken, isAdmin, usersController.associateArea);
router.get('/areas', verifyToken, usersController.getAreas);
router.get('/users', verifyToken, isAdmin, usersController.getUsers);
router.get('/:id', verifyToken, usersController.getUserById);

module.exports = router;
