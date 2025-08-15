import React from 'react';
import './stylesheets/global.css';
import PlanetSearch from './components/PlanetSearch';
import PlanetList from './components/PlanetList';

function App() {
  return (
    <div className="App">
      <PlanetSearch></PlanetSearch>
      <PlanetList></PlanetList>
    </div>
  );
}

export default App;
