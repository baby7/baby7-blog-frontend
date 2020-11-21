import request from '@/router/axios'

export function getLinkList(query) {
  return request({
    url: '/link/info/page',
    method: 'get',
    params: query
  })
}

export function getLink(id) {
  return request({
    url: '/link/info/' + id,
    method: 'get'
  })
}

export function addLink(obj) {
  return request({
    url: '/link/info/change',
    method: 'post',
    data: obj
  })
}

export function delLink(id) {
  return request({
    url: '/link/change/' + id,
    method: 'delete'
  })
}

export function putLink(obj) {
  return request({
    url: '/link/change',
    method: 'put',
    data: obj
  })
}
