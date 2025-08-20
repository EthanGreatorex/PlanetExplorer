import { useParams } from "react-router-dom";
import { fetchPlanets } from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlanetPage.scss";

interface Resident {
  url: string;
}

interface Film {
  url: string;
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  climate: string;
  diameter: string;
  gravity: string;
  surface_water: string;
  terrain: string;
  population: string;
  residents: Resident[];
  films: Film[];
}

function PlanetPage() {
  const [planet, setPlanet] = useState<Planet | null>(null);

  const navigate = useNavigate();

  // A unique id that represents a specific planet e.g., 7. 
  const { id } = useParams();

  const handleButtonClick = () => {
    navigate(`/film/${id}`);
  };

  // This is called when id is first initialised or is changed. It will fetch the API data for a singular planet.
  useEffect(() => {
    const loadData = async () => {
      try {
        const planetData = await fetchPlanets(
          `https://swapi.info/api/planets/${id}`
        );
        setPlanet(planetData);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [id]);


  return (
    <div className="planet">
      <h3 className="details__title">Welcome To {planet?.name}</h3>
      <img
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${planet?.name}+Planet+Image`}
        alt={planet?.name}
        className="planet__image"
      />

      <div className="details">
        <div className="details__films">
          <h4 className="details__subheader">Film Details</h4>
          <p className="details__info">
            This planet has appeared in {planet?.films.length}{" "}
            {planet?.films.length === 1 ? "film" : "films"}!
          </p>

          {planet?.residents.length === 0 ? (
            <p className="details__info">
              There are no residents from the films found on this planet.
            </p>
          ) : (
            <p className="details__info">
              This planet has {planet?.residents.length}{" "}
              {planet?.residents.length === 1 ? "resident" : "residents"} from
              the films!
            </p>
          )}
          <button className="details__button" onClick={handleButtonClick}>
            View More Film Details
          </button>
        </div>
        <div className="details__stats">
          <h4 className="details__subheader">Planet Stats</h4>

          <div className="stats__grid">
            <p className="details__info grid-item">
              Climate: {planet?.climate}
            </p>
            <p className="details__info">
              Population: {Number(planet?.population).toLocaleString()}
            </p>
            <p className="details__info">Gravity: {planet?.gravity}</p>
            <p className="details__info">
              Diameter: {Number(planet?.diameter).toLocaleString()} km
            </p>
            <p className="details__info">
              Surface Water: {planet?.surface_water}%
            </p>
            <p className="details__info">Terrain: {planet?.terrain}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetPage;
