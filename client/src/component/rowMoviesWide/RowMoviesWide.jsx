import React, { useEffect, useState } from "react";
import "./rowMovies.scss";
import { imageUrl } from "../../utils/constants";
import axios from "../../movieApi/axios";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function RowMovies(props) {
  const [movies, setMovies] = useState([]);
  const Navigate = useNavigate();

  const handleMovieClick = (movie) => {
    Navigate(`/movie/${movie.title}/${movie.id}`);
  };

  const getMovies = () => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  };

  useEffect(() => {
    getMovies();
  }, [props.url]);

  return (
    <div className="rowMovies text-dark">
      {props.title && <h2>{props.title}</h2>}
      <div className="posters">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="movieDiv"
            >
              <LazyLoadImage
                effect="blur"
                className="poster"
                key={movie.id}
                src={imageUrl + movie.backdrop_path}
                alt="Movie poster"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RowMovies;
