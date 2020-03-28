import request from '@/utils/request'

export function getGroupMemberList() {
  return request({
    url: '/wechatygroupmember',
    method: 'get',
  })
}

export function getGroupMemberListByWehchatGroup(id) {
  return request({
    url: `/wechatygroupmember/wechatgroup/${id}`,
    method: 'get',
  })
}

export function createGroupByArray(data) {
  return request({
    url: '/wechatygroupmember/array',
    method: 'post',
    data
  })
}
