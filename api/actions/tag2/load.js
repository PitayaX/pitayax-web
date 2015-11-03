const initialTags = [
  { "id": 1, "tagName": "生活家" },
  { "id": 2, "tagName": "世间事" },
  { "id": 3, "tagName": "@IT" },
  { "id": 4, "tagName": "军事" },
  { "id": 5, "tagName": "电影" }
]

export function getTags (req) {
  let tags = req.session.tags
  if (!tags) {
    tags = initialTags
    req.session.tags = tags
  }
  return tags
}

export default function load (req, params) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {resolve(getTags(req))
    }, 6000) // simulate async load
  })
}
