/* common function to detemone whether user has logged */
export function  isLogged () {

  const uid = global.sessionStorage.getItem('userId')
  if (Object.is(undefined, uid)) {
    return false
  }
  if (Object.is(null, uid)) {
    return false
  }
  if (Object.is(uid.length, 0)) {
    return false
  }
  return  true
}

// generate user token with date
export function getCustomUserToken () {

  const now = new Date()
  const year=now.getFullYear()
  const month=now.getMonth()+1
  const day=now.getDate()
  const hour=now.getHours()
  const minute=now.getMinutes()
  const second=now.getSeconds()
  const millisecond=now.getMilliseconds()
  return `${year}${month}${day}${hour}${minute}${second}${millisecond}` // temp token
}
