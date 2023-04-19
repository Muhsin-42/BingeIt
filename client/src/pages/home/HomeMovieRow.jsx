import React,{ useEffect, useState } from 'react'
import './homeMovieRow.scss'
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
  
  
  
    useEffect(() => {
      axios.get(props.url).then((response)=>{
        setMovies(response.data.results)
      })
    }, [props.url])
  
  
    
  
  



  return ( 
    <div className='rowMovies text-dark'>
    <h2 className='text-white'>{props.title}</h2>
    <div className="posters">
      {
        movies.map((movie)=>{
          return (
          <img  onClick={()=> handleMovieClick(movie)} className='poster' key={movie.id} src={imageUrl + movie.poster_path } alt="Movie poster" />
          )
        })
      }
    </div>
    {/* { urlId &&   <YouTube opts={opts} videoId={urlId.key} />  } */}
</div>
  )
}

export default RowMovies