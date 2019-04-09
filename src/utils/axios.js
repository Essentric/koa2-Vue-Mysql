import axios from 'axios'
import router from '@/router'
import store from '@/store'
// import qs from 'qs'
import { Notice } from 'iview'

const Axios = axios.create({
  timeout: 5000,
  // baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
  // paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
})

// // 请求拦截器
Axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.user.token
    token && (config.headers.Authorization = `Bearer ${token}`)
    return config
  },
  error => {
    return Promise.error(error)
  })

// // 响应拦截器
Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            name: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Notice({
            title: '登录过期，请重新登录',
            duration: 1000
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          Notice({
            title: '网络请求不存在',
            duration: 1500
          })
          break
          // 其他错误，直接抛出错误提示
        default:
          Notice({
            title: error.response.data.msg || '未知错误',
            duration: 1500
          })
      }
      return Promise.reject(error.response)
    }
  }
)

export default Axios
