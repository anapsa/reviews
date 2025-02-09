const User = require("../models/review");

const createReview = async (req, res) => {
  const { title, body, classification, owner, content } = req.body;

  if (!title || !classification || !content) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  } else if(!owner) {
    return res.status(400).json({message: "Usuário não está cadastrado" })
  }
  //usar isso para verificar se o usuário x já postou uma review do filme y
  /* 
  try {
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
    */
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
