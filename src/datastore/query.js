/* data pattern to get user*/
export function getUser (userId) {
  return {
    "query": { userId },
    "fields": [ "_id", "nick", "email", "avatarFileToken" ]
  }
}


/* data pattern to get users */
export function getPosts (SORTKEYS, selectedTags, sortBy) {

  let query = {},  sort = {}
  if (selectedTags.length > 0) {
    query = { "tags": { "$in": selectedTags } }
  }
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
  return { query, sort }
  /* api criteria
  {
   "query" : {},
   "sort":{}
  }
  */
}
