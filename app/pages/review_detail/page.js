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
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);

  const [text, setText] = useState('');


  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    setIsTextBoxVisible(!isTextBoxVisible);
  };
  const handleConfirm = async () => {
    try {
     
      if (!text.trim()) {
        alert('Por favor, digite algo!');
        return;
      }
      const response = await fetch('http://localhost:5001/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTkzMzYzYmM3OWY3OTVmYWE4MmVjMiIsImlhdCI6MTc0MjY5NTk2OSwiZXhwIjoxNzQyNjk5NTY5fQ.WqSBVGhHcT_3gyh8Ysyq605OAZyIuXt-w2rmbmhuqiA'
        },
        body: JSON.stringify({ body: text, review: reviewId}) 
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o texto!');
      }

      
      alert('Texto enviado com sucesso!');
      setText('');
    } catch (err) {
      setError(err.message);
      console.error('Erro ao enviar:', err);
    }
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
              <div>
                <div className="commentH">
                  <b>por: {comment.owner?.name || "Anônimo"}</b> 
                  <div className="horizontal">
                    <b className="text-xl font-bold">Curtir Cometário</b>
                    <likes className="text-gray-600">{comment.likes.length} curtidas</likes>
                  </div>
                </div>
                <div className="comments">
                  <p> {comment.body}</p>
                </div>
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
      {isTextBoxVisible && (
        <div className="overlay" onClick= {handleChange}>
          {/* Popup */}
          <div className="popup">
            <textarea className="custom-textarea" placeholder="Digite aqui..."></textarea>
            <Button label="Confirmar" onClick={handleConfirm} />
          </div>
        </div>
      )}
      
    </div>
  );
}