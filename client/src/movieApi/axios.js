import axios from "axios"
import {movieBaseUrl} from '../utils/constants'
const instance = axios.create({
    movieBaseUrl : movieBaseUrl 
});

export default instance;