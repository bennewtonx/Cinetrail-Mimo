import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './movies.css';
import './Styles.css';
import Slider from './../Components/Slider/Slider';
import PopularMovies from './../Components/PopularMovies/PopularMovies';
import TopMovies from './../Components/TopMovies/TopMovies';

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