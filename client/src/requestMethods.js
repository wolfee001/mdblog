import axios from 'axios';
import env from 'react-dotenv';

const BASE_URL = `${env.BACKEND_URL}/api/v1`;

export const request = axios.create({
  baseURL: BASE_URL,
  header: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate'
  }
});
