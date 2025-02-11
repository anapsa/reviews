const mongoose = require("mongoose");

// Estabelece as informações que cada usuário precisa ter para ser registrado
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
module.exports = User;
