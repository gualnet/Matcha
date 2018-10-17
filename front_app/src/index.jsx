
/* eslint-disable no-unused-vars */
// IMPORTS
import React from 'react'
import '@babel/polyfill'
import App from './App.jsx'

// CONTEXT
import { UserProvider, UserContext } from '../contexts/UserContext'
import { GeolocProvider } from '../contexts/GeolocContext'

// CSS
import '../assets/scss/pages/Default.scss'
/* eslint-enable no-unused-vars */
import ReactDom from 'react-dom'

ReactDom.render(
  <UserProvider>
    <UserContext.Consumer>
      {(userContext) => <GeolocProvider
        { ...userContext }>
        <App { ...userContext } />
      </GeolocProvider>
      }
    </UserContext.Consumer>
  </UserProvider>,
  document.getElementById('root')
)
