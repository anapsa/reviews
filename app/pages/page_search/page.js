"use client";
import { useState, useEffect } from 'react';
import './style_pageSearch.css';
import { useRouter } from 'next/navigation'; // Importe o useRouter
import SearchBar from '../../components/search_bar/search_bar';
import UserCard from '../../components/user_card/user_card';

export default function PageSearch() {
  const router = useRouter(); // Inicialize o useRouter
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() === "") {
      setUserData(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/users/find/${searchQuery}`);
      if (response.status === 200) {
        const data = await response.json();
        setUserData(data);
        setError(null);
      } else {
        setUserData(null);
        setError("Usuário não encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setUserData(null);
      setError("Erro ao conectar ao servidor.");
    }
  };

  const handleUserCardClick = () => {
    // Salva os dados do usuário no localStorage antes de redirecionar
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log("Card clicado! Dados do usuário salvos.");

    // Redireciona para a página de perfil do usuário
    setTimeout(() => {
      window.location.href = '/pages/page_userProfile';
    }, 200);
  };

   // Função para voltar à página anterior
   const handleGoBack = () => {
    router.back(); 
  };

  return (
    <div>
      <div className="top-banner">
        <SearchBar onSearch={handleSearch} />
        <button className="back-button" onClick={handleGoBack}>
        Voltar
      </button>
      </div>
      {userData ? (
        <UserCard
          name={userData.name}
          reviews={userData.reviews}
          avatar={userData.avatar}
          rating="4★"
          imageUrl="/path/to/image.jpg"
          onClick={handleUserCardClick} // Passa a função de clique
        />
      ) : (
        error && <p className="error-message">{error}</p>
      )}
    </div>
  );
}