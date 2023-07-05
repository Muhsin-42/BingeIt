import { API_KEY } from "../utils/constants"
export const movieGenere = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
export const tvGenere = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
export const originals = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=213`
export const ActionMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`
export const Adventure = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=12`
export const Animation = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`
export const Crime = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=80`
export const Family = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751`
export const ScienceFiction = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`
export const Thriller = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=53`
export const War = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10752`
export const Comedy = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`
export const Horror = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`
export const Romance = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`
export const Documentary = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`


// search movie by id
// https://api.themoviedb.org/3/movie/{movieId}?api_key=${API_KEY}&language=en-US

// Language
// https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en


// cast 
// https://api.themoviedb.org/3/movie/{movieId}/credits?api_key={API_KEY}

// reviews
// https://api.themoviedb.org/3/movie/299534/reviews?api_key=70dcbe0b3e27569940267305628dfc97 

// export const trailer = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`