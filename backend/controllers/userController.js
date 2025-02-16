// userController possui as funções de criação e alteração dos usuários

const User = require("../models/User");

// Criar um novo usuário
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

// Avisando se algum campo nao for preenchido
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres" });
  }

  // Verifica se já existe um usuario com este email
  try {

    const nameExists = await User.findOne({ name });
    if (nameExists) {
      return res.status(400).json({ message: "Username já cadastrado" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Cria o novo usuario no banco
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

// Obter todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

module.exports = { createUser, getUsers };
