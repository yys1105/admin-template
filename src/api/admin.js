import request from '@/utils/request'

// 修改管理者密码
export function modifyPwd(data) {
  return request({
    url: '/mine/modify-password',
    method: 'post',
    data
  })
}

export function adminList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    auth: true,
    params
  })
}

export function adminUpdate(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    auth: true,
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/admin/reset-password',
    method: 'post',
    auth: true,
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/admin/change-status',
    method: 'post',
    auth: true,
    data
  })
}

export function adminDelete(data) {
  return request({
    url: '/admin/delete',
    method: 'post',
    auth: true,
    data
  })
}

export function adminCreate(data) {
  return request({
    url: '/admin/create',
    method: 'post',
    auth: true,
    data
  })
}
