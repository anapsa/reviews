'use client';

import { useEffect, useState } from "react";

import './filterReviews.css';

export default function FilterReviews() {
    const [isOpenMovie, setIsOpenMovie] = useState(false);
    const [isOpenClassification, setIsOpenClassification] = useState(false);
    const [isOpenGenre, setIsOpenGenre] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [itemTitles, setItemTitles] = useState("Não há opções");
    const [itemClassification, setItemClassification] = useState("Não há opções");
    const [itemGenre, setItemGenre] = useState("Não há opções");
    
    const ClickMovie = () => {
        setIsOpenMovie(!isOpenMovie);
    };

    const ClickClassification = () => {
        setIsOpenClassification(!isOpenClassification);
    };
    const ClickGenre = () => {
        setIsOpenGenre(!isOpenGenre);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpenMovie(false); 
        setIsOpenClassification(false);
        setIsOpenGenre(false) // Fecha todos os dropdowns ao selecionar
    };

    useEffect(() => {
        async function getMovies (){
            const response = await fetch("http://localhost:5001/movies/", {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                },
            });

            const movies = await response.json();

            const titles = movies.map(movie => movie.name).sort((a, b) => a.localeCompare(b));
            const genre = [...new Set(movies.filter(movie => movie.genre && movie.genre !== "default").map(movie => movie.genre))];
            const classification = ["0", "1", "2", "3", "4", "5"]

            setItemTitles(titles)
            setItemClassification(classification)
            setItemGenre(genre)
        }

        getMovies()
    },[])


    return (
        <div id="container">
            <div id='header'>
                <div id='titulo'>Filtrar por </div>
            </div>
            <div id = "filtros">
                <div id='filterContainer' onMouseEnter={ClickMovie} onMouseLeave={ClickMovie}>
                    <button id="movieButton">
                        Filme
                    </button>
                    {isOpenMovie && (
                        <ul className="dropdown">
                            {itemTitles.length > 0 ? (
                                itemTitles.map((item, index) => (
                                    <li key={index} onClick={() => handleSelect(item)}>
                                        {item}
                                    </li>
                                ))
                                ) : (
                                    <li>Carregando...</li>  // Exibe enquanto os itens estão sendo carregados
                                )
                            }
                        </ul>
                    )}
                </div>
                <div id='filterContainer' onMouseEnter={ClickGenre} onMouseLeave={ClickGenre}>
                    <button id = 'genreButton'>
                        Gênero
                    </button>
                    {isOpenGenre && (
                        <ul className="dropdown">
                            {itemGenre.length > 0 ? (
                                itemGenre.map((item, index) => (
                                    <li key={index} onClick={() => handleSelect(item)}>
                                        {item}
                                    </li>
                                ))
                                ) : (
                                    <li>Carregando...</li>  // Exibe enquanto os itens estão sendo carregados
                                )
                            }
                        </ul>
                    )}
                </div>
                
                <div id='filterContainer' onMouseEnter={ClickClassification} onMouseLeave={ClickClassification}>
                    <button id = 'classificationButton'>
                        Classificação
                    </button>
                    {isOpenClassification && (
                        <ul className="dropdown">
                            {itemClassification.length > 0 ? (
                                itemClassification.map((item, index) => (
                                    <li key={index} onClick={() => handleSelect(item)}>
                                        {item}
                                    </li>
                                ))
                                ) : (
                                    <li>Carregando...</li>  // Exibe enquanto os itens estão sendo carregados
                                )
                            }
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}