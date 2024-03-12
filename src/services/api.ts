import axios from 'axios';
import { parseCookies } from 'nookies';
import useResponse from '../hooks/useResponse';

const { '@NEXTION_TOKEN': token } = parseCookies();

// eslint-disable-next-line react-hooks/rules-of-hooks
const { showError, showNotFoundError, showUnauthorizedError } = useResponse();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 500:
        showError('Ocorreu um erro!');
        break;
      case 422:
        showError(error.response.data.message);
        break;
      case 404:
        showNotFoundError();
        break;
      case 401:
        showUnauthorizedError();
        break;
      default:
        showError('Ocorreu um erro!');
    }
    return Promise.reject(error);
  },
);
