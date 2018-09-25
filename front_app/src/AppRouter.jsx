/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// Page includes
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Message from '../pages/Message.jsx'
import NotFound from '../pages/404.jsx'
/* eslint-enable no-unused-vars */

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/home' component={ Home } />
      {/* <Route exact path='/profile' component={ Profile } /> */}
      <Route exact path='/Message' component={ Message } />
      <Route component={ NotFound } />
    </Switch>
  )
}

export default AppRouter
