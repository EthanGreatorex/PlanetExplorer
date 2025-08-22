import { useNavigate } from 'react-router-dom';

// Styles
import './planetCard.scss';

interface Props {
  name: string;
  climate: string;
  terrain: string;
  url: string;
}

export default function PlanetCard({ name, climate, terrain, url }: Props) {
  const navigate = useNavigate();

  /**
   * This will route the user to view about the planet they clicked on
   */
  const handleCardClick = () => {
    const planetID = url.split('/').pop();
    navigate(`/planet/${planetID}`);
  };

  return (
    <article className="card">
      <img
        className="card__image"
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${name}+Planet+Image`}
        alt={name}
        loading="lazy"
      />
      <div className="card__description">
        <h3 className="card__title">{name}</h3>
        <p className="card__info">Climate: {climate}</p>
        <p className="card__info">Terrain: {terrain}</p>
        <button className="card__button" onClick={handleCardClick}>
          View More Details
        </button>
      </div>
    </article>
  );
}
