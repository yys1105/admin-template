import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    auth: true,
    params
  })
}

export function userView(params) {
  return request({
    url: '/user/view',
    method: 'get',
    auth: true,
    params
  })
}
