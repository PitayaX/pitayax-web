import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerStateReducer } from 'redux-router'

import auth from './auth'
import counter from './counter'
import { reducer as form } from 'redux-form'
import info from './info'
import widgets from './widgets'
import singleArticle from './singleArticle'
import tags from './tag'
import tag from './tag2'
import sorts from './sorts'
import articales from './articales'
import post from './post'


export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  info,
  widgets,
  singleArticle,
  tags,
  sorts,
  articales,
  tag,
  post
})
