//Rotas para cada uma das funcionalidades em contentController

const express = require("express");
const { createContent, getAllContents } = require("../controllers/contentController")

const router = express.Router();

//Dependendo do comando recebido, encaminha-se para a função designada
router.post("/add", createContent);
router.get("/", getAllContents);

module.exports = router;