import request from '@/router/axios'

export function getLabelPage(query) {
  return request({
    url: '/label/info/page',
    method: 'get',
    params: query
  })
}
