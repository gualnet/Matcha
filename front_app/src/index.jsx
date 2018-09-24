
// IMPORTS
/* eslint-disable no-unused-vars */
import React from 'react'
import App from './App.jsx'
import DefaultCss from '../assets/scss/pages/Default.scss'

// test context
import { UserProvider, UserContext } from '../contexts/UserContext'

/* eslint-enable no-unused-vars */
import ReactDom from 'react-dom'

ReactDom.render(
  <UserProvider>
    <UserContext.Consumer>
      { (value) => <App { ...value } /> }
    </UserContext.Consumer>
  </UserProvider>,
  document.getElementById('root')
)
