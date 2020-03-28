import Cookies from 'js-cookie'

const KEY = 'PHPSESSID'

export function getSid() {
  return Cookies.get(KEY)
}

export function setSid(sessionID) {
  return Cookies.set(KEY, sessionID)
}

export function removeSid() {
  return Cookies.remove(KEY)
}
