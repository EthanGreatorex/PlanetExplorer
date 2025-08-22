export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

/**
 * Fetch all planets from the SWAPI.
 *
 * @returns An array of Planet objects.
 */
export const fetchAllPlanets = async () => {
  try {
    const request = await fetch('https://swapi.info/api/planets');

    if (!request.ok) throw new Error(`HTTP error! status: ${request.status}`);

    const data: Planet[] = await request.json();

    return data;
  } catch (error) {
    console.error('Error fetching all planets:', error);
    return [];
  }
};

/**
 * Fetch a planet by its ID.
 * @param id The ID of the planet to fetch.
 * @returns The planet data or null if not found.
 */
export const fetchPlanetById = async (id: string) => {
  try {
    const request = await fetch(`https://swapi.info/api/planets/${id}`);

    if (!request.ok) throw new Error(`HTTP error! status: ${request.status}`);

    const data: Planet = await request.json();

    return data;
  } catch (error) {
    console.error(`Error fetching planet by ID (${id})!`, error);
    return null;
  }
};

export interface Resident {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export const fetchResident = async (url: string) => {
  try {
    if (!url.toLowerCase().startsWith('https://swapi.info/api/people/')) {
      throw new Error('Invalid URL');
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: Resident = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching resident data!`, error);
    return null;
  }
};

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export const fetchFilm = async (url: string) => {
  try {
    if (!url.toLowerCase().startsWith('https://swapi.info/api/films/')) {
      throw new Error('Invalid URL');
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: Film = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film data!`, error);
    return null;
  }
};
