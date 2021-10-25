import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const request = axios.create({
  baseURL: BASE_URL,
  header: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate'
  }
});
