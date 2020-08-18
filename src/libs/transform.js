import { URL_API, INDEX_ID } from '../config';
export default class TransformHelper {
  static uuid(key) {
    return key + Math.floor(Math.random() * 100) + 1;
  }
  static getId(url) {
    const arrayUrl = url.split('/');
    return arrayUrl[INDEX_ID];
  }
}
