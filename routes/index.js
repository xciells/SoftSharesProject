const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/profile', profileRoutes);

module.exports = router;

