import './rowMovieSearch.scss'
import { imageUrl } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

function RowMovieSearch({ movie }) {
    const Navigate = useNavigate();
    const handleMovieClick = () => {
        Navigate(`/movie/${movie.title}/${movie.id}`)
    }
    return (
        <div className="movieRowMain">
            {movie.backdrop_path &&(
                <>
                    <div onClick={handleMovieClick} className='movieRow m-3 rounded shadow-lg'>
                    <img src={imageUrl + movie.backdrop_path} alt="" />
                    <div className="px-3 movieDetails">
                        <h4>{movie.title}</h4>
                        <span className='font-weight-bold' >{movie?.release_date}</span>   
                    </div>
                    </div> 
                </>
                )
            }
        </div>
    )
}

export default RowMovieSearch;