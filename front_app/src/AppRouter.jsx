/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// CONTEXT
import { UserContext } from '../contexts/UserContext'

// PAGES
import Home from '../pages/Home.jsx'
import Profile from '../pages/Profile.jsx'
import Message from '../pages/Message.jsx'
import Search from '../pages/Search.jsx'
import NotFound from '../pages/404.jsx'
/* eslint-enable no-unused-vars */

const AppRouter = () => {
  return (
    <UserContext.Consumer>
      {(userContextProp) => {
        return (
          <Switch>
            <Route exact path='/'
              render={(props) => <Home { ...props } userContext={userContextProp} />}
            />

            <Route exact path='/home'
              render={(props) => <Home { ...props } userContext={userContextProp} />}
            />

            <Route exact path='/profile'
              render={(props) => <Profile userContext={userContextProp} />}
            />

            <Route exact path='/Message'
              render={(props) => <Message userContext={userContextProp} />}
            />

            <Route exact path='/Search'
              render = {(props) => <Search userContext={userContextProp}/>}
            />

            <Route component={ NotFound } />
          </Switch>
        )
      }}
    </UserContext.Consumer>
  )
}

export default AppRouter
