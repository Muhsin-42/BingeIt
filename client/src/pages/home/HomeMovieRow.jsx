import { useEffect, useState } from "react";
import axios from "../../movieApi/axios";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./homeMovieRow.scss";
import { imageUrl } from "../../utils/constants";

function RowMovies(props) {
  const [movies, setMovies] = useState([]);
  const Navigate = useNavigate();

  const handleMovieClick = (movie) => {
    Navigate(`/movie/${movie.title}/${movie.id}`);
  };

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  }, [props.url]);

  return (
    <div className="rowMovies text-dark">
      <h2 className="text-white">{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => {
          return (
            <LazyLoadImage
              effect="blur"
              onClick={() => handleMovieClick(movie)}
              className="poster"
              key={movie.id}
              src={imageUrl + movie.poster_path}
              alt="Movie poster"
            />
          );
        })}
      </div>
    </div>
  );
}
export default RowMovies;
