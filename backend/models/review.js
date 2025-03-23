const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: false}, 
  classification: { type: Number, required: true}, 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}], 
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  content: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true }
}, { timestamps: true });


const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
