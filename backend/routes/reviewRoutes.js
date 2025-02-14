const express = require("express");
const { createReview, getReviews } = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// De acordo com o comando no postman, encaminha-se para a função especificada
router.post("/addReview", authMiddleware, createReview);
router.get("/getReviews", getReviews);
module.exports = router; 