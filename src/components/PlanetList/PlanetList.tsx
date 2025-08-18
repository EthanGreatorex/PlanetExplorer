import PlanetCard from "../PlanetCard/PlanetCard";
import './planetList.scss'

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  url: string;
}

interface PlanetListProps {
  planets: Planet[]
}

export default function PlanetList({ planets } : PlanetListProps) {
  return (
    <>
      <div className="planet-list">
        {planets.map((planet) => (
          <PlanetCard
            key={planet.name}
            url={planet.url}
            name={planet.name}
            climate={planet.climate}
            terrain={planet.terrain}
          ></PlanetCard>
        ))}
      </div>
    </>
  );
}
