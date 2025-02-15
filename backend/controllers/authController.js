require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET || "seu_segredo_super_secreto";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    console.log("Usuário autenticado:", user);
  } catch (error) {
    res.status(500).json({ error: "Erro no login", details: error });
  }
};

module.exports = { login };
