import axios from 'axios';
import { history } from 'app/redux-store';

/**
 * Create a new Axios client instance
 */
function getClient(baseURL = null) {
  const options = { baseURL };
  const client = axios.create(options);

  client.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token != null) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => {
    Promise.reject(error);
  });

  client.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status >= 500) {
        console.log(error);
      } else if (error.response.status === 401) {
        localStorage.setItem('token', null);
        history.push('/login');
      }
      return Promise.reject(error);
    },
  );

  return client;
}

export default getClient;
