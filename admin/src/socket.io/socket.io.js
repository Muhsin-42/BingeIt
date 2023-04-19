// socket.js file
import io from 'socket.io-client';
import { baseUrl } from '../utils/Constants';

const socket = io(`${baseUrl}`);

export default socket;
