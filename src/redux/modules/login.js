const LOGIN_INIT        = 'pitayaX/OAuth/LOGIN_INIT'

const LOGIN_REQUEST     = 'pitayaX/OAuth/LOGIN_REQUEST'
const LOGIN_SUCCESS     = 'pitayaX/OAuth/LOGIN_SUCCESS'
const LOGIN_FAILED      = 'pitayaX/OAuth/LOGIN_FAILED'

const LOGOUT_SUCCESS    = 'pitayaX/OAuth/LOGOUT_SUCCESS'


const REFRESH_REQUEST   = 'pitayaX/OAuth/REFRESH_REQUEST'
const REFRESH_SUCCESS   = 'pitayaX/OAuth/REFRESH_SUCCESS'
const REFRESH_FAILED    = 'pitayaX/OAuth/REFRESH_FAILED'


const SHOW_LOGIN_MODAL  = 'loginModal/SHOW_LOGIN_MODAL'
const HIDE_LOGIN_MODAL  = 'loginModal/HIDE_LOGIN_MODAL'


const SHOW_LOGIN_ERROR  = 'loginModal/SHOW_LOGIN_ERROR'
const HIDE_LOGIN_ERROR  = 'loginModal/HIDE_LOGIN_ERROR'



let REFRESH_TOKEN_FUNC = function () { }


export function loginModalInfo (state = {
  isLogining: false,
  showModal: false,
  showError: false,
  error: ''
}, action) {

  switch (action.type) {

  case LOGIN_REQUEST:
    return Object.assign({}, state, { isLogining: true })
  case LOGIN_SUCCESS:
    return doLoginSuccess(state, action)

  case LOGIN_FAILED:
    return Object.assign({}, state, { showError: true, isLogining: false })



  case REFRESH_SUCCESS:
    // handle the next refresh token work
    doRefreshSuccess(action)
    return state
  case REFRESH_FAILED:
    if (action.result.error) {
      console.log(action.result.error)
    }
    return state

  case LOGOUT_SUCCESS:
    // handle the next refresh token work
    doLogoutSuccess(action)
    return state



  case SHOW_LOGIN_MODAL:
    return Object.assign({}, state, { showModal: true })

  case HIDE_LOGIN_MODAL:
    return Object.assign({}, state, { showModal: false })

  case SHOW_LOGIN_ERROR:
    return Object.assign({}, state, { showError: true })

  case HIDE_LOGIN_ERROR:
    return Object.assign({}, state, { showError: false })

  default:
    return state
  }

}






// action creators

export function openLoginModal () {
  return { type: SHOW_LOGIN_MODAL }
}

export function closeLoginModal () {
  return { type: HIDE_LOGIN_MODAL }
}

export function loginClick (userInfo, refresh_Token) {
  return {
    types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED ],
    promise: (client) => client.post(`cb/login`, {
      data: { ...userInfo }
    }),
    callback: refresh_Token
  }

}

export function logoutClick (e) {
  return {
    types: [ LOGOUT_SUCCESS, LOGOUT_SUCCESS, LOGOUT_SUCCESS ],
    promise: (client) => client.post(`cb/logout`)
  }
}

export function refreshToken (userInfo, callback) {
  return {
    types: [ REFRESH_REQUEST, REFRESH_SUCCESS, REFRESH_FAILED ],
    promise: (client) => client.post(`cb/refresh`),
    callback
  }

}

export function loginInit () {
  return { type: LOGIN_INIT }
}


export default function loginInfo (state = {
  isLogined: false,
  nickName: '',
  userId: ''
}, action) {

  switch (action.type) {

  case LOGIN_INIT:
    return Object.assign({}, state, {
      isLogined: true,
      nickName: sessionStorage.getItem("nickName") || '',
      userId: sessionStorage.getItem("userId") || ''
    })


  case LOGIN_SUCCESS:
    if (!action.result.error) {
      return Object.assign({}, state, {
        isLogined: true,
        nickName: action.result.nickName,
        userId: action.result.userId
      })
    }

  case REFRESH_FAILED:
  case LOGOUT_SUCCESS:
    sessionStorage.setItem("nickName", "")
    sessionStorage.setItem("userId", "")
    return Object.assign({}, state, {
      isLogined: false,
      nickName: '',
      userId: ''
    })

  default:
    return state

  }
}


// util function

function doRefreshSuccess (action) {
  // global.setTimeout(REFRESH_TOKEN_FUNC, 1000)
  global.setTimeout(REFRESH_TOKEN_FUNC, Number(action.result.refreshTokenInterval))
}

function doLoginSuccess (state, action) {
  if (!action.result.error) {
    // success
    process.nextTick(() => global.alert("欢迎您， " + action.result.nickName ))
    setRefresh(action.callback)
    doRefreshSuccess (action)
    saveDataToSessionStorage(action.result)

    return Object.assign({}, state, { showModal: false, isLogining: false })

  } else {
    return Object.assign({}, state, {
      showError: true,
      error: action.result.error,
      isLogining: false
    })
  }
}

function saveDataToSessionStorage (result) {
  sessionStorage.setItem("nickName", result.nickName)
  sessionStorage.setItem("userId", result.userId)
}

function doLogoutSuccess (action) {
  setRefresh(function () { })
}

function setRefresh (func) {
  REFRESH_TOKEN_FUNC=func
}
