import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Helpers
import { fetchFilm, fetchPlanetById, fetchResident } from '../../services/api';

// Styles
import './FilmPage.scss';

//Types
import type { Film, Resident } from '../../services/api';

export default function FilmPage() {
  const [films, setFilms] = useState<string[] | null>(null);
  const [residents, setResidents] = useState<string[] | null>(null);

  // filmDetails & residentDetails holds the JSON data fetched from the API
  const [filmDetails, setFilmDetails] = useState<Film[]>([]);
  const [residentDetails, setResidentDetails] = useState<Resident[]>([]);

  // This stores only the planet name
  const [planetName, setPlanetName] = useState<string>('');

  // A unique id e.g., 7 which allows us to fetch a specific planet from the API
  const { id } = useParams();

  const navigate = useNavigate();

  // This is called when the clicks a button to go back
  const handleClick = () => {
    navigate(`/planet/${id}`);
  };

  // This is called whenever id is initialised or changes. It fetches the API data for one planet.
  useEffect(() => {
    fetchPlanetById(id!).then((data) => {
      if (!data) return;

      setPlanetName(data.name);
      setFilms(data.films);
      setResidents(data.residents);
    });
  }, [id]);

  // Fetch resident details based on their API URLs
  useEffect(() => {
    Promise.all((residents || []).map((url) => fetchResident(url))).then((data) => {
      setResidentDetails(data.filter((e) => e !== null) as Resident[]);
    });

    Promise.all((films || []).map((url) => fetchFilm(url))).then((data) => {
      setFilmDetails(data.filter((e) => e !== null) as Film[]);
    });
  }, [films, residents]);

  return (
    <div className="film">
      <button className="film__button" onClick={handleClick}>
        Back
      </button>
      <h3>{planetName}</h3>
      <img
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${planetName}+Planet+Image`}
        alt={planetName}
        className="planet__image"
      />
      <h3 className="film__title">Films</h3>
      <ul className="film__list">
        {filmDetails.map((film) => (
          <li key={film.title}>{film.title}</li>
        ))}
      </ul>

      <h3 className="film__title">Residents</h3>
      <ul className="film__list">
        {residentDetails.map((resident) => (
          <li key={resident.name}>{resident.name}</li>
        ))}
      </ul>
    </div>
  );
}
