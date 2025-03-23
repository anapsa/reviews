"use client";
import Button from "../../components/button/Button";
import HeartButton from "../../components/heart_button/heart_button";
import Review from "../../components/review/reviews";
import { useEffect, useState } from "react";
import "./style.css"

export default function ReviewDetail() {
  const [post, setPost] = useState(null);
  const [owner, setOwner] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reviewId = "67df0753c306e96f1d17ae40";
  const handleClick = () => {
    console.log("Botão clicado!");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:5001/reviews/getReview/67df0753c306e96f1d17ae40"); 
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
      <Review reviewId={reviewId} />
    </div>
  );
}