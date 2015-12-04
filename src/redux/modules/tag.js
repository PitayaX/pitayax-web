/* action type for tag section */
const LOAD_TAGS_REQUEST = 'tag/LOAD_TAGS_REQUEST'
const LOAD_TAGS_SUCCESS = 'tag/LOAD_TAGS_SUCCESS'
const LOAD_TAGS_FAILURE = 'tag/LOAD_TAGS_FAILURE'

/* select tag  action */
const SELECT_TAGS = 'tag/SELECT_TAGS'
const DISPOSE_TAG = 'tag/DISPOSE_TAG'

 /* initial state */
const initialState = {
  isLoading: false,
  isLoaded: false,
  tags: [],
  selectedTags: [],
  error: null
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD_TAGS_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false
    }
  case LOAD_TAGS_SUCCESS: /* load all tag success */
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      tags: action.result
    }
  case LOAD_TAGS_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
  case SELECT_TAGS:
    return {
      ...state,
      selectedTags: getSelectedTags(state.selectedTags, action.tag) /* add selected tag to container*/
    }
  case DISPOSE_TAG:
    return initialState
  default:
    return state
  }
}

/* get selected tag collection after a tag be clicked */
function getSelectedTags (selectedTags, newTag) {
  if (selectedTags.length ===0) {
    return  [ ...selectedTags, newTag ]
  }
  const currentTag=selectedTags.find((t) => t===newTag)
  return currentTag !== undefined ? selectedTags.filter(t => t !== currentTag): [ ...selectedTags, newTag ]
}

/* action creator */

export function loadTags () {
  return {
    types: [ LOAD_TAGS_REQUEST, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAILURE ],
    promise: (client) => client.post('/api/script/post/tags?max=20')
  }
}
export function isLoaded (tagState) {
  return tagState && tagState.isLoaded
}

export function selectTag (tag) {
  return {
    type: SELECT_TAGS,
    tag
  }
}
/* clean tag reducer data when unmount specific conponent */
export function dispose () {
  return {
    type: DISPOSE_TAG
  }
}
