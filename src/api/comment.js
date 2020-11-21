import request from '@/router/axios'

export function getCommentPage(query) {
  return request({
    url: '/comment/info/page',
    method: 'get',
    params: query
  })
}

export function getCommentTree(id) {
  return request({
    url: '/comment/info/getTree/' + id,
    method: 'get'
  })
}

export function getComment(id) {
  return request({
    url: '/comment/info/' + id,
    method: 'get'
  })
}

export function addComment(obj) {
  return request({
    url: '/comment/change/comment',
    method: 'post',
    data: obj
  })
}

export function delComment(id) {
  return request({
    url: '/comment/change/' + id,
    method: 'delete'
  })
}

export function putComment(obj) {
  return request({
    url: '/comment/change',
    method: 'put',
    data: obj
  })
}
