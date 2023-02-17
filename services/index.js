import axios from 'axios';

const { BASE_URL, API_VERSION } = process.env;
console.log(`${BASE_URL}/api/${API_VERSION}`);
export const baseAxios = axios.create({
  baseURL: `${BASE_URL}/api/${API_VERSION}`,
});
