const initialTags = [
  { name: "最热" },
  { name: "React" },
  { name: "Redux" },
  { name: "Javascript" }
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
    setTimeout(() => {
      resolve(getTags(req))
    }, 1000) // simulate async load
  })
}
