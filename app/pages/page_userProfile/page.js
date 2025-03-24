"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style_userProfile.css';
import ReviewCard from '../../components/review_card/ReviewCard';

export default function Page() {
  const router = useRouter();
  const [userName, setUserName] = useState({ user: { review: [] } }); // Inicialize com reviewIds vazias
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [userReviews, setUserReviews] = useState([]); // Estado para armazenar as reviews do usuário

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      const parsedUserName = JSON.parse(storedUserName);
      setUserName(parsedUserName);
    }

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      // Busca as reviews do usuário com base nas IDs
      fetchUserReviews(parsedUserData.review);
    }
  }, []);

  const fetchUserReviews = async (reviewIds) => {
    console.log(reviewIds)
    try {
      // Verifica se reviewIds é um array antes de usar o map
      if (!Array.isArray(reviewIds)) {
        console.error('reviewIds não é um array:', reviewIds);
        return;
      }
  
      const reviews = await Promise.all(
        reviewIds.map(async (id) => {
          const response = await fetch(`http://localhost:5001/reviews/getReview/${id}`);
          if (response.ok) {
            return await response.json();
          } else {
            console.error(`Erro ao buscar review com ID ${id}`);
            return null;
          }
        })
      );
  
      // Filtra as reviews válidas (remove nulls)
      console.log(reviews)
      const validReviews = reviews.filter(review => review !== null);
      setUserReviews(validReviews); // Atualiza o estado com as reviews encontradas
    } catch (error) {
      console.error('Erro ao buscar reviews:', error);
    }
  };

  const follow = async () => {
    
    if (!userName?.user?.name || !userData?.name) {
      alert('Dados do usuário não carregados.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/users/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originName: userName.user.name, destinationName: userData.name }),
      });

      if (response.ok) {
        setIsFollowing(true);
        const updatedFollowers = [...(userData.followers || []), userName.user.name];
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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="profile-card">
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          Voltar
        </button>
      </div>
      <div className="profile-info">
        <div className="avatar"><svg width="130" height="130" viewBox="0 0 243 243" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1201_5658)">
            <ellipse cx="119" cy="139.5" rx="106" ry="106.5" fill="#629584"/>
            <path d="M123.674 158.627C145.457 158.627 163.116 140.969 163.116 119.186C163.116 97.4033 145.457 79.7448 123.674 79.7448C101.891 79.7448 84.2329 97.4033 84.2329 119.186C84.2329 140.969 101.891 158.627 123.674 158.627Z" fill="#F1C8C8"/>
            <path d="M101.032 164.46L99.2503 146.448L134.833 139.794L155.844 190.952L119.303 232.975L93.2671 181.817L101.032 164.46Z" fill="#F1C8C8"/>
            <path d="M98.6787 155.464L106.458 157.222C106.458 157.222 100.343 137.83 102.418 135.978C104.494 134.127 109.58 137.044 109.58 137.044L114.926 143.037L121.436 136.408C121.436 136.408 128.505 127.619 131.272 125.151C134.04 122.682 129.595 113.52 129.595 113.52C129.595 113.52 170.654 102.448 155.376 82.5327C155.376 82.5327 146.418 66.9183 143.501 72.0048C140.584 77.0913 137.106 69.0129 137.106 69.0129L126.484 71.0327C126.484 71.0327 105.521 58.6724 85.6247 85.1147C65.7284 111.557 98.6787 155.464 98.6787 155.464Z" fill="#2F2E41"/>
            <path d="M197.853 216.028C176.298 233.504 149.632 243 121.5 243C95.8112 243 71.3422 235.08 50.8745 220.399C50.9111 220.015 50.9476 219.636 50.9796 219.257C51.5231 213.319 52.0073 207.546 52.327 202.759C53.5649 184.173 96.9258 171.785 96.9258 171.785C96.9258 171.785 97.1222 171.982 97.515 172.324C99.9085 174.426 109.624 182.044 126.661 184.173C141.853 186.073 146.855 177.061 148.367 172.745C148.824 171.429 148.961 170.548 148.961 170.548L193.559 191.609C196.469 195.766 197.606 204.718 197.83 214.781C197.839 215.197 197.848 215.608 197.853 216.028Z" fill="#F9A826"/>
            </g>
            <defs>
            <clipPath id="clip0_1201_5658">
            <rect width="243" height="243" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        </div>
        <div className="user-details">
          <h2><strong>{userData?.name || 'Carregando...'}</strong></h2>
          <p>{userData ? `${userReviews.length} reviews` : '0 reviews'}   <span className="stars">🎬</span></p>
        </div>
        {userName?.user?.name !== userData?.name && (
          <button className="follow-btn" onClick={follow} disabled={isFollowing}>
            {isFollowing ? 'Seguindo' : 'Seguir'}
          </button>
        )}
        <button className="followers-btn" onClick={toggleFollowersModal}>
          Seguidores
        </button>
      </div>

      {showFollowersModal && <div className="overlay" onClick={toggleFollowersModal}></div>}

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
  {userReviews.length > 0 ? (
    userReviews.map((review) => (
      <button
        key={review.id}
        className="review" // Mantém a classe para estilização
        onClick={() => {
          window.location.href = '/pages/page_search';
        }}
        style={{
          width: "100%", // Ocupa 100% da largura
          border: "none", // Remove a borda padrão do botão
          background: "#E2F1E7", // Remove o fundo padrão do botão
          textAlign: "left", // Alinha o conteúdo à esquerda
          cursor: "pointer", // Mostra o cursor de clique
        }}
      >
        <img
          src={review.movieImage || "https://upload.wikimedia.org/wikipedia/pt/9/9b/Avengers_Endgame.jpg"}
          alt={review.movie}
          className="review-image"
        />
        <div className="review-content">
          <h3 className="movie-title">{review.title}</h3>
          <p className="movie-info">
            <strong className = "titulo-review">{review.review.title}</strong><br/>
            <strong className = "nome-filme">Os Vingadores</strong> <br />
            <strong>Review:</strong> {review.review.body}
          </p>
          <p className="review-text">{review.comment}</p>
          <p className="stars">
            ⭐ {review.review.classification} estrelas
          </p>
        </div>
      </button>
    ))
  ) : (
    <p className = "no-reviews">Este usuário ainda não possui reviews</p>
  )}
</div>
    </div>
  );
}