import React, { useEffect, useState } from 'react'
import BigMovieList from '../../component/bigMovieList/BigMovieList'
import axios  from '../../movieApi/axios'
import { API_KEY } from '../../utils/constants'
import { useParams } from 'react-router-dom';

function LanguageMovies() {

    const {language} = useParams();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
  
    useEffect(() => {
      fetchMovies();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const fetchMovies = () => {
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}`, {
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

  return (
    <div>
        { language == 'en' &&    <BigMovieList title={`ENGLISH`}  movies={movies} ></BigMovieList> }
        { language == 'ml' &&    <BigMovieList title={`MALAYALM`}  movies={movies} ></BigMovieList> }
        { language == 'hi' &&    <BigMovieList title={`HINDI`}  movies={movies} ></BigMovieList> }
        { language == 'kn' &&    <BigMovieList title={`KANNADA`}  movies={movies} ></BigMovieList> }
        { language == 'ta' &&    <BigMovieList title={`TAMIL`}  movies={movies} ></BigMovieList> }
        { language == 'te' &&    <BigMovieList title={`TELGU`}  movies={movies} ></BigMovieList> }
    </div>
  )
}

export default LanguageMovies