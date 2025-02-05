// Estabelece as rotas para cada uma das funcionalidades localizadas em userController
const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// De acordo com o comando no postman, encaminha-se para a função especificada
router.post("/add", createUser);
router.get("/", getUsers);

module.exports = router;
