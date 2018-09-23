
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

// Components
import AppRouter from './AppRouter.jsx'
import NavBar from '../components/NavBar.jsx'

// import { css } from '../css/App.scss'
/* eslint-enable no-unused-vars */

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='appWrapper'>
          <NavBar />
          <AppRouter />
        </div>
      </BrowserRouter>
    )
  }
}
