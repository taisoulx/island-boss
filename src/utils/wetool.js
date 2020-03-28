import axios from "axios";

const service = axios.create({
  baseURL: 'https://wp-api.wxb.com',
  timeout: 5000
})

axios.defaults.withCredentials = true

export default service;
