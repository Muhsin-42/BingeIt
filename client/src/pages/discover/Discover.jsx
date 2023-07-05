import React, { useEffect, useState } from 'react'
import {API_KEY} from '../../utils/constants'
import './discover.scss'
import RowMovieSearch from './rowMovieSearch';
import axios from '../../utils/axios';
import UserRow from '../../component/userRow/UserRow';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function Discover() {
    const currentUser = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchType, setSearchType] = useState('movies');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [trendingMovies, setTrendingMovies] = useState([]);
    
    // If Keyword Doesn't Exist
    useEffect(() => {
      fetchTrendingMovies();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const fetchTrendingMovies = () => {
      axios.get('https://api.themoviedb.org/3/trending/movie/week', {
        params: {
          api_key: API_KEY,
          page: currentPage,
        },
      })
      .then(response => {
        setTrendingMovies(prevMovies => [...prevMovies, ...response.data.results]);
        setTotalPages(response.data.total_pages);
        setTotalPages(10);
      })
      .catch(error => {
        console.log(error);
      });
    }

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage => currentPage + 1);
        }
      }
    }

    // If Keyword Exists
    const searchMovies = async (query) => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    };

    const searchUsers = async (query) => {
      if (query.length > 0) {
        const response = await axios.get(`api/user/search-users?query=${query}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    };

    const handleSearch = () => {
      if (searchType === 'movies') {
        searchMovies(query);
      } else {
        searchUsers(query);
      }
    };

    useEffect(() => {
      handleSearch();
    }, [query, searchType]);

    const handleUserClick = (userId) => {
      navigate(`/profile/${userId}`);
    };

    let renderedMovieIds = {};

    function handleRenderdMovies(id) {
      if (renderedMovieIds[id]) {
        return false;
      } else {
        renderedMovieIds[id] = true;
        return true;
      }
    }

      return (
        <div className="discoverPage pt-5">
          <input className='searchBar form-control' type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Discover movie or friend' />
          <div className="d-flex justify-content-center">
            <button className={`btn-lg m-3 btn  ${searchType=='movies'? 'btn-outline-success disabled' : 'btn-success' }`}
                    onClick={() => { setSearchType('movies'); setUsers([]); }}>Movies</button>
            <button className={`btn-lg m-3 mx-0 btn  ${searchType=='users'? 'btn-outline-success disabled' : 'btn-success' }`}
                    onClick={() => { setSearchType('users'); setMovies([]); }}>Users</button>
          </div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <RowMovieSearch movie={movie} />
            </div>
          ))}
          {users && users.map((user) => (
            <div key={user._id}>
              { currentUser._id != user._id && (
                <UserRow user={user} 
                  handleUserClick={handleUserClick} 
                  currentUser={currentUser} />
              )}
            </div>
          ))}
          {
            searchType == 'movies' && query == '' ? 
            (trendingMovies.map((movie) => {
              if(handleRenderdMovies(movie.id)){
                return (
                  <div key={movie.id}>
                    <RowMovieSearch movie={movie} />
                  </div>
                )
              }
            }))
            : ''
          }
        </div>
      );
      
}

export default Discover