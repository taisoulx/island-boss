import request from '@/utils/request'

// eslint-disable-next-line import/prefer-default-export
export function getGroupList() {
  return request({
    url: '/wgroup',
    method: 'get',
  })
}

export function createGroup(data) {
  return request({
    url: '/wgroup',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: `/wgroup/${data._id}`,
    method: 'put',
    data
  })
}

export function deleteGroup(id) {
  return request({
    url: `/wgroup/${id}`,
    method: 'delete',
  })
}
