// routes/areasRoutes.js
const express = require('express');
const router = express.Router();
const areasController = require('../controllers/areasController');
const { verifyToken, isAdmin } = require('../utils/authMiddleware');

router.get('/', verifyToken, areasController.getAllAreas);
router.post('/create', verifyToken, isAdmin, areasController.createArea);

module.exports = router;
