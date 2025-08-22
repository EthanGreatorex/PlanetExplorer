import { useEffect, useMemo, useState } from 'react';

// Components
import PlanetSearch from '../../components/PlanetSearch/PlanetSearch';
import PlanetList from '../../components/PlanetList/PlanetList';

// Helpers
import { fetchAllPlanets } from '../../services/api';

// Types
import type { Planet } from '../../services/api';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [search, setSearch] = useState<string>('');

  // Call the function which handles the API process.
  useEffect(() => {
    fetchAllPlanets().then((data) => {
      setPlanets(data);
      setLoading(false);
    });
  }, []);

  // This will be called when the debouncedInput is updated. It will filter the planets based on the search query
  const filteredPlanets = useMemo(() => {
    if (search.trim() === '') return planets;

    const query = search.toLowerCase();

    return planets.filter(({ name, climate, terrain }) => {
      return (
        name.toLowerCase().includes(query) ||
        climate.toLowerCase().includes(query) ||
        terrain.toLowerCase().includes(query)
      );
    });
  }, [planets, search]);

  return (
    <div className="home">
      <PlanetSearch onUpdate={setSearch} />
      <h3>Results: {filteredPlanets.length}</h3>
      {loading ? <h3>Loading...</h3> : <PlanetList planets={filteredPlanets} />}
    </div>
  );
}
