/* load many posts action */
const LOAD_POSTS_REQUEST = 'post/LOAD_POSTS_REQUEST'
const LOAD_POSTS_SUCCESS = 'post/LOAD_POSTS_SUCCESS'
const LOAD_POSTS_FAILURE = 'post/LOAD_POSTS_FAILURE'

/* load per post action */
const LOAD_POST_REQUEST = 'post/LOAD_POST_REQUEST'
const LOAD_POST_SUCCESS = 'post/LOAD_POST_SUCCESS'
const LOAD_POST_FAILURE = 'post/LOAD_POST_FAILURE'

/* save  post action */
const SAVE_POST_REQUEST = 'post/SAVE_POST_REQUEST'
const SAVE_POST_SUCCESS = 'post/SAVE_POST_SUCCESS'
const SAVE_POST_FAILURE = 'post/SAVE_POST_FAILURE'



/* sort  post action */
const POSTS_SORT = 'post/POSTS_SORT'
const DISPOSE_POST = 'post/DISPOSE_POST'

const SORTKEYS = { NEW: "NEW", HOT: "HOT", LIKE: "LIKE" }
const POSTSORTBY=[ { type: SORTKEYS.NEW, name: "最新更新" }, { type: SORTKEYS.HOT, name: "热门排序" }, { type: SORTKEYS.LIKE, name: "关注度排序" } ]

 /* initial state */
const initialState = {
  isLoading: false,
  isLoaded: false,
  posts: [],
  sortTypes: POSTSORTBY,
  error: null
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
/* load posts action  */
  case LOAD_POSTS_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false
    }
  case LOAD_POSTS_SUCCESS: /* load all tag success */
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      posts: action.result
    }
  case LOAD_POSTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
/* load post action  */
  case LOAD_POST_REQUEST:
    return {
      ...state,
      isLoading: true,
      isLoaded: false,
    }
  case LOAD_POST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      post: handlePost(action.result)
    }
  case LOAD_POST_FAILURE:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      error: action.error
    }
/* save post action  */
  case SAVE_POST_REQUEST:
    return {
      ...state,
      isSaving: true,
      isSaved: false,
    }
  case SAVE_POST_SUCCESS:
    return {
      ...state,
      isSaving: false,
      isSaved: true,
      post: action.result
    }
  case SAVE_POST_FAILURE:
    return {
      ...state,
      isSaving: false,
      isSaved: false,
      error: action.error
    }
  case POSTS_SORT:
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      sortBy: action.sortBy
    }
  case  DISPOSE_POST:
    return initialState
  default:
    return state
  }
}

function appendLoadedPosts (oldPosts, newPosts) {
  const  posts=[ ...oldPosts, ...newPosts ]
  return posts
}

function handlePost (post) {
  post.comments = {
    "shortName": 'localtest998',
    "thread": post._id,
    "title": post.title,
    "url": 'http://localhost:3000'
  }

  return post
}

/* action creator */

// get many posts with  query conditions
export function loadPosts (selectedTags, sortBy) {
  let query = {}

  if (selectedTags.length > 0) {
    const tagArray = [ ]
    selectedTags.map((tag) => {
      tagArray.push(tag)
    })

    if (tagArray.length > 0) {
      query = { "tags": { "$in": tagArray } }
    }
  }

  let sort = {}

  if (sortBy) {
    switch (sortBy) {
    case SORTKEYS.NEW:
      sort = { "publishedOn": 1 }
      break
    case SORTKEYS.HOT:
      sort = { "viewCount": 1 }
      break
    case SORTKEYS.LIKE:
      sort =  { "_d": 1 }
      break
    default:
      sort =  { "publishedOn": 1 }
    }
  }

  return {
    types: [ LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE ],
    promise: (client) => client.post('/api/post/query', { data: { query, sort } })
  }
}

// get post detail with post id
export function loadPost (id) {
  return {
    types: [ LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE ],
    promise: (client) => client.get(`/api/post/${id}`)
  }
}

export function savePost (post) {
  return {
    types: [ SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE ],
    promise: (client) => client.post('/post/update', {
      data: post
    })
  }
}

export function isLoaded (postState) {
  return postState && postState.isLoaded
}

export function isLoading (postState) {
  return postState && postState.isLoading
}

export function sortPost (sortBy) {
  return{
    type: POSTS_SORT,
    sortBy
  }
}

/*clean post reducer data when unmount specific conponent */
export function dispose () {
  return {
    type: DISPOSE_POST
  }
}
