import React, { useEffect } from 'react'
import RowMovies from '../../component/rowMovies/RowMovies'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setUser } from '../../Redux/store';
import axios from '../../utils/axios';
import { API_KEY } from '../../utils/constants';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


function ProfileMovies({ friend }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const { id } = useParams();
  // let movies = [];
  const [watchedMovies, setWatchedMovies] = useState([])
  const [wishlistMovies, setWishlistMovies] = useState([])
  const [favouriteMovies, setFavouriteMovies] = useState([])
  const [profileUser, setProfileUser] = useState({});



  const getUser = async () => {
    try {
      const response = await axios.get(`api/user/user/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      setProfileUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getAllWatchedMovie = async () => {
    if (profileUser) {
      let movies = [];
      for (let i = 0; i < profileUser?.watched?.length; i++) {
        const movieId = profileUser?.watched[i];

        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
          const movie = response.data;
          movies.unshift(movie);
        } catch (error) {
          console.log(`Error fetching details for movie ID ${movieId}:`, error);
        }
      }
      setWatchedMovies(movies);
    }
  }
  const getAllFavouriteMovie = async () => {
    if (profileUser) {
      let movies = [];
      for (let i = 0; i < profileUser?.favourite?.length; i++) {
        const movieId = profileUser.favourite[i];

        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
          const movie = response.data;
          movies.unshift(movie);
        } catch (error) {
          console.log(`Error fetching details for movie ID ${movieId}:`, error);
        }
      }
      setFavouriteMovies(movies);
    }
  }
  const getAllWishlistMovie = async () => {
    if (currentUser) {
      let movies = [];
      for (let i = 0; i < profileUser?.wishlist?.length; i++) {
        const movieId = profileUser?.wishlist[i];

        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
          const movie = response.data;
          movies.unshift(movie);
        } catch (error) {
          console.log(`Error fetching details for movie ID ${movieId}:`, error);
        }
      }
      setWishlistMovies(movies);
    }
  }


  useEffect(() => {
    getUser();
    getAllWatchedMovie();
    getAllWishlistMovie();
    getAllFavouriteMovie();

  }, [id])
  useEffect(() => {
    getAllWatchedMovie();
    getAllWishlistMovie();
    getAllFavouriteMovie();
  }, [profileUser, id])




  return (
    <div className='profileMovies p-3 '>
      <RowMovies title='Recently Watched' movies={watchedMovies}></RowMovies>
      <RowMovies title='Watchlist' movies={wishlistMovies}></RowMovies>
      <RowMovies title='Favourite' movies={favouriteMovies}></RowMovies>
    </div>
  )
}

export default ProfileMovies;