const mongoose = require("mongoose");

// Estabelece as informações que cada usuário precisa ter para ser registrado
const ContentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  gender: { type: String, required: true},
  rating: { type: String, required: true },
  cover: {
    imageURL: {type: String, required: true},
    title: {type:String, required: true}
  }, 
  synopsis: {type: String}
}, { timestamps: true });


const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;