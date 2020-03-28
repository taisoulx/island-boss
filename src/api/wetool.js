import request from "@/utils/request"

// eslint-disable-next-line import/prefer-default-export
export function getHistory(data) {
  return request({
    url: '/wechatygroupmember/history',
    method: 'post',
    data
  })
}
