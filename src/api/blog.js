import request from '@/router/axios'

export function getBlogPage(query) {
  return request({
    url: '/blog/info/page',
    method: 'get',
    params: query
  })
}

export function getBlogList() {
  return request({
    url: '/blog/info/list',
    method: 'get'
  })
}

export function look(obj) {
  return request({
    url: '/blog/info/look',
    method: 'post',
    data: obj
  })
}

export function getBlog(id) {
  return request({
    url: '/blog/info/' + id,
    method: 'get'
  })
}

export function addBlog(obj) {
  return request({
    url: '/blog/change',
    method: 'post',
    data: obj
  })
}

export function delBlog(id) {
  return request({
    url: '/blog/change/' + id,
    method: 'delete'
  })
}

export function putBlog(obj) {
  return request({
    url: '/blog/change',
    method: 'put',
    data: obj
  })
}
