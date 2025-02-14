const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  userAvaliation: { type: Number, required: true }
});

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ["watched", "abandoned"] },  
  members: { type: [MemberSchema], default: [] }
}, { timestamps: true });

const List = mongoose.model("List", ListSchema);
module.exports = List;
