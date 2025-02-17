const express = require("express");
const { createUser, getUsers, findUser, followUser, deleteUser, updateUser} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { createUser, getUsers } = require("../controllers/userController");
const { login } = require("../controllers/authController"); 

const router = express.Router();


router.post("/add", createUser);
router.get("/", getUsers);
router.get("/find/:name", findUser);
router.post("/follow", followUser);
router.delete("/:name", deleteUser);
router.put("/:name", updateUser)
router.post("/login", login);

module.exports = router;
