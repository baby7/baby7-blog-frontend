import request from '@/router/axios'

export function getSetting() {
  return request({
    url: '/setting/info/get',
    method: 'get'
  })
}

export function getBlogger() {
  return request({
    url: '/setting/info/getBlogger',
    method: 'get'
  })
}
