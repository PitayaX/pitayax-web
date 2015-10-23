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
import sorts from './sorts'
import articales from './articales'

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets,
  singleArticle,
  tags,
  sorts,
  articales
})
