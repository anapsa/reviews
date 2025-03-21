const express = require("express");
const {createComment, deleteComment} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/add", authMiddleware, createComment);
router.delete("/delete", authMiddleware, deleteComment);

module.exports = router; 