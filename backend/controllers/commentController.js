const Comment = require("../models/comment");
const Review = require("../models/review");
const mongoose = require("mongoose");
const { loggedInUser } = require("../routes/userRoutes");

const createComment = async (req, res) => {
    const {body, review} = req.body;
    
    if (!body || !review) {
        console.log("body" + body);
        console.log(review);
        return res.status(400).json({ message: "Preencha todos os campos" });
    } 
    if (!req.user) {
    console.log("user")
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    try{
        const newComment = new Comment({ body, review, owner: req.user.id, likes: []});
        console.log(review)
        const reviewCommented = Review.findById(new mongoose.Types.ObjectId(review));
        console.log(newComment._id)
        

        
        await newComment.save();
        const updatedReview = await Review.updateOne(
            { _id: new mongoose.Types.ObjectId(review) },  // Condição de busca: reviewId
            { $push: { comments: newComment._id } }         // Adiciona o _id do comentário no campo 'comments'
        );
        if (updatedReview.nModified === 0) {
            return res.status(404).json({ message: "Review não encontrada ou não foi atualizada" });
        }
        res.status(201).json({
            message: "Comentário criado com sucesso",
            id: newComment._id  
        });
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar comentário ${error.text}`, error });
    }
};
const deleteComment = async (req, res) => {
    const { id } = req.body; 

  try {
    const comment = await Comment.findById(new mongoose.Types.ObjectId(id));
    if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado" });
    }
    //somente o dono da review ou dono do comentário podem o excluir 
    const review = await Review.findById(new mongoose.Types.ObjectId(comment.review));
    if (comment.owner.toString() !== req.user.id && review.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Ação não permitida" });
    }
    await Comment.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    res.status(201).json({ message: "Comentário excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir Comentário", error });
    }

};
module.exports = { createComment, deleteComment};
