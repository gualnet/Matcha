
// IMPORTS
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import { css } from '../css/App.css'

console.log('CSS: ', css)

export default class App extends Component {
  render () {
    return (
      <div className='AppWrapper'>
        <h1> Mon app </h1>
      </div>
    )
  }
}
