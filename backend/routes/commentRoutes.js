const express = require("express");
const {createComment, deleteComment} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// De acordo com o comando no postman, encaminha-se para a função especificada
router.post("/add", authMiddleware, createComment);
router.delete("/delete", authMiddleware, deleteComment);
module.exports = router; 