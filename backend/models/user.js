const mongoose = require("mongoose");

// Estabelece as informações que cada usuário precisa ter para ser registrado
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  review: [{type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true}],
  password: { type: String, required: true },
  followers: [{ type: String, ref: 'User' }], // Referência aos usuários que seguem este usuário
  following: [{ type: String, ref: 'User' }], // Referência aos usuários que este usuário segue
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
