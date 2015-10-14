const initialTags = [
  { _id: 0, text: "最热" },
  { _id: 1, text: "React" },
  { _id: 2, text: "Redux" },
  { _id: 3, text: "Javascript" }
]

export function getTags (req) {
  let tags = req.session.tags
  if (!tags) {
    tags = initialTags
    req.session.tags = tags
  }
  return tags
}

export default function query (req, params) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      resolve(getTags(req))
    }, 1000) // simulate async load
  })
}
