import request from '@/utils/request'
// 用户登录
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/app/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getUserInfo(token) {
  return request({
    url: '/mine/info',
    method: 'get',
    auth: true
  })
}

