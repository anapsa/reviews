"use client";
import Button from "../../components/button/Button";
import HeartButton from "../../components/heart_button/heart_button";
import StarRating from "../../components/star_classification/star_classification";
import { useEffect, useState } from "react";
import "./review.css"
import { ST } from "next/dist/shared/lib/utils";

export default function Reviews({ reviewId }) {
  const [post, setPost] = useState(null);
  const [owner, setOwner] = useState("");
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => {
    console.log("Botão clicado!");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!reviewId) {
            throw new Error(`id inválido`);
        }
        const response = await fetch(`http://localhost:5001/reviews/getReview/${reviewId}`);
        if (!response.ok) {
          console.log(response.text)
          throw new Error(`Erro ao buscar post: ${response.status}`);
        }
        const data = await response.json();
        setPost(data.review);
        setOwner(data.owner || null);
        setMovie(data.movie || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div >
        {/* Post */}
        <div className="horizontal"> 
            {/* Container da foto */}
          <div className="mr-4"> 
            <img
              src={movie?.cover?.imageURL || 'default-image.jpg'}
              alt="Foto do post"
              className="photo_img"
            />
          </div>
         <div className="var-vertical">
            {/* Container do texto */}
            <div>
                <div className="var-horizontal">
                  <div>
                    <h1 className="h1">{post?.title}</h1>
                    <h2 className="h2">{movie?.name || 'Nome do filme indisponível'}</h2>
                  </div>
                    <StarRating rating ={post.classification}></StarRating>
                </div>
               
                <b className="p">por: {owner?.name || 'Anônimo'}</b>
                <p className="b">{post?.body || 'Conteúdo indisponível'}</p>
            </div>
            <div className="horizontal">
              <HeartButton onClick={handleClick} />
              <p className="text-xl font-bold">Curtir Review </p>
              <likes className="text-gray-600">{post.likes.length} curtidas</likes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
