import "./bigMovieList.scss";
import { imageUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const BigMovieList = ({ title, movies }) => {
  const Navigate = useNavigate();

  const handleMovieClick = (movie) => {
    Navigate(`/movie/${movie.title}/${movie.id}`);
  };

  return (
    <div className="trending">
      <h1 className="m-3 ms-5 mt-5">#{title}</h1>
      <div className="moviePosters  d-flex align-content-center align-content-stretch flex-wrap">
        {movies?.map((movie) => {
          return (
            <img
              onClick={() => handleMovieClick(movie)}
              key={movie.id}
              className="moviePoster cold dol-lg-2 "
              src={imageUrl + movie.poster_path}
              alt="Movie Poster"
            />
          );
        })}
      </div>
    </div>
  );
};

export default BigMovieList;
