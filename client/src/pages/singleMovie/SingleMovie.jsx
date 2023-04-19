import Movieaxios from '../../movieApi/axios';
import axios from '../../utils/axios'
import React, { useEffect, useState } from 'react'
import { API_KEY, movieBaseUrl,imageUrl } from '../../utils/constants';
import { useParams } from 'react-router-dom'
import './singleMovie.scss'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setUser } from '../../Redux/store';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import Modal from "react-modal";
import ReviewSection from './ReviewSection';

function SingleMovie() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const token = useSelector(state => state.token);
    const {movieName,movieId} = useParams();
    const [movieDetails,setMovieDetails] = useState();
    const [heartClicked, setHeartClicked] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState(null)


    const getMovieDetails =async ()=>{
        try {
            const response = await Movieaxios.get(`${movieBaseUrl}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            setMovieDetails(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(()=>{
        getMovieDetails();
    },[])

    
    const handleFavouriteClick = async () =>{
        try {
            // setHeartClicked(!heartClicked);
            const response = await axios.put(`api/user/favourite/${movieId}`,{userId:currentUser._id}, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('fav =>',response.data.updatedUser);
            dispatch(setUser({user: response.data.updatedUser }))
        } catch (error) {
            console.log(error);
        }
    }
    const handleWishlistClick = async () =>{
        try {
            // setHeartClicked(!heartClicked);
            const response = await axios.put(`api/user/wishlist/${movieId}`,{userId:currentUser._id}, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('wish =>',response.data.updatedUser);
            dispatch(setUser({user: response.data.updatedUser }))
        } catch (error) {
            console.log(error);
        }
    }
    const handleWatchedClick = async () =>{
        try {
            // setHeartClicked(!heartClicked);
            const response = await axios.put(`api/user/watched/${movieId}`,{userId:currentUser._id}, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('wish =>',response.data.updatedUser);
            dispatch(setUser({user: response.data.updatedUser }))
        } catch (error) {
            console.log(error);
        }
    }
    const handleUnFavouriteClick = async () =>{
        try {
            // setHeartClicked(!heartClicked);
            const response = await axios.delete(`api/user/favourite/${movieId}/${currentUser._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('unfav =>',response.data.updatedUser);
            dispatch(setUser({user: response.data.updatedUser }))
        } catch (error) {
            console.log(error);
        }
    }
    const handleUnWishlistClick = async () =>{
        try {
            console.log('unwis=>', currentUser._id)
            // setHeartClicked(!heartClicked);
            const response = await axios.delete(`api/user/wishlist/${movieId}/${currentUser._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('unwish =>',response.data.updatedUser);
            dispatch(setUser({user: response.data.updatedUser }))
        } catch (error) {
            console.log(error);
        }
    }
    const handleUnWatchedClick = async () =>{
        try {
            // setHeartClicked(!heartClicked);
            const response = await axios.delete(`api/user/watched/${movieId}/${currentUser._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('wish =>',response.data.updatedUser);
            dispatch(setUser({user: response.data.updatedUser }))
        } catch (error) {
            console.log(error);
        }
    }


    const opts = {
        height:'390',
        width:'100%',
        playerVars:{
          autoplay:1,
        },
      }


    const handleTrailerClick = () => {
        movieTrailer(movieDetails?.title || "")
          .then((url) => {
            const videoId = new URLSearchParams(new URL(url).search).get("v");
            setTrailerUrl(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`);
          })
          .catch((error) => console.log(error));
      };

    
  return (
    <>
        <div className="singleMoviePage">
                <div className="movieBackdrop">
                    <img src={imageUrl+movieDetails?.backdrop_path} alt=""   />
                </div>
                <div className="mainContents">
                    <div className="left ">
                        {/* <div className=" bg-dark moviePoster shadow"> */}
                            <img className='bg-dark' src={imageUrl+movieDetails?.poster_path} alt=""   />
                        {/* </div> */}
                    </div>
                    <div className="right  ">
                        <h1 className='text-white '>{movieDetails?.title} {movieDetails?.release_date?.slice(0,4)}</h1>
                        <div className="row">
                        <div className=" rating bg-ddark">
                            <span className='span text-white'>{movieDetails?.vote_average?.toFixed(1)}</span>
                            <CircularProgress color='success' variant="determinate" value={movieDetails?.vote_average*10} />
                        </div>
                        {
                            movieDetails?.genres?.map((genre)=>{
                                return <button id='genreBtn' className='mx-2 d-inline btn' key={genre.id}>{genre.name}</button>
                            })
                        }
                        <p className='movieOverview text-white p-3'>{movieDetails?.overview}</p>

                        <div className="row">
                            {
                                currentUser?.favourite.includes(movieDetails?.id+'') ?
                                <button onClick={handleUnFavouriteClick} className='col mx-3 btn btn-danger' ><i className="bi bi-heart-fill"></i> Favourite</button>
                                :
                                <button onClick={handleFavouriteClick} className='col mx-3 btn btn-outline-danger' ><i className="bi bi-heart"></i> Favourite</button>

                            }
                            {
                                currentUser?.wishlist.includes(movieDetails?.id+'') ?
                                <button onClick={handleUnWishlistClick} className='col mx-3 btn btn-danger' ><i className="bi bi-bookmark-fill"></i> Wishlist</button>
                                :
                                <button onClick={handleWishlistClick} className='col mx-3 btn btn-outline-danger' ><i className="bi bi-bookmark"></i> Wishlist</button>
                            }
                            {
                                currentUser?.watched.includes(movieDetails?.id+'') ?
                                <button onClick={handleUnWatchedClick} className='col mx-3 btn btn-success' ><i className="bi bi-check-circle-fill"></i> Watched</button>
                                :
                                <button onClick={handleWatchedClick} className='col mx-3 btn btn-outline-success' ><i className="bi bi-check-circle"></i> Watched</button>
                            }
                        </div>
                        <button onClick = {handleTrailerClick} className='btn btn-outline-danger mx-auto m-3 w-75' ><i className="bi bi-play-circle"></i> Watch Trailer</button>
                        </div>
                    </div>
            </div>
            <Modal isOpen={trailerUrl != null} onRequestClose={() => setTrailerUrl(null)}   style={{
                    content: {
                        width: "80%",
                        height: "95%",
                        right: "0",
                        left: "auto",
                        marginLeft: "0",
                        backgroundColor: "#00000000",
                        border:'none',
                        zIndex: 999999
                    },
                    overlay: {
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        backgroundColor:'#00000042'
                    },
            }}>
                <div>
                <iframe width="100%" height={'500px'} src={trailerUrl} frameBorder="0" allowFullScreen title="Movie Trailer"></iframe>
                </div>
            </Modal>

    <ReviewSection movieDetails={movieDetails} currentUser={currentUser}></ReviewSection>

       </div>
    </>

  )
}

export default SingleMovie