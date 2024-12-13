import axios from 'axios';
import { CONFIG } from './constants';

function createHeaders() {
  const header = {} as any;
  const token = localStorage.getItem('token');

  header['ngrok-skip-browser-warning'] = true;
  header['Content-Type'] = 'application/json';
  if (token) header.Authorization = token;

  return header;
}

const axiosInstance = axios.create({
  headers: createHeaders(),
  baseURL: CONFIG.API_URL,
});

export default axiosInstance;
