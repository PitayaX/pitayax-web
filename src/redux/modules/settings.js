/* load per user action */
const LOAD_SETTINGS_REQUEST = 'settings/LOAD_SETTINGS_REQUEST'
const LOAD_SETTINGS_SUCCESS = 'settings/LOAD_SETTINGS_SUCCESS'
const LOAD_SETTINGS_FAILURE = 'settings/LOAD_SETTINGS_FAILURE'

/* create  user action */
const SAVE_SETTINGS_REQUEST = 'settings/SAVE_SETTINGS_REQUEST'
const SAVE_SETTINGS_SUCCESS = 'settings/SAVE_SETTINGS_SUCCESS'
const SAVE_SETTINGS_FAILURE = 'settings/SAVE_SETTINGS_FAILURE'

/* update  user action */
const UPDATE_SETTINGS_REQUEST = 'settings/UPDATE_SETTINGS_REQUEST'
const UPDATE_SETTINGS_SUCCESS = 'settings/UPDATE_SETTINGS_SUCCESS'
const UPDATE_SETTINGS_FAILURE = 'settings/UPDATE_SETTINGS_FAILURE'

const DISPOSE_SETTINGS = 'settings/DISPOSE_SETTINGS'
const STASH_SETTINGS='settings/STASH_SETTINGS'
const SWITCH_TABINDEX = 'settings/SWITCH_TABINDEX'
const CLOSE_ALERT = 'settings/CLOSE_ALERT'
const CLOSE_UPLOAD_ALERT='settings/CLOSE_UPLOAD_ALERT'
const START_UPLOAD='settings/START_UPLOAD'
const END_UPLOAD='settings/END_UPLOAD'


 /* initial state */
const initialState = {
  isLoading: false,
  isLoaded: false,
  isAvatarUploading: false,
  isSaving: false,
  isSaved: false,
  isExist: false,
  alertVisible: false,
  entries: { "avatarFileToken": "" },
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
  case UPDATE_SETTINGS_REQUEST:
    return {
      ...state,
      isSaving: true,
      isSaved: false
    }
  case UPDATE_SETTINGS_SUCCESS:
    return {
      ...state,
      isSaving: false,
      isSaved: true,
      alertVisible: true
    }
  case UPDATE_SETTINGS_FAILURE:
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
  case  STASH_SETTINGS:
    return {
      ...state,
      entries: { ...state.entries, ...action.values }
    }
  case  START_UPLOAD:
    return {
      ...state,
      isAvatarUploading: true
    }
  case  END_UPLOAD:
    return {
      ...state,
      isAvatarUploading: false
    }
  default:
    return state
  }
}

function getUserSettings (list) {

  return list.length===0?{}:list[0]
  // TODO:add many logic
}

// get many posts with  query conditions
export function loadSettings (queryData) {
  return {
    types: [ LOAD_SETTINGS_REQUEST, LOAD_SETTINGS_SUCCESS, LOAD_SETTINGS_FAILURE ],
    promise: (client) => client.post('/api/user/query', { data: queryData })
  }
}

/* save user settings ,include create and update */
export function saveSettings (entries) {
  return {
    types: [ SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAILURE ],
    promise: (client) => client.post(`/api/user/create`, { data: entries })
  }
}

export function updateSettings (entries) {
  return {
    types: [ UPDATE_SETTINGS_REQUEST, UPDATE_SETTINGS_SUCCESS, UPDATE_SETTINGS_FAILURE ],
    promise: (client) => client.put(`/api/user/`, { data: entries })
  }
}

export function stashSettings (values) {
  return {
    type: STASH_SETTINGS,
    values
  }
}

export function startUploadAvatar () {
  return {
    type: START_UPLOAD
  }
}

export function endUploadAvatar () {
  return {
    type: END_UPLOAD
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
