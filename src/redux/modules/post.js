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
      post: action.result
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
      sortBy: action.sortBy,
      posts: getSortedPost(state.posts, action.sortBy)
    }
  default:
    return state
  }
}

function getSortedPost (posts, sortby) {
  const  newPosts=[ ...posts ]
  switch (sortby) {
  case SORTKEYS.NEW:// 最新更新排序
    newPosts.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date)
    })
  case SORTKEYS.HOT:// 最热门排序
    newPosts.sort((a, b) => {
      return a.hotcount>b.hotcount
    })
  case SORTKEYS.LIKE:// 根据关注度排序
    newPosts.sort((a, b) => {
      return a.watchcount>b.watchcount
    })
  default:
    return newPosts
  }
}

/* action creator */

// get many posts with  query conditions
export function loadPosts () {
  return {
    types: [ LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE ],
    promise: (client) => client.get('/posts/load')
  }
}
// get post detail with post id
export function loadPost (id) {
  return {
    types: [ LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE ],
    promise: (client) => client.get(`/singleArticle/load/${id}`)
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

export function sortPost (sortBy) {
  return{
    type: POSTS_SORT,
    sortBy
  }
}
