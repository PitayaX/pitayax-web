const LIST = "articale/list"
const LIST_SUCCESS = "articale/list_success"
const LIST_FAIL = "articale/list_fail"

const initialState = {
  loaded: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LIST:
    return {
      ...state,
      loading: true
    }
  case LIST_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.result,
      error: null
    }
  case LIST_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      data: null,
      error: action.error
    }
    break
  default:
    return state
    break
  }
}

export function isArticalesLoaded (globalState) {
  return globalState.articales && globalState.articales.loaded
}

export function list () {
  return {
    types: [ LIST, LIST_SUCCESS, LIST_FAIL ],
    promise: (client) => client.get('/articale/query') // params not used, just shown as demonstration
  }
}
