import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Planet from './pages/PlanetPage/PlanetPage';
import Film from './pages/FilmPage/FilmPage';

// Components
import NavBar from './components/NavBar';

// Styles
import './stylesheets/global.scss';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/planet/:id" element={<Planet />}></Route>
        <Route path="/film/:id" element={<Film />}></Route>
      </Routes>
    </>
  );
}

export default App;
