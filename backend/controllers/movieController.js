//movieController possui as funções de criação de conteúdo

const Movie = require("../models/Movie");

// Criar um novo filme
const createMovie = async (req, res) => {
    const {name, gender, rating, cover, synopsis} = req.body;

    if(!name || !gender || !rating || !cover) {
        return res.status(400).json({message: "Todos os campos devem ser preenchidos"});
    }

    try{
        const MovieExists = await Movie.findOne({name});
        if(MovieExists){ //Se o filme já existir
            return res.status(400).json({message: "Esse filme já existe!"})
        }
        
        //Cria o novo filme
        const newMovie = new Movie({name, gender, rating, cover, synopsis});
        await newMovie.save();

        res.status(201).json({message: "Filme foi cadastrado com sucesso"})
    } catch(error){
        return res.status(500).json({message: "Erro na criação do filme ",error})
    }
}

const deleteMoviebyName = async (req,res) => {
    const {name} = req.body

    if(!name){
        return res.status(400).json({message: "Você deve informar o nome do filme a ser deletado"})
    }
    try{
        const dleetedMovie = await Movie.findOneAndDelete({name: name})
        if(dleetedMovie){
            res.status(201).json({message: "Filme " + name + " foi deletado"})
        }
        else{
            res.status(400).json({messaage: "Filme não foi encontrado"})
        }
    } catch(error){
        return res.status(500).json({message: "Erro no apagamento do filme ",error})
    }
}

const updateMoviebyName = async(req,res) => {
    const {name} = req.body
    
    if(!name){
        return res.status(400).json({message: "você deve informar o nome do filme a ser atualizado"})
    }

    try{
        const updatedMovie = await Movie.findOneAndUpdate(
            {name: name},
            req.body,
            {new: true}
        )

        if (updatedMovie){
            res.status(201).json({message: "Filme foi atualizado: ", updatedMovie})
        }
        else{
            res.status(400).json({messaage: "Filme não foi encontrado"})
        }
    } catch(error){
        return res.status(500).json({message:"Erro na adição do filme ", error})
    }
}


const getAllMovies = async (req,res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch(error){
        res.status(500).json({ message: "Erro ao encontrar filmes"})
    }
}

// const deleteMovie = async (req,res) => {
    
// }

module.exports = { createMovie, getAllMovies, deleteMoviebyName, updateMoviebyName};