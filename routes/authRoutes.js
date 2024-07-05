// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/activate/:userId', authController.activateUser);
router.patch('/deactivate/:userId', authController.deactivateUser);
router.patch('/change-type/:userId', authController.changeUserType);

module.exports = router;
