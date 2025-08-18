import React from "react";
import "./stylesheets/global.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Planet from "./pages/PlanetPage/PlanetPage";
import Film from "./pages/FilmPage/FilmPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/planet/:id" element={<Planet></Planet>}></Route>
        <Route path="/film/:id" element={<Film></Film>}></Route>
      </Routes>
    </>
  );
}

export default App;
