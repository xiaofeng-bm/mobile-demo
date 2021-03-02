import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant'

const whiteList = ['slip/api/appeal/get_csrf_token']

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // 跨域请求时发送 cookies
})

service.interceptors.request.use(
  config => {
    return config
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 白名单接口不验证success
    if(whiteList.includes(response.config.url)) {
      return res
    }
    if(!res.success) {
      Toast.fail(res.msg)

      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    if(error.message === '取消重复请求') {
      
    } else {
      Toast.fail(error && error.msg)
    }
    return Promise.reject('error')
  }
)

export default service;