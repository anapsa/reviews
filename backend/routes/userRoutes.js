// Estabelece as rotas para cada uma das funcionalidades localizadas em userController
const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// De acordo com o comando no postman, encaminha-se para a função especificada
router.post("/add", createUser);
router.get("/", getUsers);

//

const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Rota de login sem JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verifica se o usuário existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  // Verifica se a senha está correta
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Senha incorreta" });
  }

  // Retorna os dados do usuário sem a senha
  res.json({
    message: "Login bem-sucedido!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
