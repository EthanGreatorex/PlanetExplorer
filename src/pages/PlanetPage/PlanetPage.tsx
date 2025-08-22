import { useEffect, useState } from 'react';

//
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Helpers
import { fetchPlanetById } from '../../services/api';

import './PlanetPage.scss';

// Types
import type { Planet } from '../../services/api';

export default function PlanetPage() {
  const [planet, setPlanet] = useState<Planet | null>(null);

  const navigate = useNavigate();

  // A unique id that represents a specific planet e.g., 7.
  const { id } = useParams();

  const handleButtonClick = () => {
    navigate(`/film/${id}`);
  };

  // This is called when id is first initialised or is changed. It will fetch the API data for a singular planet.
  useEffect(() => {
    fetchPlanetById(id!).then((data) => {
      setPlanet(data);
    });
  }, [id]);

  if (!planet) return null;

  return (
    <div className="planet">
      <h3 className="planet__title">Welcome To {planet.name}</h3>
      <img
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${planet.name}+Planet+Image`}
        alt={planet.name}
        className="planet__image"
      />

      <div className="planet__details details">
        <div className="details__films">
          <h4 className="details__subheader">Film Details</h4>
          <p className="details__info">
            This planet has appeared in {planet.films.length} {planet?.films.length === 1 ? 'film' : 'films'}!
          </p>

          {planet?.residents.length === 0 ? (
            <p className="details__info">There are no residents from the films found on this planet.</p>
          ) : (
            <p className="details__info">
              This planet has {planet.residents.length} {planet?.residents.length === 1 ? 'resident' : 'residents'} from
              the films!
            </p>
          )}
          <button className="details__button" onClick={handleButtonClick}>
            View More Film Details
          </button>
        </div>
        <div className="details__stats stats">
          <h4 className="stats__subheader">Planet Stats</h4>

          <div className="stats__grid">
            <p className="stats__info">Climate: {planet.climate}</p>
            <p className="stats__info">Population: {Number(planet.population).toLocaleString()}</p>
            <p className="stats__info">Gravity: {planet.gravity}</p>
            <p className="stats__info">Diameter: {Number(planet.diameter).toLocaleString()} km</p>
            <p className="stats__info">Surface Water: {planet.surface_water}%</p>
            <p className="stats__info">Terrain: {planet.terrain}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
