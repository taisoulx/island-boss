import axios from "axios";
// import { MessageBox, Message } from 'element-ui'
import store from "../store/index.js";
import { getToken } from "./auth.js";
import Message from "../extends/common/message/message.js";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URI, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      const token = getToken()
      // config.headers["X-Token"] = getToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res)

    // 默认crud不带code,如果存在code且值不为0,则报错
    if (res.code && res.code !== 0) {
      console.log(res)
      Message({
        message: res.message || "Error",
        type: "error",
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.statusCode) {
      //   // to re-login
      //   console.log(res)
      //   // MessageBox.confirm(
      //   //   "You have been logged out, you can cancel to stay on this page, or log in again",
      //   //   "Confirm logout",
      //   //   {
      //   //     confirmButtonText: "Re-Login",
      //   //     cancelButtonText: "Cancel",
      //   //     type: "warning"
      //   //   }
      //   // ).then(() => {
      //   //   store.dispatch("user/resetToken").then(() => {
      //   //     location.reload();
      //   //   });
      //   // });
      // }
      // return Promise.reject(new Error(res.message || "Error"));
    } else {
      console.log('requestjs code === 0')
      return res;
    }
  },

  error => {
    console.log(`err${error}`); // for debug
    console.log(error); // for debug
    console.log(error.response)
    if (error.response.statusText === "Unauthorized") {
      console.log('test')
      store.dispatch("user/resetToken").then(() => {
        // eslint-disable-next-line no-restricted-globals
              location.reload();
            });
    }

    Message({
      message: error.response.data.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default service;
