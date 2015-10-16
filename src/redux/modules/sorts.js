const LOAD = "sort/load"

const initialState ={
  data: [
    { name: "最近更新", _id: 0, code: "NEW" },
    { name: "热门排名", _id: 1, code: "HOT" },
    { name: "关注度排名", _id: 2, code: "FOLLOW" }
  ]
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case LOAD:
  default:
    return state
    break
  }
}

export function load () {
  return {
    types: LOAD // params not used, just shown as demonstration
  }
}
