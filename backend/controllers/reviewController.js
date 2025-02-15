const Review = require("../models/review");
const { loggedInUser } = require("../routes/userRoutes");

const createReview = async (req, res) => {
    const { title, body, classification} = req.body;
    
  
    if (!title || !classification) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    } 
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

  
    try{
        const newReview = new Review({ title, body, classification, owner: req.user.id});
        await newReview.save();
        res.status(201).json({ message: "Review criado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar review", error });
    }
};

// Obter todas as reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reviews" });
  }
};

module.exports = { createReview, getReviews};
