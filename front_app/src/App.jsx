
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Components
import AppRouter from './AppRouter.jsx'
import NavBar from '../components/NavBar/NavBar.jsx'
// import Profile from '../pages/Profile.jsx'

// context
import { UserContext } from '../contexts/UserContext'

import ProfileGeolocManager from '../components/ProfileGeolocManager/ProfileGeolocManager.jsx'

// import { css } from 'main.css'
/* eslint-enable no-unused-vars */

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='appWrapper'>
          <UserContext.Consumer>
            {(context) => <NavBar userContext={context} />}
          </UserContext.Consumer>
          <AppRouter />
        </div>
      </BrowserRouter>
    )
  }
}
