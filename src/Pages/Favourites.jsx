import React, { useContext, useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';

import './favourites.css';

import { UserContext } from "../contexts/UserContext";

import axios from "axios";

export default function Favorites() {
  const { token, user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios(
      `https://cinetrail-server.herokuapp.com/favoriteMovies/user/${user?._id}`
    )
      .then((res) => {
        console.log(res);
        setFavorites(res.data.favorites);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="favorites-container">
      {token ? (
        favorites.map((favorite) => (
          <MovieCard
            radius="16px"
            cardStyle="popular-card"
            width="200px"
            height="300px"
            imgSrc={favorite.movie[0]?.poster_path}
            key={favorite.movie[0].tmdb_id}
            movie={favorite.movie[0]}
            id={favorite.movie[0]?.tmdb_id}
          />
        ))
      ) : (
        <p>Please sign in to see Movies</p>
      )}
    </div>
  );
}