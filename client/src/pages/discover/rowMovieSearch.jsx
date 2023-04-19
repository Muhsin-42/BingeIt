// overview
// vote_average
// vote_count
// release_date
// original_language
// id


import React from 'react'
import './rowMovieSearch.scss'
import { imageUrl } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

function RowMovieSearch({ movie }) {
    const Navigate = useNavigate();
    const handleMovieClick = () => {
        console.log('handle movie click ', movie.id)
        Navigate(`/movie/${movie.title}/${movie.id}`)
    }
    return (
        <div className="movieRowMain">
            {movie.backdrop_path &&(
                <>
                    {/* <div className="movieDiv">
                        <img src={imageUrl + movie.poster_path} alt="" />
                    </div> */}
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

export default RowMovieSearch



