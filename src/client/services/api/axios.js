import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3030/api',
  timeout: 5000,
});

instance.interceptors.response.use((response) => response.data);

export default instance;
