const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  body: {type: String, required: false}, 
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  review: {type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true}, 
  likes : [{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}]
}, { timestamps: true });


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
