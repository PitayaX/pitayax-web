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
