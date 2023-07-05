import io from 'socket.io-client';
import { baseUrl } from '../utils/constants';

const socket = io(`${baseUrl}`);

export default socket;