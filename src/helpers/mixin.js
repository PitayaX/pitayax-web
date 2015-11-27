export function  isLogged () {

  return global.sessionStorage.getItem('userId') || false

}
