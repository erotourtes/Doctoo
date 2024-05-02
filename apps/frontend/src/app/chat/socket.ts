import { API_URL } from '@/api/axios.api';
import { io } from 'socket.io-client';

const socket = io(`${API_URL}/chat`);

export default socket;