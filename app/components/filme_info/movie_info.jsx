import { useEffect, useState } from 'react';
import './movie_info.css';

export default function MovieInfo() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [detailedWatchedMovies, setDetailedWatchedMovies] = useState([]);
  const [abandonedMovies, setAbandonedMovies] = useState([]);
  const [detailedAbandonedMovies, setDetailedAbandonedMovies] = useState([]);

  // Função para buscar a lista de filmes assistidos
  const fetchWatchedList = async (name) => {
    try {
      const response = await fetch(`http://localhost:5001/users/${name}/watched`);
      
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Erro na resposta da API:", response.status, errorDetails);
        throw new Error(`Erro ao buscar lista de assistidos. Status: ${response.status}`);
      }
      
      const watchedList = await response.json();
      console.log('Lista de filmes assistidos:', watchedList);
      setWatchedMovies(watchedList);
    } catch (error) {
      console.error("Erro ao buscar lista de assistidos:", error.message);
    }
  };

  // Função para buscar a lista de filmes abandonados
  const fetchAbandonedList = async (name) => {
    try {
      const response = await fetch(`http://localhost:5001/users/${name}/abandoned`);
      
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Erro na resposta da API:", response.status, errorDetails);
        throw new Error(`Erro ao buscar lista de abandonados. Status: ${response.status}`);
      }
      
      const abandonedList = await response.json();
      console.log('Lista de filmes abandonados:', abandonedList);
      setAbandonedMovies(abandonedList);
    } catch (error) {
      console.error("Erro ao buscar lista de abandonados:", error.message);
    }
  };

  // Função para buscar os detalhes de um filme
  const fetchMovieDetails = async (movieName) => {
    try {
      const response = await fetch('http://localhost:5001/movies/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: movieName }),
      });

      if (!response.ok) {
        console.error(`Erro ao buscar detalhes do filme "${movieName}":`, response.status);
        return null;
      }

      const data = await response.json();
      return data.movie || null;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do filme "${movieName}":`, error.message);
      return null;
    }
  };

  // Primeiro useEffect: busca a lista de assistidos e abandonados
  useEffect(() => {
    const userName = 'xupenio';
    fetchWatchedList(userName);
    fetchAbandonedList(userName);
  }, []); // Roda apenas uma vez ao montar o componente

  // Segundo useEffect: busca os detalhes dos filmes assistidos
  useEffect(() => {
    if (watchedMovies.length === 0) return;
  
    const fetchMoviesDetails = async () => {
      const moviesDetails = await Promise.all(
        watchedMovies.map(async (movie) => {
          const details = await fetchMovieDetails(movie.title);
          return details ? { ...details, avaliation: movie.avaliation } : null;
        })
      );
  
      setDetailedWatchedMovies(moviesDetails.filter(movie => movie !== null));
    };
  
    fetchMoviesDetails();
  }, [watchedMovies]);
  // Terceiro useEffect: busca os detalhes dos filmes abandonados
  useEffect(() => {
    if (abandonedMovies.length === 0) return;

    const fetchMoviesDetails = async () => {
      const moviesDetails = await Promise.all(
        abandonedMovies.map(async (movie) => {
          const details = await fetchMovieDetails(movie.title);
          return details;
        })
      );

      setDetailedAbandonedMovies(moviesDetails.filter(movie => movie !== null));
    };

    fetchMoviesDetails();
  }, [abandonedMovies]);

  return (
    <div id='movieInfo'>
      <h2>Filmes Assistidos</h2>
      {detailedWatchedMovies.length > 0 ? (
        detailedWatchedMovies.map((movie, index) => (
          <div key={index} className="movieItem">
            <img className="movieCover" src={movie.cover?.imageURL || 'https://via.placeholder.com/150'} alt={movie.name} />
            <div className="movieDetails">
              <h2 className="movieTitle">{movie.name}</h2>
              <p className="movieGenre">
                Gênero: <span className="genreHighlight">{movie.genre || "Desconhecido"}</span>
              </p>
              <div className="movieStars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < movie.rating ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <p className="movieSynopsis">{movie.synopsis || "Sinopse não disponível."}</p>
              <p className="movieAvaliation">Avaliação: {movie.avaliation || "Sem avaliação."}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Carregando filmes assistidos...</p>
      )}

      <h2>Filmes Abandonados</h2>
      {detailedAbandonedMovies.length > 0 ? (
        detailedAbandonedMovies.map((movie, index) => (
          <div key={index} className="movieItem abandoned">
            <img className="movieCover" src={movie.cover?.imageURL || 'https://via.placeholder.com/150'} alt={movie.name} />
            <div className="movieDetails">
              <h2 className="movieTitle">{movie.name}</h2>
              <p className="movieGenre">
                Gênero: <span className="genreHighlight">{movie.genre || "Desconhecido"}</span>
              </p>
                <div className="movieStars">{Array.from({ length: 5 }).map((_, i) => (<span key={i} 
                                  className={i < Math.ceil(movie.avg / 2) ? "star filled" : "star"}
                                >
                                  ★
                                </span>
                              ))}
                </div>
              <p className="movieSynopsis">Sinopse: {movie.synopsis || "Sinopse não disponível."}</p>
              <p className="movieAvaliation">Avaliação: {movie.avaliation || "Sem avaliação."}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Carregando filmes abandonados...</p>
      )}
    </div>
  );
}
