import { combineReducers } from 'redux'

import auth from './auth'
import counter from './counter'
import { reducer as form } from 'redux-form'
import info from './info'
import widgets from './widgets'
import tags from './tag'
import articales from './articales'

export default combineReducers({
  auth,
  counter,
  form,
  info,
  widgets,
  tags,
  articales
})
