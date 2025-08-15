import React from "react";
import '../stylesheets/planetcard.css'

interface Props {
  name: string;
  climate: string;
  terrain: string;
}

export default function PlanetCard({ name, climate, terrain }: Props) {
  return (
    <div className="card">
      <img
        className="card__image"
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${name}+Planet+Image`}
        alt="Planet"
        loading="lazy"
      />
      <div className="card__description">
        <h3 className="description__title">{name}</h3>
        <p className="description__info">{climate}</p>
        <p className="description__info">{terrain}</p>
      </div>
    </div>
  );
}
