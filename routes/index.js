// routes/index.js
const express = require('express');
const router = express.Router();

// Exemplo de rota de teste
router.get('/', (req, res) => {
    res.send('API is working');
});

// Importar rotas de autenticação
const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

module.exports = router;
