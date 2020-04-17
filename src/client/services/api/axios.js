import axios from 'axios';

const NETWORK_ERROR_MESSAGE = 'Ошибка. Попробуйте повторить попытку позже.';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3030/api',
});

instance.interceptors.response.use(
  (response) => {
    const { data } = response;

    if (data && data.error) {
      // NOTE: Все принимаемые от сервера сообщения выводятся пользователю
      if (!data.message) {
        data.message = NETWORK_ERROR_MESSAGE;
      }
      throw data;
    }
    return data;
  },
);

export default instance;
