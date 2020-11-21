import request from '@/router/axios'

export function getLabelPage(query) {
  return request({
    url: '/label/info/page',
    method: 'get',
    params: query
  })
}

export function getLabel(id) {
  return request({
    url: '/label/info/' + id,
    method: 'get'
  })
}

export function addLabel(obj) {
  return request({
    url: '/label/change',
    method: 'post',
    data: obj
  })
}

export function delLabel(id) {
  return request({
    url: '/label/change/' + id,
    method: 'delete'
  })
}

export function putLabel(obj) {
  return request({
    url: '/label/change',
    method: 'put',
    data: obj
  })
}
