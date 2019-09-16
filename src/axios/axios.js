import router from '../router';
import axios from 'axios';
import api from './api'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';
//http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.token;
    const accountid = localStorage.AccountID;
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      'Token':token,
      'AccountID': accountid
    }
    if(!token) {
      router.push({
        path: "/Login",
      })
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}


export function getFile() {
  return new Promise((resolve, reject) => {
    axios.post(api.uploadfile).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}
