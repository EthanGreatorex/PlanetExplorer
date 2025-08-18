import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlanets } from "../../services/api";
import "./FilmPage.scss";

interface Film {
  title: string;
  url: string;
}

interface Resident {
  name: string;
  url: string;
}

function FilmPage() {
  const [films, setFilms] = useState<string[] | null>(null);
  const [residents, setResidents] = useState<string[] | null>(null);
  const [filmDetails, setFilmDetails] = useState<Film[]>([]);
  const [residentDetails, setResidentDetails] = useState<Resident[]>([]);
  const [planetName, setPlanetName] = useState<string>("");

  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/planet/${id}`)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const planetData = await fetchPlanets(
          `https://swapi.info/api/planets/${id}`
        );
        setFilms(planetData.films);
        setResidents(planetData.residents);
        setPlanetName(planetData.name);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const fetchDetails = async (urls: string[]) => {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));
      return data;
    };

    if (films) {
      fetchDetails(films).then(setFilmDetails);
    }

    if (residents) {
      fetchDetails(residents).then(setResidentDetails);
    }
  }, [films, residents]);

  return (
    <div className="film">
        <button className="film__button" onClick={handleClick}>Back</button>
        <h3>{planetName}</h3>
      <img
        src={`https://placehold.co/300x200/0a0a0a/ffffff?text=${planetName}+Planet+Image`}
        alt={planetName}
        className="planet__image"
      />
      <h3 className="film__title">Films</h3>
      <ul className="film__list">
        {filmDetails.map((film) => (
          <li key={film.url}>{film.title}</li>
        ))}
      </ul>

      <h3 className="film__title">Residents</h3>
      <ul className="film__list">
        {residentDetails.map((resident) => (
          <li key={resident.url}>{resident.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilmPage;
