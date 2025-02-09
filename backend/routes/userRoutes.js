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


router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }
  //const isMatch = await bcrypt.compare(password, user.password);
  //console.log(password);
  //console.log(user.password);
  if (password != user.password) {
    return res.status(400).json({ error: "Senha incorreta" });
  }
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
