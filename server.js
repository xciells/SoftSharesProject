// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./models'); // Certifique-se de que a configuração do sequelize está correta

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/auth', authRoutes);

// Teste de Conexão com o Banco de Dados
db.sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Inicie o servidor
const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
