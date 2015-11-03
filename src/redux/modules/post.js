/* action type for tag section */
const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'
const POST_SORT = 'POST_SORT'


const POSTSORTBY={ NEW: 'NEW', HOT: 'HOT', WATCH: 'WATCH' }

 /* initial state */
const initialState = {
  isPostFetching: false,
  isPostFetched: false,
  posts: [],
  sortBy: POSTSORTBY.NEW,
  sortTypes: POSTSORTBY,
  error: null,
}

/* define reducer */
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD_POST_REQUEST:
    return {
      ...state,
      isPostFetching: true,
      isPostFetched: false
    }
  case LOAD_POST_SUCCESS: /* load all tag success */
    return {
      ...state,
      isPostFetching: false,
      isPostFetched: true,
      posts: action.result
    }
  case LOAD_POST_FAILURE:
    return {
      ...state,
      isPostFetching: false,
      isPostFetched: false,
      error: action.error
    }
  case POST_SORT:
    return {
      ...state,
      isPostFetching: false,
      isPostFetched: false,
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
  case POSTSORTBY.NEW:// 最新更新排序
    newPosts.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date)
    })
  case POSTSORTBY.HOT:// 最热门排序
    newPosts.sort((a, b) => {
      return a.hotcount>b.hotcount
    })
  case POSTSORTBY.WATCH:// 根据关注度排序
    newPosts.sort((a, b) => {
      return a.watchcount>b.watchcount
    })
  default:
    return newPosts
  }
}

/* action creator */
export function load () {
  return {
    types: [ LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE ],
    promise: (client) => client.get('/post/load')
  }
}
export function isLoaded (postState) {
  return postState && postState.isPostFetched
}

export function postSort (sortBy) {
  return{
    type: POST_SORT,
    sortBy
  }
}
