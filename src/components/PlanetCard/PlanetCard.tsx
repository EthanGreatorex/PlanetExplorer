import React from "react";
import "./planetCard.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  climate: string;
  terrain: string;
  url: string;
}

export default function PlanetCard({ name, climate, terrain, url }: Props) {
  const navigate = useNavigate();

  //**
  //  This will route the user to view about the planet they clicked on
  // **//
  const handleCardClick = () => {
    const planetID = url.split("/").pop()
    navigate(`/planet/${planetID}`)
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${name}+Planet+Image`}
        alt={name}
        loading="lazy"
      />
      <div className="card__description">
        <h3 className="description__title">{name}</h3>
        <p className="description__info">Climate: {climate}</p>
        <p className="description__info">Terrain: {terrain}</p>
        <button className="description__button" onClick={handleCardClick}>
          View More Details
        </button>
      </div>
    </div>
  );
}
