import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function MovieCard({
  movie,
  width,
  height,
  cardStyle,
  imgSrc,
  radius,
  id,
}) {
  const cardStyleObject = {
    backgroundImage: `url(${import.meta.env.VITE_APP_BASE_IMAGE_URL}${imgSrc})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
    height,
    width,
    borderRadius: radius,
    boxShadow:
      cardStyle === "popular-card"
        ? "0px 0px 10px 0px rgba(118, 118, 118, 0.75)"
        : null,
  };
  return (
    <Link className={cardStyle} to={`/movieDetails/${id}`}>
      <div style={cardStyleObject}>
        <div className="movie-info-top">
          {movie && (
            <StarRatings
              rating={movie?.vote_average / 2}
              starRatedColor="red"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          )}
        </div>
        <div className="movie-info-bottom">
          <p>{movie?.title}</p>
          <p>Rating : {Math.round(movie?.vote_average)}</p>
        </div>
      </div>
      {cardStyle === "top-rated-card" ? <p>{movie?.title}</p> : null}
    </Link>
  );
}