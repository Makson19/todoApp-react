// Config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Forma de ler JSON / Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Habilitando o cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// Rotas da API
const taskRoutes = require('./routes/taskRouter');

app.use('/task', taskRoutes);

// Rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({message: 'Oi Express!'});
})

// Entregar uma porta
const DB_URL = process.env.DB_URL;

// Conectando ao banco de dados MongoDB
mongoose.connect(DB_URL)
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.error(err))
