"use client"; // Adicione isso se estiver usando React Server Components
import "./user_card.css";

export default function UserCard({ name, reviews, rating, imageUrl, onClick }) {
  return (
    <div className="user-card" onClick={onClick}> {/* Adicione o evento onClick aqui */}
      <img src={imageUrl} alt={name} className="user-image" />
      <div className="user-info">
        <h2 className="user-name">{name}</h2>
        <p className="user-reviews">{reviews} reviews - {rating}</p>
      </div>
    </div>
  );
}