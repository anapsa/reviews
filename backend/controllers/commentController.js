const Comment = require("../models/comment");
const { loggedInUser } = require("../routes/userRoutes");

const createComment = async (req, res) => {
    const {body, review} = req.body;
    
    if (!body || !review) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    } 
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    try{
        const newComment = new Comment({ body, review, owner: req.user.id, likes: []});
        await newComment.save();
        res.status(201).json({ message: "Comentário criado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar comentário", error });
    }
};
const deleteComment = async (req, res) => {
    const { id } = req.params; 

  try {
    const comment = await Comment.findById(new mongoose.Types.ObjectId(id));
    if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrada" });
    }
    //somente o dono da review ou dono do comentário podem o excluir 
    if (comment.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Ação não permitida" });
        }
    if (comment.review.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Ação não permitida" });
    }
    await comment.findByIdAndDelete(id);
    res.json({ message: "Comentário excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir Comentário", error });
    }
};
module.exports = { createComment, deleteComment};
