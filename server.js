// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const profileRoutes = require('./routes/profileRoutes');
const areasRoutes = require('./routes/areasRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/profile', profileRoutes);
app.use('/areas', areasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
