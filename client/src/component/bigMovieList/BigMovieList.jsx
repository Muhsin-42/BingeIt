import "./bigMovieList.scss";
import { imageUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
            <LazyLoadImage
              effect="blur"
              className="poster"
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              src={imageUrl + movie.poster_path}
              alt="Movie poster"
            />
          );
        })}
      </div>
    </div>
  );
};

export default BigMovieList;
