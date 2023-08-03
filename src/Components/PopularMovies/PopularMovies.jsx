import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_BASE_URL}popular?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => {
        console.log(res.data.results);
        setPopularMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>PopularMovies</div>
  );
}

export default PopularMovies;
