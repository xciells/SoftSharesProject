const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/:id', verifyToken, profileController.getProfile);

module.exports = router;
