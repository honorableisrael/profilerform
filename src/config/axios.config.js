import Axios from 'axios';

import store from '../store';
import { BASE_URL, USER_TOKEN } from '../constants';
import setErrors from '../store/actions/setErrors';
import setLoading from '../store/actions/setLoading';
import { extractErrors } from '../utils/errorUtils';
import cookies from '../utils/cookies';


const http = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${cookies.get('token') || localStorage.getItem(USER_TOKEN)}`
  }
});

http.interceptors.request.use((config) => {
  store.dispatch(setLoading(true));
  return config;
});

http.interceptors.response.use((response) => {
  store.dispatch(setLoading(false));
  return response;
}, (error) => {
  store.dispatch(setErrors(extractErrors(error)))
  store.dispatch(setLoading(false));
  Promise.reject();
});

export default http;