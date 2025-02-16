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
        const newReview = new Review({ title, body, classification, owner: req.user.id, likes: []});
        await newReview.save();
        res.status(201).json({ message: "Review criada com sucesso" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao criar review", error });
    }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reviews" });
  }
};


const deleteReview = async (req, res) => {
  const { id } = req.params; 

  try {
      const review = await Review.findById(id);
      if (!review) {
          return res.status(404).json({ message: "Review não encontrada" });
      }
      if (review.owner.toString() !== req.user.id) {
          return res.status(403).json({ message: "Ação não permitida" });
      }

      await Review.findByIdAndDelete(id);
      res.json({ message: "Review excluída com sucesso" });
  } catch (error) {
      res.status(500).json({ message: "Erro ao excluir review", error });
  }
};

module.exports = { createReview, getReviews, deleteReview};
