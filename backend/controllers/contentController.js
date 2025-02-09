//contentController possui as funções de criação de conteúdo

const Content = require("../models/User");

// Criar um novo filme
const createContent = async (req, res) => {
    const {name, gender, rating, cover, synopsis} = req.body;

    if(!name || !gender || !rating || !cover) {
        return res.status(400).json({message: "Todos os campos devem ser preenchidos"});
    }

    try{
        const contentExists = await Content.findOne({name});
        if(contentExists){ //Se o filme já existir
            return res.status(400).json({message: "Esse filme já existe!"})
        }
        
        //Cria o novo filme
        const newContent = new Content({name, gender, rating, cover, synopsis});
        await newContent.save();

        res.status(201).json({message: "Filme foi cadastrado com sucesso"})
    } catch(error){
        return res.status(500).json({message: "Erro na criação do filme ",error})
    }
}


const getAllContents = async (req,res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch(error){
        res.status(500).json({ message: "Erro ao encontrar filmes"})
    }
}

module.exports = { createContent, getContent };