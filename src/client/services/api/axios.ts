import axios from 'axios';

const NETWORK_ERROR_MESSAGE = 'Ошибка. Попробуйте повторить попытку позже.';
const baseURL = 'http://127.0.0.1:3030/api';
const instance = axios.create({ baseURL });

instance.interceptors.response.use(
  ({ data }) => {
    if (data && data.error) {
      data.message = data.message || NETWORK_ERROR_MESSAGE;
      throw data;
    }
    return data;
  }
);

export default instance;
