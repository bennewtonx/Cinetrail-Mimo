import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReactPlayer from 'react-player';
import StarRatings from 'react-star-ratings';

import axios from 'axios';
import Genres from '../Components/Genres/Genres';
import ReviewItem from '../Components/ReviewItem/ReviewItem';

import { UserContext } from "../contexts/UserContext";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [reviews, setReviews] = useState([]);
  const [numReviewsToShow, setNumReviewsToShow] = useState(3);
  const [totalNumReviews, setTotalNumReviews] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .post("https://cinetrail-server.herokuapp.com/favoriteMovies/search", {
        user_id: user?._id,
        tmdb_id: movie?.id,
      })
      .then((res) => {
        if (res.data !== null) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoaded(true));
  }, [user, movie]);

  useEffect(() => {
    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));

    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}/videos?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        const trailers = res.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerKey(trailers[0].key);
      })
      .catch((err) => console.log(err));

    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}/reviews?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        setTotalNumReviews(res.data.results.length);
        setReviews(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const addtoFavorites = () => {
    axios
      .post("https://cinetrail-server.herokuapp.com/favoriteMovies", {
        user_id: user?._id,
        movie_id: movie?.id,
      })
      .then((res) => {
        console.log(res);
        setIsFavorite(true);
      })
      .catch((err) => console.log(err));
  };

  const removeFromFavorites = () => {
    axios
      .delete(
        `https://cinetrail-server.herokuapp.com/favoriteMovies/${user?._id}/${movie?.id}`
      )
      .then((res) => {
        console.log(res);
        setIsFavorite(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="movie-details-container">
      <div className="trailer-container">
        <ReactPlayer
          className="trailer-player"
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                showInfo: 1,
                origin: "https:localhost:5173",
              },
            },
          }}
        />
      </div>
      <div className="details-containers">
        <div className="title-container">
          <h1>{movie?.title}</h1>
          {isLoaded && isFavorite ? (
            <span className="remove-btn" onClick={removeFromFavorites}>
              Remove From Favorites
            </span>
          ) : (
            <span className="add-btn" onClick={addtoFavorites}>
              Add to Favorites
            </span>
          )}
        </div>
        <div className="rating">
          {movie && (
            <StarRatings
              starRatedColor="red"
              numberOfStars={5}
              starDimension="15px"
              starSpacing="1px"
              rating={movie?.vote_average / 2}
              name="rating"
            />
          )}
        </div>
        <div className="info-container">
          {movie && (
            <img
              src={`${import.meta.env.VITE_APP_BASE_IMAGE_URL}${
                movie.poster_path
              }`}
              alt={`Movie poster for ${movie.title}`}
              className="details-poster"
            />
          )}
          <div className="movie-info">
            <h4>{movie?.tagline}</h4>
            <h4>{movie?.overview}</h4>
            <h4>Status:&nbsp; {movie?.status}</h4>
            <h4>Runtime:&nbsp; {movie?.runtime}&nbsp; min</h4>
            <h4>Budget:&nbsp; {movie?.budget}</h4>
            <Genres genreIds={movie?.genres} component="details" />
          </div>
        </div>
        <div className="review-container">
          <p className="reviews-title">Reviews</p>
          {reviews.slice(0, numReviewsToShow).map((review) => (
            <ReviewItem key={review?.id} review={review} />
          ))}
          {numReviewsToShow < totalNumReviews ? (
            <p
              className="review-number"
              onClick={() => setNumReviewsToShow((prevState) => prevState + 3)}
            >
              <em>Read More Reviews</em>
            </p>
          ) : (
            <p className="review-number" onClick={() => setNumReviewsToShow(3)}>
              <em>End of Reviews. Collapse</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}