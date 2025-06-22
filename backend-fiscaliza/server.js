const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const obraRoutes = require('./routes/obras');
const fiscalizacaoRoutes = require('./routes/fiscalizacoes');

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Para aceitar JSON no body
app.use(express.urlencoded({ extended: true })); // Para aceitar dados de formulário

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));

// Rotas da API
app.use('/obras', obraRoutes);
app.use('/fiscalizacoes', fiscalizacaoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));