/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
export const baseURL = "https://musicapi.xxytime.top";

import axios from "axios";

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12, baseURL: baseURL });
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) =>
    res.status === 200 && res.data.code === 200
      ? Promise.resolve(res.data)
      : Promise.reject(res),
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
