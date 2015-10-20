import { combineReducers } from 'redux'

import auth from './auth'
import counter from './counter'
import { reducer as form } from 'redux-form'
import info from './info'
import widgets from './widgets'
import singleArticle from './singleArticle'
import tags from './tag'
import sorts from './sorts'
import articales from './articales'
export default combineReducers({
  auth,
  counter,
  form,
  info,
  widgets,
  singleArticle
  tags,
  sorts,
  articales
})
