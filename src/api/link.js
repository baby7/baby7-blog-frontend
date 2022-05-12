import request from '@/router/axios'

export function getLinkList(query) {
  return request({
    url: '/link/info/page',
    method: 'get',
    params: query
  })
}
