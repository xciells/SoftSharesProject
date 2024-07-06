// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const db = require('./models'); 
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

//routes
app.use('/auth', authRoutes);

// Teste de Conex�o com o Banco de Dados
db.sequelize.authenticate()
    .then(() => {
        console.log('Conex�o com o banco de dados foi bem-sucedida.');
    })
    .catch(err => {
        console.error('N�o foi poss�vel conectar ao banco de dados:', err);
    });

// Inicie o servidor
const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
