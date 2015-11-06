/* action type for tag section */
const LOAD_COMMENTS_REQUEST = 'comment/LOAD_COMMENTS_REQUEST'
const LOAD_COMMENTS_SUCCESS = 'comment/LOAD_COMMENTS_SUCCESS'
const LOAD_COMMENTS_FAILURE = 'comment/LOAD_COMMENTS_FAILURE'

 /* initial state */
const initialState = {
  isLoading: false,
  isLoaded: false,
  comments: [],
  error: null
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD_COMMENTS_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false,
    }
  case LOAD_COMMENTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      comments: action.result
    }
  case LOAD_COMMENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
  default:
    return state
  }
}

/* action creator */
export function load () {
  return {
    types: [ LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE ],
    promise: (client) => client.get('/comment/load')
  }
}
export function isLoaded (commentState) {
  return commentState && commentState.isLoaded
}
