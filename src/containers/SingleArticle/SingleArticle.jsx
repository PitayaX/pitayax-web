import React, { PropTypes } from 'react'
import Bottom from './Bottom.jsx'
import Article from './Article.jsx'
const SingleArticle = React.createClass({
  propTypes: {
    params: PropTypes.object
  },
  render () {
    const tempModel={
      author: '清梨浅茶',
      publishDate: '2015.09.04 01:12',
      authorWords: 16875,
      authorFollows: 152,
      authorLikes: 718,
      articleWords: 1949,
      articleReaders: 1140,
      articleComments: 7,
      articleLikes: 36,
      articleContent: `
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
    const pid = this.props.params.id
    {/* do ajax get tempModel from server*/}
    const styles = require('./SingleArticle.scss')
    return(
        <div>
          <Article model={tempModel} />
          <hr className={styles.bottomHr}/>
          <Bottom />
          <div className={styles.fixedBtn}>
            <a className={styles.goTop} href="#"> <i className="fa fa-angle-up"></i></a>
            <a className={styles.goTop} href="#"><i className="fa fa-qrcode"></i></a>
            <a className={styles.writer} href="#"><i className="fa fa-pencil"></i></a>
        </div>
        </div>
    )
  }
})
export default SingleArticle
