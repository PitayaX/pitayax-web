export const initialArticales = [ { _id: 0, title: "这个是标题哦", url: "http://www.baidu.com",
  image: "http://reactjs.cn/react/img/logo.svg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
  publishedOn: "2015-03-01", publishedBy: { _id: 0, name: "abc" },
  tags: [ { _id: 0, text: "React" } ], status: 2, viewCount: 200 },
  { _id: 1, title: "这个是标题2哦", url: "http://www.baidu.com",
    image: "http://img.ui.cn/data/file/7/0/1/6107.jpg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
    publishedOn: "2015-02-01", publishedBy: { _id: 0, name: "abc" },
    tags: [ { _id: 0, text: "React" }, { _id: 1, text: "Redux" } ], status: 2, viewCount: 300 },
  { _id: 1, title: "这个是标题2哦", url: "http://www.baidu.com",
      image: "http://img.ui.cn/data/file/7/0/1/6107.jpg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
      publishedOn: "2015-02-01", publishedBy: { _id: 0, name: "abc" },
      tags: [ { _id: 0, text: "React" }, { _id: 1, text: "Redux" } ], status: 2, viewCount: 300 },
  { _id: 1, title: "这个是标题2哦", url: "http://www.baidu.com",
        image: "http://img.ui.cn/data/file/7/0/1/6107.jpg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
        publishedOn: "2015-02-01", publishedBy: { _id: 0, name: "abc" },
        tags: [ { _id: 0, text: "React" }, { _id: 1, text: "Redux" } ], status: 2, viewCount: 300 },
  { _id: 1, title: "这个是标题2哦", url: "http://www.baidu.com",
          image: "http://img.ui.cn/data/file/7/0/1/6107.jpg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
          publishedOn: "2015-02-01", publishedBy: { _id: 0, name: "abc" },
          tags: [ { _id: 0, text: "React" }, { _id: 1, text: "Redux" } ], status: 2, viewCount: 300 },
  { _id: 1, title: "这个是标题2哦", url: "http://www.baidu.com",
    image: "http://imgsrc.baidu.com/forum/w%3D580/sign=16f7bf179f3df8dca63d8f99fd1072bf/0e2442a7d933c895b77b299bd11373f0830200cc.jpg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
    publishedOn: "2015-02-01", publishedBy: { _id: 0, name: "abc" },
    tags: [ { _id: 0, text: "React" }, { _id: 1, text: "Redux" } ], status: 2, viewCount: 300 },
  { _id: 1, title: "这个是标题2哦", url: "http://www.baidu.com",
    image: "http://imgsrc.baidu.com/forum/w%3D580/sign=16f7bf179f3df8dca63d8f99fd1072bf/0e2442a7d933c895b77b299bd11373f0830200cc.jpg", "abstract": "这是摘要哦。。。。。。。。。。。", content: "文章内容",
    publishedOn: "2015-02-01", publishedBy: { _id: 0, name: "abc" },
    tags: [ { _id: 0, text: "React" }, { _id: 1, text: "Redux" } ], status: 2, viewCount: 300 } ]

export function getArticales (req, pi, ps) {
  let articales = req.session.articales
  if (!articales) {
    articales = initialArticales
    req.session.articales = articales
  }
  return articales
}

export function query (req, params) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      resolve(getArticales(req))
    }, 1000) // simulate async load
  })
}

export function queryByTag (req, params) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      resolve(getArticales(req).slice((new Date().getSeconds())%10))
    }, 1000) // simulate async load
  })
}
