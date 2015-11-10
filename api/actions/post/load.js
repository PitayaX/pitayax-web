const initialPosts = [
  {
    "_id": 1,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 2,
    "title": "首页投稿2",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "Asp.Net", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 3,
    "title": "首页投稿3",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "C#", "Asp.Net", "Html5" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 4,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 5,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 6,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 7,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 8,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 9,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 10,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 11,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 12,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 13,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 14,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 15,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 16,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 17,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 18,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 19,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  },
  {
    "_id": 20,
    "title": "首页投稿1",
    "abstract": "玩转简书的第一步，从这个专题开始。 想上首页热门榜么？好内容想被更多人看到么？来投稿吧！如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。投稿必须原创。如果发现有非",
    "publishedOn": "2015-09-15",
    "tags": [ "Javascript", "ReactJs", "Redux" ],
    "author": { "_id": 1, "nickName": "进击的程序猿", "avatar": "" },
    "viewCount": 10,
    "likeCount": 81,
    "commentCount": 100
  }
]

export function getPosts (req) {
  let posts = req.session.posts
  if (!posts) {
    posts = initialPosts
    req.session.posts = posts
  }
  return posts
}


export default function load (req, params) {
  // console.log(req)
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {resolve(getPosts(req))
    }, 6000) // simulate async load
  })
}
