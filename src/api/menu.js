import request from '@/router/axios'

export function getMenuList(query) {
  return request({
    url: '/menu/info/page',
    method: 'get',
    params: query
  })
}

export function getMenu(id) {
  return request({
    url: '/menu/info/' + id,
    method: 'get'
  })
}

export function addMenu(obj) {
  return request({
    url: '/menu/change',
    method: 'post',
    data: obj
  })
}

export function delMenu(id) {
  return request({
    url: '/menu/change/' + id,
    method: 'delete'
  })
}

export function putMenu(obj) {
  return request({
    url: '/menu/change',
    method: 'put',
    data: obj
  })
}
