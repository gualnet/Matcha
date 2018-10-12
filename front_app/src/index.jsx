
// IMPORTS
/* eslint-disable no-unused-vars */
import React from 'react'
import '@babel/polyfill'
import App from './App.jsx'

// test context
import { UserProvider, UserContext } from '../contexts/UserContext'

// CSS
import '../assets/scss/pages/Default.scss'
/* eslint-enable no-unused-vars */
import ReactDom from 'react-dom'

ReactDom.render(
  <UserProvider><GeolocProvider>
    <UserContext.Consumer>
      { (value) => <App { ...value } /> }
    </UserContext.Consumer>
  </GeolocProvider></UserProvider>,
  document.getElementById('root')
)
