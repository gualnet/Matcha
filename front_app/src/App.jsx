
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// COMPONENT
import AppRouter from './AppRouter.jsx'
import NavBar from '../components/NavBar/NavBar.jsx'
import OldNavBar from '../components/NavBar/old_NavBar.jsx'
// import Profile from '../pages/Profile.jsx'

// CONTEXT
import { UserContext } from '../contexts/UserContext'

/* eslint-enable no-unused-vars */

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='appWrapper'>
          {/* <UserContext.Consumer>
            {(context) => <NavBar userContext={context} />}
          </UserContext.Consumer> */}
          <UserContext.Consumer>
            {(context) => <OldNavBar userContext={context} />}
          </UserContext.Consumer>
          <AppRouter />
        </div>
      </BrowserRouter>
    )
  }
}
