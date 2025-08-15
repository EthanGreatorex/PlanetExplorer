
/**
 * This will request the planet data from the API.
 * @returns JSON Data
 */
export const fetchPlanets = async ( url : string) => {
  // Fetch the data from the API using the provided URL
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.error(`HTTP error! status: ${resp.status}`);
      return null;
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Error!', error);
    return null;
  }
};
