import React from 'react'
import { IndexRoute, Route } from 'react-router'
import {
    App,
    Home,
    NotFound,
    Detail,
    User,
    UserSettings,
    WritePost,
    Register
  } from 'containers'

export default (store) => {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/newp" component={WritePost} />
      <Route path="/p/:id" component={Detail} />
      <Route path="/user/:id" component={User} />
      <Route path="/user/:id/settings" component={UserSettings} />
      <Route path="/reg" component={Register}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
