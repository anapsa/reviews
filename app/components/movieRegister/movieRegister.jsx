'use client';

import './movieRegister.css'
import ImageIcon from './imageIcon'

import { useEffect, useState } from "react";

export default function FilterReviews() {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieSynopsis, setMovieSynopsis] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieRating, setMovieRating] = useState('');
    const [movieCover, setMovieCover] = useState('')
    
    const [confirmButton, setConfirmButton] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para uma API ou fazer algo com eles
        console.log({
            title: movieTitle,
            Synopsis: movieSynopsis,
            genre: movieGenre
        });
    };

    
    useEffect(() => {
        async function addMovies(){
            const requestBody = {};
        
            if (movieTitle) requestBody.title = movieTitle;
            if (movieSynopsis) requestBody.synopsis = movieSynopsis;
            if (movieGenre) requestBody.genre = movieGenre;
            if (movieRating) requestBody.rating = movieRating;
            if (movieCover) requestBody.cover = movieCover;

            const response = await fetch("http://localhost:5001/movies/add", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            setMovieTitleCover(listImageTitle)
        }
        addMovies()
    },[confirmButton])


    return (
        <div id="container">
            <form onSubmit={handleSubmit}>
                <div id='horizontal'>
                    <div id='foto'>
                        <div id="adicionarImagem">
                            <ImageIcon/>
                            <h1 id="textaddim">Adicionar Imagem </h1>
                        </div>
                    </div>
                    <div id='campos'>
                        <div id="titleSpace">
                            <label htmlFor="movieTitle">Título do Filme:</label>
                            <input
                                type="text"
                                id="movieTitle"
                                value={movieTitle}
                                onChange={(e) => setMovieTitle(e.target.value)}
                                placeholder="Digite o título do filme"
                            />
                        </div>
                        <div id='miniContainer'>
                            <div>
                                <label htmlFor="movieGenre">Gênero do Filme:</label>
                                <input
                                    id="movieGenre"
                                    value={movieGenre}
                                    onChange={(e) => setMovieGenre(e.target.value)}
                                    placeholder="Digite o gênero do filme"
                                />
                            </div>
                            <div>
                                <label htmlFor="movieRating">Classificação Indicativa:</label>
                                <select
                                    id="movieRating"
                                    value={movieRating}
                                    onChange={(e) => setMovieRating(e.target.value)}
                                >
                                    <option value="">--</option>
                                    <option value="Livre">Livre</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                    <option value="14">14</option>
                                    <option value="16">16</option>
                                    <option value="+18">+18</option>
                                </select>
                            </div>
                            
                        </div>
                        <div>
                            <label htmlFor="movieSynopsis">Sinopse do Filme:</label>
                            <textarea
                                id="movieSynopsis"
                                value={movieSynopsis}
                                onChange={(e) => setMovieSynopsis(e.target.value)}
                                placeholder="Digite uma breve descrição"
                            />
                        </div>
                        <button type="submit" id="env">Cadastrar Filme</button>
                    </div>
                </div>
            </form>
        </div>
    );
}