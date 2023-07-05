import './rowMovies.scss';
import { useNavigate } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imageUrl } from '../../utils/constants';

const RowMovies = ({ movies, title }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.title}/${movie.id}`);
  };

  return (
    <div className='rowMovies text-white'>
      <style>blurCSS</style>
      <h2>{title ? title : 'loading'}</h2>
      <div className="posters">
        {movies?.map((movie) => (
          <LazyLoadImage  effect='blur'  className='poster'  key={movie.id}
            onClick={() => handleMovieClick(movie)}
            src={imageUrl + movie.poster_path}
            alt="Movie poster"
          />
        ))}
        {movies?.length === 0 && (
          <div className="movieNotFound p-3 w-100 text-center">
            <MovieFilterIcon fontSize="200px" style={{ height: '200px', width: '200px' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RowMovies;