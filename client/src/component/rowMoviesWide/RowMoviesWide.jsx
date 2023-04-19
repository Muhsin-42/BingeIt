import React,{ useEffect, useState } from 'react'
import './rowMovies.scss'
import {API_KEY, imageUrl} from '../../utils/constants'
import axios from '../../movieApi/axios'
import { useNavigate } from 'react-router-dom'

function RowMovies(props) {

    const [movies, setMovies] = useState([])
    const [urlId,setUrlId] = useState()
    
    const Navigate = useNavigate();
    

    const handleMovieClick = (movie) =>{
      Navigate(`/movie/${movie.title}/${movie.id}`);
    }

    const getMovies = ()=>{
      axios.get(props.url).then((response)=>{
        setMovies(response.data.results)
        console.log(movies)
      })
    }
  
  
    useEffect(() => {
      getMovies();
    }, [props.url])
  
  
    
  return ( 
    <div className='rowMovies text-dark'>
    { props.title &&   <h2>{props.title}</h2> }
    <div className="posters">
      {
        movies.map((movie)=>{
          return (
            <div key={movie.id} onClick={()=> handleMovieClick(movie)}  className='movieDiv'>
              {/* <h1>{movie.name}</h1> */}
              <img  className='poster' key={movie.id} src={imageUrl + movie.backdrop_path } alt="Movie poster" />
            </div>
          )
        })
      }
    </div>
    {/* { urlId &&   <YouTube opts={opts} videoId={urlId.key} />  } */}
</div>
  )
}

export default RowMovies