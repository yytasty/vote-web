import axios from 'axios';

// const baseURL = 'https://www.yytasty.com/api/note/'

// const baseURL = '//api.business.tanchi0757.shop'
// const baseURL = 'http://8.134.143.87:9027/'; // 一期线上
// const baseURL = 'http://www.yytasty.com:9027/';
const baseURL = 'http://8.134.123.115:9027/'; // 二期线上
// const baseURL = 'http://localhost:26000/api'

let config = {
  baseURL: baseURL,
  timeout: 60 * 1000,
  withCredentials: false,
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    // if (localStorage.token) {
    //   config.headers['X-Business-Access-Token'] = localStorage.token
    // }
    // config.headers['Tenant-Id'] = tenantId || '1'
    // config.headers['Bm-Area-Id'] = '-1'
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
