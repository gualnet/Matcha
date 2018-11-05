
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from '../utils/socket'
/* eslint-enable no-unused-vars */

/* eslint-disable */
class Message extends Component {
  constructor () {
    super()
    connect(msg => {
      console.log('connect msg: ', msg)
    })
  }

  render () {
    return (
      <div className='messageWrapper'>
        <p>MESSAGE PAGE</p>
      </div>
    )
  }
}
import { format } from 'util';

export default Message
