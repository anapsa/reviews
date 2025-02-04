// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

// Importa as dependências
const express = require('express');
const mongoose = require('mongoose');

// Importa o modelo User
const User = require('./models/user'); // Ajuste o caminho conforme necessário

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria a aplicação Express
const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Verifica se a variável MONGO_URI está definida
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('Erro: MONGO_URI não está definido no arquivo .env');
  process.exit(1); // Encerra o processo com erro
}

// Conecta ao MongoDB usando a URI do arquivo .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Conectado ao MongoDB Atlas"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Rota para criar um usuário (POST)
app.post('/users', async (req, res) => {
  try {
    // Cria um novo usuário com os dados recebidos no corpo da requisição
    const newUser = new User(req.body);

    // Salva o usuário no MongoDB
    const savedUser = await newUser.save();

    // Retorna o usuário salvo como resposta
    res.status(201).json(savedUser);
  } catch (err) {
    // Em caso de erro, retorna uma mensagem de erro
    res.status(500).json({ message: err.message });
  }
});

// Rota para listar todos os usuários (GET)
app.get('/users', async (req, res) => {
  try {
    // Busca todos os usuários no MongoDB
    const users = await User.find();

    // Retorna a lista de usuários como resposta
    res.status(200).json(users);
  } catch (err) {
    // Em caso de erro, retorna uma mensagem de erro
    res.status(500).json({ message: err.message });
  }
});

// Rota para buscar um usuário por ID (GET)
app.get('/users/:id', async (req, res) => {
  try {
    // Busca o usuário pelo ID
    const user = await User.findById(req.params.id);

    // Se o usuário não for encontrado, retorna um erro 404
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retorna o usuário encontrado como resposta
    res.status(200).json(user);
  } catch (err) {
    // Em caso de erro, retorna uma mensagem de erro
    res.status(500).json({ message: err.message });
  }
});

// Inicia o servidor na porta definida no arquivo .env
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});