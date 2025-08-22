// Components
import PlanetCard from '../PlanetCard/PlanetCard';

// Styles
import './planetList.scss';

// Types
import type { Planet } from '../../services/api';

interface PlanetListProps {
  planets: Planet[];
}

export default function PlanetList({ planets }: PlanetListProps) {
  return (
    <div className="planet-list">
      {planets.map(({ name, url, climate, terrain }) => (
        <PlanetCard key={name} url={url} name={name} climate={climate} terrain={terrain} />
      ))}
    </div>
  );
}
