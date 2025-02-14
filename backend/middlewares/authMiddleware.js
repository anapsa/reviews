const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  if (!req.loggedInUser) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
  req.user = req.loggedInUser; 
  next();
};

module.exports = authMiddleware;