import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth'
import {
    App,
    Home,
    NotFound,
    SingleArticle,
    WritePost
  } from 'containers'

export default (store) => {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/newp" component={WritePost} />
      <Route path="/p/:id" component={SingleArticle} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
