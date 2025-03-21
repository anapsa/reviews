const mongoose = require("mongoose");

// Estabelece as informações que cada usuário precisa ter para ser registrado
const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  genre: { type: String, required: true},
  rating: { type: String, required: true },
  cover: {
    imageURL: {type: String, required: true},
    title: {type:String, required: true}
  }, 
  year: {type: String},
  //reviews: [reviewSchema],
  avg: { type: Number, default: 0 },
  synopsis: {type: String}
}, { timestamps: true });


const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;