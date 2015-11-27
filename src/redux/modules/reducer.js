import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerStateReducer } from 'redux-router'
import { reducer as form } from 'redux-form'
import tag from './tag'
import post from './post'
import user from './user'
import settings from './settings'



export default combineReducers({
  router: routerStateReducer,
  form,
  tag,
  post,
  user,
  settings
})
