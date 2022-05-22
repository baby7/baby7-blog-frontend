import request from '@/router/axios'

export function addFootprint(obj) {
  return request({
    url: '/footprint/info',
    method: 'post',
    data: obj
  })
}
