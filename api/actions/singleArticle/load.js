/** post:{
 "author":{'_id', 'nickName':'', 'name', 'email'},
 "_id":"",
 "title": "",
 "abstract": "",
 "content": "",
 'viewCount': 10,
 "tags": [],
 "publishOn": "",
 "viewCount": "",
 "cancomment": true,
 "likeCount" 100,
 "comments":  {
   shortName: 'localtest998',
   thread: '201508270001',
   title: '你瞧不起她是因为你羡慕她',
   url: 'http://localhost:8080'
 }
} **/

const mock ={
  author: {
    name: '清梨浅茶',
    words: 16875,
    follows: 152,
    likes: 718
  },
  article: {
    author: '清梨浅茶',
    publishDate: '2015.09.04 01:12',
    words: 1949,
    readers: 1140,
    comments: {
      shortName: 'localtest998',
      thread: '201508270001',
      title: '你瞧不起她是因为你羡慕她',
      url: 'http://localhost:8080'
    },
    likes: 36,
    title: `你瞧不起她是因为你羡慕她`,
    content: `
  张小凤和温柔是一个宿舍的舍友，

  而且还是临铺。按照常理来说，一个宿舍的临铺往往关系最好，

  但是她俩就是个意外。

  张小凤不喜欢温柔。

  即便温柔的性格非常好相处，但是张小凤就是不喜欢她。

  因为她总是瞧不起温柔。

  张小凤是他们村走出来的第二个大学生，

  第一个大学生是在十几年前走出他们那个大山沟的，

  那个时候的张小凤还只会躲在家门口玩泥巴。

  张小凤的父亲走得早，是母亲把她一手拉扯大，其中的委屈，不言而喻。

  小凤的母亲在看过村里第一个大学生离村的热闹欢送会后，

  每天都会在小凤的耳边说上无数遍:

  你一定要考上大学，给妈争脸。

  尽管，当时的小凤才七岁。

  后来，小凤终于考上了大学，虽然复习了一年，

  但总归没有辜负她母亲的期望。

  经过一个漫长的暑假，小凤便扛着铺盖，背着包，

  还抱了一坛咸鸭蛋，坐了近25个小时的火车，来到学校。

  报道完，小凤便去宿舍收拾东西。

  宿舍一共四个人，看着床上的行李，已经来了两个。

  只剩下西边的两张床还空着，小凤随便挑了一个，就开始收拾行李。

  小凤带的东西很少，不小会儿便收拾完毕。

  正当她长舒一口气的时候，宿舍门被轻轻地推开了。

  小凤永远也不会忘记第一次见到温柔的情景。

  当时的小凤才七岁。

  后来，小凤终于考上了大学，虽然复习了一年，

  但总归没有辜负她母亲的期望。

  经过一个漫长的暑假，小凤便扛着铺盖，

  背着包，还抱了一坛咸鸭蛋，坐了近25个小时的火车，来到学校。

  报道完，小凤便去宿舍收拾东西。

  宿舍一共四个人，看着床上的行李，已经来了两个。

  只剩下西边的两张床还空着，小凤随便挑了一个，就开始收拾行李。

  小凤带的东西很少，不小会儿便收拾完毕。

  正当她长舒一口气的时候，宿舍门被轻轻地推开了。

  小凤永远也不会忘记第一次见到温柔的情景。
    `
  }
}
export function getSingleArticle (req) {
  let article=req.session.article
  if (!article) {
    article = mock
    req.session.article = article
  }
  return article
}
export default function load (req, params) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      // if (Math.floor(Math.random() * 5)===0) {
      //   reject('article load fails 20% of the time. You were unlucky.')
      // } else {
      //   resolve(getSingleArticle(req))
      // }
      resolve(getSingleArticle(req))
    }, 3000) // simulate async load
  })
}
