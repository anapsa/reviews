"use client";
import Button from "../../components/button/Button";
import HeartButton from "../../components/heart_button/heart_button";
import Review from "../../components/review/reviews";
import Link from 'next/link';
import { useEffect, useState } from "react";
import "./style.css"

export default function ReviewDetail() {
  const [reviews, setReviews] = useState([]);
  const [owner, setOwners] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const handleClick = (reviewId) => {  // ID da review (exemplo)
    router.push(`/review_detail/${reviewId}`);  // Redireciona para a página de detalhes da review
  };
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch("http://localhost:5001/reviews/get");
        
        // Verificação mais robusta do status da resposta
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        // Verificação de estrutura de dados melhorada
        if (!Array.isArray(data)) {
          throw new Error('Resposta da API não é um array');
        }

        setReviews(data);
        setError(null);

      } catch (err) {
        console.error("Erro na requisição:", err);
        setError(err.message);
        
        // Resetar reviews em caso de erro
        setReviews([]);
        
      } finally {
        // Garantir que o loading sempre seja desativado
        setLoading(false);
      }
    };

    fetchReview();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;;

  return (
    <div className="vertical">
      {reviews.map((review) => (
        <div className="reviewsContainer"> 
          <Link href={`/pages/review_detail/${review._id}`} className="review-link"> 
            <Review key={review._id} reviewId={review._id} />
          </Link>
        </div>  
      ))}
    </div>
  );
}