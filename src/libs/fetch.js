import axios from 'axios';
import { URL_API } from '../config';
export default class Fetch {
  static get = axios.create({
    baseURL: URL_API,
    method: 'GET',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
