import React, { useEffect, useState } from 'react'
import axios  from '../../movieApi/axios'
// import axios from 'axios'
import './trending.scss'
import { API_KEY,imageUrl } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

function Trending() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const Navigate = useNavigate();
  
  useEffect(() => {
    fetchMovies();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchMovies = () => {
    axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: {
        api_key: API_KEY,
        page: currentPage,
      },
    })
      .then(response => {
        setMovies(prevMovies => [...prevMovies, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (currentPage < totalPages) {
            setCurrentPage((currentPage)=>currentPage + 1);
        }
    }
  }

  useEffect(() => {
    if (currentPage > 1) {
      fetchMovies();
    }
  }, [currentPage]);

  let renderedIds = {};
  function handleRenderedIds(id){
    if(renderedIds[id])
        return false;
    else{
        renderedIds[id] = true;
        return true;
    }
  }

  const handleMovieClick = (movie) =>{
    Navigate(`/movie/${movie.title}/${movie.id}`);
  }


  return (
      <div className="trending">
        <h1 className='m-3 mt-5 ms-5'>#TRENDING</h1>
        <div className="moviePosters  d-flex align-content-center align-content-stretch flex-wrap">
            {
                movies.map((movie)=>{
                        if(handleRenderedIds(movie.id)){
                            return(
                                <img  key={movie.id}  onClick={()=> handleMovieClick(movie)}   className='moviePoster cold dol-lg-2 ' src={imageUrl + movie.poster_path } alt="" />
                            )
                        }
                })
            }
        </div>
    </div>
  )
}

export default Trending