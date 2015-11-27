import { ajax } from 'lgutil/common'
/* load per user action */
const LOAD_USER_REQUEST = 'user/LOAD_USER_REQUEST'
const LOAD_USER_SUCCESS = 'user/LOAD_USER_SUCCESS'
const LOAD_USER_FAILURE = 'user/LOAD_USER_FAILURE'

/* load  avatar  action */
const LOAD_AVATAR_REQUEST = 'user/LOAD_AVATAR_REQUEST'
const LOAD_AVATAR_SUCCESS = 'user/LOAD_AVATAR_SUCCESS'
const LOAD_AVATAR_FAILURE = 'user/LOAD_AVATAR_FAILURE'

const DISPOSE_USER = 'user/DISPOSE_USER'
const LOGIN_USER = 'user/LOGIN_USER'


 /* initial state */
const initialState = {
  isLoading: false,
  isLoaded: false,
  isLogged: false, // 是否登录
  author: { 'authorAvatarUrl': '' },
  error: null
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
/* load post action  */
  case LOAD_USER_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false
    }
  case LOAD_USER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      author: action.result
    }
  case LOAD_USER_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
  case LOAD_AVATAR_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false
    }
  case LOAD_AVATAR_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      author: getUserAvatareUrl(state.author, action.result)
    }
  case LOAD_AVATAR_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
  case DISPOSE_USER:
    return initialState
  case LOGIN_USER:
    return {
      ...state,
      isLogged: action.logged
    }

  default:
    return state
  }
}

// get user avatar url
function getUserAvatareUrl (oldEntries, result) {

  if (!result) {
    return oldEntries
  }
  const url = JSON.stringify(result)['file-url']
  return { ...oldEntries, 'authorAvatarUrl': url }

}


/* action creator */

// get many posts with  query conditions
export function loadUser (queryData) {
  return {
    types: [ LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE ],
    promise: (client) => client.post('/api/user/query', { data: queryData })
  }
}

export function loadUserAvatar (token) {
  return {
    fileToken: token,
    types: [ LOAD_AVATAR_REQUEST, LOAD_AVATAR_SUCCESS, LOAD_AVATAR_FAILURE ],
    promise: () => ajax.get(`http://10.10.73.208:8081/fs/${token}`)
  }
}

export function loginUser (logged) {
  return {
    type: LOGIN_USER,
    logged
  }
}



export function isLoaded (userState) {
  return userState && userState.isLoaded
}

/* clean post reducer data when unmount specific conponent */
export function dispose () {
  return {
    type: DISPOSE_USER
  }
}
