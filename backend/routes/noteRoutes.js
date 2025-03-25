const express = require("express");
const { createNote, getNotes, findNote, deleteNote, updateNote} = require("../controllers/noteController");

const router = express.Router();

//const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", createNote);
router.get("/find/", findNote);
router.put("/edit", updateNote);
router.get("/:email", getNotes);
router.delete("/dell", deleteNote);

module.exports = router;