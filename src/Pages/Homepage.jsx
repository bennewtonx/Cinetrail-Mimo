import React, { useContext } from "react";
import Slider from "../components/Slider/Slider";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import { ThemeContext } from "../contexts/ThemeContext";
import "./movies.css";
import "./styles.css";
import TopMovies from "../components/TopMovies/TopMovies";

export default function Homepage() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={`homepage-container ${!darkMode && "home-light"}`}>
      <Slider />
      <div className="movies-wrapper">
        {" "}
        <PopularMovies />
        <TopMovies />
      </div>
    </div>
  );
}