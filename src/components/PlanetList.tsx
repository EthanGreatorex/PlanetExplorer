import React, { useEffect, useState } from "react";
import { fetchPlanets } from "../services/api";
import PlanetCard from "./PlanetCard";

export default function PlanetList() {
  /**
   * My plan
   * -------
   * 1) fetch the data from the API...
   *      1a) Display a loading element until the API data has been fetched
   *
   * 2) Map through each object and create a PlanetCard
   *      2a) Pass to each PlanetCard a unique API url for later access**/

  interface Planet{
    name: string;
    climate: string;
    terrain: string;
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [planets, setPlanets] = useState<Planet[]>([]);

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

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="planet-list">
          {planets.map((planet) => (
            <PlanetCard name={planet.name} climate={planet.climate} terrain={planet.terrain}></PlanetCard>
          ))}
        </div>
      )}
    </>
  );
}
