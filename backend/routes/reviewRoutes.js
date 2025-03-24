const express = require("express");
const { createReview, getReviews, deleteReview, editReview, likeReview, getReviewById} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, createReview);
router.get("/getReview/:id", getReviewById);
router.get("/get", getReviews);
router.delete("/delete", authMiddleware, deleteReview);
router.put("/edit", authMiddleware, editReview);
router.put("/like", authMiddleware, likeReview);

module.exports = router; 