import { ajax } from 'lgutil/common'
/* load per user action */
const LOAD_SETTINGS_REQUEST = 'settings/LOAD_SETTINGS_REQUEST'
const LOAD_SETTINGS_SUCCESS = 'settings/LOAD_SETTINGS_SUCCESS'
const LOAD_SETTINGS_FAILURE = 'settings/LOAD_SETTINGS_FAILURE'

/* save  user action */
const SAVE_SETTINGS_REQUEST = 'settings/SAVE_SETTINGS_REQUEST'
const SAVE_SETTINGS_SUCCESS = 'settings/SAVE_SETTINGS_SUCCESS'
const SAVE_SETTINGS_FAILURE = 'settings/SAVE_SETTINGS_FAILURE'

const DISPOSE_SETTINGS = 'settings/DISPOSE_SETTINGS'
const SWITCH_TABINDEX = 'settings/SWITCH_TABINDEX'
const CLOSE_ALERT = 'settings/CLOSE_ALERT'
const CLOSE_UPLOAD_ALERT='settings/CLOSE_UPLOAD_ALERT'

/* load  avatar  action */
const LOAD_AVATAR_REQUEST = 'settings/LOAD_AVATAR_REQUEST'
const LOAD_AVATAR_SUCCESS = 'settings/LOAD_AVATAR_SUCCESS'
const LOAD_AVATAR_FAILURE = 'settings/LOAD_AVATAR_FAILURE'



 /* initial state */
const initialState = {
  isLoading: false,
  isLoaded: false,
  isUploaded: false,
  isSaving: false,
  isSaved: false,
  isExist: false,
  alertVisible: false,
  entries: { "avatarFileToken": "", "avatarFileUrl": "" },
  tabIndex: 0,
  error: null
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
/* load post action  */
  case LOAD_SETTINGS_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false
    }
  case LOAD_SETTINGS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      isExist: action.result && action.result.length>0,
      entries: getUserSettings(action.result)
    }
  case LOAD_SETTINGS_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
/* load  avatar action  */
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
      isUploaded: true,
      alertVisible: true,
      entries: updateAvatarFileUrl(state.entries, action)
    }
  case LOAD_AVATAR_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }

/* save SETTINGS action  */
  case SAVE_SETTINGS_REQUEST:
    return {
      ...state,
      isSaving: true,
      isSaved: false
    }
  case SAVE_SETTINGS_SUCCESS:
    return {
      ...state,
      isSaving: false,
      isSaved: true,
      alertVisible: true,
      isExist: true, // 不管创建或者更新，保存成功后这个flag需要设置为true
      entries: action.result
    }
  case SAVE_SETTINGS_FAILURE:
    return {
      ...state,
      isSaving: false,
      isSaved: false,
      alertVisible: true,
      error: action.error
    }
  case DISPOSE_SETTINGS:
    return initialState
  case CLOSE_ALERT:
    return {
      ...state,
      alertVisible: false
    }
  case  CLOSE_UPLOAD_ALERT:
    return {
      ...state,
      isUploaded: false
    }

  case SWITCH_TABINDEX:
    return {
      ...state,
      tabIndex: action.index
    }

  default:
    return state
  }
}

function getUserSettings (list) {

  return list.length===0?{}:list[0]
  // TODO:add many logic
}

// update user avatar url
function updateAvatarFileUrl (oldEntries, action) {

  if (!action.result) {
    return { ...oldEntries, "avatarFileToken": action.fileToken }
  }
  const url = action.result.body['file-url']
  console.log("test2:"+url)
  return { ...oldEntries, "avatarFileToken": action.fileToken, "avatarFileUrl": url }
}


/* action creator */

// get many posts with  query conditions
export function loadSettings (queryData) {
  return {
    types: [ LOAD_SETTINGS_REQUEST, LOAD_SETTINGS_SUCCESS, LOAD_SETTINGS_FAILURE ],
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


export function saveSettings (entries) {

  const apiPath=entries.isExist?'update':'create'
  return {
    types: [ SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAILURE ],
    promise: (client) => client.post(`/api/user/${apiPath}`, { data: entries })
  }
}

export function changePassword (entries) {

  return {
    types: [ SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAILURE ],
    promise: (client) => client.post('/api/user/changepassword', { data: entries })
  }
}

export function isLoaded (settingsState) {
  return settingsState && settingsState.isLoaded
}

export function isSaving (settingsState) {
  return settingsState && settingsState.isSaving
}

export function closeAlert () {
  return {
    type: CLOSE_ALERT
  }
}

export function closeUploadAlert () {
  return {
    type: CLOSE_UPLOAD_ALERT
  }
}


export function switchTabIndex (tabIndex) {
  return {
    type: SWITCH_TABINDEX,
    index: tabIndex
  }
}


/* clean post reducer data when unmount specific conponent */
export function dispose () {
  return {
    type: DISPOSE_SETTINGS
  }
}
