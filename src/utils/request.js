import axios from 'axios'
import router from '@/router'
import { Message, MessageBox } from 'element-ui'
import { BASE_URL } from '@/utils/baseUrl'
import { getToken } from "@/utils/auth"
import qs from 'qs';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

service.interceptors.request.use(config => {
  for (const key in config.data) {
    if (config.data[key] === '') {
      delete config.data[key]
    }
  }

  if (config.method === 'get') {
    if (config.auth) {
      if (!config.params){
        config.params = {
          'access_token': getToken()
        }
      } else {
        config.params['access_token'] = getToken()
      }
    }
  }
  if (config.method === 'post') {
    config.data['access_token'] = getToken()
    config.data = qs.stringify(config.data)
  }

  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 401) {
      Message({
        message: '系统出错',
        type: 'error',
        duration: 5 * 1000
      })
      router.push({ name: 'login' })
      return Promise.reject('error')
    }
    if (res.status !== 200) {
      Message({
        message: res.errors[0].message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
