import request from '@/router/axios'

export function getMenuList(query) {
  return request({
    url: '/menu/info/page',
    method: 'get',
    params: query
  })
}
