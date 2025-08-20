import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlanets } from "../../services/api";
import "./FilmPage.scss";

interface Film {
  title: string;
}

interface Resident {
  name: string;
}

function FilmPage() {
  // holds the list of all the API urls to each film
  const [films, setFilms] = useState<string[] | null>(null);
  // holds the list of all the API urls to each resident
  const [residents, setResidents] = useState<string[] | null>(null);

  // filmDetails & residentDetails holds the JSON data fetched from the API
  const [filmDetails, setFilmDetails] = useState<Film[]>([]);
  const [residentDetails, setResidentDetails] = useState<Resident[]>([]);

  // This stores only the planet name
  const [planetName, setPlanetName] = useState<string>("");

  // A unique id e.g., 7 which allows us to fetch a specific planet from the API
  const { id } = useParams();

  const navigate = useNavigate();

  // This is called when the clicks a button to go back
  const handleClick = () => {
    navigate(`/planet/${id}`);
  };

  // This is called whenever id is initialised or changes. It fetches the API data for one planet.
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

  //**
  //  This is called whenever the films or residents useState is updated or initiated.
  // It will fetch the data from each API url inside the films and residents array
  // */
  useEffect(() => {
    //
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

export default FilmPage;
