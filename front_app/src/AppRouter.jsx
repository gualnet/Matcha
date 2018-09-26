/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// context
import { UserContext } from '../contexts/UserContext'

// Page includes
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Message from '../pages/Message.jsx'
import NotFound from '../pages/404.jsx'
/* eslint-enable no-unused-vars */

const AppRouter = () => {
  return (
    <UserContext.Consumer>
      {(context) => {
        return (
          <Switch>
            <Route exact path='/'
              render={(props) => <Home { ...props } userContext={context} />}
            />

            <Route exact path='/home'
              render={(props) => <Home { ...props } userContext={context} />}
            />

            <Route exact path='/profile'
              render={(props) => <Profile userContext={context} />}
            />

            <Route exact path='/Message'
              render={(props) => <Message userContext={context} />}
            />

            <Route component={ NotFound } />
          </Switch>
        )
      }}
    </UserContext.Consumer>
  )
}

export default AppRouter
