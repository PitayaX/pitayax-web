/* action type for tag section */
const LOAD_TAG_REQUEST = 'LOAD_TAG_REQUEST'
const LOAD_TAG_SUCCESS = 'LOAD_TAG_SUCCESS'
const LOAD_TAG_FAILURE = 'LOAD_TAG_FAILURE'
const SELECT_TAG = 'SELECT_TAG'

 /* initial state */
const initialState = {
  isTagFetching: false,
  isTagFetched: false,
  tags: [],
  selectedTags: [],
  errorMessage: null
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD_TAG_REQUEST:
    return {
      ...state,
      isTagFetching: true,
      isTagFetched: false
    }
  case LOAD_TAG_SUCCESS: /* load all tag success */
    return {
      ...state,
      isTagFetching: false,
      isTagFetched: true,
      tags: action.result
    }
  case LOAD_TAG_FAILURE:
    return {
      ...state,
      isTagFetching: false,
      isTagFetched: false,
      error: action.error
    }
  case SELECT_TAG:
    return {
      ...state,
      selectedTags: getSelectedTags(state.selectedTags, action.tag) /* add selected tag to container*/
    }
  default:
    return state
  }
}

function getSelectedTags (selectedTags, newTag) {
  if (selectedTags.length ===0) {
    return  [ ...selectedTags, newTag ]
  }
  const currentTag=selectedTags.find((t) => t===newTag)
  return currentTag !== undefined ? selectedTags.filter(t => t !== currentTag): [ ...selectedTags, newTag ]
}

/* action creator */
export function load () {
  return {
    types: [ LOAD_TAG_REQUEST, LOAD_TAG_SUCCESS, LOAD_TAG_FAILURE ],
    promise: (client) => client.get('/tag2/load')
  }
}
export function isLoaded (tagState) {
  return tagState && tagState.isTagFetched
}

export function selectTag (tag) {
  return {
    type: SELECT_TAG,
    tag
  }
}
