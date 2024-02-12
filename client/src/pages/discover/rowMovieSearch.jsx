import "./rowMovieSearch.scss";
import { imageUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function RowMovieSearch({ movie }) {
  const Navigate = useNavigate();
  const handleMovieClick = () => {
    Navigate(`/movie/${movie.title}/${movie.id}`);
  };
  return (
    <div className="movieRowMain scale-105-3s">
      {movie.backdrop_path && (
        <>
          <div
            onClick={handleMovieClick}
            className="movieRow m-3 rounded shadow-lg"
          >
            <img />
            <LazyLoadImage
              effect="blur"
              src={imageUrl + movie.backdrop_path}
              alt="Movie Poster"
            />
            <div className="px-3 movieDetails">
              <h4>{movie.title}</h4>
              <span className="font-weight-bold">{movie?.release_date}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RowMovieSearch;
