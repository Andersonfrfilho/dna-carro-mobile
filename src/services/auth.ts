import axios from "axios";

const api = axios.create({
  // baseURL: 'https://staging.api.cherry-go.com',
  // baseURL: 'http://10.0.2.2:3333',
  baseURL: "http://localhost:3333",
});





const axios = require(‘axios’);
axios.interceptors.response.use(
  res => res,
  err => {
    throw new Error(err.response.data.message);
  }
)
const err = await axios.get('http://example.com/notfound').
  catch(err => err);

defineInterceptor();

export { api };
