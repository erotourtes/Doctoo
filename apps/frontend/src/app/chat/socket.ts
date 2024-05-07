import { API_URL } from '@/api/axios.api';
import { io } from 'socket.io-client';

const connectedSocket = () => {
  const socket = io(`${API_URL}/chat`, {
    withCredentials: true,
  });
  return socket;
};

export default connectedSocket;
