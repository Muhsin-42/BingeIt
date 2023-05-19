import React,{ useEffect, useState } from 'react'
import './rowMovies.scss'
import {API_KEY, imageUrl} from '../../utils/constants'
import axios from '../../movieApi/axios'
import { useNavigate } from 'react-router-dom'
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function RowMovies({movies,title}) {
  const Navigate = useNavigate();

  const handleMovieClick = (movie) =>{
    Navigate(`/movie/${movie.title}/${movie.id}`);
  }

  return ( 
    <div className='rowMovies text-white'>
    <h2>{title? title : 'loading'}</h2>
    <div className="posters">
      {
        movies?.map((movie)=>{
          return (
          <LazyLoadImage effect='blur' className='poster' key={movie.id} onClick={()=>handleMovieClick(movie)} src={imageUrl + movie.poster_path } alt="Movie poster" />
          )
        })
      }
      {
        movies?.length ==0 ?(
          <div className="movieNotFound p-3 w-100 text-center ">
            <MovieFilterIcon fontSize="200px" style={{height:'200px',width: '200px'}} />
          </div>
          // <h1 className='text-secondary p-5 w-100 text-center' style={{fontSize:'75px', fontWeight:'bolder'}} >No movies in <br/> {title} </h1>
        ):('')
      }
    </div>
</div>
  )
}

export default RowMovies