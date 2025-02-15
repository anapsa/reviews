const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createUser, getUsers } = require("../controllers/userController");
const { login } = require("../controllers/authController"); 

const router = express.Router();


router.post("/add", createUser);
router.get("/", getUsers);


router.post("/login", login);

module.exports = router;
