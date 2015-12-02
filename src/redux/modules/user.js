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
  userId: '',
  author: { "_id": "", "nick": "", "email": "", "avatarFileToken": "", "avatarFileUrl": "" },
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
      userId: action.userId,
      author: getAuthorInfor(state.author, action)
    }
  case LOAD_USER_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      userId: action.userId,
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
      author: updateAvatarFileUrl(state.author, action)
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

// update user avatar url
function updateAvatarFileUrl (oldEntries, action) {

  if (!action.result) {
    return { ...oldEntries, "avatarFileToken": action.fileToken }
  }
  const url = action.result.body['file-url']
  return { ...oldEntries, "avatarFileToken": action.fileToken, "avatarFileUrl": url }
}

function getAuthorInfor (oldEntries, action) {

  if (!action.result || action.result.length<=0) {
    return { ...oldEntries }
  }
  return  { ...oldEntries, ...action.result[0] }

}


/* action creator */

// get many posts with  query conditions
export function loadUser (queryData) {
  return {
    userId: queryData.userId,
    types: [ LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE ],
    promise: (client) => client.post('/api/user/query', { data: queryData })
  }
}

export function loadAvatarByToken (token) {
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
