"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importe o useRouter
import './style_userProfile.css';
import ReviewCard from '../components/review_card/ReviewCard';

export default function Page() {
  const router = useRouter(); // Inicialize o useRouter
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: "“Pra cima deles!” 5★",
      movie: "Vingadores: Ultimato | Ação",
      comment: "Muito bom, chorei",
      date: "26-04-2019",
      likes: 47
    },
    {
      id: 2,
      title: "“Não sei, só sei que foi assim” 5★",
      movie: "O Auto da Compadecida 2 | Comédia",
      comment: "Melhor filme já feito",
      date: "25-12-2024",
      likes: 25
    }
  ]);

  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const follow = async () => {
    try {
      if (!userData) {
        alert('Dados do usuário não carregados.');
        return;
      }

      const response = await fetch('http://localhost:5001/users/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originName: userName, destinationName: userData.name }),
      });

      if (response.ok) {
        setIsFollowing(true);
        const updatedFollowers = [...(userData.followers || []), userName];
        setUserData({ ...userData, followers: updatedFollowers });
        alert('Agora você está seguindo este usuário!');
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      alert('Erro ao conectar ao servidor.');
    }
  };

  const toggleFollowersModal = () => {
    setShowFollowersModal(!showFollowersModal);
  };

  // Função para voltar à página anterior
  const handleGoBack = () => {
    router.back(); // Navega para a página anterior
  };

  return (
    <div className="profile-card">
      <div className="header">
      <button className="back-button" onClick={handleGoBack}>
        Voltar
      </button>
      </div>
      <div className="profile-info">
        <div className="avatar"></div>
        <div className="user-details">
          <h2>{userData ? userData.name : 'Carregando...'}</h2>
          <p>{userData ? `${userData.reviewsCount} reviews` : '0 reviews'} - <span className="stars">4★</span></p>
        </div>
        {userName !== userData?.name && (
            <button className="follow-btn" onClick={follow} disabled={isFollowing}>
                {isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
        )}
        <button className="followers-btn" onClick={toggleFollowersModal}>
          Seguidores
        </button>
      </div>

      {/* Overlay escurecendo o fundo */}
      {showFollowersModal && <div className="overlay" onClick={toggleFollowersModal}></div>}

      {/* Modal de seguidores */}
      {showFollowersModal && (
        <div className="followers-modal">
          <h3>Seguidores</h3>
          <ul>
            {userData?.followers?.length ? (
              userData.followers.map((follower, index) => <li key={index}>{follower}</li>)
            ) : (
              <li>Nenhum seguidor</li>
            )}
          </ul>
          <button className="close-btn" onClick={toggleFollowersModal}>Fechar</button>
        </div>
      )}

      <div className="reviews">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              {/* Se quiser adicionar uma imagem futuramente */}
              <img src={review.movieImage || "../images/placeholder_movie.png"} alt={review.movie} />

              {/* Conteúdo da review */}
              <div className="review-content">
                {/* Título da review */}
                <h3 className="movie-title">{review.title}</h3>

                {/* Informações adicionais */}
                <p className="movie-info">
                  <strong>Filme:</strong> {review.movie} <br />
                  <strong>Data:</strong> {review.date}
                </p>

                {/* Texto da avaliação */}
                <p className="review-text">{review.comment}</p>

                {/* Número de curtidas */}
                <p className="likes">
                  ❤️ {review.likes} curtidas
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma review disponível.</p>
        )}
      </div>
    </div>
  );
}