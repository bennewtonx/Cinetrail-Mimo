import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import StarRatings from 'react-star-ratings';

import Genres from '../Genres/Genres';

import axios from 'axios';

import './Slider.css'

export default function Slider() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios(
      `${import.meta.env.VITE_API_BASE_URL}upcoming?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        console.log(res.data.results);
        setUpcomingMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const sliderStyle = {
    backgroundImage: `url(${import.meta.env.VITE_APP_BASE_IMAGE_URL}${
      upcomingMovies[index]?.backdrop_path
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "60vh",
    width: "100%",
    position: "relative",
    zIndex: 0,
  };

  const nextSlide = () => {
    if (index === upcomingMovies.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevState) => prevState + 1);
    }
  };

  const prevSlide = () => {
    if (index === 0) {
      setIndex(upcomingMovies.length - 1);
    } else {
      setIndex((prevState) => prevState - 1);
    }
  };

  return (
    <div style={sliderStyle}>
      <div className="slider-overlay"></div>
      <MdKeyboardArrowLeft className="left-arrow" onClick={prevSlide} />
      <MdKeyboardArrowRight className="right-arrow" onClick={nextSlide} />
      <div className="slider-info">
        <h1>{upcomingMovies[index]?.title}</h1>
        <p className="slider-description">
          {upcomingMovies[index]?.overview.slice(0, 130)}...
        </p>
        <Genres
          genreIds={
            upcomingMovies[index]?.genre_ids
              ? upcomingMovies[index]?.genre_ids
              : []
          }
        />
        <p>Release Date: {upcomingMovies[index]?.release_date}</p>
        <div className="rating">
          {upcomingMovies[index] && (
            <StarRatings
              rating={upcomingMovies[index]?.vote_average / 2}
              starRatedColor="red"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          )}
        </div>
        <Link
          to={`/movieDetails/${upcomingMovies[index]?.id}`}
          className="see-details"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}