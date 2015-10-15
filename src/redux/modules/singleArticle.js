const LOAD = 'LOAD'
const LOAD_SUCCESS = 'LOAD_SUCCESS'
const LOAD_FAIL = 'LOAD_FAIL'


const initialState = {
  loaded: false,
  loading: true,
  data: {}
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
  default:
    return state
  }
}
export function isLoaded (globalState) {
  return globalState.singleArticle && globalState.singleArticle.loaded
}

export function load (pid) {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: (client) => client.get('/singleArticle/load/'+pid) // params not used, just shown as demonstration
  }
}
