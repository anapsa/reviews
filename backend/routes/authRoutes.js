const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Importa o modelo de usuário

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  try {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    // Cria um novo usuário no banco de dados
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar usuário!", error: error.message });
  }
});

module.exports = router;
