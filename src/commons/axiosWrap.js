
// axios 请求配置
import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
let loadingInstance // loading 实例
let needLoadingRequestCount = 0 // 当前正在请求的数量
const axiosWrap = axios.create({
  baseURL: process.env.VUE_APP_APIURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    timestamp: new Date().getTime()
  }
})
// 请求加签
axiosWrap.interceptors.request.use(config => {
  const { loadingHidden } = config
  if (needLoadingRequestCount === 0 && !loadingInstance) {
    loadingInstance = Vue.prototype.$loading
    !loadingHidden && loadingInstance.show()
  }
  needLoadingRequestCount++
  // config.headers.token = ''
  return config
})
axiosWrap.interceptors.response.use(res => {
  needLoadingRequestCount--
  if (loadingInstance && needLoadingRequestCount === 0) {
    loadingInstance.hide()
    loadingInstance = null
  }
  return res.data
}, error => {
  needLoadingRequestCount--
  if (loadingInstance && needLoadingRequestCount === 0) {
    loadingInstance.hide()
    loadingInstance = null
  }
  if (error) {
    Toast('未知错误,请稍后重试')
    return Promise.reject(String(error))
  }
})
export default axiosWrap
