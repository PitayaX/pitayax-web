import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth'
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    SingleArticle
  } from 'containers'

export default (store) => {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/p/:id" component={SingleArticle} />
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
