import React, { useEffect, useMemo, useState } from "react";
import "./Home.scss";
import { fetchPlanets } from "../../services/api";
import PlanetSearch from "../../components/PlanetSearch/PlanetSearch";
import PlanetList from "../../components/PlanetList/PlanetList";

function Home() {
  interface Planet {
    name: string;
    climate: string;
    terrain: string;
    url: string;
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [currentResults, setCurrentResults] = useState<number>();

  /**
   * I'm using a UseEffect to fetch the API data on first load.
   */
  useEffect(() => {
    // Call the function which handles the API process.
    const loadData = async () => {
      try {
        const planetData = await fetchPlanets("https://swapi.info/api/planets");
        setPlanets(planetData);
      } catch (error) {
        throw new Error("Error whilst fetching API from ../services/api.ts");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // This will be called when the debouncedInput is updated. It will filter the planets based on the search query
  const filteredPlanets = useMemo(() => {
    if (search.trim() === "") {
      return planets;
    }
    const query = search.toLowerCase();

    return planets.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.climate.toLowerCase().includes(query) ||
        p.terrain.toLowerCase().includes(query)
      );
    });
  }, [planets, debouncedInput]);


  // This use effect will update the currentResults use state which holds the amount of planets matching the user query
  useEffect(() => {
    setCurrentResults(filteredPlanets.length)
  },[filteredPlanets])

  return (
    <div className="home">
      <PlanetSearch
        currentInput={search}
        setCurrentInput={setSearch}
        debouncedInput={debouncedInput}
        setDebouncedInput={setDebouncedInput}
      ></PlanetSearch>
      <h3>Results: {currentResults}</h3>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <PlanetList planets={filteredPlanets}></PlanetList>
        </>
      )}
    </div>
  );
}

export default Home;
