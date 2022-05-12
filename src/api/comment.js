import request from '@/router/axios'

export function getCommentTree(id) {
  return request({
    url: '/comment/info/getTree/' + id,
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
