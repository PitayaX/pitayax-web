import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerStateReducer } from 'redux-router'

import auth from './auth'
import { reducer as form } from 'redux-form'
import info from './info'
import widgets from './widgets'
import tag from './tag'
import post from './post'
import settings from './settings'


export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  info,
  tag,
  post,
  settings
})
