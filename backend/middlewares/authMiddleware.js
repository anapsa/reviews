const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header recebido:", authHeader); // 👀 Veja o que está chegando

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("⚠️ Token ausente ou formato errado!");
      return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const token = authHeader.split(" ")[1]; // Pega só o token
  console.log("Token extraído:", token); // 👀 Veja se está pegando certo

  try {
    console.log(secret)
      const decoded = jwt.verify(token, secret); // Substitua pela chave correta
      console.log("Usuário decodificado:", decoded); // 👀 Veja o usuário decodificado

      req.user = decoded; // Salva os dados do usuário no req
      next();
  } catch (error) {
      console.error("❌ Erro ao verificar token:", error);
      return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;