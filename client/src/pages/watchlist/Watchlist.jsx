import React, { useEffect, useState } from 'react'
import BigMovieList from '../../component/bigMovieList/BigMovieList'
import { useSelector,useDispatch } from 'react-redux';
import { API_KEY,imageUrl } from '../../utils/constants'
import axios  from '../../movieApi/axios'

function Watchlist() {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const [watchlistMovies,setWatchlistMovies] = useState([]);
    const token = useSelector(state => state.token);

    const getAllWishlistMovie = async ()=>{
        if(currentUser){
          let movies = [];
          for (let i = 0; i < currentUser?.wishlist?.length; i++) {
            const movieId = currentUser?.wishlist[i];
        
            try {
              const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
              const movie = response.data;
              movies.unshift(movie);
            } catch (error) {
              console.log(`Error fetching details for movie ID ${movieId}:`, error);
            }
          }
          setWatchlistMovies(movies);
        }
      }

      useEffect(()=>{
        getAllWishlistMovie();
      })


  return (
    <div>
        <BigMovieList title={'WATCHLIST'} movies={watchlistMovies}></BigMovieList>
    </div>
  )
}

export default Watchlist