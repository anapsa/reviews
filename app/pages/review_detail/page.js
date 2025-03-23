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
  const [comments, setComments] = useState([]);
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
        setComments(data.review.comments || []);
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
    <div className="vertical-left">
      <Review reviewId={reviewId} />
      <div>
        <h2>Comentários</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="commentV">
                <co>{comment.owner?.name || "Anônimo"}</co> 
                <p> {comment.body}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Sem comentários ainda.</p>
        )}
      </div>
      <div>
          <Button label="Comentar" onClick={handleClick} />
      </div>
    </div>
  );
}