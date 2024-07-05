'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');

const app = express();

// Configura��o de codifica��o UTF-8
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    next();
});

// Servir arquivos est�ticos da build do React
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

// Servir o aplicativo React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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
