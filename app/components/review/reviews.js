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
  const [content, setContent] = useState("");
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
        setContent(data.content || null);
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
  if (!post) return <p>Nenhum post encontrado.</p>;

  return (
    <div className="vertical">
      <div className="vertical">
        {/* Post */}
        <div className="horizontal"> 
            {/* Container da foto */}
          <div className="mr-4"> {/* Margem à direita para espaçamento */}
            <img
              src={content.cover.imageURL}
              alt="Foto do post"
              className="photo_img"
            />
          </div>
         <div className="var-vertical">
            {/* Container do texto */}
            <div>
                <div className="var-horizontal">
                    <h1 className="h1">{post?.title}</h1>
                    <StarRating rating ={post.classification}></StarRating>
                </div>
                <h2 className="h2">{content.name}</h2>
                <b className="p">por: {owner.name}</b>
                <p className="b">{post.body}</p>
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
