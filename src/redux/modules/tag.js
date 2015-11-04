const LOAD = "tag/load"
const LOAD_SUCCESS = "tag/load_success"
const LOAD_FAIL = "tag/load_fail"

const initialState = {
  loaded: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD:
    return {
      ...state,
      loading: true
    }
  case LOAD_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.result,
      error: null
    }
  case LOAD_FAIL:
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

export function isLoaded (globalState) {
  return globalState.tags && globalState.tags.loaded
}

export function load () {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: (client) => client.get('/tag/query/param1') // params not used, just shown as demonstration
  }
}
