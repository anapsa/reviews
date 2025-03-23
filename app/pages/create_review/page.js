"use client";
import Button from "../../components/button/Button";
import StarButton from "../../components/star_button/star_button";
import { useEffect, useState } from "react";
import "./style.css"

export default function CreateReview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const movieId = "67dad4119429a2af3f58ddc9"
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTA2Mjc0NzkyNjdlZjI0YjM5YWU0NyIsImlhdCI6MTc0Mjc1ODUyNiwiZXhwIjoxNzQyNzYyMTI2fQ.rCUjszUyK5PkHjp1fhagcBO72UIdeYUCLw69yONPKPs"
  const [movie, setMovie] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textBody, setTextBody] = useState('');
  const [rating, setRating] = useState(0);

    const handleClick = async () => {

    }
  const handleConfirm = async () => {
    try {
     
      if (!textTitle.trim()) {
        alert('Por favor, digite o título da review!');
        return;
      }
      const response = await fetch(`http://localhost:5001/reviews/add`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({title: textTitle, body: textBody, classification: rating, content: movieId}) 
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar o review: ${response.status}`);
      }

    
      alert('Texto enviado com sucesso!');
      setTextTitle('');
      setTextBody(''); 
    } catch (err) {
      setError(err.message);
      console.error('Erro ao enviar:', err);
    }
  };
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5001/movies/getId/${movieId}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar filme: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data.movie);
        setTextTitle('');
        setTextBody(''); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="vertical-right">
      <div>
      <div>
        {/*Filme*/}
        <div className="horizontal"> 
            {/* Container da foto */}
          <div className="mr-4"> 
            <img
              src={movie.cover.imageURL}
              alt="Foto do post"
              className="photo_img"
            />
          </div>
         <div className="var-vertical">
            {/* Container do texto */}
            <div className="vertical-left">
                <div className="var-horizontal">
                    <div>
                        <h1 className="h1">{movie.name}</h1>
                        <h2 className="h2">{movie.genre}</h2>
                    </div> 
                    <StarButton rating={rating} setRating={setRating} />
                    
                </div>
                <div>
                <textarea 
                    className="title-textarea" 
                    placeholder="Digite o título da sua review aqui..." 
                    value={textTitle} 
                    onChange={(e) => setTextTitle(e.target.value)} 
                    />

                <textarea 
                    className="body-textarea" 
                    placeholder="Digite sua opinião aqui..." 
                    value={textBody} 
                    onChange={(e) => setTextBody(e.target.value)} 
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
          <Button label="Postar" onClick={handleConfirm} />
    </div>
    </div>
  );
}